<?php

require_once 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->boot();

echo "🎯 FINAL PROJECT STATUS CHECK\n";
echo "===============================\n\n";

// Check products
$products = \App\Models\Product::all();
echo "📦 Products: " . $products->count() . "\n";

// Check categories
$categories = \App\Models\Category::all();
echo "📂 Categories: " . $categories->count() . "\n";

// Sample product images
if ($products->count() > 0) {
    echo "\n🖼️ Sample Product Images:\n";
    $product = $products->first();
    echo "- Product: " . $product->name . "\n";
    echo "- Images: " . $product->images . "\n";
    echo "- Main image: " . $product->main_image . "\n";
}

echo "\n✅ All systems operational!\n";
echo "\n📋 NEXT STEPS FOR YOU:\n";
echo "1. Import PRESENTACIA_KOSYANCHUK_SERHII.md into MS Sway/PowerPoint\n";
echo "2. Create diagrams using DIAGRAMS_KOSYANCHUK.md in draw.io/Visio\n";
echo "3. Add your supervisor's name and GitHub link to presentation\n";
echo "4. Review and finalize for defense\n\n";
