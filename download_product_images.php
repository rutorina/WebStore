<?php
/**
 * Download and setup real product images from legitimate sources
 */

class ProductImageDownloader
{
    private $baseDir = 'public/images/products/';
    private $baseUrl = 'http://localhost:8080/images/products/';
    
    // High-quality product images from legitimate sources
    private $productImages = [
        'iphone-15-pro' => [
            'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop', // iPhone 15 Pro
            'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=600&fit=crop&crop=center',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop'
        ],
        'samsung-galaxy-s24-ultra' => [
            'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&h=600&fit=crop', // Samsung phone
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=800&h=600&fit=crop'
        ],
        'macbook-pro-14-m3' => [
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop', // MacBook
            'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop'
        ],
        'asus-rog-strix-g15' => [
            'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop', // Gaming laptop
            'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop'
        ],
        'ipad-pro-12-9-m2' => [
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop', // iPad
            'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop&crop=top'
        ],
        'airpods-pro-2' => [
            'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&h=600&fit=crop', // AirPods
            'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=800&h=600&fit=crop'
        ],
        'sony-wh-1000xm5' => [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop', // Headphones
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop'
        ],
        'apple-watch-series-9' => [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop', // Apple Watch
            'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=800&h=600&fit=crop'
        ]
    ];
    
    public function downloadProductImages()
    {
        echo "📥 Downloading high-quality product images...\n\n";
        
        $downloadedProducts = 0;
        $totalImages = 0;
        
        foreach ($this->productImages as $productSlug => $imageUrls) {
            echo "📱 Processing: {$productSlug}\n";
            
            // Find product directory
            $productDir = $this->findProductDirectory($productSlug);
            if (!$productDir) {
                echo "  ❌ Directory not found for {$productSlug}\n";
                continue;
            }
            
            $downloadedImages = [];
            
            foreach ($imageUrls as $index => $imageUrl) {
                $filename = 'image_' . ($index + 1) . '.jpg';
                $filepath = $productDir . $filename;
                
                echo "  📥 Downloading image " . ($index + 1) . "... ";
                
                if ($this->downloadImage($imageUrl, $filepath)) {
                    $relativePath = str_replace($this->baseDir, '/images/products/', $filepath);
                    $downloadedImages[] = $this->baseUrl . str_replace($this->baseDir, '', $filepath);
                    echo "✅\n";
                    $totalImages++;
                } else {
                    echo "❌\n";
                }
            }
            
            if (count($downloadedImages) > 0) {
                // Update database
                $this->updateProductInDatabase($productSlug, $downloadedImages);
                $downloadedProducts++;
                echo "  ✅ Updated database with " . count($downloadedImages) . " images\n";
            }
            
            echo "\n";
        }
        
        echo "🎉 Download complete!\n";
        echo "📊 Products updated: {$downloadedProducts}\n";
        echo "📸 Total images downloaded: {$totalImages}\n";
        echo "🌐 Visit http://localhost:8080/catalog to see the results\n";
    }
    
    private function findProductDirectory($productSlug)
    {
        $categories = ['smartphones', 'laptops', 'tablets', 'headphones', 'smartwatches'];
        
        foreach ($categories as $category) {
            $testDir = $this->baseDir . $category . '/' . $productSlug . '/';
            if (is_dir($testDir)) {
                return $testDir;
            }
        }
        
        return null;
    }
    
    private function downloadImage($url, $filepath)
    {
        try {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 30);
            curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
            
            $imageData = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            
            if ($httpCode === 200 && $imageData !== false) {
                return file_put_contents($filepath, $imageData) !== false;
            }
            
            return false;
        } catch (Exception $e) {
            return false;
        }
    }
    
    private function updateProductInDatabase($productSlug, $imageUrls)
    {
        try {
            $pdo = new PDO('sqlite:database/database.sqlite');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            // Map product slug to product name for database lookup
            $productMapping = [
                'iphone-15-pro' => 'iPhone 15 Pro',
                'samsung-galaxy-s24-ultra' => 'Samsung Galaxy S24 Ultra',
                'macbook-pro-14-m3' => 'MacBook Pro 14" M3',
                'asus-rog-strix-g15' => 'ASUS ROG Strix G15',
                'ipad-pro-12-9-m2' => 'iPad Pro 12.9" M2',
                'airpods-pro-2' => 'AirPods Pro 2',
                'sony-wh-1000xm5' => 'Sony WH-1000XM5',
                'apple-watch-series-9' => 'Apple Watch Series 9'
            ];
            
            $productName = $productMapping[$productSlug] ?? $productSlug;
            
            $stmt = $pdo->prepare("UPDATE products SET images = ?, image_url = ? WHERE name_uk LIKE ?");
            $primaryImage = $imageUrls[0] ?? null;
            
            return $stmt->execute([
                json_encode($imageUrls),
                $primaryImage,
                '%' . $productName . '%'
            ]);
            
        } catch (Exception $e) {
            echo "Database error: " . $e->getMessage() . "\n";
            return false;
        }
    }
}

// Run the downloader
try {
    $downloader = new ProductImageDownloader();
    $downloader->downloadProductImages();
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>
