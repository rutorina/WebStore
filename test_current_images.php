<?php
echo "Starting image check script...\n";

try {
    $dbPath = 'database/database.sqlite';
    echo "Database path: $dbPath\n";
    
    if (!file_exists($dbPath)) {
        echo "Database file does not exist at: $dbPath\n";
        exit(1);
    }
    
    $pdo = new PDO("sqlite:$dbPath");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "Connected to database successfully!\n\n";
    
    // Get sample products with their current images
    $stmt = $pdo->query('SELECT id, name_uk, image_url FROM products LIMIT 5');
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "Found " . count($products) . " products\n";
    echo "Current product images:\n";
    echo "======================\n";
    
    foreach ($products as $product) {
        echo "ID: {$product['id']}\n";
        echo "Name: {$product['name_uk']}\n";
        echo "Image URL: {$product['image_url']}\n";
        
        // Test if image URL is accessible
        if (!empty($product['image_url'])) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $product['image_url']);
            curl_setopt($ch, CURLOPT_NOBODY, true);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            
            echo "Image Status: HTTP $httpCode\n";
        } else {
            echo "Image Status: No image URL\n";
        }
        echo "---\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
