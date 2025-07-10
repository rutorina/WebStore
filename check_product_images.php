<?php

try {
    $pdo = new PDO('sqlite:database/database.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "🔍 Checking product images in database...\n";
    echo "========================================\n\n";
    
    // Get a few products to see their image structure
    $stmt = $pdo->query("SELECT id, name_uk, images, image_url FROM products LIMIT 5");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($products as $product) {
        echo "Product: {$product['name_uk']}\n";
        echo "  ID: {$product['id']}\n";
        echo "  image_url: " . ($product['image_url'] ?? 'NULL') . "\n";
        echo "  images: " . ($product['images'] ?? 'NULL') . "\n";
        
        if ($product['images']) {
            $images = json_decode($product['images'], true);
            if (is_array($images)) {
                echo "  Decoded images:\n";
                foreach ($images as $i => $img) {
                    echo "    [{$i}] {$img}\n";
                }
            }
        }
        echo "  ---\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
