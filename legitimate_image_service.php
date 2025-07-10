<?php
/**
 * Legitimate Product Image API Service
 * Uses legal, free, and reliable image sources
 */

class LegitimateImageService
{
    private $unsplashAccessKey = 'YOUR_UNSPLASH_ACCESS_KEY'; // Get from https://unsplash.com/developers
    private $pexelsApiKey = 'YOUR_PEXELS_API_KEY'; // Get from https://www.pexels.com/api/
    private $pixabayApiKey = 'YOUR_PIXABAY_API_KEY'; // Get from https://pixabay.com/api/docs/
    
    /**
     * Get product images from multiple legitimate sources
     */
    public function getProductImages(string $productName, string $brand = '', string $category = ''): array
    {
        $searchTerm = trim($brand . ' ' . $productName . ' ' . $category);
        $images = [];
        
        // Try multiple sources
        $images = array_merge($images, $this->getUnsplashImages($searchTerm, 2));
        $images = array_merge($images, $this->getPexelsImages($searchTerm, 2));
        $images = array_merge($images, $this->getPixabayImages($searchTerm, 2));
        
        // Remove duplicates and limit to 4 images
        $images = array_unique($images);
        return array_slice($images, 0, 4);
    }
    
    /**
     * Unsplash API - High quality, free photos
     */
    private function getUnsplashImages(string $query, int $count = 2): array
    {
        if (empty($this->unsplashAccessKey) || $this->unsplashAccessKey === 'YOUR_UNSPLASH_ACCESS_KEY') {
            return $this->getUnsplashFallback($query, $count);
        }
        
        $url = "https://api.unsplash.com/search/photos?" . http_build_query([
            'query' => $query,
            'per_page' => $count,
            'orientation' => 'landscape'
        ]);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Client-ID ' . $this->unsplashAccessKey
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            $data = json_decode($response, true);
            $images = [];
            foreach ($data['results'] as $photo) {
                $images[] = $photo['urls']['regular'];
            }
            return $images;
        }
        
        return $this->getUnsplashFallback($query, $count);
    }
    
    /**
     * Pexels API - Free stock photos
     */
    private function getPexelsImages(string $query, int $count = 2): array
    {
        if (empty($this->pexelsApiKey) || $this->pexelsApiKey === 'YOUR_PEXELS_API_KEY') {
            return [];
        }
        
        $url = "https://api.pexels.com/v1/search?" . http_build_query([
            'query' => $query,
            'per_page' => $count,
            'orientation' => 'landscape'
        ]);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: ' . $this->pexelsApiKey
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            $data = json_decode($response, true);
            $images = [];
            foreach ($data['photos'] as $photo) {
                $images[] = $photo['src']['large'];
            }
            return $images;
        }
        
        return [];
    }
    
    /**
     * Pixabay API - Free images
     */
    private function getPixabayImages(string $query, int $count = 2): array
    {
        if (empty($this->pixabayApiKey) || $this->pixabayApiKey === 'YOUR_PIXABAY_API_KEY') {
            return [];
        }
        
        $url = "https://pixabay.com/api/?" . http_build_query([
            'key' => $this->pixabayApiKey,
            'q' => $query,
            'image_type' => 'photo',
            'min_width' => 640,
            'min_height' => 480,
            'per_page' => $count,
            'safesearch' => 'true'
        ]);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode === 200) {
            $data = json_decode($response, true);
            $images = [];
            foreach ($data['hits'] as $hit) {
                $images[] = $hit['webformatURL'];
            }
            return $images;
        }
        
        return [];
    }
    
    /**
     * Fallback Unsplash images (direct URLs without API)
     */
    private function getUnsplashFallback(string $query, int $count = 2): array
    {
        $images = [];
        $seed = crc32($query); // Consistent seed for same query
        
        for ($i = 0; $i < $count; $i++) {
            $width = 800;
            $height = 600;
            $seed += $i * 100;
            
            $images[] = "https://picsum.photos/seed/{$seed}/{$width}/{$height}";
        }
        
        return $images;
    }
    
    /**
     * Get curated product images for specific items
     */
    public function getCuratedImages(string $productName): array
    {
        $curatedImages = [
            // Tech products with legitimate free images
            'smartphone' => [
                'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=800&h=600&fit=crop'
            ],
            'laptop' => [
                'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop'
            ],
            'headphones' => [
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=800&h=600&fit=crop'
            ],
            'tablet' => [
                'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?w=800&h=600&fit=crop'
            ],
            'watch' => [
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=600&fit=crop'
            ]
        ];
        
        foreach ($curatedImages as $category => $images) {
            if (stripos($productName, $category) !== false) {
                return $images;
            }
        }
        
        return [];
    }
    
    /**
     * Main method to get legitimate product images
     */
    public function getImagesForProduct(string $productName, string $brand = '', string $category = ''): array
    {
        // First try curated images
        $images = $this->getCuratedImages($productName);
        
        // If no curated images, try APIs
        if (empty($images)) {
            $images = $this->getProductImages($productName, $brand, $category);
        }
        
        // If still no images, use fallback
        if (empty($images)) {
            $images = $this->getUnsplashFallback($productName, 3);
        }
        
        return $images;
    }
}

// Usage example:
try {
    $imageService = new LegitimateImageService();
    
    // Test with a product
    $images = $imageService->getImagesForProduct('Samsung Galaxy smartphone', 'Samsung', 'smartphones');
    
    echo "Found " . count($images) . " images:\n";
    foreach ($images as $index => $image) {
        echo ($index + 1) . ". $image\n";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
