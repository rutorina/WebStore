<?php

$pdo = new PDO('sqlite:database/database.sqlite');
$stmt = $pdo->query("SELECT name_uk, images, image_url FROM products LIMIT 3");
$products = $stmt->fetchAll();

echo "Product Image Analysis:\n";
echo "======================\n\n";

foreach ($products as $product) {
    echo "Product: " . $product['name_uk'] . "\n";
    echo "image_url: " . ($product['image_url'] ?? 'NULL') . "\n";
    echo "images: " . ($product['images'] ?? 'NULL') . "\n";
    echo "---\n";
}
