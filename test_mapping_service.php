<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "🧪 Testing Product Image Mapping Service\n";
echo "========================================\n\n";

try {
    echo "✅ Laravel initialized successfully\n";
    
    // Test class loading
    echo "🔍 Testing class loading...\n";
    
    if (class_exists('App\Services\ProductImageMappingService')) {
        echo "✅ ProductImageMappingService class found\n";
    } else {
        echo "❌ ProductImageMappingService class not found\n";
        exit(1);
    }
    
    // Test instantiation
    echo "🔧 Testing service instantiation...\n";
    $mappingService = new App\Services\ProductImageMappingService();
    echo "✅ Service instantiated successfully\n";
    
    // Test product loading
    echo "📦 Testing product loading...\n";
    $productCount = App\Models\Product::count();
    echo "✅ Found {$productCount} products\n";
    
    if ($productCount > 0) {
        $firstProduct = App\Models\Product::first();
        echo "🎯 Testing with first product: {$firstProduct->name_uk}\n";
        
        // Test method existence
        if (method_exists($mappingService, 'findProductMapping')) {
            echo "✅ findProductMapping method exists\n";
            
            // Try to call the method
            echo "🔍 Testing mapping search...\n";
            $mapping = $mappingService->findProductMapping($firstProduct);
            
            if ($mapping) {
                echo "✅ Mapping found for {$firstProduct->name_uk}\n";
                echo "   URLs: " . count($mapping['rozetka_urls']) . "\n";
                echo "   Fallback images: " . count($mapping['fallback_images']) . "\n";
            } else {
                echo "❌ No mapping found for {$firstProduct->name_uk}\n";
            }
        } else {
            echo "❌ findProductMapping method not found\n";
        }
    }
    
    echo "\n✅ All tests completed successfully!\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
    echo "Stack trace:\n" . $e->getTraceAsString() . "\n";
}
