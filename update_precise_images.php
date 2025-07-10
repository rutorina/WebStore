<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// More specific product images that match actual product names
$specificProductImages = [
    // Smartphones - exact matches
    'iPhone 15 Pro' => ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80'], // iPhone 15 Pro
    'Samsung Galaxy S24 Ultra' => ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80'], // Samsung Galaxy
    'iPhone 15' => ['https://images.unsplash.com/photo-1695048041078-80eaccd3a8b8?w=400&q=80'], // iPhone 15
    'Google Pixel 8 Pro' => ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80'], // Google Pixel
    'OnePlus 12' => ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80'], // OnePlus
    'Xiaomi 14 Ultra' => ['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=80'], // Xiaomi
    
    // Laptops - exact matches  
    'MacBook Air M3' => ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80'], // MacBook
    'ASUS ROG Strix G15' => ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80'], // Gaming laptop
    'Dell XPS 13' => ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80'], // Dell laptop
    'HP Spectre x360' => ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80'], // HP laptop
    'Lenovo ThinkPad X1 Carbon' => ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80'], // ThinkPad
    'MacBook Pro 16"' => ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80'], // MacBook Pro
    
    // Tablets - exact matches
    'iPad Pro 12.9"' => ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80'], // iPad Pro
    'Samsung Galaxy Tab S9 Ultra' => ['https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&q=80'], // Samsung tablet
    'iPad Air 5th Gen' => ['https://images.unsplash.com/photo-1585789575347-8e9c3b5c3b8c?w=400&q=80'], // iPad Air
    'Microsoft Surface Pro 9' => ['https://images.unsplash.com/photo-1585789575347-8e9c3b5c3b8c?w=400&q=80'], // Surface Pro
    
    // Headphones - exact matches
    'Sony WH-1000XM5' => ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80'], // Sony headphones
    'AirPods Pro 2' => ['https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&q=80'], // AirPods
    'Bose QuietComfort 45' => ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80'], // Bose headphones
    'Sennheiser HD 660S2' => ['https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80'], // Sennheiser
    
    // Watches - exact matches
    'Apple Watch Series 9' => ['https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80'], // Apple Watch
    'Samsung Galaxy Watch6 Classic' => ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'], // Samsung Watch
    'Garmin Fenix 7X' => ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80'], // Garmin
];

try {
    echo "Starting precise product image update...\n";
    
    $products = \App\Models\Product::all();
    $updated = 0;
    
    foreach ($products as $product) {
        $productName = $product->name_uk;
        
        // Check if we have a specific image for this exact product
        if (isset($specificProductImages[$productName])) {
            $newImages = $specificProductImages[$productName];
            $product->update(['images' => $newImages]);
            echo "Updated: {$productName} -> {$newImages[0]}\n";
            $updated++;
        } else {
            echo "No specific image for: {$productName}\n";
        }
    }
    
    echo "\nCompleted! Updated {$updated} products with precise images.\n";
    
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}
