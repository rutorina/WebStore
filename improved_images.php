<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Services\ImprovedProductImageService;
use App\Models\Product;

/**
 * Improved Product Image Search - Better Quality Images
 */

echo "📸 Improved Product Image Search\n";
echo "================================\n\n";

$imageService = new ImprovedProductImageService();
$action = $argv[1] ?? 'help';

switch ($action) {
    case 'all':
        echo "🚀 Updating ALL products with improved image search...\n\n";
        $imageService->updateAllProductImages();
        break;
        
    case 'single':
        $productId = (int)($argv[2] ?? 0);
        if ($productId === 0) {
            echo "❌ Please provide a product ID. Usage: php improved_images.php single [product_id]\n";
            exit(1);
        }
        
        $product = Product::find($productId);
        if (!$product) {
            echo "❌ Product with ID {$productId} not found!\n";
            exit(1);
        }
        
        echo "🎯 Improving images for: {$product->name_uk}\n\n";
        $success = $imageService->updateProductImages($product);
        
        echo "\n" . ($success ? "✅ Success!" : "❌ Failed") . "\n";
        break;
        
    case 'test':
        echo "🧪 Testing improved search with first product...\n\n";
        $testProduct = Product::first();
        
        if (!$testProduct) {
            echo "❌ No products found!\n";
            exit(1);
        }
        
        $success = $imageService->updateProductImages($testProduct);
        echo "\n" . ($success ? "✅ Test successful!" : "❌ Test failed") . "\n";
        break;
        
    case 'preview':
        echo "👀 Preview of improved search results...\n\n";
        
        $products = Product::take(3)->get();
        foreach ($products as $product) {
            echo "Product: {$product->name_uk}\n";
            echo "Current images: " . (is_array($product->images) ? count($product->images) : 0) . "\n";
            
            $newImages = $imageService->searchProductImages(
                $product->name_uk,
                $product->brand ?? '',
                $product->model ?? ''
            );
            
            echo "Potential new images: " . count($newImages) . "\n";
            foreach (array_slice($newImages, 0, 2) as $index => $image) {
                $domain = parse_url($image, PHP_URL_HOST);
                echo "  " . ($index + 1) . ". {$domain}\n";
            }
            echo "\n";
        }
        break;
        
    default:
        echo "📋 Improved Product Image Search - Usage:\n\n";
        echo "Commands:\n";
        echo "  php improved_images.php all\n";
        echo "    - Update ALL products with improved search\n\n";
        echo "  php improved_images.php single [product_id]\n";
        echo "    - Update a single product by ID\n\n";
        echo "  php improved_images.php test\n";
        echo "    - Test with first product\n\n";
        echo "  php improved_images.php preview\n";
        echo "    - Preview potential improvements\n\n";
        echo "Features:\n";
        echo "  ✅ Product-specific image mappings\n";
        echo "  ✅ Multiple high-quality sources\n";
        echo "  ✅ Fallback strategies\n";
        echo "  ✅ No API keys required\n";
        echo "  ✅ Improved image quality\n\n";
        echo "Examples:\n";
        echo "  php improved_images.php test\n";
        echo "  php improved_images.php preview\n";
        echo "  php improved_images.php single 1\n";
        break;
}

echo "\n";
