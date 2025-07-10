<?php
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
?>