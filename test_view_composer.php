<?php

require_once __DIR__ . '/vendor/autoload.php';

// Bootstrap Laravel
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Category;

echo "🔍 Testing View Composer categories...\n";
echo "====================================\n\n";

try {
    // Test the same query that the View Composer uses
    $categories = Category::active()->ordered()->get();
    
    echo "Categories found: " . $categories->count() . "\n\n";
    
    foreach ($categories as $category) {
        echo "- {$category->name_uk} (slug: {$category->slug})\n";
        echo "  Route: " . route('category.show', $category->slug) . "\n";
        echo "  Active: " . ($category->is_active ? 'Yes' : 'No') . "\n";
        echo "  Sort Order: {$category->sort_order}\n";
        echo "  ---\n";
    }
    
    echo "\n✅ View Composer should now provide these categories to all views!\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "   File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}

echo "\n📝 Next steps:\n";
echo "1. Start the Laravel server: php artisan serve\n";
echo "2. Open the website in your browser\n";
echo "3. Check that the Categories dropdown in the navbar is now populated\n";
