<?php
$pdo = new PDO('sqlite:database/database.sqlite');
try {
    $pdo->exec("ALTER TABLE products ADD COLUMN image_url TEXT");
} catch(Exception $e) {}

$images = [
    'https://images-na.ssl-images-amazon.com/images/I/71SN6ufIbJL._AC_SL1500_.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/71YxnZ4lVVL._AC_SL1500_.jpg',
    'https://images-na.ssl-images-amazon.com/images/I/71KQ4QYLrUL._AC_SL1500_.jpg'
];

$stmt = $pdo->query("SELECT id FROM products");
$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($products as $product) {
    $pdo->prepare("UPDATE products SET images = ?, image_url = ? WHERE id = ?")
        ->execute([json_encode($images), $images[0], $product['id']]);
}

echo "Updated " . count($products) . " products";
?>
