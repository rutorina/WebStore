<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// High-quality official-looking product images with multiple angles
$officialProductImages = [
    // iPhone 15 Pro - multiple angles
    'iPhone 15 Pro' => [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80', // Front view
        'https://images.unsplash.com/photo-1695048041078-80eaccd3a8b8?w=600&q=80', // Side view
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80', // Back view
    ],
    
    // Samsung Galaxy S24 Ultra - multiple angles
    'Samsung Galaxy S24 Ultra' => [
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&q=80', // Front
        'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&q=80', // Side
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80', // Back
    ],
    
    // iPhone 15 - multiple angles
    'iPhone 15' => [
        'https://images.unsplash.com/photo-1695048041078-80eaccd3a8b8?w=600&q=80', // Main
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80', // Side
        'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=600&q=80', // Detail
    ],
    
    // Google Pixel 8 Pro
    'Google Pixel 8 Pro' => [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
        'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&q=80',
        'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80',
    ],
    
    // MacBook Air M3 - multiple angles
    'MacBook Air M3' => [
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80', // Open view
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80', // Side view
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80', // Closed view
    ],
    
    // ASUS ROG Strix G15 - gaming laptop
    'ASUS ROG Strix G15' => [
        'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80', // Main
        'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80', // Keyboard
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80', // Side
    ],
    
    // Dell XPS 13
    'Dell XPS 13' => [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
        'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80',
    ],
    
    // iPad Pro 12.9" - multiple angles
    'iPad Pro 12.9"' => [
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80', // Front
        'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80', // Side
        'https://images.unsplash.com/photo-1585789575347-8e9c3b5c3b8c?w=600&q=80', // Back
    ],
    
    // Samsung Galaxy Tab S9 Ultra
    'Samsung Galaxy Tab S9 Ultra' => [
        'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80',
        'https://images.unsplash.com/photo-1585789575347-8e9c3b5c3b8c?w=600&q=80',
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
    ],
    
    // Sony WH-1000XM5 - headphones
    'Sony WH-1000XM5' => [
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80', // Front
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80', // Side
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', // Detail
    ],
    
    // AirPods Pro 2
    'AirPods Pro 2' => [
        'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&q=80', // Case
        'https://images.unsplash.com/photo-1606220588913-b3aee37e6b8e?w=600&q=80', // Open case
        'https://images.unsplash.com/photo-1583711823986-f5b1c8b6bb65?w=600&q=80', // Detail
    ],
    
    // Apple Watch Series 9
    'Apple Watch Series 9' => [
        'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&q=80', // Face
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', // Side
        'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80', // Band
    ],
    
    // Samsung Galaxy Watch6 Classic
    'Samsung Galaxy Watch6 Classic' => [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80',
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    ],
    
    // Default images for products without specific images
    'default_smartphone' => [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
        'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=80',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80',
    ],
    'default_laptop' => [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
        'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80',
    ],
    'default_tablet' => [
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
        'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80',
        'https://images.unsplash.com/photo-1585789575347-8e9c3b5c3b8c?w=600&q=80',
    ],
    'default_headphones' => [
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&q=80',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    ],
    'default_watch' => [
        'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&q=80',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80',
    ],
    'default_accessories' => [
        'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80',
        'https://images.unsplash.com/photo-1609592606539-47c3b20616ee?w=600&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    ],
];

try {
    echo "Starting official product images update with multiple images...\n";
    
    $products = \App\Models\Product::with('category')->get();
    echo "Found " . $products->count() . " products\n";
    
    $updated = 0;
    
    foreach ($products as $product) {
        $productName = $product->name_uk;
        $categorySlug = $product->category->slug;
        
        // Check if we have specific images for this exact product
        if (isset($officialProductImages[$productName])) {
            $newImages = $officialProductImages[$productName];
            $product->update(['images' => $newImages]);
            echo "Updated: {$productName} -> " . count($newImages) . " images\n";
            $updated++;
        } else {
            // Use default category images if no specific product images
            $defaultKey = 'default_' . $categorySlug;
            if (isset($officialProductImages[$defaultKey])) {
                $newImages = $officialProductImages[$defaultKey];
                $product->update(['images' => $newImages]);
                echo "Updated with default: {$productName} ({$categorySlug}) -> " . count($newImages) . " images\n";
                $updated++;
            } else {
                echo "No images for: {$productName} ({$categorySlug})\n";
            }
        }
    }
    
    echo "\nCompleted! Updated {$updated} products with official-looking multiple images.\n";
    
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}
