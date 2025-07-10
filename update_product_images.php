<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Realistic product images organized by category
$productImages = [
    'smartphones' => [
        'iPhone 15 Pro' => ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=80'],
        'Samsung Galaxy S24' => ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80'],
        'Google Pixel 8' => ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80'],
        'OnePlus 12' => ['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80'],
        'Xiaomi 14' => ['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=80']
    ],
    'laptops' => [
        'MacBook Pro 16"' => ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80'],
        'Dell XPS 13' => ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80'],
        'Lenovo ThinkPad X1' => ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80'],
        'ASUS ROG Strix' => ['https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80'],
        'HP Spectre x360' => ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80']
    ],
    'tablets' => [
        'iPad Pro 12.9"' => ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80'],
        'Samsung Galaxy Tab S9' => ['https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&q=80'],
        'Microsoft Surface Pro' => ['https://images.unsplash.com/photo-1585789575347-8e9c3b5c3b8c?w=400&q=80'],
        'iPad Air' => ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80'],
        'Lenovo Tab P11' => ['https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&q=80']
    ],
    'headphones' => [
        'Sony WH-1000XM5' => ['https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80'],
        'Bose QuietComfort' => ['https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&q=80'],
        'AirPods Pro' => ['https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&q=80'],
        'Sennheiser HD 660S' => ['https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&q=80'],
        'Audio-Technica ATH-M50x' => ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80']
    ],
    'watches' => [
        'Apple Watch Series 9' => ['https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80'],
        'Samsung Galaxy Watch' => ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'],
        'Garmin Fenix 7' => ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&q=80'],
        'Fossil Gen 6' => ['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&q=80'],
        'Fitbit Versa 4' => ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&q=80']
    ],
    'accessories' => [
        'Wireless Charger' => ['https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&q=80'],
        'Power Bank' => ['https://images.unsplash.com/photo-1609592606539-47c3b20616ee?w=400&q=80'],
        'USB-C Cable' => ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'],
        'Phone Case' => ['https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&q=80'],
        'Bluetooth Speaker' => ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80']
    ]
];

try {
    echo "Starting product image update...\n";
    
    $categories = \App\Models\Category::with('products')->get();
    $updated = 0;
    
    foreach ($categories as $category) {
        $categorySlug = $category->slug;
        echo "\nUpdating {$category->name_uk} ({$categorySlug}):\n";
        
        if (!isset($productImages[$categorySlug])) {
            echo "  No specific images for this category, skipping...\n";
            continue;
        }
        
        $images = $productImages[$categorySlug];
        $imageKeys = array_keys($images);
        
        foreach ($category->products as $index => $product) {
            // Get appropriate image for this product
            $imageIndex = $index % count($imageKeys);
            $productKey = $imageKeys[$imageIndex];
            $newImages = $images[$productKey];
            
            $product->update(['images' => $newImages]);
            echo "  Updated: {$product->name_uk} -> {$newImages[0]}\n";
            $updated++;
        }
    }
    
    echo "\nCompleted! Updated {$updated} products with realistic images.\n";
    
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}
