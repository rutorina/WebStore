<?php
echo "🚀 Adding multiple images to products...\n\n";

try {
    $pdo = new PDO('sqlite:database/database.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Add image_url column if it doesn't exist
    try {
        $pdo->exec("ALTER TABLE products ADD COLUMN image_url TEXT");
        echo "✅ Added image_url column\n";
    } catch (Exception $e) {
        // Column already exists
    }
    
    // Curated multiple images for different products
    $productImages = [
        'Samsung Galaxy S24 Ultra' => [
            'https://images-na.ssl-images-amazon.com/images/I/71SN6ufIbJL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71YxnZ4lVVL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71KQ4QYLrUL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71gGNxKlJiL._AC_SL1500_.jpg'
        ],
        'iPhone 15 Pro Max' => [
            'https://images-na.ssl-images-amazon.com/images/I/81Os1SDWpcL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61BGE6iu4AL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71ZDY57yTQL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71fm-4YkRiL._AC_SL1500_.jpg'
        ],
        'MacBook Pro 16' => [
            'https://images-na.ssl-images-amazon.com/images/I/61RJn0ofUsL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71jG+e7roXL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71an85kPOGL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71WUwGP1ZDL._AC_SL1500_.jpg'
        ],
        'AirPods Pro' => [
            'https://images-na.ssl-images-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71bhWgQa7OL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/613JUXl0npL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71RxOZDKl1L._AC_SL1500_.jpg'
        ],
        'iPad Pro' => [
            'https://images-na.ssl-images-amazon.com/images/I/81Tlwp5zLSL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61NGnpjoRDL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71BU3UfNn4L._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61zK7MtgCjL._AC_SL1500_.jpg'
        ],
        'PlayStation 5' => [
            'https://images-na.ssl-images-amazon.com/images/I/61Wuabu9k2L._AC_SL1000_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71a1gKOLT6L._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61NGP5rOy8L._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61tHyXFgXqL._AC_SL1500_.jpg'
        ]
    ];
    
    // Generic high-quality images for other products
    $genericImages = [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=800&h=600&fit=crop&crop=center'
    ];
    
    // Get all products
    $stmt = $pdo->query("SELECT id, name_uk FROM products");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $updated = 0;
    
    foreach ($products as $product) {
        $images = null;
        $primaryImage = null;
        
        // Try to find specific images for this product
        foreach ($productImages as $productName => $imageList) {
            if (stripos($product['name_uk'], $productName) !== false || 
                stripos($productName, $product['name_uk']) !== false) {
                $images = json_encode($imageList);
                $primaryImage = $imageList[0];
                echo "✅ Found specific images for: {$product['name_uk']}\n";
                break;
            }
        }
        
        // If no specific images found, use generic ones
        if (!$images) {
            $images = json_encode($genericImages);
            $primaryImage = $genericImages[0];
            echo "📸 Using generic images for: {$product['name_uk']}\n";
        }
        
        // Update the product
        $updateStmt = $pdo->prepare("UPDATE products SET images = ?, image_url = ? WHERE id = ?");
        $updateStmt->execute([$images, $primaryImage, $product['id']]);
        $updated++;
    }
    
    echo "\n🎉 Successfully updated $updated products with multiple images!\n";
    
    // Show sample results
    echo "\nSample updated products:\n";
    $stmt = $pdo->query("SELECT id, name_uk, image_url, images FROM products LIMIT 5");
    $samples = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($samples as $sample) {
        echo "\n- {$sample['name_uk']}\n";
        echo "  Primary: " . substr($sample['image_url'], 0, 50) . "...\n";
        $imageArray = json_decode($sample['images'], true);
        echo "  Total images: " . count($imageArray) . "\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>
