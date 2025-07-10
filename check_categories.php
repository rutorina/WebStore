<?php
echo "🔍 Checking categories in database...\n\n";

try {
    $pdo = new PDO('sqlite:database/database.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check if categories table exists
    $stmt = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='categories'");
    $tableExists = $stmt->fetch();
    
    if (!$tableExists) {
        echo "❌ Categories table doesn't exist!\n";
        exit(1);
    }
    
    echo "✅ Categories table exists\n\n";
    
    // Get all categories
    $stmt = $pdo->query("SELECT * FROM categories ORDER BY id");
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($categories)) {
        echo "❌ No categories found in database!\n";
        echo "📝 Creating sample categories...\n\n";
        
        // Create sample categories
        $sampleCategories = [
            ['name_uk' => 'Смартфони', 'name_en' => 'Smartphones', 'slug' => 'smartphones'],
            ['name_uk' => 'Ноутбуки', 'name_en' => 'Laptops', 'slug' => 'laptops'],
            ['name_uk' => 'Планшети', 'name_en' => 'Tablets', 'slug' => 'tablets'],
            ['name_uk' => 'Навушники', 'name_en' => 'Headphones', 'slug' => 'headphones'],
            ['name_uk' => 'Годинники', 'name_en' => 'Smartwatches', 'slug' => 'smartwatches']
        ];
        
        $insertStmt = $pdo->prepare("INSERT INTO categories (name_uk, name_en, slug) VALUES (?, ?, ?)");
        
        foreach ($sampleCategories as $category) {
            $insertStmt->execute([$category['name_uk'], $category['name_en'], $category['slug']]);
            echo "✅ Created category: {$category['name_uk']} ({$category['slug']})\n";
        }
        
        echo "\n📊 Categories created successfully!\n\n";
        
        // Fetch categories again
        $stmt = $pdo->query("SELECT * FROM categories ORDER BY id");
        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    echo "📋 CURRENT CATEGORIES:\n";
    echo "====================\n";
    
    foreach ($categories as $category) {
        echo "ID: {$category['id']}\n";
        echo "Name (UK): {$category['name_uk']}\n";
        echo "Name (EN): " . ($category['name_en'] ?? 'N/A') . "\n";
        echo "Slug: " . ($category['slug'] ?? 'N/A') . "\n";
        
        // Count products in this category
        $countStmt = $pdo->prepare("SELECT COUNT(*) as count FROM products WHERE category_id = ?");
        $countStmt->execute([$category['id']]);
        $productCount = $countStmt->fetch(PDO::FETCH_ASSOC)['count'];
        
        echo "Products: {$productCount}\n";
        echo "---\n";
    }
    
    echo "\n📊 Summary: " . count($categories) . " categories found\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>
