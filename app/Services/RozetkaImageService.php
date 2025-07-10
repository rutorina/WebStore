<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RozetkaImageService
{
    /**
     * Extract product image URLs from a Rozetka product page
     *
     * @param string $rozetkaUrl
     * @return array
     */
    public function getProductImages(string $rozetkaUrl): array
    {
        try {
            // Send GET request with desktop browser user-agent
            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language' => 'uk-UA,uk;q=0.9,en;q=0.8',
                'Accept-Encoding' => 'gzip, deflate, br',
                'Cache-Control' => 'no-cache',
                'Pragma' => 'no-cache'
            ])->timeout(30)->get($rozetkaUrl);

            if (!$response->successful()) {
                Log::error("Failed to fetch Rozetka page: {$rozetkaUrl}", [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                return [];
            }

            $html = $response->body();
            
            // Parse HTML using DOMDocument
            $dom = new \DOMDocument();
            libxml_use_internal_errors(true);
            $dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
            libxml_clear_errors();

            $xpath = new \DOMXPath($dom);
            $images = [];

            // Method 1: Look for gallery__picture class
            $galleryImages = $xpath->query("//img[contains(@class, 'gallery__picture')]");
            foreach ($galleryImages as $img) {
                /** @var \DOMElement $img */
                $src = $img->getAttribute('data-src') ?: $img->getAttribute('src');
                if ($src && $this->isValidImageUrl($src)) {
                    $images[] = $this->normalizeImageUrl($src);
                }
            }

            // Method 2: Look for product gallery images (alternative selectors)
            if (empty($images)) {
                $productImages = $xpath->query("//img[contains(@class, 'product-gallery')]");
                foreach ($productImages as $img) {
                    /** @var \DOMElement $img */
                    $src = $img->getAttribute('data-src') ?: $img->getAttribute('src');
                    if ($src && $this->isValidImageUrl($src)) {
                        $images[] = $this->normalizeImageUrl($src);
                    }
                }
            }

            // Method 3: Look for any high-quality product images in content
            if (empty($images)) {
                $contentImages = $xpath->query("//img[contains(@src, 'content') and contains(@src, 'rozetka')]");
                foreach ($contentImages as $img) {
                    /** @var \DOMElement $img */
                    $src = $img->getAttribute('src');
                    if ($src && $this->isValidImageUrl($src) && $this->isHighQualityImage($src)) {
                        $images[] = $this->normalizeImageUrl($src);
                    }
                }
            }

            // Remove duplicates and return
            return array_unique($images);

        } catch (\Exception $e) {
            Log::error("Error scraping Rozetka images: " . $e->getMessage(), [
                'url' => $rozetkaUrl,
                'error' => $e->getTraceAsString()
            ]);
            return [];
        }
    }

    /**
     * Check if URL is a valid image URL
     *
     * @param string $url
     * @return bool
     */
    private function isValidImageUrl(string $url): bool
    {
        // Check if it's a valid URL and contains image extensions
        return filter_var($url, FILTER_VALIDATE_URL) && 
               preg_match('/\.(jpg|jpeg|png|webp|avif)(\?|$)/i', $url);
    }

    /**
     * Check if image is high quality (not thumbnail)
     *
     * @param string $url
     * @return bool
     */
    private function isHighQualityImage(string $url): bool
    {
        // Avoid thumbnails and small images
        return !preg_match('/(thumb|small|preview|mini|icon)/i', $url) &&
               preg_match('/(big|large|original|main)/i', $url);
    }

    /**
     * Normalize image URL (ensure HTTPS, etc.)
     *
     * @param string $url
     * @return string
     */
    private function normalizeImageUrl(string $url): string
    {
        // Convert to HTTPS if needed
        if (strpos($url, '//') === 0) {
            $url = 'https:' . $url;
        } elseif (strpos($url, 'http://') === 0) {
            $url = str_replace('http://', 'https://', $url);
        }

        return $url;
    }

    /**
     * Get product images for a specific product by searching Rozetka
     *
     * @param string $productName
     * @param string $category
     * @return array
     */
    public function searchProductImages(string $productName, string $category = ''): array
    {
        try {
            // Create search query
            $searchQuery = urlencode($productName . ' ' . $category);
            $searchUrl = "https://rozetka.com.ua/search/?text={$searchQuery}";

            // Get search results page
            $response = Http::withHeaders([
                'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            ])->timeout(30)->get($searchUrl);

            if (!$response->successful()) {
                return [];
            }

            $html = $response->body();
            $dom = new \DOMDocument();
            libxml_use_internal_errors(true);
            $dom->loadHTML($html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
            libxml_clear_errors();

            $xpath = new \DOMXPath($dom);

            // Find first product link
            $productLinks = $xpath->query("//a[contains(@class, 'goods-tile__heading')]");
            if ($productLinks->length > 0) {
                /** @var \DOMElement $firstLink */
                $firstLink = $productLinks->item(0);
                $productUrl = $firstLink->getAttribute('href');
                
                if ($productUrl && strpos($productUrl, 'rozetka.com.ua') !== false) {
                    return $this->getProductImages($productUrl);
                }
            }

            return [];

        } catch (\Exception $e) {
            Log::error("Error searching Rozetka for product: " . $e->getMessage());
            return [];
        }
    }
}
