<?php

require_once __DIR__ . '/vendor/autoload.php';

// Bootstrap Laravel
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Http\Controllers\CategoryController;
use Illuminate\Http\Request;

echo "🔍 Testing CategoryController::getForMenu()...\n";
echo "===============================================\n\n";

try {
    $controller = new CategoryController();
    $response = $controller->getForMenu();
    
    echo "Response type: " . get_class($response) . "\n";
    echo "Response content:\n";
    echo $response->getContent() . "\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "   File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}

echo "\n✅ Test completed!\n";
