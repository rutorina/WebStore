<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Product;

echo "📋 Current Products in Database:\n";
echo "================================\n\n";

try {
    $products = Product::select('id', 'name_uk', 'name_en', 'brand', 'model', 'images')->get();
    
    if ($products->isEmpty()) {
        echo "❌ No products found in database.\n";
        exit(1);
    }
    
    echo "Total products: " . $products->count() . "\n\n";
    
    foreach ($products as $index => $product) {
        echo "Product " . ($index + 1) . ":\n";
        echo "  ID: {$product->id}\n";
        echo "  Name (UK): {$product->name_uk}\n";
        echo "  Name (EN): {$product->name_en}\n";
        echo "  Brand: " . ($product->brand ?: 'N/A') . "\n";
        echo "  Model: " . ($product->model ?: 'N/A') . "\n";
        
        $images = $product->images;
        if (is_array($images) && count($images) > 0) {
            echo "  Images: " . count($images) . " image(s)\n";
            foreach (array_slice($images, 0, 2) as $i => $img) {
                echo "    " . ($i + 1) . ". " . (strlen($img) > 50 ? substr($img, 0, 50) . '...' : $img) . "\n";
            }
            if (count($images) > 2) {
                echo "    ... and " . (count($images) - 2) . " more\n";
            }
        } else {
            echo "  Images: None\n";
        }
        echo "\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}

echo "✅ Product listing completed.\n";
