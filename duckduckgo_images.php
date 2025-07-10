<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

class DuckDuckGoImageSearch 
{
    private $baseUrl = 'https://api.duckduckgo.com/';
    
    public function searchImages($query, $limit = 5) 
    {
        // Clean the query for better results
        $cleanQuery = $this->cleanQuery($query);
        
        // DuckDuckGo instant answer API
        $url = $this->baseUrl . '?' . http_build_query([
            'q' => $cleanQuery,
            'format' => 'json',
            'no_html' => '1',
            'skip_disambig' => '1',
            'no_redirect' => '1',
            't' => 'web_store_app'
        ]);
        
        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => [
                    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept: application/json, text/plain, */*',
                    'Accept-Language: en-US,en;q=0.9',
                    'Referer: https://duckduckgo.com/',
                ],
                'timeout' => 10
            ]
        ]);
        
        $response = @file_get_contents($url, false, $context);
        
        if ($response === false) {
            echo "Failed to fetch from DuckDuckGo for: $query\n";
            return $this->getFallbackImages($query);
        }
        
        $data = json_decode($response, true);
        
        // Try to get images from the response
        $images = [];
        
        // Check for related topics with images
        if (isset($data['RelatedTopics'])) {
            foreach ($data['RelatedTopics'] as $topic) {
                if (isset($topic['Icon']['URL']) && !empty($topic['Icon']['URL'])) {
                    $imageUrl = $topic['Icon']['URL'];
                    if ($this->isValidImageUrl($imageUrl)) {
                        $images[] = $imageUrl;
                        if (count($images) >= $limit) break;
                    }
                }
            }
        }
        
        // Check for answer image
        if (isset($data['Image']) && !empty($data['Image'])) {
            $imageUrl = $data['Image'];
            if ($this->isValidImageUrl($imageUrl)) {
                array_unshift($images, $imageUrl);
            }
        }
        
        // If we don't have enough images, try alternative search
        if (count($images) < $limit) {
            $additionalImages = $this->searchAlternativeImages($cleanQuery, $limit - count($images));
            $images = array_merge($images, $additionalImages);
        }
        
        // If still no images, use fallback
        if (empty($images)) {
            return $this->getFallbackImages($query);
        }
        
        return array_slice($images, 0, $limit);
    }
    
    private function cleanQuery($query) 
    {
        // Add product-specific keywords for better image results
        $productKeywords = [
            'product', 'official', 'new', '2024', '2025', 'review', 'unboxing'
        ];
        
        // Remove Ukrainian text and focus on English product names
        $englishQuery = $this->translateToEnglish($query);
        
        return $englishQuery . ' ' . $productKeywords[array_rand($productKeywords)];
    }
    
    private function translateToEnglish($ukrainianName) 
    {
        $translations = [
            'iPhone 15 Pro' => 'iPhone 15 Pro',
            'Samsung Galaxy S24 Ultra' => 'Samsung Galaxy S24 Ultra',
            'iPhone 15' => 'iPhone 15',
            'Google Pixel 8 Pro' => 'Google Pixel 8 Pro',
            'OnePlus 12' => 'OnePlus 12',
            'Xiaomi 14 Ultra' => 'Xiaomi 14 Ultra',
            'Huawei P60 Pro' => 'Huawei P60 Pro',
            'Nothing Phone (2)' => 'Nothing Phone 2',
            'Sony Xperia 1 V' => 'Sony Xperia 1 V',
            'Asus ROG Phone 8' => 'Asus ROG Phone 8',
            'MacBook Air M3' => 'MacBook Air M3',
            'ASUS ROG Strix G15' => 'ASUS ROG Strix G15',
            'Dell XPS 13' => 'Dell XPS 13',
            'HP Spectre x360' => 'HP Spectre x360',
            'Lenovo ThinkPad X1 Carbon' => 'Lenovo ThinkPad X1 Carbon',
            'iPad Pro 12.9"' => 'iPad Pro 12.9 inch',
            'Samsung Galaxy Tab S9 Ultra' => 'Samsung Galaxy Tab S9 Ultra',
            'Sony WH-1000XM5' => 'Sony WH-1000XM5',
            'AirPods Pro 2' => 'AirPods Pro 2nd generation',
            'Apple Watch Series 9' => 'Apple Watch Series 9',
            'Samsung Galaxy Watch6 Classic' => 'Samsung Galaxy Watch 6 Classic',
        ];
        
        return $translations[$ukrainianName] ?? $ukrainianName;
    }
    
    private function searchAlternativeImages($query, $limit) 
    {
        // Try a more specific search
        $specificQuery = $query . ' product image official';
        
        $url = $this->baseUrl . '?' . http_build_query([
            'q' => $specificQuery,
            'format' => 'json',
            'no_html' => '1',
            'skip_disambig' => '1',
            'no_redirect' => '1',
        ]);
        
        $context = stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => [
                    'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                ],
                'timeout' => 5
            ]
        ]);
        
        $response = @file_get_contents($url, false, $context);
        
        if ($response === false) {
            return [];
        }
        
        $data = json_decode($response, true);
        $images = [];
        
        if (isset($data['RelatedTopics'])) {
            foreach ($data['RelatedTopics'] as $topic) {
                if (isset($topic['Icon']['URL']) && !empty($topic['Icon']['URL'])) {
                    $imageUrl = $topic['Icon']['URL'];
                    if ($this->isValidImageUrl($imageUrl)) {
                        $images[] = $imageUrl;
                        if (count($images) >= $limit) break;
                    }
                }
            }
        }
        
        return $images;
    }
    
    private function isValidImageUrl($url) 
    {
        // Check if URL is valid and points to an image
        if (empty($url) || !filter_var($url, FILTER_VALIDATE_URL)) {
            return false;
        }
        
        // Check file extension
        $ext = strtolower(pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION));
        $validExts = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
        
        return in_array($ext, $validExts) || 
               strpos($url, 'image') !== false || 
               strpos($url, 'photo') !== false;
    }
    
    private function getFallbackImages($query) 
    {
        // High-quality fallback images from Unsplash based on product category
        $fallbacks = [
            'iPhone' => [
                'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80',
                'https://images.unsplash.com/photo-1695048041078-80eaccd3a8b8?w=600&q=80',
                'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80'
            ],
            'Samsung' => [
                'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80',
                'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&q=80',
                'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80'
            ],
            'MacBook' => [
                'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80',
                'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
                'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80'
            ],
            'iPad' => [
                'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
                'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80',
                'https://images.unsplash.com/photo-1585789575347-8e9c3b5c3b8c?w=600&q=80'
            ]
        ];
        
        foreach ($fallbacks as $key => $images) {
            if (stripos($query, $key) !== false) {
                return $images;
            }
        }
        
        // Default fallback
        return [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80'
        ];
    }
}

try {
    echo "Starting DuckDuckGo image search for products...\n";
    echo "Initializing image search class...\n";
    
    $imageSearch = new DuckDuckGoImageSearch();
    echo "Loading products from database...\n";
    
    $products = \App\Models\Product::with('category')->get();
    
    echo "Found " . $products->count() . " products\n";
    $updated = 0;
    $errors = 0;
    
    foreach ($products as $product) {
        $productName = $product->name_uk;
        echo "\nSearching images for: {$productName}...";
        
        try {
            $images = $imageSearch->searchImages($productName, 3);
            
            if (!empty($images)) {
                $product->update(['images' => $images]);
                echo " ✓ Found " . count($images) . " images";
                $updated++;
                
                // Add a small delay to be respectful to the API
                usleep(500000); // 0.5 seconds
            } else {
                echo " ✗ No images found";
                $errors++;
            }
        } catch (Exception $e) {
            echo " ✗ Error: " . $e->getMessage();
            $errors++;
        }
    }
    
    echo "\n\nCompleted!\n";
    echo "Updated: {$updated} products\n";
    echo "Errors: {$errors} products\n";
    
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}
