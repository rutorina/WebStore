<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Services\UniversalProductImageService;
use App\Models\Product;

/**
 * Universal Product Image Search Script
 * Uses multiple APIs and search engines to find exact product images
 */

echo "🌐 Universal Product Image Search\n";
echo "=================================\n\n";

// Create service instance
$imageService = new UniversalProductImageService();

// Get command line arguments
$action = $argv[1] ?? 'help';

switch ($action) {
    case 'all':
        echo "🚀 Updating ALL products using universal image search...\n\n";
        $imageService->updateAllProductImages();
        break;
        
    case 'single':
        $productId = (int)($argv[2] ?? 0);
        if ($productId === 0) {
            echo "❌ Please provide a product ID. Usage: php universal_image_search.php single [product_id]\n";
            exit(1);
        }
        
        $product = Product::find($productId);
        if (!$product) {
            echo "❌ Product with ID {$productId} not found!\n";
            exit(1);
        }
        
        echo "🎯 Searching images for: {$product->name_uk}\n\n";
        $success = $imageService->updateProductImages($product);
        
        if ($success) {
            echo "\n✅ Successfully found and updated product images!\n";
        } else {
            echo "\n❌ Failed to find suitable images.\n";
        }
        break;
        
    case 'test':
        // Test with first product
        echo "🧪 Testing universal search with first product...\n\n";
        $testProduct = Product::first();
        
        if (!$testProduct) {
            echo "❌ No products found in database!\n";
            exit(1);
        }
        
        $success = $imageService->updateProductImages($testProduct);
        
        if ($success) {
            echo "\n✅ Test successful! Found images from multiple sources.\n";
        } else {
            echo "\n❌ Test failed - no suitable images found.\n";
        }
        break;
        
    case 'search':
        // Test search for a specific query
        $query = $argv[2] ?? '';
        if (empty($query)) {
            echo "❌ Please provide a search query. Usage: php universal_image_search.php search \"iPhone 15 Pro\"\n";
            exit(1);
        }
        
        echo "🔍 Testing search for: {$query}\n\n";
        $images = $imageService->searchProductImages($query);
        
        if (!empty($images)) {
            echo "✅ Found " . count($images) . " images:\n";
            foreach ($images as $index => $image) {
                $domain = parse_url($image, PHP_URL_HOST);
                echo "   " . ($index + 1) . ". {$domain} - " . basename($image) . "\n";
            }
        } else {
            echo "❌ No images found for query: {$query}\n";
        }
        break;
        
    case 'verify':
        // Verify current images and their sources
        echo "🔍 Verifying current product images and sources...\n\n";
        
        $products = Product::all();
        $sourceStats = [];
        
        foreach ($products as $product) {
            echo "Product: {$product->name_uk}\n";
            
            $images = $product->images;
            if (is_array($images) && count($images) > 0) {
                echo "  📸 {$product->name_uk}: " . count($images) . " images\n";
                
                foreach (array_slice($images, 0, 3) as $image) {
                    $domain = parse_url($image, PHP_URL_HOST);
                    echo "    • {$domain}\n";
                    
                    if (!isset($sourceStats[$domain])) {
                        $sourceStats[$domain] = 0;
                    }
                    $sourceStats[$domain]++;
                }
            } else {
                echo "  ❌ No images\n";
            }
            echo "\n";
        }
        
        echo "📊 Image Source Statistics:\n";
        arsort($sourceStats);
        foreach ($sourceStats as $domain => $count) {
            echo "  • {$domain}: {$count} images\n";
        }
        break;
        
    case 'compare':
        // Compare old vs new approach
        echo "🔄 Comparing current images with universal search results...\n\n";
        
        $product = Product::first();
        if (!$product) {
            echo "❌ No products found!\n";
            exit(1);
        }
        
        echo "Testing with: {$product->name_uk}\n\n";
        
        // Show current images
        echo "Current images:\n";
        $currentImages = $product->images;
        if (is_array($currentImages)) {
            foreach ($currentImages as $index => $image) {
                $domain = parse_url($image, PHP_URL_HOST);
                echo "  " . ($index + 1) . ". {$domain}\n";
            }
        }
        
        echo "\nSearching for new images...\n";
        $newImages = $imageService->searchProductImages(
            $product->name_uk,
            $product->brand ?? '',
            $product->model ?? ''
        );
        
        echo "\nPotential new images:\n";
        foreach ($newImages as $index => $image) {
            $domain = parse_url($image, PHP_URL_HOST);
            echo "  " . ($index + 1) . ". {$domain}\n";
        }
        
        echo "\n" . (count($newImages) > 0 ? "✅" : "❌") . " Found " . count($newImages) . " potential replacement images\n";
        break;
        
    default:
        echo "📋 Universal Product Image Search - Usage:\n\n";
        echo "Commands:\n";
        echo "  php universal_image_search.php all\n";
        echo "    - Update ALL products using universal search\n\n";
        echo "  php universal_image_search.php single [product_id]\n";
        echo "    - Update a single product by ID\n\n";
        echo "  php universal_image_search.php test\n";
        echo "    - Test universal search with first product\n\n";
        echo "  php universal_image_search.php search \"[query]\"\n";
        echo "    - Test search for a specific product query\n\n";
        echo "  php universal_image_search.php verify\n";
        echo "    - Verify current images and show sources\n\n";
        echo "  php universal_image_search.php compare\n";
        echo "    - Compare current vs potential new images\n\n";
        echo "Examples:\n";
        echo "  php universal_image_search.php test\n";
        echo "  php universal_image_search.php search \"Samsung Galaxy S24 Ultra\"\n";
        echo "  php universal_image_search.php single 1\n";
        echo "  php universal_image_search.php verify\n";
        echo "  php universal_image_search.php all\n\n";
        echo "Image Sources Used:\n";
        echo "  • DuckDuckGo Images (no API key needed)\n";
        echo "  • Bing Images (scraping)\n";
        echo "  • Google Images (scraping)\n";
        echo "  • Amazon product search\n";
        echo "  • eBay product search\n";
        echo "  • AliExpress product search\n";
        break;
}

echo "\n";
