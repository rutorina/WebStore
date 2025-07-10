<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Services\ProductImageMappingService;
use App\Models\Product;

/**
 * Script to fix product images using pre-mapped Rozetka URLs
 * This approach uses known working URLs and fallback images
 */

echo "🎯 Product Image Mapping Fixer\n";
echo "==============================\n\n";

// Create service instance
$mappingService = new ProductImageMappingService();

// Get command line arguments
$action = $argv[1] ?? 'help';

switch ($action) {
    case 'all':
        echo "🚀 Updating ALL products using mapping service...\n\n";
        $mappingService->updateAllProducts();
        break;
        
    case 'single':
        $productId = (int)($argv[2] ?? 0);
        if ($productId === 0) {
            echo "❌ Please provide a product ID. Usage: php fix_mapped_images.php single [product_id]\n";
            exit(1);
        }
        
        $product = Product::find($productId);
        if (!$product) {
            echo "❌ Product with ID {$productId} not found!\n";
            exit(1);
        }
        
        echo "🎯 Updating single product: {$product->name_uk}\n\n";
        $success = $mappingService->updateProductImages($product);
        
        if ($success) {
            echo "\n✅ Successfully updated product images!\n";
        } else {
            echo "\n❌ Failed to update product images.\n";
        }
        break;
        
    case 'test':
        // Test with first product
        echo "🧪 Testing with first product...\n\n";
        $testProduct = Product::first();
        
        if (!$testProduct) {
            echo "❌ No products found in database!\n";
            exit(1);
        }
        
        $success = $mappingService->updateProductImages($testProduct);
        
        if ($success) {
            echo "\n✅ Test successful!\n";
        } else {
            echo "\n❌ Test failed.\n";
        }
        break;
        
    case 'preview':
        // Preview what products will be updated
        echo "📋 Preview of product mappings:\n\n";
        
        try {
            $products = Product::all();
            $mappableCount = 0;
            
            foreach ($products as $product) {
                // Use reflection to check if method exists
                if (method_exists($mappingService, 'findProductMapping')) {
                    $mapping = $mappingService->findProductMapping($product);
                } else {
                    echo "❌ Method findProductMapping not found!\n";
                    break;
                }
                
                echo "Product: {$product->name_uk}";
                if ($product->brand) echo " ({$product->brand})";
                echo "\n";
                
                if ($mapping) {
                    echo "  ✅ Mapping found\n";
                    echo "  🌐 URLs: " . count($mapping['rozetka_urls']) . "\n";
                    echo "  📦 Fallback images: " . count($mapping['fallback_images']) . "\n";
                    $mappableCount++;
                } else {
                    echo "  ❌ No mapping available\n";
                }
                echo "\n";
            }
            
            echo "Summary: {$mappableCount} out of {$products->count()} products have mappings.\n";
        } catch (Exception $e) {
            echo "❌ Error during preview: " . $e->getMessage() . "\n";
            echo "Stack trace: " . $e->getTraceAsString() . "\n";
        }
        break;
        
    case 'verify':
        // Verify current images
        echo "🔍 Verifying current product images...\n\n";
        
        $products = Product::all();
        $goodImages = 0;
        $badImages = 0;
        
        foreach ($products as $product) {
            echo "Product: {$product->name_uk}\n";
            
            $images = $product->images;
            if (is_array($images) && count($images) > 0) {
                $validCount = 0;
                foreach ($images as $image) {
                    if (filter_var($image, FILTER_VALIDATE_URL)) {
                        $validCount++;
                    }
                }
                
                if (strpos(json_encode($images), 'unsplash') !== false) {
                    echo "  📸 {$validCount} images (Generic Unsplash)\n";
                    $badImages++;
                } elseif (strpos(json_encode($images), 'rozetka') !== false) {
                    echo "  ✅ {$validCount} images (Rozetka)\n";
                    $goodImages++;
                } else {
                    echo "  📸 {$validCount} images (Other source)\n";
                }
            } else {
                echo "  ❌ No images\n";
                $badImages++;
            }
        }
        
        echo "\nSummary:\n";
        echo "✅ Products with good images: {$goodImages}\n";
        echo "❌ Products needing better images: {$badImages}\n";
        break;
        
    default:
        echo "📋 Product Image Mapping Fixer - Usage:\n\n";
        echo "Commands:\n";
        echo "  php fix_mapped_images.php all\n";
        echo "    - Update ALL products using mapping service\n\n";
        echo "  php fix_mapped_images.php single [product_id]\n";
        echo "    - Update a single product by ID\n\n";
        echo "  php fix_mapped_images.php test\n";
        echo "    - Test with first product\n\n";
        echo "  php fix_mapped_images.php preview\n";
        echo "    - Preview which products have mappings\n\n";
        echo "  php fix_mapped_images.php verify\n";
        echo "    - Verify current image sources\n\n";
        echo "Examples:\n";
        echo "  php fix_mapped_images.php test\n";
        echo "  php fix_mapped_images.php preview\n";
        echo "  php fix_mapped_images.php single 1\n";
        echo "  php fix_mapped_images.php all\n";
        break;
}

echo "\n";
