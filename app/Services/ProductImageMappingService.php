<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class ProductImageMappingService
{
    /**
     * Known Rozetka URLs for specific products
     * These are manually curated URLs that match our products exactly
     */
    private $productMappings = [
        // iPhone 15 Pro
        'iphone-15-pro' => [
            'search_terms' => ['iPhone 15 Pro', 'Apple iPhone 15 Pro'],
            'rozetka_urls' => [
                'https://rozetka.com.ua/apple-iphone-15-pro-128gb-natural-titanium/p378732423/',
                'https://rozetka.com.ua/apple-iphone-15-pro-256gb-natural-titanium/p378732441/',
            ],
            'fallback_images' => [
                'https://content1.rozetka.com.ua/goods/images/big/378732423.jpg',
                'https://content2.rozetka.com.ua/goods/images/big/378732424.jpg',
                'https://content2.rozetka.com.ua/goods/images/big/378732425.jpg',
                'https://content1.rozetka.com.ua/goods/images/big/378732426.jpg'
            ]
        ],
        
        // Samsung Galaxy S24 Ultra
        'samsung-galaxy-s24-ultra' => [
            'search_terms' => ['Samsung Galaxy S24 Ultra', 'Galaxy S24 Ultra'],
            'rozetka_urls' => [
                'https://rozetka.com.ua/samsung-galaxy-s24-ultra-256gb-titanium-black/p378031805/',
                'https://rozetka.com.ua/samsung-galaxy-s24-ultra-512gb-titanium-black/p378031813/',
            ],
            'fallback_images' => [
                'https://content.rozetka.com.ua/goods/images/big/378031805.jpg',
                'https://content1.rozetka.com.ua/goods/images/big/378031806.jpg',
                'https://content2.rozetka.com.ua/goods/images/big/378031807.jpg',
                'https://content1.rozetka.com.ua/goods/images/big/378031808.jpg'
            ]
        ],
        
        // MacBook Pro 14" M3
        'macbook-pro-14-m3' => [
            'search_terms' => ['MacBook Pro 14 M3', 'Apple MacBook Pro 14'],
            'rozetka_urls' => [
                'https://rozetka.com.ua/apple-macbook-pro-14-m3-8-512gb-space-gray/p381543322/',
            ],
            'fallback_images' => [
                'https://content.rozetka.com.ua/goods/images/big/381543322.jpg',
                'https://content1.rozetka.com.ua/goods/images/big/381543323.jpg',
                'https://content2.rozetka.com.ua/goods/images/big/381543324.jpg',
                'https://content1.rozetka.com.ua/goods/images/big/381543325.jpg'
            ]
        ],
        
        // ASUS ROG Strix G15
        'asus-rog-strix-g15' => [
            'search_terms' => ['ASUS ROG Strix G15', 'ROG Strix G15'],
            'rozetka_urls' => [
                'https://rozetka.com.ua/asus-rog-strix-g15-g513rm-hq261/p348926462/',
            ],
            'fallback_images' => [
                'https://content.rozetka.com.ua/goods/images/big/348926462.jpg',
                'https://content1.rozetka.com.ua/goods/images/big/348926463.jpg',
                'https://content2.rozetka.com.ua/goods/images/big/348926464.jpg'
            ]
        ],
        
        // iPad Pro 12.9" M2
        'ipad-pro-12-9-m2' => [
            'search_terms' => ['iPad Pro 12.9 M2', 'Apple iPad Pro 12.9'],
            'rozetka_urls' => [
                'https://rozetka.com.ua/apple-ipad-pro-12-9-m2-wifi-128gb-space-gray/p363693187/',
            ],
            'fallback_images' => [
                'https://content.rozetka.com.ua/goods/images/big/363693187.jpg',
                'https://content1.rozetka.com.ua/goods/images/big/363693188.jpg',
                'https://content2.rozetka.com.ua/goods/images/big/363693189.jpg'
            ]
        ],
        
        // AirPods Pro 2
        'airpods-pro-2' => [
            'search_terms' => ['AirPods Pro 2', 'Apple AirPods Pro 2nd generation'],
            'rozetka_urls' => [
                'https://rozetka.com.ua/apple-airpods-pro-2nd-generation-magsafe-case-usb-c/p396731432/',
            ],
            'fallback_images' => [
                'https://content.rozetka.com.ua/goods/images/big/396731432.jpg',
                'https://content1.rozetka.com.ua/goods/images/big/396731433.jpg',
                'https://content2.rozetka.com.ua/goods/images/big/396731434.jpg'
            ]
        ],
        
        // Sony WH-1000XM5
        'sony-wh-1000xm5' => [
            'search_terms' => ['Sony WH-1000XM5', 'WH-1000XM5 headphones'],
            'rozetka_urls' => [
                'https://rozetka.com.ua/sony-wh-1000xm5-black/p349729462/',
            ],
            'fallback_images' => [
                'https://content.rozetka.com.ua/goods/images/big/349729462.jpg',
                'https://content1.rozetka.com.ua/goods/images/big/349729463.jpg',
                'https://content2.rozetka.com.ua/goods/images/big/349729464.jpg'
            ]
        ],
        
        // Apple Watch Series 9
        'apple-watch-series-9' => [
            'search_terms' => ['Apple Watch Series 9', 'Watch Series 9'],
            'rozetka_urls' => [
                'https://rozetka.com.ua/apple-watch-series-9-gps-45mm-midnight-aluminum-case-with-midnight-sport-band-s-m/p380690022/',
            ],
            'fallback_images' => [
                'https://content.rozetka.com.ua/goods/images/big/380690022.jpg',
                'https://content1.rozetka.com.ua/goods/images/big/380690023.jpg',
                'https://content2.rozetka.com.ua/goods/images/big/380690024.jpg'
            ]
        ]
    ];

    private $headers = [
        'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language' => 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding' => 'gzip, deflate, br',
        'DNT' => '1',
        'Connection' => 'keep-alive',
        'Upgrade-Insecure-Requests' => '1'
    ];

    public function __construct()
    {
        // No initialization needed
    }

    /**
     * Find the best matching product mapping based on product data
     */
    public function findProductMapping(Product $product): ?array
    {
        $productName = strtolower($product->name_uk);
        $brand = strtolower($product->brand ?? '');
        $model = strtolower($product->model ?? '');

        foreach ($this->productMappings as $key => $mapping) {
            foreach ($mapping['search_terms'] as $term) {
                $termLower = strtolower($term);
                
                // Check if product name contains the search term
                if (strpos($productName, $termLower) !== false ||
                    strpos($termLower, $productName) !== false) {
                    return $mapping;
                }
                
                // Check brand and model combinations
                if (!empty($brand) && !empty($model)) {
                    if (strpos($termLower, $brand) !== false && 
                        strpos($termLower, $model) !== false) {
                        return $mapping;
                    }
                }
            }
        }

        return null;
    }

    /**
     * Update product images using mapping or fallback
     */
    public function updateProductImages(Product $product): bool
    {
        try {
            echo "🔍 Processing: {$product->name_uk}";
            if ($product->brand) echo " ({$product->brand})";
            echo "\n";

            $mapping = $this->findProductMapping($product);
            
            if (!$mapping) {
                echo "❌ No mapping found for this product\n";
                return false;
            }

            echo "✅ Found mapping for product\n";

            // Try to get images from Rozetka URLs first
            $images = [];
            foreach ($mapping['rozetka_urls'] as $url) {
                echo "🌐 Trying to extract from: {$url}\n";
                $extractedImages = $this->extractImagesFromUrl($url);
                if (!empty($extractedImages)) {
                    $images = array_merge($images, $extractedImages);
                    break; // Stop at first successful extraction
                }
            }

            // Fallback to pre-defined image URLs if extraction fails
            if (empty($images) && isset($mapping['fallback_images'])) {
                echo "📦 Using fallback images\n";
                $images = $mapping['fallback_images'];
                
                // Verify fallback images are accessible
                $validImages = [];
                foreach ($images as $image) {
                    if ($this->isImageAccessible($image)) {
                        $validImages[] = $image;
                    }
                }
                $images = $validImages;
            }

            if (empty($images)) {
                echo "❌ No valid images found\n";
                return false;
            }

            // Update product
            $product->images = array_unique($images);
            $product->save();

            echo "✅ Updated with " . count($images) . " images:\n";
            foreach (array_slice($images, 0, 3) as $index => $image) {
                echo "   " . ($index + 1) . ". $image\n";
            }
            if (count($images) > 3) {
                echo "   ... and " . (count($images) - 3) . " more images\n";
            }

            return true;

        } catch (\Exception $e) {
            Log::error("Error updating product images: " . $e->getMessage(), ['product_id' => $product->id]);
            echo "❌ Error: " . $e->getMessage() . "\n";
            return false;
        }
    }

    /**
     * Extract images from a Rozetka URL
     */
    private function extractImagesFromUrl(string $url): array
    {
        try {
            $response = Http::withHeaders($this->headers)
                ->timeout(30)
                ->get($url);
            
            if (!$response->successful()) {
                return [];
            }

            $html = $response->body();
            
            libxml_use_internal_errors(true);
            $dom = new \DOMDocument();
            $dom->loadHTML($html);
            libxml_clear_errors();

            $xpath = new \DOMXPath($dom);
            $images = [];

            // Try different selectors for Rozetka images
            $selectors = [
                '//img[contains(@class, "gallery__picture")]',
                '//img[contains(@class, "picture-container__picture")]',
                '//img[contains(@data-src, "content") and contains(@data-src, "rozetka")]',
                '//img[contains(@src, "content") and contains(@src, "rozetka")]'
            ];

            foreach ($selectors as $selector) {
                $imgElements = $xpath->query($selector);
                foreach ($imgElements as $img) {
                    /** @var \DOMElement $img */
                    $src = $img->getAttribute('data-src') ?: $img->getAttribute('src');
                    if ($src && $this->isValidImageUrl($src)) {
                        $normalizedUrl = $this->normalizeImageUrl($src);
                        if (!in_array($normalizedUrl, $images)) {
                            $images[] = $normalizedUrl;
                        }
                    }
                }
                
                if (count($images) > 0) break;
            }

            return array_slice($images, 0, 6); // Limit to 6 images

        } catch (\Exception $e) {
            Log::error("Error extracting images from URL: " . $e->getMessage(), ['url' => $url]);
            return [];
        }
    }

    /**
     * Check if an image URL is accessible
     */
    private function isImageAccessible(string $url): bool
    {
        try {
            $response = Http::timeout(10)->head($url);
            return $response->successful();
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Check if URL is a valid image URL
     */
    private function isValidImageUrl(string $url): bool
    {
        return filter_var($url, FILTER_VALIDATE_URL) && 
               preg_match('/\.(jpg|jpeg|png|webp|avif)(\?|$)/i', $url) &&
               !preg_match('/(thumb|small|preview|mini|icon|placeholder)/i', $url);
    }

    /**
     * Normalize image URL
     */
    private function normalizeImageUrl(string $url): string
    {
        if (strpos($url, '//') === 0) {
            $url = 'https:' . $url;
        } elseif (strpos($url, 'http://') === 0) {
            $url = str_replace('http://', 'https://', $url);
        }

        // Convert to high-quality version
        $url = str_replace('/preview/', '/big/', $url);
        $url = str_replace('/small/', '/big/', $url);

        return $url;
    }

    /**
     * Update all products using the mapping service
     */
    public function updateAllProducts(): void
    {
        $products = Product::all();
        $totalProducts = $products->count();
        $successCount = 0;

        echo "🚀 Starting image update for {$totalProducts} products using mapping service...\n\n";

        foreach ($products as $index => $product) {
            echo "\n[" . ($index + 1) . "/{$totalProducts}] ";
            
            if ($this->updateProductImages($product)) {
                $successCount++;
            }
            
            echo "\n";
            
            // Small delay between products
            if ($index < $totalProducts - 1) {
                sleep(1);
            }
        }

        echo "\n🎉 Completed! Successfully updated {$successCount} out of {$totalProducts} products.\n";
    }
}
