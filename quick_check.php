<?php

echo "🔍 Quick Laravel Check\n";
echo "=====================\n\n";

// Check if Laravel can bootstrap
try {
    require_once __DIR__ . '/vendor/autoload.php';
    echo "✅ Autoloader loaded\n";
    
    // Check if .env file exists
    if (file_exists('.env')) {
        echo "✅ .env file exists\n";
    } else {
        echo "❌ .env file missing\n";
        exit(1);
    }
    
    // Check database file
    if (file_exists('database/database.sqlite')) {
        echo "✅ Database file exists\n";
    } else {
        echo "❌ Database file missing\n";
        exit(1);
    }
    
    // Try basic PDO connection
    $pdo = new PDO('sqlite:database/database.sqlite');
    echo "✅ Database connection successful\n";
    
    // Check categories
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM categories WHERE is_active = 1");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "✅ Active categories: {$result['count']}\n";
    
    // Check products
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM products");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "✅ Products: {$result['count']}\n";
    
    echo "\n🚀 APPLICATION STATUS: READY\n\n";
    echo "📝 To start the server:\n";
    echo "   Windows: start_server.bat\n";
    echo "   Linux/Mac: ./start_server.sh\n";
    echo "\n📱 URLs to test:\n";
    echo "   Main: http://localhost:8080/\n";
    echo "   Home: http://localhost:8080/home\n";
    echo "   Catalog: http://localhost:8080/catalog\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
