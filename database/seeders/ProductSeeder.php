<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $smartphones = Category::where('slug', 'smartphones')->first();
        $laptops = Category::where('slug', 'laptops')->first();
        $tablets = Category::where('slug', 'tablets')->first();
        $headphones = Category::where('slug', 'headphones')->first();
        $watches = Category::where('slug', 'watches')->first();
        $accessories = Category::where('slug', 'accessories')->first();

        $products = [
            // Смартфони
            [
                'category_id' => $smartphones->id,
                'name_uk' => 'iPhone 15 Pro',
                'name_en' => 'iPhone 15 Pro',
                'description_uk' => 'Найновіший флагманський смартфон від Apple з потужним процесором A17 Pro та професійною камерою.',
                'description_en' => 'The latest flagship smartphone from Apple with powerful A17 Pro processor and professional camera.',
                'short_description_uk' => 'Флагманський iPhone з A17 Pro',
                'short_description_en' => 'Flagship iPhone with A17 Pro',
                'slug' => 'iphone-15-pro',
                'price' => 45999.00,
                'old_price' => 49999.00,
                'quantity' => 25,
                'brand' => 'Apple',
                'model' => 'iPhone 15 Pro',
                'is_featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop&crop=top',
                    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop&crop=center'
                ],
                'specifications' => [
                    'Екран' => '6.1" Super Retina XDR',
                    'Процесор' => 'A17 Pro',
                    'Пам\'ять' => '128GB',
                    'Камера' => '48MP + 12MP + 12MP',
                    'Батарея' => '3274 mAh'
                ]
            ],
            [
                'category_id' => $smartphones->id,
                'name_uk' => 'Samsung Galaxy S24 Ultra',
                'name_en' => 'Samsung Galaxy S24 Ultra',
                'description_uk' => 'Потужний Android смартфон з S Pen та професійними можливостями фотографії.',
                'description_en' => 'Powerful Android smartphone with S Pen and professional photography capabilities.',
                'short_description_uk' => 'Топовий Galaxy з S Pen',
                'short_description_en' => 'Top Galaxy with S Pen',
                'slug' => 'samsung-galaxy-s24-ultra',
                'price' => 42999.00,
                'quantity' => 30,
                'brand' => 'Samsung',
                'model' => 'Galaxy S24 Ultra',
                'is_featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1677867568603-1b8d2b25bb4d?w=600&h=600&fit=crop&crop=center&q=80',
                    'https://images.unsplash.com/photo-1677867568614-1a54b9e0c4e5?w=600&h=600&fit=crop&crop=center&q=80', 
                    'https://images.unsplash.com/photo-1677867568621-3f6b4c8e2e5b?w=600&h=600&fit=crop&crop=center&q=80',
                    'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop&crop=center&q=80'
                ],
                'specifications' => [
                    'Екран' => '6.8" Dynamic AMOLED 2X',
                    'Процесор' => 'Snapdragon 8 Gen 3',
                    'Пам\'ять' => '256GB',
                    'Камера' => '200MP + 50MP + 12MP + 10MP',
                    'Батарея' => '5000 mAh'
                ]
            ],
            
            // Ноутбуки
            [
                'category_id' => $laptops->id,
                'name_uk' => 'MacBook Pro 14" M3',
                'name_en' => 'MacBook Pro 14" M3',
                'description_uk' => 'Професійний ноутбук для творчих завдань з чіпом M3 та Liquid Retina XDR дисплеєм.',
                'description_en' => 'Professional laptop for creative tasks with M3 chip and Liquid Retina XDR display.',
                'short_description_uk' => 'Професійний MacBook з M3',
                'short_description_en' => 'Professional MacBook with M3',
                'slug' => 'macbook-pro-14-m3',
                'price' => 89999.00,
                'quantity' => 15,
                'brand' => 'Apple',
                'model' => 'MacBook Pro 14"',
                'is_featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&h=600&fit=crop&crop=center'
                ],
                'specifications' => [
                    'Екран' => '14.2" Liquid Retina XDR',
                    'Процесор' => 'Apple M3',
                    'ОЗУ' => '8GB',
                    'Накопичувач' => '512GB SSD',
                    'Автономність' => 'до 22 годин'
                ]
            ],
            [
                'category_id' => $laptops->id,
                'name_uk' => 'ASUS ROG Strix G15',
                'name_en' => 'ASUS ROG Strix G15',
                'description_uk' => 'Ігровий ноутбук з потужною графікою RTX 4060 для максимальної продуктивності в іграх.',
                'description_en' => 'Gaming laptop with powerful RTX 4060 graphics for maximum gaming performance.',
                'short_description_uk' => 'Ігровий ноутбук з RTX 4060',
                'short_description_en' => 'Gaming laptop with RTX 4060',
                'slug' => 'asus-rog-strix-g15',
                'price' => 54999.00,
                'quantity' => 20,
                'brand' => 'ASUS',
                'model' => 'ROG Strix G15',
                'images' => [
                    'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=600&h=600&fit=crop&crop=center'
                ],
                'specifications' => [
                    'Екран' => '15.6" Full HD 144Hz',
                    'Процесор' => 'AMD Ryzen 7 7735HS',
                    'ОЗУ' => '16GB DDR5',
                    'Відеокарта' => 'RTX 4060 8GB',
                    'Накопичувач' => '1TB SSD'
                ]
            ],

            // Планшети
            [
                'category_id' => $tablets->id,
                'name_uk' => 'iPad Pro 12.9" M2',
                'name_en' => 'iPad Pro 12.9" M2',
                'description_uk' => 'Найпотужніший планшет для професійних завдань з підтримкою Apple Pencil.',
                'description_en' => 'The most powerful tablet for professional tasks with Apple Pencil support.',
                'short_description_uk' => 'Професійний iPad з M2',
                'short_description_en' => 'Professional iPad with M2',
                'slug' => 'ipad-pro-12-9-m2',
                'price' => 52999.00,
                'quantity' => 18,
                'brand' => 'Apple',
                'model' => 'iPad Pro 12.9"',
                'is_featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=600&fit=crop&crop=center'
                ],
                'specifications' => [
                    'Екран' => '12.9" Liquid Retina XDR',
                    'Процесор' => 'Apple M2',
                    'Пам\'ять' => '128GB',
                    'Камера' => '12MP + 10MP',
                    'Підтримка' => 'Apple Pencil 2'
                ]
            ],

            // Навушники
            [
                'category_id' => $headphones->id,
                'name_uk' => 'AirPods Pro 2',
                'name_en' => 'AirPods Pro 2',
                'description_uk' => 'Бездротові навушники з активним шумопоглинанням та просторовим звуком.',
                'description_en' => 'Wireless headphones with active noise cancellation and spatial audio.',
                'short_description_uk' => 'Бездротові з ANC',
                'short_description_en' => 'Wireless with ANC',
                'slug' => 'airpods-pro-2',
                'price' => 12499.00,
                'quantity' => 50,
                'brand' => 'Apple',
                'model' => 'AirPods Pro 2',
                'is_featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&crop=center'
                ],
                'specifications' => [
                    'Тип' => 'Внутрішньоканальні',
                    'Підключення' => 'Bluetooth 5.3',
                    'ANC' => 'Так',
                    'Автономність' => '6 + 24 години',
                    'Кейс' => 'MagSafe/Lightning'
                ]
            ],
            [
                'category_id' => $headphones->id,
                'name_uk' => 'Sony WH-1000XM5',
                'name_en' => 'Sony WH-1000XM5',
                'description_uk' => 'Професійні навушники з кращим у світі шумопоглинанням.',
                'description_en' => 'Professional headphones with world\'s best noise cancellation.',
                'short_description_uk' => 'Топове шумопоглинання',
                'short_description_en' => 'Top noise cancellation',
                'slug' => 'sony-wh-1000xm5',
                'price' => 14999.00,
                'quantity' => 35,
                'brand' => 'Sony',
                'model' => 'WH-1000XM5',
                'images' => [
                    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop&crop=center'
                ],
                'images' => [
                    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600&h=600&fit=crop&crop=center'
                ],
                'specifications' => [
                    'Тип' => 'Накладні',
                    'Підключення' => 'Bluetooth 5.2',
                    'ANC' => 'Найкраще в класі',
                    'Автономність' => '30 годин',
                    'Швидка зарядка' => '3 хв = 3 години'
                ]
            ],

            // Годинники
            [
                'category_id' => $watches->id,
                'name_uk' => 'Apple Watch Series 9',
                'name_en' => 'Apple Watch Series 9',
                'description_uk' => 'Розумний годинник з функціями здоров\'я та фітнес-трекінгом.',
                'description_en' => 'Smart watch with health features and fitness tracking.',
                'short_description_uk' => 'Розумний годинник Apple',
                'short_description_en' => 'Apple Smart Watch',
                'slug' => 'apple-watch-series-9',
                'price' => 17999.00,
                'quantity' => 40,
                'brand' => 'Apple',
                'model' => 'Watch Series 9',
                'is_featured' => true,
                'images' => [
                    'https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1510017098667-27dfc7150acb?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&h=600&fit=crop&crop=center',
                    'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&h=600&fit=crop&crop=center'
                ],
                'specifications' => [
                    'Екран' => '45mm Retina LTPO OLED',
                    'Процесор' => 'S9 SiP',
                    'Датчики' => 'ЕКГ, SpO2, температура',
                    'Автономність' => '18 годин',
                    'Захист' => 'WR50'
                ]
            ]
        ];

        foreach ($products as $product) {
            Product::create($product);
        }

        $this->command->info('Демо товари створені успішно!');
    }
}
