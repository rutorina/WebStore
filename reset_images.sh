#!/bin/bash

echo "🚀 Starting product image reset and update process..."

# Clear all images first
echo "🗑️ Step 1: Clearing all existing images..."
cat > temp_clear.php << 'EOF'
<?php
$pdo = new PDO('sqlite:database/database.sqlite');
$pdo->exec("UPDATE products SET images = NULL");
try { $pdo->exec("ALTER TABLE products ADD COLUMN image_url TEXT"); } catch(Exception $e) {}
$pdo->exec("UPDATE products SET image_url = NULL");
echo "✅ Cleared all images\n";
?>
EOF

php temp_clear.php

# Add multiple images
echo "📸 Step 2: Adding multiple high-quality images..."
cat > temp_update.php << 'EOF'
<?php
$pdo = new PDO('sqlite:database/database.sqlite');

$productImages = [
    'Samsung Galaxy S24 Ultra' => [
        'https://images-na.ssl-images-amazon.com/images/I/71SN6ufIbJL._AC_SL1500_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/71YxnZ4lVVL._AC_SL1500_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/71KQ4QYLrUL._AC_SL1500_.jpg'
    ],
    'iPhone 15 Pro Max' => [
        'https://images-na.ssl-images-amazon.com/images/I/81Os1SDWpcL._AC_SL1500_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/61BGE6iu4AL._AC_SL1500_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/71ZDY57yTQL._AC_SL1500_.jpg'
    ],
    'MacBook Pro' => [
        'https://images-na.ssl-images-amazon.com/images/I/61RJn0ofUsL._AC_SL1500_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/71jG+e7roXL._AC_SL1500_.jpg',
        'https://images-na.ssl-images-amazon.com/images/I/71an85kPOGL._AC_SL1500_.jpg'
    ]
];

$genericImages = [
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop'
];

$stmt = $pdo->query("SELECT id, name_uk FROM products");
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($products as $product) {
    $images = json_encode($genericImages);
    $primaryImage = $genericImages[0];
    
    foreach ($productImages as $productName => $imageList) {
        if (stripos($product['name_uk'], $productName) !== false) {
            $images = json_encode($imageList);
            $primaryImage = $imageList[0];
            break;
        }
    }
    
    $updateStmt = $pdo->prepare("UPDATE products SET images = ?, image_url = ? WHERE id = ?");
    $updateStmt->execute([$images, $primaryImage, $product['id']]);
    echo "Updated: {$product['name_uk']}\n";
}

echo "✅ All products updated with multiple images!\n";
?>
EOF

php temp_update.php

# Clean up
rm -f temp_clear.php temp_update.php

echo "🎉 Process complete! All products now have multiple high-quality images."
echo "📱 Check your website at http://localhost:8080/products"
