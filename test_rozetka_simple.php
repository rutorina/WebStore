<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Services\RozetkaImageService;

echo "🧪 Testing Rozetka Image Service...\n";

$rozetkaService = new RozetkaImageService();
$testUrl = 'https://rozetka.com.ua/samsung-galaxy-s24-ultra-256gb-titanium-black/p378031805/';

echo "Testing URL: $testUrl\n";

try {
    $images = $rozetkaService->getProductImages($testUrl);
    
    echo "Found " . count($images) . " images:\n";
    foreach ($images as $index => $image) {
        echo ($index + 1) . ". $image\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}

echo "\nTest completed.\n";
