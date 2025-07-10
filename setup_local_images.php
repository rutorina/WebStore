<?php
/**
 * Local Image System Setup
 * Creates folder structure and provides upload functionality
 */

echo "📁 Setting up Local Image System...\n\n";

// Define base directory
$baseDir = 'public/images/products/';

// Create directory structure based on your products
$productStructure = [
    'smartphones' => [
        'iphone-15-pro',
        'samsung-galaxy-s24-ultra'
    ],
    'laptops' => [
        'macbook-pro-14-m3',
        'asus-rog-strix-g15'
    ],
    'tablets' => [
        'ipad-pro-12-9-m2'
    ],
    'headphones' => [
        'airpods-pro-2',
        'sony-wh-1000xm5'
    ],
    'smartwatches' => [
        'apple-watch-series-9'
    ]
];

// Create directories
$createdDirs = 0;
$totalDirs = 0;

foreach ($productStructure as $category => $products) {
    $categoryDir = $baseDir . $category . '/';
    
    // Create category directory
    if (!is_dir($categoryDir)) {
        if (mkdir($categoryDir, 0755, true)) {
            echo "✅ Created category: {$category}/\n";
            $createdDirs++;
        } else {
            echo "❌ Failed to create: {$category}/\n";
        }
    } else {
        echo "ℹ️  Already exists: {$category}/\n";
    }
    $totalDirs++;
    
    // Create product directories
    foreach ($products as $product) {
        $productDir = $categoryDir . $product . '/';
        
        if (!is_dir($productDir)) {
            if (mkdir($productDir, 0755, true)) {
                echo "  ✅ Created product: {$category}/{$product}/\n";
                $createdDirs++;
            } else {
                echo "  ❌ Failed to create: {$category}/{$product}/\n";
            }
        } else {
            echo "  ℹ️  Already exists: {$category}/{$product}/\n";
        }
        $totalDirs++;
        
        // Create placeholder image files info
        $imageFiles = ['main.jpg', 'detail.jpg', 'features.jpg', 'lifestyle.jpg'];
        $readmeContent = "# {$product} Images\n\n";
        $readmeContent .= "Upload your product images here:\n";
        foreach ($imageFiles as $file) {
            $readmeContent .= "- {$file} - " . ucfirst(str_replace('.jpg', '', $file)) . " view\n";
        }
        $readmeContent .= "\nImage requirements:\n";
        $readmeContent .= "- Format: JPG, PNG, WebP\n";
        $readmeContent .= "- Size: 800x600 minimum\n";
        $readmeContent .= "- Quality: High resolution\n";
        
        file_put_contents($productDir . 'README.md', $readmeContent);
    }
}

echo "\n📊 Summary:\n";
echo "Created/Checked: {$totalDirs} directories\n";
echo "New directories: {$createdDirs}\n\n";

// Create image upload helper script
$uploadHelperContent = '<?php
/**
 * Image Upload Helper
 * Simple script to upload images to the correct product folders
 */

function uploadProductImages($productSlug, $files) {
    $baseDir = "public/images/products/";
    $allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    $maxSize = 5 * 1024 * 1024; // 5MB
    
    // Find product directory
    $productDir = null;
    $categories = ["smartphones", "laptops", "tablets", "headphones", "smartwatches"];
    
    foreach ($categories as $category) {
        $testDir = $baseDir . $category . "/" . $productSlug . "/";
        if (is_dir($testDir)) {
            $productDir = $testDir;
            break;
        }
    }
    
    if (!$productDir) {
        return ["error" => "Product directory not found for: " . $productSlug];
    }
    
    $uploadedFiles = [];
    
    foreach ($files as $index => $file) {
        // Validate file
        if (!in_array($file["type"], $allowedTypes)) {
            continue;
        }
        
        if ($file["size"] > $maxSize) {
            continue;
        }
        
        // Generate filename
        $extension = pathinfo($file["name"], PATHINFO_EXTENSION);
        $filename = "image_" . ($index + 1) . "." . $extension;
        $filepath = $productDir . $filename;
        
        // Upload file
        if (move_uploaded_file($file["tmp_name"], $filepath)) {
            $uploadedFiles[] = "/images/products/" . basename(dirname($productDir)) . "/" . basename($productDir) . "/" . $filename;
        }
    }
    
    return $uploadedFiles;
}

// Example usage:
// $uploadedImages = uploadProductImages("iphone-15-pro", $_FILES["images"]);
?>';

file_put_contents($baseDir . 'upload_helper.php', $uploadHelperContent);
echo "✅ Created upload helper script\n";

// Create database update script
$dbUpdateContent = '<?php
/**
 * Update database with local images
 */

function updateProductWithLocalImages($productId, $localImagePaths) {
    try {
        $pdo = new PDO("sqlite:database/database.sqlite");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("UPDATE products SET images = ?, image_url = ? WHERE id = ?");
        $primaryImage = isset($localImagePaths[0]) ? $localImagePaths[0] : null;
        
        return $stmt->execute([
            json_encode($localImagePaths),
            $primaryImage,
            $productId
        ]);
        
    } catch (Exception $e) {
        echo "Error: " . $e->getMessage() . "\n";
        return false;
    }
}

// Example usage:
// $images = ["/images/products/smartphones/iphone-15-pro/main.jpg", "/images/products/smartphones/iphone-15-pro/detail.jpg"];
// updateProductWithLocalImages(1, $images);
?>';

file_put_contents($baseDir . 'database_updater.php', $dbUpdateContent);
echo "✅ Created database updater script\n";

echo "\n🎯 Next Steps:\n";
echo "1. Upload your product images to the respective folders\n";
echo "2. Use the upload_helper.php for easy uploading\n";
echo "3. Update the database with database_updater.php\n";
echo "4. Check the README.md files in each product folder for guidance\n\n";

echo "📁 Directory structure created at: {$baseDir}\n";
echo "🌐 Images will be accessible at: http://localhost:8080/images/products/[category]/[product]/\n";
?>
