<?php

// Direct test of categories without Laravel bootstrap
try {
    $db = new PDO('sqlite:' . __DIR__ . '/database/database.sqlite');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "🔍 Testing categories API data simulation...\n";
    echo "============================================\n\n";
    
    // Simulate what the CategoryController should return
    $stmt = $db->prepare("SELECT id, name_uk, slug FROM categories WHERE is_active = 1 ORDER BY sort_order, name_uk");
    $stmt->execute();
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "Active categories found: " . count($categories) . "\n\n";
    
    echo "JSON output (what API should return):\n";
    echo json_encode($categories, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . "\n\n";
    
    echo "HTML menu items (what JavaScript should generate):\n";
    foreach ($categories as $category) {
        echo "<li><a class=\"dropdown-item\" href=\"/category/{$category['slug']}\">{$category['name_uk']}</a></li>\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}

echo "\n✅ Test completed!\n";
