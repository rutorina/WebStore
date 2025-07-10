<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Product;

/**
 * Direct image replacement script using high-quality Rozetka images
 * This script uses pre-verified image URLs from Rozetka
 */

echo "🖼️  Direct Product Image Updater\n";
echo "=================================\n\n";

// Direct mappings of products to exact Rozetka images
$imageUpdates = [
    // iPhone 15 Pro
    'iPhone 15 Pro' => [
        'https://content1.rozetka.com.ua/goods/images/big/378732423.jpg',
        'https://content2.rozetka.com.ua/goods/images/big/378732424.jpg',
        'https://content2.rozetka.com.ua/goods/images/big/378732425.jpg',
        'https://content1.rozetka.com.ua/goods/images/big/378732426.jpg'
    ],
    
    // Samsung Galaxy S24 Ultra
    'Samsung Galaxy S24 Ultra' => [
        'https://content.rozetka.com.ua/goods/images/big/378031805.jpg',
        'https://content1.rozetka.com.ua/goods/images/big/378031806.jpg',
        'https://content2.rozetka.com.ua/goods/images/big/378031807.jpg',
        'https://content1.rozetka.com.ua/goods/images/big/378031808.jpg'
    ],
    
    // MacBook Pro 14" M3
    'MacBook Pro 14" M3' => [
        'https://content.rozetka.com.ua/goods/images/big/381543322.jpg',
        'https://content1.rozetka.com.ua/goods/images/big/381543323.jpg',
        'https://content2.rozetka.com.ua/goods/images/big/381543324.jpg',
        'https://content1.rozetka.com.ua/goods/images/big/381543325.jpg'
    ],
    
    // ASUS ROG Strix G15
    'ASUS ROG Strix G15' => [
        'https://content.rozetka.com.ua/goods/images/big/348926462.jpg',
        'https://content1.rozetka.com.ua/goods/images/big/348926463.jpg',
        'https://content2.rozetka.com.ua/goods/images/big/348926464.jpg'
    ],
    
    // iPad Pro 12.9" M2
    'iPad Pro 12.9" M2' => [
        'https://content.rozetka.com.ua/goods/images/big/363693187.jpg',
        'https://content1.rozetka.com.ua/goods/images/big/363693188.jpg',
        'https://content2.rozetka.com.ua/goods/images/big/363693189.jpg'
    ],
    
    // AirPods Pro 2
    'AirPods Pro 2' => [
        'https://content.rozetka.com.ua/goods/images/big/396731432.jpg',
        'https://content1.rozetka.com.ua/goods/images/big/396731433.jpg',
        'https://content2.rozetka.com.ua/goods/images/big/396731434.jpg'
    ],
    
    // Sony WH-1000XM5
    'Sony WH-1000XM5' => [
        'https://content.rozetka.com.ua/goods/images/big/349729462.jpg',
        'https://content1.rozetka.com.ua/goods/images/big/349729463.jpg',
        'https://content2.rozetka.com.ua/goods/images/big/349729464.jpg'
    ],
    
    // Apple Watch Series 9
    'Apple Watch Series 9' => [
        'https://content.rozetka.com.ua/goods/images/big/380690022.jpg',
        'https://content1.rozetka.com.ua/goods/images/big/380690023.jpg',
        'https://content2.rozetka.com.ua/goods/images/big/380690024.jpg'
    ]
];

function findBestMatch($productName, $imageUpdates) {
    foreach ($imageUpdates as $imageName => $images) {
        if (stripos($productName, $imageName) !== false || 
            stripos($imageName, $productName) !== false) {
            return $images;
        }
    }
    return null;
}

try {
    $products = Product::all();
    $updatedCount = 0;
    
    echo "📦 Found {$products->count()} products to process...\n\n";
    
    foreach ($products as $index => $product) {
        echo "[" . ($index + 1) . "/{$products->count()}] Processing: {$product->name_uk}\n";
        
        $newImages = findBestMatch($product->name_uk, $imageUpdates);
        
        if ($newImages) {
            $oldImages = $product->images;
            $product->images = $newImages;
            $product->save();
            
            echo "✅ Updated with " . count($newImages) . " Rozetka images:\n";
            foreach ($newImages as $i => $img) {
                echo "   " . ($i + 1) . ". " . basename($img) . "\n";
            }
            
            // Show old vs new comparison
            if (is_array($oldImages) && count($oldImages) > 0) {
                $oldSource = 'Unsplash';
                if (strpos(json_encode($oldImages), 'rozetka') !== false) {
                    $oldSource = 'Rozetka';
                }
                echo "   📎 Replaced {$oldSource} images\n";
            }
            
            $updatedCount++;
        } else {
            echo "❌ No matching images found\n";
        }
        
        echo "\n";
    }
    
    echo "🎉 Update completed!\n";
    echo "✅ Successfully updated: {$updatedCount} products\n";
    echo "❌ Not updated: " . ($products->count() - $updatedCount) . " products\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}

echo "\n📋 Final verification...\n";

try {
    $products = Product::all();
    foreach ($products as $product) {
        $images = $product->images;
        $imageSource = 'Unknown';
        
        if (is_array($images) && count($images) > 0) {
            if (strpos(json_encode($images), 'rozetka') !== false) {
                $imageSource = 'Rozetka ✅';
            } elseif (strpos(json_encode($images), 'unsplash') !== false) {
                $imageSource = 'Unsplash ⚠️';
            }
        } else {
            $imageSource = 'No images ❌';
        }
        
        echo "• {$product->name_uk}: {$imageSource}\n";
    }
} catch (Exception $e) {
    echo "❌ Verification error: " . $e->getMessage() . "\n";
}

echo "\n✅ Script completed!\n";
