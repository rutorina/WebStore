<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Services\EnhancedRozetkaImageService;
use App\Models\Product;

/**
 * Enhanced script to fix all product images with exact matches from Rozetka
 * This script searches for each product on Rozetka and updates with real product images
 */

echo "🎯 Enhanced Product Image Fixer\n";
echo "===============================\n\n";

// Create service instance
$imageService = new EnhancedRozetkaImageService();

// Get command line arguments
$action = $argv[1] ?? 'help';

switch ($action) {
    case 'all':
        echo "🚀 Updating ALL products with Rozetka images...\n\n";
        $batchSize = (int)($argv[2] ?? 5); // Default batch size of 5
        $delay = (int)($argv[3] ?? 3); // Default 3 second delay
        
        echo "Settings:\n";
        echo "- Batch size: {$batchSize}\n";
        echo "- Delay between requests: {$delay} seconds\n\n";
        
        $imageService->updateAllProductImages($batchSize, $delay);
        break;
        
    case 'single':
        $productId = (int)($argv[2] ?? 0);
        if ($productId === 0) {
            echo "❌ Please provide a product ID. Usage: php fix_exact_images.php single [product_id]\n";
            exit(1);
        }
        
        $product = Product::find($productId);
        if (!$product) {
            echo "❌ Product with ID {$productId} not found!\n";
            exit(1);
        }
        
        echo "🎯 Updating single product: {$product->name_uk}\n\n";
        $success = $imageService->updateProductImages($product);
        
        if ($success) {
            echo "\n✅ Successfully updated product images!\n";
        } else {
            echo "\n❌ Failed to update product images.\n";
        }
        break;
        
    case 'test':
        // Test with first 3 products
        echo "🧪 Testing with first 3 products...\n\n";
        $testProducts = Product::take(3)->get();
        
        $successCount = 0;
        foreach ($testProducts as $index => $product) {
            echo "\n--- Test " . ($index + 1) . " ---\n";
            if ($imageService->updateProductImages($product)) {
                $successCount++;
            }
            sleep(2); // Small delay between tests
        }
        
        echo "\n🎉 Test completed! Successfully updated {$successCount} out of 3 products.\n";
        break;
        
    case 'brand':
        $brand = $argv[2] ?? '';
        if (empty($brand)) {
            echo "❌ Please provide a brand name. Usage: php fix_exact_images.php brand [brand_name]\n";
            exit(1);
        }
        
        $products = Product::where('brand', 'ILIKE', "%{$brand}%")->get();
        if ($products->isEmpty()) {
            echo "❌ No products found for brand: {$brand}\n";
            exit(1);
        }
        
        echo "🎯 Updating {$products->count()} products for brand: {$brand}\n\n";
        
        $successCount = 0;
        foreach ($products as $index => $product) {
            echo "\n[" . ($index + 1) . "/{$products->count()}] ";
            if ($imageService->updateProductImages($product)) {
                $successCount++;
            }
            sleep(2);
        }
        
        echo "\n🎉 Completed! Updated {$successCount} out of {$products->count()} products.\n";
        break;
        
    case 'list':
        // List products without images or with placeholder images
        echo "📋 Products that need image updates:\n\n";
        
        $productsNeedingImages = Product::where(function($query) {
            $query->whereNull('images')
                  ->orWhere('images', '[]')
                  ->orWhere('images', 'like', '%placeholder%')
                  ->orWhere('images', 'like', '%example%');
        })->select('id', 'name_uk', 'brand', 'model', 'images')->get();
        
        if ($productsNeedingImages->isEmpty()) {
            echo "✅ All products have images!\n";
        } else {
            foreach ($productsNeedingImages as $product) {
                echo "ID: {$product->id} - {$product->name_uk}";
                if ($product->brand) echo " ({$product->brand})";
                if ($product->model) echo " - {$product->model}";
                echo "\n";
            }
            echo "\nTotal: {$productsNeedingImages->count()} products need image updates.\n";
        }
        break;
        
    case 'stats':
        // Show statistics about current images
        $total = Product::count();
        $withImages = Product::whereNotNull('images')
                            ->where('images', '!=', '[]')
                            ->where('images', 'not like', '%placeholder%')
                            ->count();
        $withoutImages = $total - $withImages;
        
        echo "📊 Image Statistics:\n";
        echo "===================\n";
        echo "Total products: {$total}\n";
        echo "With images: {$withImages}\n";
        echo "Without images: {$withoutImages}\n";
        echo "Completion rate: " . round(($withImages / $total) * 100, 1) . "%\n";
        break;
        
    default:
        echo "📋 Enhanced Product Image Fixer - Usage:\n\n";
        echo "Commands:\n";
        echo "  php fix_exact_images.php all [batch_size] [delay_seconds]\n";
        echo "    - Update ALL products (default: batch=5, delay=3s)\n\n";
        echo "  php fix_exact_images.php single [product_id]\n";
        echo "    - Update a single product by ID\n\n";
        echo "  php fix_exact_images.php test\n";
        echo "    - Test with first 3 products\n\n";
        echo "  php fix_exact_images.php brand [brand_name]\n";
        echo "    - Update all products from a specific brand\n\n";
        echo "  php fix_exact_images.php list\n";
        echo "    - List products that need image updates\n\n";
        echo "  php fix_exact_images.php stats\n";
        echo "    - Show image statistics\n\n";
        echo "Examples:\n";
        echo "  php fix_exact_images.php test\n";
        echo "  php fix_exact_images.php single 1\n";
        echo "  php fix_exact_images.php brand Samsung\n";
        echo "  php fix_exact_images.php all 3 5\n";
        break;
}

echo "\n";
