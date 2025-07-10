<?php
echo "🔍 Checking product-category relationships...\n\n";

try {
    $pdo = new PDO('sqlite:database/database.sqlite');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Check products and their categories
    $stmt = $pdo->query("
        SELECT 
            p.id,
            p.name_uk as product_name,
            p.category_id,
            c.name_uk as category_name,
            c.slug as category_slug
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        ORDER BY p.id
    ");
    
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo "📱 PRODUCTS AND CATEGORIES:\n";
    echo "==========================\n";
    
    $unassigned = 0;
    
    foreach ($products as $product) {
        echo "• {$product['product_name']}\n";
        
        if ($product['category_id']) {
            echo "  📂 Category: {$product['category_name']} (ID: {$product['category_id']})\n";
        } else {
            echo "  ❌ No category assigned\n";
            $unassigned++;
        }
        echo "\n";
    }
    
    if ($unassigned > 0) {
        echo "⚠️  {$unassigned} products need category assignment\n\n";
        
        // Auto-assign categories based on product names
        echo "🔄 Auto-assigning categories...\n\n";
        
        // First, ensure categories exist
        $categories = [
            1 => ['name' => 'Смартфони', 'keywords' => ['iPhone', 'Samsung', 'Galaxy', 'phone']],
            2 => ['name' => 'Ноутбуки', 'keywords' => ['MacBook', 'ASUS', 'laptop', 'notebook']],
            3 => ['name' => 'Планшети', 'keywords' => ['iPad', 'tablet']],
            4 => ['name' => 'Навушники', 'keywords' => ['AirPods', 'Sony', 'headphones', 'навушники']],
            5 => ['name' => 'Годинники', 'keywords' => ['Watch', 'watch', 'годинник']]
        ];
        
        // Create categories if they don't exist
        foreach ($categories as $catId => $catData) {
            $checkStmt = $pdo->prepare("SELECT id FROM categories WHERE id = ?");
            $checkStmt->execute([$catId]);
            
            if (!$checkStmt->fetch()) {
                $slug = strtolower(str_replace(' ', '-', transliterateCyrillic($catData['name'])));
                $insertStmt = $pdo->prepare("INSERT INTO categories (id, name_uk, slug) VALUES (?, ?, ?)");
                $insertStmt->execute([$catId, $catData['name'], $slug]);
                echo "✅ Created category: {$catData['name']}\n";
            }
        }
        
        // Assign products to categories
        foreach ($products as $product) {
            if (!$product['category_id']) {
                $productName = $product['product_name'];
                $assignedCategoryId = null;
                
                foreach ($categories as $catId => $catData) {
                    foreach ($catData['keywords'] as $keyword) {
                        if (stripos($productName, $keyword) !== false) {
                            $assignedCategoryId = $catId;
                            break 2;
                        }
                    }
                }
                
                if ($assignedCategoryId) {
                    $updateStmt = $pdo->prepare("UPDATE products SET category_id = ? WHERE id = ?");
                    $updateStmt->execute([$assignedCategoryId, $product['id']]);
                    
                    echo "✅ Assigned '{$productName}' to category '{$categories[$assignedCategoryId]['name']}'\n";
                }
            }
        }
    }
    
    echo "\n🎉 Category assignment complete!\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}

function transliterateCyrillic($text) {
    $transliteration = [
        'А' => 'A', 'Б' => 'B', 'В' => 'V', 'Г' => 'G', 'Д' => 'D',
        'Е' => 'E', 'Ё' => 'E', 'Ж' => 'Zh', 'З' => 'Z', 'И' => 'I',
        'Й' => 'Y', 'К' => 'K', 'Л' => 'L', 'М' => 'M', 'Н' => 'N',
        'О' => 'O', 'П' => 'P', 'Р' => 'R', 'С' => 'S', 'Т' => 'T',
        'У' => 'U', 'Ф' => 'F', 'Х' => 'Kh', 'Ц' => 'Ts', 'Ч' => 'Ch',
        'Ш' => 'Sh', 'Щ' => 'Sch', 'Ъ' => '', 'Ы' => 'Y', 'Ь' => '',
        'Э' => 'E', 'Ю' => 'Yu', 'Я' => 'Ya',
        'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd',
        'е' => 'e', 'ё' => 'e', 'ж' => 'zh', 'з' => 'z', 'и' => 'i',
        'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n',
        'о' => 'o', 'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't',
        'у' => 'u', 'ф' => 'f', 'х' => 'kh', 'ц' => 'ts', 'ч' => 'ch',
        'ш' => 'sh', 'щ' => 'sch', 'ъ' => '', 'ы' => 'y', 'ь' => '',
        'э' => 'e', 'ю' => 'yu', 'я' => 'ya'
    ];
    
    return strtr($text, $transliteration);
}
?>
