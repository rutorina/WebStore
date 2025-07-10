<?php
echo "🗑️ Clearing all product images...\n";

try {
    $pdo = new PDO('sqlite:database/database.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Clear all images
    $stmt = $pdo->prepare("UPDATE products SET images = NULL");
    $result = $stmt->execute();
    
    $affected = $pdo->query("SELECT changes()")->fetchColumn();
    echo "✅ Cleared images from $affected products\n";
    
    // Try to clear image_url if it exists
    try {
        $stmt = $pdo->prepare("UPDATE products SET image_url = NULL");
        $stmt->execute();
        echo "✅ Cleared image_url column\n";
    } catch (Exception $e) {
        echo "ℹ️ image_url column doesn't exist (that's ok)\n";
    }
    
    echo "🎉 All images cleared successfully!\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>
