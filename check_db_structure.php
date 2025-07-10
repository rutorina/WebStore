<?php
// Simple database structure check
try {
    $dbPath = 'database/database.sqlite';
    $pdo = new PDO("sqlite:$dbPath");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "Checking products table structure...\n";
    
    $stmt = $pdo->query("PRAGMA table_info(products)");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "Columns in products table:\n";
    $hasImageUrl = false;
    foreach ($columns as $column) {
        echo "- {$column['name']} ({$column['type']})\n";
        if ($column['name'] === 'image_url') {
            $hasImageUrl = true;
        }
    }
    
    if (!$hasImageUrl) {
        echo "\n❌ image_url column doesn't exist. Adding it...\n";
        $pdo->exec("ALTER TABLE products ADD COLUMN image_url TEXT");
        echo "✅ Added image_url column\n";
    } else {
        echo "\n✅ image_url column exists\n";
    }
    
    // Check current data
    echo "\nChecking current product data (first 3 products):\n";
    $stmt = $pdo->query("SELECT id, name_uk, image_url, images FROM products LIMIT 3");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($products as $product) {
        echo "\nProduct ID {$product['id']}: {$product['name_uk']}\n";
        echo "  image_url: " . ($product['image_url'] ?? 'null') . "\n";
        echo "  images: " . ($product['images'] ?? 'null') . "\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
