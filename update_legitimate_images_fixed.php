<?php
echo "🔄 Updating products with legitimate images...\n\n";

try {
    $pdo = new PDO('sqlite:database/database.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Add image_url column if it doesn't exist
    try {
        $pdo->exec("ALTER TABLE products ADD COLUMN image_url TEXT");
        echo "✅ Added image_url column\n";
    } catch (Exception $e) {
        echo "ℹ️ image_url column already exists\n";
    }
    
    // Clear existing images
    $pdo->exec("UPDATE products SET images = NULL");
    try {
        $pdo->exec("UPDATE products SET image_url = NULL");
    } catch (Exception $e) {
        // Column might not exist, that's ok
    }
    echo "✅ Cleared existing images\n";
    
    // Get all products
    $stmt = $pdo->query("SELECT id, name_uk FROM products");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $updated = 0;
    
    foreach ($products as $product) {
        // Generate consistent, high-quality placeholder images
        $seed = crc32($product['name_uk']);
        $images = [];
        
        for ($i = 0; $i < 4; $i++) {
            $currentSeed = $seed + $i * 100;
            $images[] = "https://picsum.photos/seed/{$currentSeed}/800/600";
        }
        
        // Update the product (with and without image_url column)
        try {
            $updateStmt = $pdo->prepare("UPDATE products SET images = ?, image_url = ? WHERE id = ?");
            $updateStmt->execute([json_encode($images), $images[0], $product['id']]);
        } catch (Exception $e) {
            // Fallback without image_url column
            $updateStmt = $pdo->prepare("UPDATE products SET images = ? WHERE id = ?");
            $updateStmt->execute([json_encode($images), $product['id']]);
        }
        
        echo "✅ Updated: {$product['name_uk']}\n";
        $updated++;
    }
    
    echo "\n🎉 Successfully updated $updated products with legitimate images!\n";
    echo "📋 All images are now using Lorem Picsum (legal, free, high-quality)\n";
    echo "🌐 Visit http://localhost:8080/catalog to see the results\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>
