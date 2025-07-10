<?php

/**
 * Simple test script using the exact approach from the user's example
 * This tests the Rozetka image extraction for a specific product
 */

function testRozetkaImageExtraction($url) {
    echo "🧪 Testing Rozetka image extraction for:\n";
    echo "URL: {$url}\n\n";

    // 1. Fetch HTML using curl (as per user's example)
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language: uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding: gzip, deflate, br',
        'DNT: 1',
        'Connection: keep-alive',
        'Upgrade-Insecure-Requests: 1',
        'Sec-Fetch-Dest: document',
        'Sec-Fetch-Mode: navigate',
        'Sec-Fetch-Site: none',
        'Cache-Control: max-age=0'
    ]);
    
    $html = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode !== 200 || !$html) {
        echo "❌ Failed to fetch page. HTTP Code: {$httpCode}\n";
        return [];
    }

    echo "✅ Successfully fetched HTML (" . strlen($html) . " bytes)\n";

    // 2. Load HTML with DOMDocument (as per user's example)
    libxml_use_internal_errors(true); // suppress warnings
    $doc = new DOMDocument();
    $doc->loadHTML($html);
    libxml_clear_errors();

    // 3. Use XPath to find images (as per user's example)
    $xpath = new DOMXPath($doc);
    $imgs = $xpath->query('//img[contains(@class, "gallery__picture")]');

    echo "🖼️  Found {$imgs->length} gallery images\n";

    $images = [];

    // 4. Extract image URLs (as per user's example)
    foreach ($imgs as $img) {
        /** @var DOMElement $img */
        $src = $img->getAttribute('data-src') ?: $img->getAttribute('src');
        if ($src) {
            // Normalize URL
            if (strpos($src, '//') === 0) {
                $src = 'https:' . $src;
            }
            $images[] = $src;
            echo "   📸 " . $src . "\n";
        }
    }

    // If no gallery images found, try alternative selectors
    if (empty($images)) {
        echo "\n🔍 No gallery images found, trying alternative selectors...\n";
        
        $alternativeSelectors = [
            '//img[contains(@class, "picture-container__picture")]',
            '//img[contains(@class, "product-gallery")]',
            '//img[contains(@data-src, "content")]',
            '//img[contains(@src, "content")]'
        ];

        foreach ($alternativeSelectors as $selector) {
            $altImgs = $xpath->query($selector);
            echo "🔍 Selector '{$selector}': {$altImgs->length} images\n";
            
            foreach ($altImgs as $img) {
                /** @var DOMElement $img */
                $src = $img->getAttribute('data-src') ?: $img->getAttribute('src');
                if ($src && !in_array($src, $images)) {
                    if (strpos($src, '//') === 0) {
                        $src = 'https:' . $src;
                    }
                    $images[] = $src;
                    echo "   📸 " . $src . "\n";
                }
            }
            
            if (count($images) > 0) break;
        }
    }

    echo "\n✅ Total images found: " . count($images) . "\n";
    return $images;
}

// Test URLs
$testUrls = [
    'https://rozetka.com.ua/apple_iphone_15/p338928034/',
    'https://rozetka.com.ua/samsung-galaxy-s24-ultra-256gb-titanium-black/p378031805/',
    'https://rozetka.com.ua/apple-macbook-pro-14-m3-8-512gb-space-gray/p381543322/'
];

echo "🚀 Starting Rozetka Image Extraction Tests\n";
echo "==========================================\n\n";

foreach ($testUrls as $index => $url) {
    echo "Test " . ($index + 1) . ":\n";
    echo str_repeat('-', 50) . "\n";
    
    $images = testRozetkaImageExtraction($url);
    
    if (count($images) > 0) {
        echo "✅ SUCCESS: Found " . count($images) . " images\n";
    } else {
        echo "❌ FAILED: No images found\n";
    }
    
    echo "\n";
    
    // Delay between requests
    if ($index < count($testUrls) - 1) {
        echo "⏳ Waiting 3 seconds before next test...\n\n";
        sleep(3);
    }
}

echo "🎉 All tests completed!\n";
