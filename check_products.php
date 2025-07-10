<?php
echo "📦 Checking products in database...\n\n";

try {
    $pdo = new PDO('sqlite:database/database.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Get all products with their details
    $stmt = $pdo->query("
        SELECT 
            p.id,
            p.name_uk,
            p.brand,
            p.model,
            p.price,
            p.description_uk,
            p.images,
            c.name_uk as category_name
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.id
    ");
    
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($products)) {
        echo "❌ No products found!\n";
        exit(1);
    }
    
    echo "📊 Total Products: " . count($products) . "\n\n";
    
    $categories = [];
    
    foreach ($products as $index => $product) {
        $num = $index + 1;
        echo "#{$num}. {$product['name_uk']}\n";
        
        if ($product['brand']) {
            echo "   🏷️  Brand: {$product['brand']}\n";
        }
        
        if ($product['model']) {
            echo "   📱 Model: {$product['model']}\n";
        }
        
        if ($product['price']) {
            echo "   💰 Price: {$product['price']} UAH\n";
        }
        
        if ($product['category_name']) {
            echo "   📂 Category: {$product['category_name']}\n";
            
            if (!isset($categories[$product['category_name']])) {
                $categories[$product['category_name']] = 0;
            }
            $categories[$product['category_name']]++;
        }
        
        // Check images
        $imageCount = 0;
        if ($product['images']) {
            $decoded = json_decode($product['images'], true);
            if (is_array($decoded)) {
                $imageCount = count($decoded);
            }
        }
        echo "   📸 Images: {$imageCount} available\n";
        
        echo "\n";
    }
    
    // Category summary
    if (count($categories) > 0) {
        echo "📋 CATEGORY BREAKDOWN:\n";
        echo "===================\n";
        foreach ($categories as $category => $count) {
            echo "• {$category}: {$count} products\n";
        }
        echo "\n";
    }
    
    // Quick image check
    echo "📸 IMAGE STATUS:\n";
    echo "===============\n";
    $withImages = 0;
    $withoutImages = 0;
    
    foreach ($products as $product) {
        if ($product['images']) {
            $decoded = json_decode($product['images'], true);
            if (is_array($decoded) && count($decoded) > 0) {
                $withImages++;
            } else {
                $withoutImages++;
            }
        } else {
            $withoutImages++;
        }
    }
    
    echo "✅ Products with images: {$withImages}\n";
    echo "❌ Products without images: {$withoutImages}\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>
