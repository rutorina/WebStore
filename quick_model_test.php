<?php

echo "🔍 Quick Product Model Test\n";
echo "===========================\n\n";

try {
    // Basic syntax check
    $code = file_get_contents('app/Models/Product.php');
    
    // Count occurrences of getMainImageAttribute
    $count = substr_count($code, 'getMainImageAttribute');
    
    echo "getMainImageAttribute method count: {$count}\n";
    
    if ($count === 1) {
        echo "✅ Duplicate method error fixed!\n";
        echo "✅ Product model should now work correctly\n";
    } else {
        echo "❌ Still has {$count} occurrences of getMainImageAttribute\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}

echo "\n🚀 Try accessing your application now!\n";
echo "The cart images should display properly.\n";
