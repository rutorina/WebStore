<?php

require 'vendor/autoload.php';

/**
 * Test script for Rozetka Image Extraction
 * Based on the instruction set provided
 */

function extractRozetkaImages($url) {
    echo "🔄 Extracting images from: $url\n";
    
    // Set up HTTP client with desktop user-agent
    $context = stream_context_create([
        'http' => [
            'header' => [
                'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            ],
            'timeout' => 30
        ]
    ]);
    
    try {
        // Fetch the page
        $html = file_get_contents($url, false, $context);
        
        if ($html === false) {
            throw new Exception("Failed to fetch page content");
        }
        
        // Parse HTML with DOMDocument
        $dom = new DOMDocument();
        libxml_use_internal_errors(true); // Suppress HTML parsing warnings
        $dom->loadHTML($html);
        libxml_clear_errors();
        
        // Create XPath for precise selection
        $xpath = new DOMXPath($dom);
        
        // Find all img elements with class 'gallery__picture'
        $images = $xpath->query("//img[contains(@class, 'gallery__picture')]");
        
        $imageUrls = [];
        
        foreach ($images as $img) {
            // Try data-src first (lazy loading), then src
            $imageUrl = $img->getAttribute('data-src') ?: $img->getAttribute('src');
            
            if ($imageUrl && !empty(trim($imageUrl))) {
                // Convert relative URLs to absolute if needed
                if (strpos($imageUrl, 'http') !== 0) {
                    $imageUrl = 'https:' . $imageUrl;
                }
                $imageUrls[] = $imageUrl;
            }
        }
        
        // Remove duplicates and return
        $imageUrls = array_unique($imageUrls);
        
        echo "✅ Found " . count($imageUrls) . " images:\n";
        foreach ($imageUrls as $index => $url) {
            echo ($index + 1) . ". $url\n";
        }
        
        return $imageUrls;
        
    } catch (Exception $e) {
        echo "❌ Error: " . $e->getMessage() . "\n";
        return [];
    }
}

// Test with example URL from instruction set
$testUrl = 'https://rozetka.com.ua/apple_iphone_15/p338928034/';

echo "🧠 Rozetka Image Extractor Test\n";
echo "📝 Following instruction set guidelines\n";
echo str_repeat("=", 50) . "\n";

$images = extractRozetkaImages($testUrl);

echo "\n🌍 Example Output (JSON format):\n";
echo json_encode($images, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

echo "\n\n✨ Test completed!\n";
