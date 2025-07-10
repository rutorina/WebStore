<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

class ImprovedImageSearch 
{
    public function searchProductImages($productName, $limit = 3) 
    {
        echo "Searching for: {$productName}\n";
        
        // Try multiple search strategies
        $strategies = [
            $this->searchUnsplashAPI($productName, $limit),
            $this->searchPexelsAPI($productName, $limit),
            $this->getHighQualityFallbacks($productName, $limit)
        ];
        
        foreach ($strategies as $images) {
            if (!empty($images)) {
                echo "Found " . count($images) . " images\n";
                return $images;
            }
        }
        
        return $this->getCategoryFallbacks($productName, $limit);
    }
    
    private function searchUnsplashAPI($query, $limit) 
    {
        // For now, let's use curated high-quality product images
        // In a real implementation, you would use Unsplash API with your access key
        
        $productImages = $this->getCuratedProductImages();
        
        foreach ($productImages as $productKey => $images) {
            if (stripos($query, $productKey) !== false) {
                return array_slice($images, 0, $limit);
            }
        }
        
        return [];
    }
    
    private function searchPexelsAPI($query, $limit) 
    {
        // For now, return empty - in real implementation use Pexels API
        return [];
    }
    
    private function getCuratedProductImages() 
    {
        return [
            'iPhone 15 Pro' => [
                'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=85',
                'https://images.unsplash.com/photo-1695048041078-80eaccd3a8b8?w=800&q=85',
                'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=85'
            ],
            'iPhone 15' => [
                'https://images.unsplash.com/photo-1695048041078-80eaccd3a8b8?w=800&q=85',
                'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=85',
                'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800&q=85'
            ],
            'Samsung Galaxy S24' => [
                'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=85',
                'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=85',
                'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=85'
            ],
            'Google Pixel' => [
                'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=85',
                'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=85',
                'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=85'
            ],
            'OnePlus' => [
                'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=85',
                'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=85',
                'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=85'
            ],
            'Xiaomi' => [
                'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=85',
                'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=85',
                'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=85'
            ],
            'MacBook Air' => [
                'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=85',
                'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=85',
                'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=85'
            ],
            'MacBook Pro' => [
                'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=85',
                'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=85',
                'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=85'
            ],
            'Dell XPS' => [
                'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=85',
                'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=85',
                'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=85'
            ],
            'ThinkPad' => [
                'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=85',
                'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=85',
                'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=85'
            ],
            'ASUS ROG' => [
                'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=85',
                'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=85',
                'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=85'
            ],
            'iPad Pro' => [
                'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=85',
                'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=85',
                'https://images.unsplash.com/photo-1585789575347-8e9c3b5c3b8c?w=800&q=85'
            ],
            'iPad Air' => [
                'https://images.unsplash.com/photo-1585789575347-8e9c3b5c3b8c?w=800&q=85',
                'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=85',
                'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=85'
            ],
            'Galaxy Tab' => [
                'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=85',
                'https://images.unsplash.com/photo-1585789575347-8e9c3b5c3b8c?w=800&q=85',
                'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=85'
            ],
            'Surface Pro' => [
                'https://images.unsplash.com/photo-1585789575347-8e9c3b5c3b8c?w=800&q=85',
                'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&q=85',
                'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=85'
            ],
            'Sony WH' => [
                'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=85',
                'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=85',
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=85'
            ],
            'AirPods' => [
                'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=85',
                'https://images.unsplash.com/photo-1606220588913-b3aee37e6b8e?w=800&q=85',
                'https://images.unsplash.com/photo-1583711823986-f5b1c8b6bb65?w=800&q=85'
            ],
            'Bose' => [
                'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=85',
                'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=85',
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=85'
            ],
            'Apple Watch' => [
                'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&q=85',
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85',
                'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=85'
            ],
            'Galaxy Watch' => [
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85',
                'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=85',
                'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=85'
            ],
            'Garmin' => [
                'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=85',
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=85',
                'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=85'
            ]
        ];
    }
    
    private function getHighQualityFallbacks($productName, $limit) 
    {
        // Enhanced quality images (800px width, 85 quality)
        $enhancedImages = [
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
            ]
        ];
        
        foreach ($enhancedImages as $category => $images) {
            if (stripos($productName, $category) !== false) {
                return array_slice($images, 0, $limit);
            }
        }
        
        return [];
    }
    
    private function getCategoryFallbacks($productName, $limit) 
    {
        // Default high-quality images
        return [
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=85',
            'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&q=85',
            'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=85'
        ];
    }
}

try {
    echo "Starting enhanced product image search...\n";
    
    $imageSearch = new ImprovedImageSearch();
    $products = \App\Models\Product::with('category')->get();
    
    echo "Found " . $products->count() . " products\n";
    $updated = 0;
    
    foreach ($products as $product) {
        $productName = $product->name_uk;
        
        $images = $imageSearch->searchProductImages($productName, 3);
        
        if (!empty($images)) {
            $product->update(['images' => $images]);
            echo "✓ Updated: {$productName} with " . count($images) . " high-quality images\n";
            $updated++;
        } else {
            echo "✗ Failed: {$productName}\n";
        }
    }
    
    echo "\nCompleted! Updated {$updated} products with enhanced images.\n";
    
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}
