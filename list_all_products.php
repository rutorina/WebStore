<?php
require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Product;

echo "📦 PRODUCT INVENTORY LIST\n";
echo "========================\n\n";

try {
    $products = Product::all();
    
    if ($products->count() === 0) {
        echo "❌ No products found in database!\n";
        exit(1);
    }
    
    echo "📊 Total Products: " . $products->count() . "\n\n";
    
    $categories = [];
    
    foreach ($products as $index => $product) {
        $num = $index + 1;
        echo "#{$num}. {$product->name_uk}\n";
        
        if ($product->brand) {
            echo "   Brand: {$product->brand}\n";
        }
        
        if ($product->model) {
            echo "   Model: {$product->model}\n";
        }
        
        if ($product->price) {
            echo "   Price: {$product->price} UAH\n";
        }
        
        if ($product->category) {
            $categoryName = $product->category->name_uk ?? 'Unknown';
            echo "   Category: {$categoryName}\n";
            
            if (!isset($categories[$categoryName])) {
                $categories[$categoryName] = 0;
            }
            $categories[$categoryName]++;
        }
        
        if ($product->description_uk) {
            $shortDesc = mb_substr($product->description_uk, 0, 100) . '...';
            echo "   Description: {$shortDesc}\n";
        }
        
        // Check images
        $imageCount = 0;
        if ($product->images && is_array($product->images)) {
            $imageCount = count($product->images);
        } elseif ($product->images && is_string($product->images)) {
            $decoded = json_decode($product->images, true);
            if (is_array($decoded)) {
                $imageCount = count($decoded);
            }
        }
        echo "   Images: {$imageCount} available\n";
        
        echo "\n";
    }
    
    // Category summary
    if (count($categories) > 0) {
        echo "📋 CATEGORY BREAKDOWN:\n";
        echo "===================\n";
        foreach ($categories as $category => $count) {
            echo "• {$category}: {$count} products\n";
        }
        echo "\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>
