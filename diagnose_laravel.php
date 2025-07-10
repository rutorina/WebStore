<?php

require_once __DIR__ . '/vendor/autoload.php';

// Bootstrap Laravel
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "🔍 Laravel Application Diagnostics\n";
echo "==================================\n\n";

try {
    // Test environment
    echo "Environment: " . app()->environment() . "\n";
    echo "Debug mode: " . (config('app.debug') ? 'ON' : 'OFF') . "\n";
    echo "URL: " . config('app.url') . "\n\n";
    
    // Test database connection
    echo "Database connection: ";
    try {
        $db = app('db');
        $db->connection()->getPdo();
        echo "✅ Connected\n";
    } catch (Exception $e) {
        echo "❌ Failed - " . $e->getMessage() . "\n";
    }
    
    // Test models
    echo "Categories model: ";
    try {
        $categories = App\Models\Category::count();
        echo "✅ {$categories} categories found\n";
    } catch (Exception $e) {
        echo "❌ Failed - " . $e->getMessage() . "\n";
    }
    
    echo "Products model: ";
    try {
        $products = App\Models\Product::count();
        echo "✅ {$products} products found\n";
    } catch (Exception $e) {
        echo "❌ Failed - " . $e->getMessage() . "\n";
    }
    
    // Test routes
    echo "\nRoute testing:\n";
    echo "Home route exists: ";
    try {
        $homeRoute = route('home');
        echo "✅ {$homeRoute}\n";
    } catch (Exception $e) {
        echo "❌ Failed - " . $e->getMessage() . "\n";
    }
    
    echo "Catalog route exists: ";
    try {
        $catalogRoute = route('catalog');
        echo "✅ {$catalogRoute}\n";
    } catch (Exception $e) {
        echo "❌ Failed - " . $e->getMessage() . "\n";
    }
    
    // Test view compilation
    echo "\nView testing:\n";
    echo "Home view exists: ";
    if (view()->exists('home')) {
        echo "✅ Found\n";
    } else {
        echo "❌ Not found\n";
    }
    
    echo "Layout view exists: ";
    if (view()->exists('layouts.app')) {
        echo "✅ Found\n";
    } else {
        echo "❌ Not found\n";
    }
    
} catch (Exception $e) {
    echo "❌ Critical Error: " . $e->getMessage() . "\n";
    echo "   File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}

echo "\n📝 Recommended URLs to test:\n";
echo "- http://localhost:8080/ (main page)\n";
echo "- http://localhost:8080/home (redirect to main page)\n";
echo "- http://localhost:8080/catalog (product catalog)\n";
echo "- http://localhost:8080/api/categories/menu (categories API)\n";
