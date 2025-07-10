<?php

require_once 'vendor/autoload.php';

// Initialize Laravel
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Services\RozetkaImageService;
use App\Models\Product;

/**
 * Script to update products with real Rozetka images using specific product URLs
 */

$rozetkaService = new RozetkaImageService();

// Real Rozetka URLs for specific products
$productUpdates = [
    'samsung-galaxy-s24-ultra' => 'https://rozetka.com.ua/samsung-galaxy-s24-ultra-256gb-titanium-black/p378031805/',
    'iphone-15-pro' => 'https://rozetka.com.ua/apple-iphone-15-pro-128gb-natural-titanium/p378732423/',
    'macbook-pro-14-m3' => 'https://rozetka.com.ua/apple-macbook-pro-14-m3-8-512gb-space-gray/p381543322/',
    'ipad-pro-12-9-m2' => 'https://rozetka.com.ua/apple-ipad-pro-12-9-m2-wifi-128gb-space-gray/p363693187/',
    'airpods-pro-2' => 'https://rozetka.com.ua/apple-airpods-pro-2nd-generation-magsafe-case-usb-c/p396731432/',
    'apple-watch-series-9' => 'https://rozetka.com.ua/apple-watch-series-9-gps-45mm-midnight-aluminum-case-with-midnight-sport-band-s-m/p380690022/'
];

echo "🔄 Updating products with real Rozetka images...\n";

foreach ($productUpdates as $slug => $rozetkaUrl) {
    echo "\n📱 Processing: $slug\n";
    echo "🌐 Rozetka URL: $rozetkaUrl\n";
    
    try {
        $images = $rozetkaService->getProductImages($rozetkaUrl);
        
        if (count($images) > 0) {
            $product = Product::where('slug', $slug)->first();
            
            if ($product) {
                $product->images = $images;
                $product->save();
                
                echo "✅ Updated {$product->name_uk} with " . count($images) . " images\n";
                
                // Show first few image URLs
                foreach (array_slice($images, 0, 3) as $index => $image) {
                    echo "   " . ($index + 1) . ". $image\n";
                }
                if (count($images) > 3) {
                    echo "   ... and " . (count($images) - 3) . " more\n";
                }
            } else {
                echo "❌ Product not found: $slug\n";
            }
        } else {
            echo "⚠️  No images found for $slug\n";
        }
        
        // Small delay to be respectful to Rozetka
        sleep(2);
        
    } catch (Exception $e) {
        echo "❌ Error processing $slug: " . $e->getMessage() . "\n";
    }
}

echo "\n🎉 Rozetka image update completed!\n";
