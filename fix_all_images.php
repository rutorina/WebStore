<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Product;

echo "🔄 Adding images to all products...\n";

$productImages = [
    'iphone-15-pro' => [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop&crop=center'
    ],
    'samsung-galaxy-s24-ultra' => [
        'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1565849904461-04a58ff64d63?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&h=600&fit=crop&crop=center'
    ],
    'macbook-pro-14-m3' => [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&h=600&fit=crop&crop=center'
    ],
    'asus-rog-strix-g15' => [
        'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=600&h=600&fit=crop&crop=center'
    ],
    'ipad-pro-12-9-m2' => [
        'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=600&fit=crop&crop=center'
    ],
    'airpods-pro-2' => [
        'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&crop=center'
    ],
    'sony-wh-1000xm5' => [
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop&crop=center'
    ],
    'apple-watch-series-9' => [
        'https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1510017098667-27dfc7150acb?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&h=600&fit=crop&crop=center'
    ]
];

$updated = 0;
$total = count($productImages);

foreach ($productImages as $slug => $images) {
    $product = Product::where('slug', $slug)->first();
    
    if ($product) {
        $product->images = $images;
        $product->save();
        
        echo "✅ Updated {$product->name_uk} with " . count($images) . " images\n";
        $updated++;
    } else {
        echo "❌ Product not found: $slug\n";
    }
}

echo "\n🎉 Image update completed!\n";
echo "📊 Updated: $updated / $total products\n";

// Test the first product
$testProduct = Product::where('slug', 'samsung-galaxy-s24-ultra')->first();
if ($testProduct) {
    echo "\n🧪 Test - Samsung Galaxy S24 Ultra:\n";
    echo "   Main image: " . ($testProduct->main_image ?? 'NULL') . "\n";
    echo "   Image count: " . count($testProduct->images ?? []) . "\n";
}
