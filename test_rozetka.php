<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Services\RozetkaImageService;

try {
    echo "Testing Rozetka image scraper...\n";
    
    $rozetkaService = new RozetkaImageService();
    
    // Test with a direct Rozetka URL
    $testUrl = "https://rozetka.com.ua/apple_iphone_15/p338928034/";
    echo "Testing URL: {$testUrl}\n";
    
    $images = $rozetkaService->getProductImages($testUrl);
    
    if (!empty($images)) {
        echo "✅ Found " . count($images) . " images:\n";
        foreach ($images as $index => $image) {
            echo "   " . ($index + 1) . ". {$image}\n";
        }
    } else {
        echo "❌ No images found\n";
    }
    
    // Test search functionality
    echo "\nTesting search for iPhone 15 Pro...\n";
    $searchImages = $rozetkaService->searchProductImages("iPhone 15 Pro", "smartphone");
    
    if (!empty($searchImages)) {
        echo "✅ Found " . count($searchImages) . " images via search:\n";
        foreach ($searchImages as $index => $image) {
            echo "   " . ($index + 1) . ". {$image}\n";
        }
    } else {
        echo "❌ No images found via search\n";
    }
    
} catch (\Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}
