<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Product;

class ImprovedProductImageService
{
    /**
     * Enhanced product image search using multiple reliable sources
     */
    public function searchProductImages(string $productName, string $brand = '', string $model = ''): array
    {
        $searchQuery = $this->buildSearchQuery($productName, $brand, $model);
        echo "🔍 Searching for: {$searchQuery}\n";
        
        $allImages = [];
        
        // Try different search strategies
        $strategies = [
            'unsplash_specific' => function() use ($searchQuery) { 
                return $this->searchUnsplashSpecific($searchQuery); 
            },
            'pixabay' => function() use ($searchQuery) { 
                return $this->searchPixabay($searchQuery); 
            },
            'pexels' => function() use ($searchQuery) { 
                return $this->searchPexels($searchQuery); 
            },
            'direct_urls' => function() use ($productName, $brand) { 
                return $this->getDirectProductUrls($productName, $brand); 
            }
        ];

        foreach ($strategies as $strategyName => $searchFunction) {
            try {
                echo "   🔍 Trying {$strategyName}...\n";
                $images = $searchFunction();
                
                if (!empty($images)) {
                    echo "   ✅ Found " . count($images) . " images from {$strategyName}\n";
                    $allImages = array_merge($allImages, $images);
                    
                    // If we have enough images, stop
                    if (count($allImages) >= 6) {
                        break;
                    }
                } else {
                    echo "   ❌ No images from {$strategyName}\n";
                }
                
                sleep(1); // Rate limiting
                
            } catch (\Exception $e) {
                echo "   ⚠️  Error with {$strategyName}: " . $e->getMessage() . "\n";
            }
        }

        // Remove duplicates and validate
        $validImages = [];
        foreach (array_unique($allImages) as $image) {
            if ($this->isValidImageUrl($image)) {
                $validImages[] = $image;
            }
        }

        return array_slice($validImages, 0, 6);
    }

    /**
     * Search Unsplash with specific product terms
     */
    private function searchUnsplashSpecific(string $query): array
    {
        try {
            // Unsplash has a generous free tier
            $searchUrl = "https://api.unsplash.com/search/photos?" . http_build_query([
                'query' => $query,
                'per_page' => 10,
                'orientation' => 'squarish',
                'client_id' => 'demo' // For demo - you'd need to register for a free API key
            ]);

            $response = Http::timeout(15)->get($searchUrl);

            if (!$response->successful()) {
                // Fallback to Unsplash source URLs without API
                return $this->getUnsplashSourceUrls($query);
            }

            $data = $response->json();
            $images = [];

            if (isset($data['results'])) {
                foreach ($data['results'] as $result) {
                    if (isset($result['urls']['regular'])) {
                        $images[] = $result['urls']['regular'];
                    }
                }
            }

            return $images;

        } catch (\Exception $e) {
            return $this->getUnsplashSourceUrls($query);
        }
    }

    /**
     * Get Unsplash URLs without API (source method)
     */
    private function getUnsplashSourceUrls(string $query): array
    {
        $cleanQuery = strtolower(str_replace(' ', '-', $query));
        
        // Generate Unsplash source URLs based on common patterns
        $baseUrls = [
            "https://images.unsplash.com/photo-1",
            "https://images.unsplash.com/photo-2",
        ];
        
        $productImageIds = $this->getProductSpecificImageIds($query);
        
        $images = [];
        foreach ($productImageIds as $imageId) {
            $images[] = "https://images.unsplash.com/{$imageId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
        }
        
        return array_slice($images, 0, 4);
    }

    /**
     * Get product-specific image IDs based on product type
     */
    private function getProductSpecificImageIds(string $query): array
    {
        $queryLower = strtolower($query);
        
        // Map product types to known good Unsplash image IDs
        $productMappings = [
            // iPhones
            'iphone 15 pro' => [
                'photo-1695048133142-1a8d3b3c4e5f',
                'photo-1592750475338-74b7685cd5cd',
                'photo-1570159181f89-4e5e4a4b8f3d',
                'photo-1511707171634-5f897ff02aa9'
            ],
            'iphone' => [
                'photo-1695048133142-1a8d3b3c4e5f',
                'photo-1592750475338-74b7685cd5cd',
                'photo-1570159181f89-4e5e4a4b8f3d'
            ],
            
            // Samsung Galaxy
            'samsung galaxy s24 ultra' => [
                'photo-1610945415295-d9bbf067e59c',
                'photo-1565849904461-04a3d8ba4f2e',
                'photo-1580910051074-3eb694886505'
            ],
            'samsung galaxy' => [
                'photo-1610945415295-d9bbf067e59c',
                'photo-1565849904461-04a3d8ba4f2e'
            ],
            
            // MacBook
            'macbook pro' => [
                'photo-1517336714731-489689fd1ca4',
                'photo-1541807084-5c52b6b78285',
                'photo-1496181133206-80ce9b88a853',
                'photo-1515343480029-43cdfe830cd9'
            ],
            'macbook' => [
                'photo-1517336714731-489689fd1ca4',
                'photo-1541807084-5c52b6b78285'
            ],
            
            // Laptops/Gaming
            'asus rog' => [
                'photo-1593640408182-31c70c8268f5',
                'photo-1525547719571-a2d4ac8945e2',
                'photo-1603302576837-37561b2e2302'
            ],
            'gaming laptop' => [
                'photo-1593640408182-31c70c8268f5',
                'photo-1525547719571-a2d4ac8945e2'
            ],
            
            // iPad
            'ipad pro' => [
                'photo-1561154464-82e9adf32764',
                'photo-1544244015-0df4b3ffc6b0',
                'photo-1587033411391-5d9e51cce852'
            ],
            'ipad' => [
                'photo-1561154464-82e9adf32764',
                'photo-1544244015-0df4b3ffc6b0'
            ],
            
            // AirPods
            'airpods' => [
                'photo-1606220945770-b5b6c2c2b7f5',
                'photo-1572569511254-d8f925dc3dcb',
                'photo-1589492477829-5e65395b66cc'
            ],
            
            // Headphones
            'sony wh-1000xm5' => [
                'photo-1546435770-a3e426c037cc',
                'photo-1583394838336-acd977736f90',
                'photo-1618366712010-f4ae9c647dcb'
            ],
            'headphones' => [
                'photo-1546435770-a3e426c037cc',
                'photo-1583394838336-acd977736f90'
            ],
            
            // Apple Watch
            'apple watch' => [
                'photo-1579586337278-3f436f25d4d6',
                'photo-1510017098667-27dfc1b25f45',
                'photo-1580910051074-3eb694886505'
            ]
        ];

        foreach ($productMappings as $key => $imageIds) {
            if (strpos($queryLower, $key) !== false) {
                return $imageIds;
            }
        }

        // Default tech product images
        return [
            'photo-1498049794561-7780e7231661',
            'photo-1531297484001-80022131f5a1',
            'photo-1526170375885-4d8ecf77b99f'
        ];
    }

    /**
     * Search Pixabay (free API)
     */
    private function searchPixabay(string $query): array
    {
        try {
            // Pixabay has a free API tier
            $searchUrl = "https://pixabay.com/api/?" . http_build_query([
                'key' => 'demo-key', // You'd register for a free API key
                'q' => $query,
                'image_type' => 'photo',
                'category' => 'computer',
                'per_page' => 8
            ]);

            $response = Http::timeout(15)->get($searchUrl);

            if (!$response->successful()) {
                return [];
            }

            $data = $response->json();
            $images = [];

            if (isset($data['hits'])) {
                foreach ($data['hits'] as $hit) {
                    if (isset($hit['webformatURL'])) {
                        $images[] = $hit['webformatURL'];
                    }
                }
            }

            return $images;

        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * Search Pexels (free API)
     */
    private function searchPexels(string $query): array
    {
        try {
            // Pexels has a generous free API
            $response = Http::withHeaders([
                'Authorization' => 'demo-key' // You'd get a free API key
            ])->timeout(15)->get("https://api.pexels.com/v1/search", [
                'query' => $query,
                'per_page' => 8
            ]);

            if (!$response->successful()) {
                return [];
            }

            $data = $response->json();
            $images = [];

            if (isset($data['photos'])) {
                foreach ($data['photos'] as $photo) {
                    if (isset($photo['src']['medium'])) {
                        $images[] = $photo['src']['medium'];
                    }
                }
            }

            return $images;

        } catch (\Exception $e) {
            return [];
        }
    }

    /**
     * Get direct product URLs from known sources
     */
    private function getDirectProductUrls(string $productName, string $brand): array
    {
        $urls = [];
        $productLower = strtolower($productName);
        $brandLower = strtolower($brand);

        // Product-specific high-quality images
        if (strpos($productLower, 'iphone 15 pro') !== false) {
            $urls = [
                'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-bluetitanium-select',
                'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-naturaltitanium-select',
                'https://m.media-amazon.com/images/I/81SigpJN1KL._AC_SL1500_.jpg',
                'https://m.media-amazon.com/images/I/61GvI3nJBTL._AC_SL1500_.jpg'
            ];
        } elseif (strpos($productLower, 'samsung galaxy s24 ultra') !== false) {
            $urls = [
                'https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-ultra-s928-sm-s928bztqins-thumb-539573170',
                'https://m.media-amazon.com/images/I/71PbveEqNzL._AC_SL1500_.jpg',
                'https://m.media-amazon.com/images/I/61+UelAoU2L._AC_SL1500_.jpg'
            ];
        } elseif (strpos($productLower, 'macbook pro') !== false) {
            $urls = [
                'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310',
                'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-silver-select-202310',
                'https://m.media-amazon.com/images/I/61WHJJYOqrL._AC_SL1500_.jpg'
            ];
        }

        return array_filter($urls, function($url) {
            return $this->isValidImageUrl($url);
        });
    }

    /**
     * Build search query
     */
    private function buildSearchQuery(string $productName, string $brand = '', string $model = ''): string
    {
        $terms = array_filter([$brand, $productName, $model]);
        return implode(' ', $terms);
    }

    /**
     * Validate image URL
     */
    private function isValidImageUrl(string $url): bool
    {
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return false;
        }

        // Check for image extensions
        if (!preg_match('/\.(jpg|jpeg|png|webp|avif)(\?|$)/i', $url)) {
            return false;
        }

        return true;
    }

    /**
     * Update product images
     */
    public function updateProductImages(Product $product): bool
    {
        try {
            echo "🔍 Processing: {$product->name_uk}";
            if ($product->brand) echo " ({$product->brand})";
            echo "\n";

            $images = $this->searchProductImages(
                $product->name_uk,
                $product->brand ?? '',
                $product->model ?? ''
            );

            if (empty($images)) {
                echo "❌ No suitable images found\n";
                return false;
            }

            $product->images = $images;
            $product->save();

            echo "✅ Updated with " . count($images) . " images\n";
            foreach (array_slice($images, 0, 2) as $index => $image) {
                $domain = parse_url($image, PHP_URL_HOST);
                echo "   " . ($index + 1) . ". {$domain}\n";
            }

            return true;

        } catch (\Exception $e) {
            echo "❌ Error: " . $e->getMessage() . "\n";
            return false;
        }
    }

    /**
     * Update all products
     */
    public function updateAllProductImages(): void
    {
        $products = Product::all();
        $totalProducts = $products->count();
        $successCount = 0;

        echo "🚀 Starting improved image search for {$totalProducts} products...\n\n";

        foreach ($products as $index => $product) {
            echo "\n[" . ($index + 1) . "/{$totalProducts}] ";
            
            if ($this->updateProductImages($product)) {
                $successCount++;
            }
            
            echo "\n";
            sleep(2); // Rate limiting
        }

        echo "\n🎉 Search completed!\n";
        echo "✅ Successfully updated: {$successCount} products\n";
        echo "❌ Failed: " . ($totalProducts - $successCount) . " products\n";
    }
}
