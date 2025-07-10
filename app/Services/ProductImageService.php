<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProductImageService
{
    private $fallbackImages = [
        'smartphone' => [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=85',
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=85',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=85'
        ],
        'laptop' => [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=85',
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=85',
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=85'
        ],
        'tablet' => [
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=85',
            'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=85',
            'https://images.unsplash.com/photo-1585789575347-8e9c3b5c3b8c?w=800&q=85'
        ],
        'headphones' => [
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=85',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=85',
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=85'
        ],
        'watch' => [
            'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=85',
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85',
            'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=85'
        ],
        'accessories' => [
            'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=85',
            'https://images.unsplash.com/photo-1609592606539-47c3b20616ee?w=800&q=85',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85'
        ]
    ];

    /**
     * Search for product images using DuckDuckGo API
     */
    public function searchProductImages(string $productName, int $limit = 3): array
    {
        try {
            // Clean and prepare the search query
            $query = $this->prepareSearchQuery($productName);
            
            // Try DuckDuckGo search
            $images = $this->searchDuckDuckGo($query, $limit);
            
            if (!empty($images)) {
                return $images;
            }
            
            // Fallback to curated images
            return $this->getCuratedImages($productName, $limit);
            
        } catch (\Exception $e) {
            Log::error('Product image search failed', [
                'product' => $productName,
                'error' => $e->getMessage()
            ]);
            
            return $this->getCategoryFallback($productName, $limit);
        }
    }

    /**
     * Search images using DuckDuckGo Instant Answer API
     */
    private function searchDuckDuckGo(string $query, int $limit): array
    {
        try {
            $response = Http::timeout(10)
                ->withHeaders([
                    'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                ])
                ->get('https://api.duckduckgo.com/', [
                    'q' => $query,
                    'format' => 'json',
                    'no_html' => '1',
                    'skip_disambig' => '1',
                    'no_redirect' => '1',
                    't' => 'web_store_app'
                ]);

            if ($response->successful()) {
                $data = $response->json();
                return $this->extractImages($data, $limit);
            }

        } catch (\Exception $e) {
            Log::warning('DuckDuckGo API call failed', ['error' => $e->getMessage()]);
        }

        return [];
    }

    /**
     * Extract image URLs from DuckDuckGo response
     */
    private function extractImages(array $data, int $limit): array
    {
        $images = [];

        // Check for main image
        if (!empty($data['Image'])) {
            $imageUrl = $data['Image'];
            if ($this->isValidImageUrl($imageUrl)) {
                $images[] = $imageUrl;
            }
        }

        // Check related topics for images
        if (!empty($data['RelatedTopics'])) {
            foreach ($data['RelatedTopics'] as $topic) {
                if (!empty($topic['Icon']['URL'])) {
                    $imageUrl = $topic['Icon']['URL'];
                    if ($this->isValidImageUrl($imageUrl)) {
                        $images[] = $imageUrl;
                        if (count($images) >= $limit) break;
                    }
                }
            }
        }

        return array_slice(array_unique($images), 0, $limit);
    }

    /**
     * Validate if URL points to a valid image
     */
    private function isValidImageUrl(string $url): bool
    {
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return false;
        }

        $extension = strtolower(pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION));
        $validExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

        return in_array($extension, $validExtensions) || 
               str_contains($url, 'image') || 
               str_contains($url, 'photo');
    }

    /**
     * Prepare search query for better results
     */
    private function prepareSearchQuery(string $productName): string
    {
        // Translate common Ukrainian product names to English
        $translations = [
            'iPhone 15 Pro' => 'iPhone 15 Pro product image official',
            'Samsung Galaxy S24 Ultra' => 'Samsung Galaxy S24 Ultra product image',
            'MacBook Air M3' => 'MacBook Air M3 2024 product image',
            'iPad Pro' => 'iPad Pro product image official',
            'AirPods Pro' => 'AirPods Pro 2nd generation product image',
            'Apple Watch' => 'Apple Watch Series 9 product image',
        ];

        // Check for exact matches first
        foreach ($translations as $ukrainian => $english) {
            if (str_contains($productName, $ukrainian)) {
                return $english;
            }
        }

        // Default translation with product keywords
        return $productName . ' product image official review';
    }

    /**
     * Get curated high-quality images for specific products
     */
    private function getCuratedImages(string $productName, int $limit): array
    {
        $curatedImages = [
            'iPhone 15 Pro' => [
                'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=85',
                'https://images.unsplash.com/photo-1695048041078-80eaccd3a8b8?w=800&q=85',
                'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=85'
            ],
            'Samsung Galaxy S24' => [
                'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=85',
                'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=85',
                'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=85'
            ],
            'MacBook Air' => [
                'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=85',
                'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=85',
                'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=85'
            ]
        ];

        foreach ($curatedImages as $key => $images) {
            if (str_contains($productName, $key)) {
                return array_slice($images, 0, $limit);
            }
        }

        return [];
    }

    /**
     * Get category-based fallback images
     */
    private function getCategoryFallback(string $productName, int $limit): array
    {
        $productName = strtolower($productName);

        foreach ($this->fallbackImages as $category => $images) {
            if (str_contains($productName, $category) || 
                str_contains($productName, substr($category, 0, -1))) { // singular form
                return array_slice($images, 0, $limit);
            }
        }

        // Default fallback
        return array_slice($this->fallbackImages['smartphone'], 0, $limit);
    }
}
