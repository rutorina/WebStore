<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Product;

class EnhancedRozetkaImageService
{
    private $userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    private $userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    ];
    
    /**
     * Extract product image URLs from a Rozetka product page
     */
    public function getProductImages(string $rozetkaUrl): array
    {
        try {
            $userAgent = $this->userAgents[array_rand($this->userAgents)];
            
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $rozetkaUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
            curl_setopt($ch, CURLOPT_TIMEOUT, 30);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language: uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
                'Accept-Encoding: gzip, deflate, br',
                'DNT: 1',
                'Connection: keep-alive',
                'Upgrade-Insecure-Requests: 1',
                'Sec-Fetch-Dest: document',
                'Sec-Fetch-Mode: navigate',
                'Sec-Fetch-Site: none',
                'Cache-Control: max-age=0'
            ]);
            
            $html = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode !== 200 || !$html) {
                Log::error("Failed to fetch Rozetka page: {$rozetkaUrl}", ['http_code' => $httpCode]);
                return [];
            }

            // Load HTML with DOMDocument
            libxml_use_internal_errors(true);
            $doc = new \DOMDocument();
            $doc->loadHTML($html);
            libxml_clear_errors();

            // Use XPath to find images
            $xpath = new \DOMXPath($doc);
            $images = [];

            // Primary method: Look for gallery images
            $selectors = [
                '//img[contains(@class, "gallery__picture")]',
                '//img[contains(@class, "product-gallery")]',
                '//img[contains(@class, "picture-container__picture")]',
                '//img[contains(@data-src, "content") and contains(@data-src, "original")]',
                '//img[contains(@src, "content") and contains(@src, "original")]'
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
                
                if (count($images) > 0) {
                    break; // Stop if we found images with this selector
                }
            }

            return array_slice($images, 0, 10); // Limit to 10 images max

        } catch (\Exception $e) {
            Log::error("Error scraping Rozetka images: " . $e->getMessage(), ['url' => $rozetkaUrl]);
            return [];
        }
    }

    /**
     * Search for a product on Rozetka and get the best matching product URL
     */
    public function searchProductUrl(string $productName, string $brand = '', string $model = ''): ?string
    {
        try {
            // Create comprehensive search query
            $searchTerms = array_filter([
                $brand,
                $model,
                $productName
            ]);
            
            $searchQuery = urlencode(implode(' ', $searchTerms));
            $searchUrl = "https://rozetka.com.ua/search/?text={$searchQuery}";

            $userAgent = $this->userAgents[array_rand($this->userAgents)];

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $searchUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_USERAGENT, $userAgent);
            curl_setopt($ch, CURLOPT_TIMEOUT, 30);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language: uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
                'Accept-Encoding: gzip, deflate, br',
                'DNT: 1',
                'Connection: keep-alive',
                'Upgrade-Insecure-Requests: 1',
                'Sec-Fetch-Dest: document',
                'Sec-Fetch-Mode: navigate',
                'Sec-Fetch-Site: same-origin'
            ]);
            
            $html = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode !== 200 || !$html) {
                return null;
            }

            libxml_use_internal_errors(true);
            $doc = new \DOMDocument();
            $doc->loadHTML($html);
            libxml_clear_errors();

            $xpath = new \DOMXPath($doc);

            // Look for product links in search results
            $linkSelectors = [
                '//a[contains(@class, "goods-tile__heading")]/@href',
                '//a[contains(@class, "product-link")]/@href',
                '//a[contains(@href, "/p") and contains(@href, "rozetka.com.ua")]/@href'
            ];

            foreach ($linkSelectors as $selector) {
                $links = $xpath->query($selector);
                if ($links->length > 0) {
                    $firstLink = $links->item(0)->nodeValue;
                    if ($this->isValidRozetkaProductUrl($firstLink)) {
                        return $this->normalizeRozetkaUrl($firstLink);
                    }
                }
            }

            return null;

        } catch (\Exception $e) {
            Log::error("Error searching Rozetka for product: " . $e->getMessage(), [
                'product' => $productName,
                'brand' => $brand,
                'model' => $model
            ]);
            return null;
        }
    }

    /**
     * Update a single product's images by searching Rozetka
     */
    public function updateProductImages(Product $product): bool
    {
        try {
            echo "🔍 Searching for: {$product->name_uk}";
            if ($product->brand) echo " (Brand: {$product->brand})";
            if ($product->model) echo " (Model: {$product->model})";
            echo "\n";

            // Search for the product on Rozetka
            $rozetkaUrl = $this->searchProductUrl(
                $product->name_uk,
                $product->brand ?? '',
                $product->model ?? ''
            );

            if (!$rozetkaUrl) {
                echo "❌ No Rozetka product found for: {$product->name_uk}\n";
                return false;
            }

            echo "🌐 Found Rozetka URL: {$rozetkaUrl}\n";

            // Get images from the product page
            $images = $this->getProductImages($rozetkaUrl);

            if (empty($images)) {
                echo "❌ No images found on product page\n";
                return false;
            }

            // Update the product
            $product->images = $images;
            $product->save();

            echo "✅ Updated {$product->name_uk} with " . count($images) . " images\n";
            
            // Show first few image URLs
            foreach (array_slice($images, 0, 3) as $index => $image) {
                echo "   " . ($index + 1) . ". $image\n";
            }
            if (count($images) > 3) {
                echo "   ... and " . (count($images) - 3) . " more images\n";
            }

            return true;

        } catch (\Exception $e) {
            Log::error("Error updating product images: " . $e->getMessage(), ['product_id' => $product->id]);
            echo "❌ Error updating {$product->name_uk}: " . $e->getMessage() . "\n";
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
     * Check if URL is a valid Rozetka product URL
     */
    private function isValidRozetkaProductUrl(string $url): bool
    {
        return strpos($url, 'rozetka.com.ua') !== false && 
               strpos($url, '/p') !== false &&
               preg_match('/\/p\d+\/$/', $url);
    }

    /**
     * Normalize image URL (ensure HTTPS, etc.)
     */
    private function normalizeImageUrl(string $url): string
    {
        if (strpos($url, '//') === 0) {
            $url = 'https:' . $url;
        } elseif (strpos($url, 'http://') === 0) {
            $url = str_replace('http://', 'https://', $url);
        }

        // Convert to high-quality version if possible
        $url = str_replace('/preview/', '/original/', $url);
        $url = str_replace('/small/', '/big/', $url);

        return $url;
    }

    /**
     * Normalize Rozetka URL
     */
    private function normalizeRozetkaUrl(string $url): string
    {
        if (strpos($url, 'http') !== 0) {
            $url = 'https://rozetka.com.ua' . $url;
        }
        return $url;
    }

    /**
     * Update all products' images in batches
     */
    public function updateAllProductImages(int $batchSize = 10, int $delaySeconds = 2): void
    {
        $totalProducts = Product::count();
        $processedCount = 0;
        $successCount = 0;

        echo "🚀 Starting to update images for {$totalProducts} products...\n";
        echo "⏱️  Processing in batches of {$batchSize} with {$delaySeconds}s delay between requests\n\n";

        Product::chunk($batchSize, function ($products) use (&$processedCount, &$successCount, $delaySeconds) {
            foreach ($products as $product) {
                $processedCount++;
                echo "\n[{$processedCount}] ";
                
                if ($this->updateProductImages($product)) {
                    $successCount++;
                }

                // Delay between requests to be respectful to Rozetka
                if ($delaySeconds > 0) {
                    sleep($delaySeconds);
                }
            }
        });

        echo "\n\n🎉 Completed! Updated {$successCount} out of {$processedCount} products.\n";
    }
}
