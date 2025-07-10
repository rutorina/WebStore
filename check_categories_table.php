<?php

require_once __DIR__ . '/vendor/autoload.php';

// Database direct query
try {
    $db = new PDO('sqlite:' . __DIR__ . '/database/database.sqlite');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "🔍 Checking categories table structure...\n";
    echo "=========================================\n\n";
    
    // Get table structure
    $stmt = $db->query("PRAGMA table_info(categories)");
    $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "Table structure:\n";
    foreach ($columns as $column) {
        echo "  - {$column['name']} ({$column['type']}) " . 
             ($column['notnull'] ? 'NOT NULL' : 'NULL') . 
             ($column['dflt_value'] !== null ? ' DEFAULT ' . $column['dflt_value'] : '') . "\n";
    }
    
    echo "\nAll categories data:\n";
    $stmt = $db->query("SELECT * FROM categories");
    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($categories as $category) {
        echo "ID: {$category['id']}\n";
        echo "  Name UK: {$category['name_uk']}\n";
        echo "  Name EN: " . ($category['name_en'] ?? 'NULL') . "\n";
        echo "  Slug: {$category['slug']}\n";
        echo "  Active: " . ($category['is_active'] ?? 'NULL') . "\n";
        echo "  Sort Order: " . ($category['sort_order'] ?? 'NULL') . "\n";
        echo "  ---\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
