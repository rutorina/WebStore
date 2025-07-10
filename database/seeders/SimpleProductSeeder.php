<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class SimpleProductSeeder extends Seeder
{
    public function run(): void
    {
        // Get categories
        $smartphones = Category::where('slug', 'smartphones')->first();
        $laptops = Category::where('slug', 'laptops')->first();
        $tablets = Category::where('slug', 'tablets')->first();
        $headphones = Category::where('slug', 'headphones')->first();

        // Create some sample products
        $products = [
            [
                'category_id' => $smartphones ? $smartphones->id : 1,
                'name_uk' => 'iPhone 15 Pro',
                'name_en' => 'iPhone 15 Pro',
                'description_uk' => 'Найновіший флагманський смартфон від Apple з потужним процесором A17 Pro та професійною камерою.',
                'description_en' => 'Latest flagship smartphone from Apple with powerful A17 Pro processor and professional camera.',
                'short_description_uk' => 'Флагманський смартфон Apple',
                'short_description_en' => 'Apple flagship smartphone',
                'sku' => 'IPHONE15PRO128',
                'slug' => 'iphone-15-pro',
                'price' => 45999.00,
                'old_price' => 49999.00,
                'quantity' => 25,
                'brand' => 'Apple',
                'model' => 'iPhone 15 Pro',
                'is_active' => true,
                'is_featured' => true,
                'specifications' => [
                    'Екран' => '6.1" Super Retina XDR',
                    'Процесор' => 'A17 Pro',
                    'Память' => '128GB',
                    'Камера' => '48MP основна + 12MP ультраширокутна',
                    'Батарея' => 'До 23 годин відео',
                    'ОС' => 'iOS 17'
                ]
            ],
            [
                'category_id' => $smartphones ? $smartphones->id : 1,
                'name_uk' => 'Samsung Galaxy S24 Ultra',
                'name_en' => 'Samsung Galaxy S24 Ultra',
                'description_uk' => 'Потужний Android-смартфон з S Pen та професійною камерою 200MP.',
                'description_en' => 'Powerful Android smartphone with S Pen and professional 200MP camera.',
                'short_description_uk' => 'Топовий Android з S Pen',
                'short_description_en' => 'Top Android with S Pen',
                'sku' => 'GALAXY-S24-ULTRA',
                'slug' => 'samsung-galaxy-s24-ultra',
                'price' => 42999.00,
                'quantity' => 18,
                'brand' => 'Samsung',
                'model' => 'Galaxy S24 Ultra',
                'is_active' => true,
                'is_featured' => true,
                'specifications' => [
                    'Екран' => '6.8" Dynamic AMOLED 2X',
                    'Процесор' => 'Snapdragon 8 Gen 3',
                    'Память' => '256GB',
                    'Камера' => '200MP основна + 50MP телефото',
                    'Батарея' => '5000mAh',
                    'ОС' => 'Android 14'
                ]
            ],
            [
                'category_id' => $laptops ? $laptops->id : 2,
                'name_uk' => 'MacBook Air M3',
                'name_en' => 'MacBook Air M3',
                'description_uk' => 'Ультратонкий ноутбук Apple з чіпом M3 для професійної роботи та розваг.',
                'description_en' => 'Ultra-thin Apple laptop with M3 chip for professional work and entertainment.',
                'short_description_uk' => 'Легкий ноутбук Apple',
                'short_description_en' => 'Lightweight Apple laptop',
                'sku' => 'MACBOOK-AIR-M3',
                'slug' => 'macbook-air-m3',
                'price' => 54999.00,
                'quantity' => 12,
                'brand' => 'Apple',
                'model' => 'MacBook Air M3',
                'is_active' => true,
                'is_featured' => true,
                'specifications' => [
                    'Процесор' => 'Apple M3',
                    'Екран' => '13.6" Liquid Retina',
                    'Память' => '256GB SSD',
                    'RAM' => '8GB',
                    'Батарея' => 'До 18 годин',
                    'Вага' => '1.24 кг'
                ]
            ],
            [
                'category_id' => $laptops ? $laptops->id : 2,
                'name_uk' => 'ASUS ROG Strix G15',
                'name_en' => 'ASUS ROG Strix G15',
                'description_uk' => 'Ігровий ноутбук з потужною графікою RTX 4060 для сучасних ігор.',
                'description_en' => 'Gaming laptop with powerful RTX 4060 graphics for modern games.',
                'short_description_uk' => 'Ігровий ноутбук ASUS',
                'short_description_en' => 'ASUS gaming laptop',
                'sku' => 'ASUS-ROG-G15',
                'slug' => 'asus-rog-strix-g15',
                'price' => 39999.00,
                'old_price' => 44999.00,
                'quantity' => 8,
                'brand' => 'ASUS',
                'model' => 'ROG Strix G15',
                'is_active' => true,
                'is_featured' => true,
                'specifications' => [
                    'Процесор' => 'AMD Ryzen 7 7735HS',
                    'Екран' => '15.6" FHD 144Hz',
                    'Відеокарта' => 'RTX 4060 8GB',
                    'RAM' => '16GB DDR5',
                    'SSD' => '512GB',
                    'Вага' => '2.3 кг'
                ]
            ],
            [
                'category_id' => $tablets ? $tablets->id : 3,
                'name_uk' => 'iPad Pro 12.9"',
                'name_en' => 'iPad Pro 12.9"',
                'description_uk' => 'Професійний планшет Apple з чіпом M2 для творчості та продуктивності.',
                'description_en' => 'Professional Apple tablet with M2 chip for creativity and productivity.',
                'short_description_uk' => 'Професійний планшет Apple',
                'short_description_en' => 'Professional Apple tablet',
                'sku' => 'IPAD-PRO-12',
                'slug' => 'ipad-pro-12-9',
                'price' => 52999.00,
                'quantity' => 15,
                'brand' => 'Apple',
                'model' => 'iPad Pro 12.9"',
                'is_active' => true,
                'is_featured' => true,
                'specifications' => [
                    'Процесор' => 'Apple M2',
                    'Екран' => '12.9" Liquid Retina XDR',
                    'Память' => '256GB',
                    'Камера' => '12MP + LiDAR',
                    'Підтримка' => 'Apple Pencil 2',
                    'Вага' => '682 г'
                ]
            ],
            [
                'category_id' => $headphones ? $headphones->id : 4,
                'name_uk' => 'Sony WH-1000XM5',
                'name_en' => 'Sony WH-1000XM5',
                'description_uk' => 'Бездротові навушники з активним шумозаглушенням та Hi-Res аудіо.',
                'description_en' => 'Wireless headphones with active noise cancellation and Hi-Res audio.',
                'short_description_uk' => 'Преміум навушники Sony',
                'short_description_en' => 'Premium Sony headphones',
                'sku' => 'SONY-WH1000XM5',
                'slug' => 'sony-wh-1000xm5',
                'price' => 12999.00,
                'old_price' => 14999.00,
                'quantity' => 30,
                'brand' => 'Sony',
                'model' => 'WH-1000XM5',
                'is_active' => true,
                'is_featured' => true,
                'specifications' => [
                    'Тип' => 'Накладні бездротові',
                    'Підключення' => 'Bluetooth 5.2',
                    'Батарея' => 'До 30 годин',
                    'Шумозаглушення' => 'Активне',
                    'Кодеки' => 'LDAC, AAC, SBC',
                    'Вага' => '250 г'
                ]
            ]
        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }

        echo "Товари створені успішно!\n";
    }
}
