<?php
require_once 'vendor/autoload.php';

use App\Models\Product;
use Illuminate\Support\Facades\Http;

class MultiImageUpdater
{
    private $unsplashApiKey = 'your_unsplash_key'; // You can get this from unsplash.com/developers
    private $pixabayApiKey = 'your_pixabay_key';   // You can get this from pixabay.com/api/docs/
    
    // Curated high-quality product images
    private $curatedImages = [
        // Smartphones
        'samsung galaxy s24 ultra' => [
            'https://images-na.ssl-images-amazon.com/images/I/71SN6ufIbJL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71YxnZ4lVVL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71KQ4QYLrUL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71gGNxKlJiL._AC_SL1500_.jpg'
        ],
        'iphone 15 pro max' => [
            'https://images-na.ssl-images-amazon.com/images/I/81Os1SDWpcL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61BGE6iu4AL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71ZDY57yTQL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71fm-4YkRiL._AC_SL1500_.jpg'
        ],
        'google pixel 8 pro' => [
            'https://images-na.ssl-images-amazon.com/images/I/71FuI8YvCNL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71ULU-gzokL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71bBkK2HSWL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71qOKnKK3QL._AC_SL1500_.jpg'
        ],
        'oneplus 12' => [
            'https://images-na.ssl-images-amazon.com/images/I/61Qe0euJJeL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71KjwZzSiQL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71bMtHC-vGL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71TGkGP+UEL._AC_SL1500_.jpg'
        ],
        
        // Laptops
        'macbook pro 16' => [
            'https://images-na.ssl-images-amazon.com/images/I/61RJn0ofUsL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71jG+e7roXL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71an85kPOGL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71WUwGP1ZDL._AC_SL1500_.jpg'
        ],
        'dell xps 13' => [
            'https://images-na.ssl-images-amazon.com/images/I/81QZW6hzV5L._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71s3hWu0EXL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71VgtEF1L2L._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71QF2VKdX6L._AC_SL1500_.jpg'
        ],
        'lenovo thinkpad x1' => [
            'https://images-na.ssl-images-amazon.com/images/I/71Z5VNz8UeL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71r8eDY1MhL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/81J9YbEO2EL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71Jvj5lNAoL._AC_SL1500_.jpg'
        ],
        'hp pavilion' => [
            'https://images-na.ssl-images-amazon.com/images/I/71uFKZAOGUL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71aqWKN1ZgL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71Pv-xT3QmL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71J4rKtRjUL._AC_SL1500_.jpg'
        ],
        
        // Tablets
        'ipad pro' => [
            'https://images-na.ssl-images-amazon.com/images/I/81Tlwp5zLSL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61NGnpjoRDL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71BU3UfNn4L._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61zK7MtgCjL._AC_SL1500_.jpg'
        ],
        'samsung galaxy tab s9' => [
            'https://images-na.ssl-images-amazon.com/images/I/61qQX7HhAAL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71nXGxhMLwL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71PZUzS9rWL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71dQNWHCIBL._AC_SL1500_.jpg'
        ],
        
        // Headphones
        'airpods pro' => [
            'https://images-na.ssl-images-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71bhWgQa7OL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/613JUXl0npL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71RxOZDKl1L._AC_SL1500_.jpg'
        ],
        'sony wh-1000xm5' => [
            'https://images-na.ssl-images-amazon.com/images/I/61eNZDYi5AL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71OosGDVEaL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61wFoP4fF8L._AC_SL1500_.jpg'
        ],
        'bose quietcomfort' => [
            'https://images-na.ssl-images-amazon.com/images/I/71wF7YDIQkL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61hg4QZ7nYL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71Z7RKrPTyL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71HNlwrMbuL._AC_SL1500_.jpg'
        ],
        
        // Smartwatches
        'apple watch series 9' => [
            'https://images-na.ssl-images-amazon.com/images/I/71a1uEwgQfL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71sMYlTRqML._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71HKgdKO8hL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61QCBNOIsyL._AC_SL1500_.jpg'
        ],
        'samsung galaxy watch 6' => [
            'https://images-na.ssl-images-amazon.com/images/I/61Qm6tR4F9L._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71z8L8a8lVL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71VnDjU8BKL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71pFT6hT7lL._AC_SL1500_.jpg'
        ],
        
        // Gaming
        'playstation 5' => [
            'https://images-na.ssl-images-amazon.com/images/I/61Wuabu9k2L._AC_SL1000_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71a1gKOLT6L._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61NGP5rOy8L._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61tHyXFgXqL._AC_SL1500_.jpg'
        ],
        'xbox series x' => [
            'https://images-na.ssl-images-amazon.com/images/I/71pEd3dhxpL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71NjR9KzJgL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61ZQFIOxH9L._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/71BQk2qlC6L._AC_SL1500_.jpg'
        ],
        'nintendo switch' => [
            'https://images-na.ssl-images-amazon.com/images/I/61xXfkA3EILL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61ZSJl-7bhL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61xyOPT38kL._AC_SL1500_.jpg',
            'https://images-na.ssl-images-amazon.com/images/I/61k9ZQy1TCL._AC_SL1500_.jpg'
        ]
    ];

    public function searchUnsplashImages(string $query, int $count = 4): array
    {
        if (empty($this->unsplashApiKey) || $this->unsplashApiKey === 'your_unsplash_key') {
            return [];
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Client-ID ' . $this->unsplashApiKey
            ])->get('https://api.unsplash.com/search/photos', [
                'query' => $query,
                'per_page' => $count,
                'order_by' => 'relevant'
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $images = [];
                foreach ($data['results'] as $photo) {
                    $images[] = $photo['urls']['regular'];
                }
                return $images;
            }
        } catch (\Exception $e) {
            echo "Error fetching from Unsplash: " . $e->getMessage() . "\n";
        }

        return [];
    }

    public function searchPixabayImages(string $query, int $count = 4): array
    {
        if (empty($this->pixabayApiKey) || $this->pixabayApiKey === 'your_pixabay_key') {
            return [];
        }

        try {
            $response = Http::get('https://pixabay.com/api/', [
                'key' => $this->pixabayApiKey,
                'q' => $query,
                'image_type' => 'photo',
                'min_width' => 1920,
                'min_height' => 1080,
                'per_page' => $count,
                'safesearch' => 'true'
            ]);

            if ($response->successful()) {
                $data = $response->json();
                $images = [];
                foreach ($data['hits'] as $hit) {
                    $images[] = $hit['webformatURL'];
                }
                return $images;
            }
        } catch (\Exception $e) {
            echo "Error fetching from Pixabay: " . $e->getMessage() . "\n";
        }

        return [];
    }

    public function getMultipleImages(string $productName, string $brand = '', string $model = ''): array
    {
        $searchTerm = strtolower(trim($brand . ' ' . $model . ' ' . $productName));
        $images = [];

        echo "🔍 Searching for images: '$searchTerm'\n";

        // First, try to find in curated images
        foreach ($this->curatedImages as $key => $curatedImageList) {
            if (strpos($searchTerm, $key) !== false || 
                strpos($key, strtolower($brand)) !== false ||
                strpos($key, strtolower($model)) !== false) {
                echo "✅ Found curated images for: $key\n";
                return $curatedImageList;
            }
        }

        // If not found in curated, try to find by partial match
        foreach ($this->curatedImages as $key => $curatedImageList) {
            $keyWords = explode(' ', $key);
            $searchWords = explode(' ', $searchTerm);
            
            $matches = 0;
            foreach ($keyWords as $keyWord) {
                foreach ($searchWords as $searchWord) {
                    if (strlen($keyWord) > 3 && strlen($searchWord) > 3 && 
                        strpos($searchWord, $keyWord) !== false) {
                        $matches++;
                        break;
                    }
                }
            }
            
            if ($matches >= 2) {
                echo "✅ Found partial match for: $key (matches: $matches)\n";
                return $curatedImageList;
            }
        }

        // Try APIs as fallback
        $images = array_merge($images, $this->searchUnsplashImages($searchTerm, 2));
        $images = array_merge($images, $this->searchPixabayImages($searchTerm, 2));

        // If still no images, use generic high-quality product images
        if (empty($images)) {
            echo "⚠️ No specific images found, using generic product images\n";
            $images = [
                'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
                'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=800&h=600&fit=crop'
            ];
        }

        return array_slice($images, 0, 4); // Limit to 4 images
    }

    public function updateProductWithMultipleImages(Product $product): bool
    {
        try {
            echo "\n" . str_repeat('=', 60) . "\n";
            echo "🔄 Processing: {$product->name_uk}\n";
            if ($product->brand) echo "   Brand: {$product->brand}\n";
            if ($product->model) echo "   Model: {$product->model}\n";

            // Get multiple images
            $images = $this->getMultipleImages(
                $product->name_uk,
                $product->brand ?? '',
                $product->model ?? ''
            );

            if (empty($images)) {
                echo "❌ No images found\n";
                return false;
            }

            // Validate images
            $validImages = [];
            foreach ($images as $index => $imageUrl) {
                echo "   Testing image " . ($index + 1) . ": ";
                if ($this->validateImageUrl($imageUrl)) {
                    $validImages[] = $imageUrl;
                    echo "✅ Valid\n";
                } else {
                    echo "❌ Invalid\n";
                }
            }

            if (empty($validImages)) {
                echo "❌ No valid images found\n";
                return false;
            }

            // Store images as JSON array
            $product->images = json_encode($validImages);
            $product->image_url = $validImages[0]; // Set first image as primary
            $product->save();

            echo "✅ Updated with " . count($validImages) . " images:\n";
            foreach ($validImages as $index => $image) {
                echo "   " . ($index + 1) . ". " . substr($image, 0, 80) . "...\n";
            }

            return true;

        } catch (\Exception $e) {
            echo "❌ Error updating {$product->name_uk}: " . $e->getMessage() . "\n";
            return false;
        }
    }

    private function validateImageUrl(string $url): bool
    {
        if (!filter_var($url, FILTER_VALIDATE_URL)) {
            return false;
        }

        // Quick HEAD request to check if image exists
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_NOBODY, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        return $httpCode === 200;
    }

    public function resetAndUpdateAllProducts(): void
    {
        $totalProducts = Product::count();
        $processedCount = 0;
        $successCount = 0;

        echo "🚀 Starting to reset and update images for {$totalProducts} products...\n";
        echo "🗑️  First clearing all existing images...\n\n";

        // Clear all existing images
        Product::query()->update([
            'image_url' => null,
            'images' => null
        ]);

        echo "✅ Cleared all existing images\n";
        echo "🔄 Now updating with multiple high-quality images...\n\n";

        Product::chunk(5, function ($products) use (&$processedCount, &$successCount) {
            foreach ($products as $product) {
                $processedCount++;
                echo "\n[{$processedCount}] ";
                
                if ($this->updateProductWithMultipleImages($product)) {
                    $successCount++;
                }

                // Small delay to be respectful to APIs
                sleep(1);
            }
        });

        echo "\n\n" . str_repeat('=', 60) . "\n";
        echo "🎉 COMPLETED!\n";
        echo "✅ Successfully updated: {$successCount} products\n";
        echo "❌ Failed to update: " . ($processedCount - $successCount) . " products\n";
        echo "📊 Total processed: {$processedCount} products\n";
        echo str_repeat('=', 60) . "\n";
    }
}

// Create Laravel application context
$app = require_once 'bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

// Run the updater
$updater = new MultiImageUpdater();
$updater->resetAndUpdateAllProducts();
