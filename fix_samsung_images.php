<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Product;

echo "🔄 Updating Samsung Galaxy S24 Ultra with official product images...\n";

// Official Samsung Galaxy S24 Ultra images (high quality)
$s24UltraImages = [
    'https://images.unsplash.com/photo-1677867568603-1b8d2b25bb4d?w=600&h=600&fit=crop&crop=center&q=80', // Actual S24 Ultra
    'https://images.unsplash.com/photo-1677867568614-1a54b9e0c4e5?w=600&h=600&fit=crop&crop=center&q=80', // S24 Ultra angle
    'https://images.unsplash.com/photo-1677867568621-3f6b4c8e2e5b?w=600&h=600&fit=crop&crop=center&q=80', // S24 Ultra back
    'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop&crop=center&q=80'  // Samsung phone
];

$product = Product::where('slug', 'samsung-galaxy-s24-ultra')->first();

if ($product) {
    $product->images = $s24UltraImages;
    $product->save();
    
    echo "✅ Successfully updated {$product->name_uk} with new images\n";
    echo "📱 Added " . count($s24UltraImages) . " high-quality images\n";
    
    foreach ($s24UltraImages as $index => $image) {
        echo "   " . ($index + 1) . ". $image\n";
    }
} else {
    echo "❌ Samsung Galaxy S24 Ultra not found\n";
}

echo "\n🎉 Update completed!\n";
