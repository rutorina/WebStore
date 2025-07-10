<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Product;

class UniversalProductImageService
{
    private $searchEngines = [
        'bing' => 'https://api.bing.microsoft.com/v7.0/images/search',
        'google' => 'https://www.googleapis.com/customsearch/v1',
        'unsplash' => 'https://api.unsplash.com/search/photos',
        'pexels' => 'https://api.pexels.com/v1/search'
    ];

    /**
     * Search for product images using multiple APIs
     */
    public function searchProductImages(string $productName, string $brand = '', string $model = ''): array
    {
        $searchQuery = $this->buildSearchQuery($productName, $brand, $model);
        $images = [];

        // Try multiple sources
        $sources = [
            'bing_shopping' => function() use ($searchQuery) { return $this->searchBingImages($searchQuery, true); },
            'google_shopping' => function() use ($searchQuery) { return $this->searchGoogleImages($searchQuery, true); },
            'duckduckgo' => function() use ($searchQuery) { return $this->searchDuckDuckGoImages($searchQuery); },
            'serp_api' => function() use ($searchQuery) { return $this->searchSerpApi($searchQuery); },
            'fallback_ecommerce' => function() use ($searchQuery) { return $this->searchEcommerceImages($searchQuery); }
        ];

        foreach ($sources as $sourceName => $searchFunction) {
            try {
                echo "🔍 Trying {$sourceName} for: {$searchQuery}\n";
                $sourceImages = $searchFunction();
                
                if (!empty($sourceImages)) {
                    $images = array_merge($images, $sourceImages);
                    echo "✅ Found " . count($sourceImages) . " images from {$sourceName}\n";
                    
                    // If we have enough good images, stop searching
                    if (count($images) >= 6) {
                        break;
                    }
                } else {
                    echo "❌ No images from {$sourceName}\n";
                }
                
                // Small delay between API calls
                sleep(1);
                
            } catch (\Exception $e) {
                echo "⚠️  Error with {$sourceName}: " . $e->getMessage() . "\n";
                continue;
            }
        }

        // Remove duplicates and validate images
        $validImages = [];
        foreach (array_unique($images) as $image) {
            if ($this->validateImageUrl($image)) {
                $validImages[] = $image;
            }
        }

        return array_slice($validImages, 0, 8); // Limit to 8 images
    }

    /**
     * Search DuckDuckGo images (no API key required)
     */
    private function searchDuckDuckGoImages(string $query): array
    {
        try {
            $searchUrl = "https://duckduckgo.com/?q=" . urlencode($query . " product image") . "&t=h_&iax=images&ia=images";
            
            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            ])->timeout(15)->get($searchUrl);

            if (!$response->successful()) {
                return [];
            }

            // Parse the HTML response to extract image URLs
            $html = $response->body();
            $images = [];

            // Look for image URLs in the HTML
            if (preg_match_all('/data-src="([^"]+\.(jpg|jpeg|png|webp)[^"]*)"/', $html, $matches)) {
                foreach ($matches[1] as $imageUrl) {
                    if (filter_var($imageUrl, FILTER_VALIDATE_URL)) {
                        $images[] = $imageUrl;
                    }
                }
            }

            return array_slice($images, 0, 4);

        } catch (\Exception $e) {
            Log::error("DuckDuckGo image search error: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Search using SerpApi (Google Images scraping service)
     */
    private function searchSerpApi(string $query): array
    {
        try {
            // Free tier available - no API key needed for basic searches
            $searchUrl = "https://serpapi.com/search.json?" . http_build_query([
                'q' => $query . " product",
                'tbm' => 'isch', // Images
                'ijn' => 0,
                'num' => 10
            ]);

            $response = Http::timeout(15)->get($searchUrl);

            if (!$response->successful()) {
                return [];
            }

            $data = $response->json();
            $images = [];

            if (isset($data['images_results'])) {
                foreach ($data['images_results'] as $result) {
                    if (isset($result['original'])) {
                        $images[] = $result['original'];
                    } elseif (isset($result['thumbnail'])) {
                        $images[] = $result['thumbnail'];
                    }
                }
            }

            return array_slice($images, 0, 4);

        } catch (\Exception $e) {
            Log::error("SerpApi search error: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Search Bing Images (requires API key but has free tier)
     */
    private function searchBingImages(string $query, bool $shopping = false): array
    {
        try {
            // For demo purposes - you would need to set up Bing API key
            // return $this->searchBingImagesWithApiKey($query, $shopping);
            
            // Fallback to scraping Bing images
            $searchType = $shopping ? 'shopping' : 'images';
            $searchUrl = "https://www.bing.com/images/search?q=" . urlencode($query . " product") . "&FORM=HDRSC2";

            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            ])->timeout(15)->get($searchUrl);

            if (!$response->successful()) {
                return [];
            }

            $html = $response->body();
            $images = [];

            // Extract image URLs from Bing's response
            if (preg_match_all('/murl&quot;:&quot;([^&]+)&quot;/', $html, $matches)) {
                foreach ($matches[1] as $imageUrl) {
                    $decodedUrl = html_entity_decode($imageUrl);
                    if (filter_var($decodedUrl, FILTER_VALIDATE_URL)) {
                        $images[] = $decodedUrl;
                    }
                }
            }

            return array_slice($images, 0, 4);

        } catch (\Exception $e) {
            Log::error("Bing image search error: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Search Google Images (would require API setup)
     */
    private function searchGoogleImages(string $query, bool $shopping = false): array
    {
        try {
            // Since Google Custom Search API requires setup, we'll use a different approach
            // For production, you would set up Google Custom Search API
            
            // Alternative: Use Google Images search scraping
            $searchUrl = "https://www.google.com/search?q=" . urlencode($query . " product") . "&tbm=isch";

            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            ])->timeout(15)->get($searchUrl);

            if (!$response->successful()) {
                return [];
            }

            $html = $response->body();
            $images = [];

            // Extract image URLs from Google's response
            if (preg_match_all('/"ou":"([^"]+)"/', $html, $matches)) {
                foreach ($matches[1] as $imageUrl) {
                    $decodedUrl = urldecode($imageUrl);
                    if (filter_var($decodedUrl, FILTER_VALIDATE_URL) && 
                        preg_match('/\.(jpg|jpeg|png|webp)$/i', $decodedUrl)) {
                        $images[] = $decodedUrl;
                    }
                }
            }

            return array_slice($images, 0, 4);

        } catch (\Exception $e) {
            Log::error("Google image search error: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Search e-commerce specific sites for product images
     */
    private function searchEcommerceImages(string $query): array
    {
        $images = [];
        
        // Try different e-commerce sites
        $sites = [
            'amazon' => $this->searchAmazonImages($query),
            'aliexpress' => $this->searchAliExpressImages($query),
            'ebay' => $this->searchEbayImages($query)
        ];

        foreach ($sites as $site => $siteImages) {
            if (!empty($siteImages)) {
                echo "   📦 Found images from {$site}\n";
                $images = array_merge($images, $siteImages);
            }
        }

        return array_slice($images, 0, 4);
    }

    /**
     * Search Amazon for product images
     */
    private function searchAmazonImages(string $query): array
    {
        try {
            $searchUrl = "https://www.amazon.com/s?k=" . urlencode($query);

            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            ])->timeout(15)->get($searchUrl);

            if (!$response->successful()) {
                return [];
            }

            $html = $response->body();
            $images = [];

            // Extract product images from Amazon search results
            if (preg_match_all('/data-image-source-density="1"\s+src="([^"]+)"/', $html, $matches)) {
                foreach ($matches[1] as $imageUrl) {
                    if (filter_var($imageUrl, FILTER_VALIDATE_URL) && 
                        strpos($imageUrl, 'amazon') !== false) {
                        $images[] = $imageUrl;
                    }
                }
            }

            return array_slice($images, 0, 2);

        } catch (\Exception $e) {
            Log::error("Amazon image search error: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Search AliExpress for product images
     */
    private function searchAliExpressImages(string $query): array
    {
        try {
            $searchUrl = "https://www.aliexpress.com/wholesale?SearchText=" . urlencode($query);

            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            ])->timeout(15)->get($searchUrl);

            if (!$response->successful()) {
                return [];
            }

            $html = $response->body();
            $images = [];

            // Extract product images from AliExpress search results
            if (preg_match_all('/class="[^"]*product[^"]*"[^>]*><img[^>]+src="([^"]+)"/', $html, $matches)) {
                foreach ($matches[1] as $imageUrl) {
                    if (filter_var($imageUrl, FILTER_VALIDATE_URL)) {
                        $images[] = $imageUrl;
                    }
                }
            }

            return array_slice($images, 0, 2);

        } catch (\Exception $e) {
            Log::error("AliExpress image search error: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Search eBay for product images
     */
    private function searchEbayImages(string $query): array
    {
        try {
            $searchUrl = "https://www.ebay.com/sch/i.html?_nkw=" . urlencode($query);

            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            ])->timeout(15)->get($searchUrl);

            if (!$response->successful()) {
                return [];
            }

            $html = $response->body();
            $images = [];

            // Extract product images from eBay search results
            if (preg_match_all('/class="[^"]*img[^"]*"[^>]+src="([^"]+)"/', $html, $matches)) {
                foreach ($matches[1] as $imageUrl) {
                    if (filter_var($imageUrl, FILTER_VALIDATE_URL) && 
                        strpos($imageUrl, 'ebay') !== false) {
                        $images[] = $imageUrl;
                    }
                }
            }

            return array_slice($images, 0, 2);

        } catch (\Exception $e) {
            Log::error("eBay image search error: " . $e->getMessage());
            return [];
        }
    }

    /**
     * Build comprehensive search query
     */
    private function buildSearchQuery(string $productName, string $brand = '', string $model = ''): string
    {
        $terms = array_filter([$brand, $productName, $model]);
        return implode(' ', $terms);
    }

    /**
     * Validate if image URL is accessible and high quality
     */
    private function validateImageUrl(string $url): bool
    {
        try {
            if (!filter_var($url, FILTER_VALIDATE_URL)) {
                return false;
            }

            // Check if it's an image URL
            if (!preg_match('/\.(jpg|jpeg|png|webp|avif)(\?|$)/i', $url)) {
                return false;
            }

            // Avoid low quality indicators
            if (preg_match('/(thumb|small|preview|mini|icon|placeholder|40x40|60x60|100x100)/i', $url)) {
                return false;
            }

            // Try to check if URL is accessible (quick head request)
            $response = Http::timeout(5)->head($url);
            return $response->successful();

        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * Update a product's images using universal search
     */
    public function updateProductImages(Product $product): bool
    {
        try {
            echo "🔍 Searching for images: {$product->name_uk}";
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

            // Update product
            $product->images = $images;
            $product->save();

            echo "✅ Updated {$product->name_uk} with " . count($images) . " images\n";
            
            // Show image sources
            foreach (array_slice($images, 0, 3) as $index => $image) {
                $domain = parse_url($image, PHP_URL_HOST);
                echo "   " . ($index + 1) . ". {$domain}\n";
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
     * Update all products using universal image search
     */
    public function updateAllProductImages(): void
    {
        $products = Product::all();
        $totalProducts = $products->count();
        $successCount = 0;

        echo "🚀 Starting universal image search for {$totalProducts} products...\n\n";

        foreach ($products as $index => $product) {
            echo "\n[" . ($index + 1) . "/{$totalProducts}] ";
            
            if ($this->updateProductImages($product)) {
                $successCount++;
            }
            
            // Delay between products to be respectful to APIs
            if ($index < $totalProducts - 1) {
                echo "⏳ Waiting 3 seconds...\n";
                sleep(3);
            }
        }

        echo "\n\n🎉 Universal search completed!\n";
        echo "✅ Successfully updated: {$successCount} products\n";
        echo "❌ Failed to update: " . ($totalProducts - $successCount) . " products\n";
    }
}
