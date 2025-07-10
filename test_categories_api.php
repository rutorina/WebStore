<?php

require_once __DIR__ . '/vendor/autoload.php';

// Bootstrap Laravel
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Category;

echo "🔍 Testing categories API data...\n";
echo "==================================\n\n";

try {
    // Test the active() scope
    echo "1. Testing active categories:\n";
    $activeCategories = Category::active()->get();
    echo "   Found " . $activeCategories->count() . " active categories\n";
    
    foreach ($activeCategories as $category) {
        echo "   - {$category->name_uk} (active: " . ($category->is_active ? 'Yes' : 'No') . ")\n";
    }
    
    echo "\n2. Testing ordered categories:\n";
    $orderedCategories = Category::active()->ordered()->get();
    echo "   Found " . $orderedCategories->count() . " ordered categories\n";
    
    foreach ($orderedCategories as $category) {
        echo "   - {$category->name_uk} (sort_order: {$category->sort_order})\n";
    }
    
    echo "\n3. Testing API format (select fields):\n";
    $apiCategories = Category::active()
        ->ordered()
        ->select('id', 'name_uk', 'slug')
        ->get();
    
    echo "   JSON output:\n";
    echo "   " . json_encode($apiCategories->toArray(), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "   File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}

echo "\n✅ Test completed!\n";
