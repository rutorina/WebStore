<?php
/**
 * Verify Local Image System Setup
 */

echo "🔍 VERIFYING LOCAL IMAGE SYSTEM\n";
echo "==============================\n\n";

$baseDir = 'public/images/products/';
$baseUrl = 'http://localhost:8080/images/products/';

// Check directory structure
$categories = ['smartphones', 'laptops', 'tablets', 'headphones', 'smartwatches'];
$totalImages = 0;
$totalProducts = 0;

foreach ($categories as $category) {
    $categoryDir = $baseDir . $category . '/';
    
    if (!is_dir($categoryDir)) {
        echo "❌ Category missing: {$category}\n";
        continue;
    }
    
    echo "📂 {$category}/\n";
    
    $products = array_diff(scandir($categoryDir), array('.', '..'));
    
    foreach ($products as $product) {
        $productDir = $categoryDir . $product . '/';
        
        if (!is_dir($productDir)) continue;
        
        $images = glob($productDir . '*.{jpg,jpeg,png,webp}', GLOB_BRACE);
        $imageCount = count($images);
        $totalImages += $imageCount;
        $totalProducts++;
        
        echo "  📱 {$product}/ ({$imageCount} images)\n";
        
        foreach ($images as $imagePath) {
            $filename = basename($imagePath);
            $fileSize = filesize($imagePath);
            $fileSizeKB = round($fileSize / 1024, 1);
            
            echo "    📸 {$filename} ({$fileSizeKB} KB)\n";
        }
    }
    echo "\n";
}

echo "📊 SUMMARY:\n";
echo "==========\n";
echo "📂 Categories: " . count($categories) . "\n";
echo "📱 Products: {$totalProducts}\n";
echo "📸 Total Images: {$totalImages}\n\n";

// Check database
echo "🗄️  DATABASE STATUS:\n";
echo "==================\n";

try {
    $pdo = new PDO('sqlite:database/database.sqlite');
    $stmt = $pdo->query("SELECT id, name_uk, images, image_url FROM products");
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $withLocalImages = 0;
    $withRemoteImages = 0;
    $withoutImages = 0;
    
    foreach ($products as $product) {
        $images = json_decode($product['images'], true);
        
        if (is_array($images) && count($images) > 0) {
            $firstImage = $images[0];
            
            if (strpos($firstImage, 'localhost:8080/images/products/') !== false) {
                $withLocalImages++;
                echo "✅ {$product['name_uk']} - Local images (" . count($images) . ")\n";
            } else {
                $withRemoteImages++;
                echo "🌐 {$product['name_uk']} - Remote images (" . count($images) . ")\n";
            }
        } else {
            $withoutImages++;
            echo "❌ {$product['name_uk']} - No images\n";
        }
    }
    
    echo "\n📈 DATABASE SUMMARY:\n";
    echo "✅ Products with local images: {$withLocalImages}\n";
    echo "🌐 Products with remote images: {$withRemoteImages}\n";
    echo "❌ Products without images: {$withoutImages}\n\n";
    
} catch (Exception $e) {
    echo "❌ Database error: " . $e->getMessage() . "\n\n";
}

// Instructions
echo "🎯 NEXT STEPS:\n";
echo "=============\n";
echo "1. 🌐 Visit http://localhost:8080/catalog to see your products\n";
echo "2. 📸 Replace downloaded images with your own high-quality photos\n";
echo "3. 📁 Upload images to: {$baseDir}[category]/[product]/\n";
echo "4. 🔄 Run database update script after adding new images\n\n";

echo "📋 PRODUCT IMAGE URLS:\n";
echo "=====================\n";
foreach ($categories as $category) {
    $categoryDir = $baseDir . $category . '/';
    if (!is_dir($categoryDir)) continue;
    
    $products = array_diff(scandir($categoryDir), array('.', '..'));
    
    foreach ($products as $product) {
        $productDir = $categoryDir . $product . '/';
        if (!is_dir($productDir)) continue;
        
        $images = glob($productDir . '*.{jpg,jpeg,png,webp}', GLOB_BRACE);
        
        if (count($images) > 0) {
            echo "📱 {$product}:\n";
            foreach ($images as $imagePath) {
                $filename = basename($imagePath);
                $url = $baseUrl . $category . '/' . $product . '/' . $filename;
                echo "   {$url}\n";
            }
            echo "\n";
        }
    }
}
?>
