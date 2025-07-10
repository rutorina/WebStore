<?php
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
?>