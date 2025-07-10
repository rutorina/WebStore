<?php
/**
 * Local Image Management System
 * Best practice: Use your own product images
 */

class LocalImageService
{
    private $imageDirectory = 'public/images/products/';
    private $baseUrl = 'http://localhost:8080/images/products/';
    
    /**
     * Upload and organize product images
     */
    public function uploadProductImages(string $productName, array $imageFiles): array
    {
        $productSlug = $this->createSlug($productName);
        $productDir = $this->imageDirectory . $productSlug . '/';
        
        // Create directory if it doesn't exist
        if (!is_dir($productDir)) {
            mkdir($productDir, 0755, true);
        }
        
        $uploadedImages = [];
        
        foreach ($imageFiles as $index => $imageFile) {
            $extension = pathinfo($imageFile['name'], PATHINFO_EXTENSION);
            $filename = $productSlug . '_' . ($index + 1) . '.' . $extension;
            $filepath = $productDir . $filename;
            
            if (move_uploaded_file($imageFile['tmp_name'], $filepath)) {
                $uploadedImages[] = $this->baseUrl . $productSlug . '/' . $filename;
            }
        }
        
        return $uploadedImages;
    }
    
    /**
     * Generate placeholder images for development
     */
    public function generatePlaceholderImages(string $productName, int $count = 3): array
    {
        $images = [];
        $seed = crc32($productName);
        
        for ($i = 0; $i < $count; $i++) {
            $width = 800;
            $height = 600;
            $currentSeed = $seed + $i * 100;
            
            // Using Lorem Picsum for consistent placeholder images
            $images[] = "https://picsum.photos/seed/{$currentSeed}/{$width}/{$height}";
        }
        
        return $images;
    }
    
    private function createSlug(string $text): string
    {
        return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $text)));
    }
}

// Update your products with legitimate images
$imageService = new LocalImageService();

// Example usage
$products = [
    'Samsung Galaxy S24 Ultra',
    'iPhone 15 Pro Max',
    'MacBook Pro 16',
    'ASUS ROG Strix G15'
];

foreach ($products as $product) {
    $images = $imageService->generatePlaceholderImages($product, 4);
    echo "Product: $product\n";
    foreach ($images as $index => $image) {
        echo "  " . ($index + 1) . ". $image\n";
    }
    echo "\n";
}
?>
