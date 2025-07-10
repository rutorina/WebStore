<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name_uk' => 'Смартфони',
                'name_en' => 'Smartphones',
                'description_uk' => 'Сучасні смартфони від провідних виробників',
                'description_en' => 'Modern smartphones from leading manufacturers',
                'slug' => 'smartphones',
                'sort_order' => 1
            ],
            [
                'name_uk' => 'Ноутбуки',
                'name_en' => 'Laptops',
                'description_uk' => 'Потужні ноутбуки для роботи та розваг',
                'description_en' => 'Powerful laptops for work and entertainment',
                'slug' => 'laptops',
                'sort_order' => 2
            ],
            [
                'name_uk' => 'Планшети',
                'name_en' => 'Tablets',
                'description_uk' => 'Зручні планшети для будь-яких задач',
                'description_en' => 'Convenient tablets for any task',
                'slug' => 'tablets',
                'sort_order' => 3
            ],
            [
                'name_uk' => 'Навушники',
                'name_en' => 'Headphones',
                'description_uk' => 'Якісні навушники для музики',
                'description_en' => 'High-quality headphones for music',
                'slug' => 'headphones',
                'sort_order' => 4
            ],
            [
                'name_uk' => 'Годинники',
                'name_en' => 'Watches',
                'description_uk' => 'Розумні годинники та фітнес-трекери',
                'description_en' => 'Smart watches and fitness trackers',
                'slug' => 'watches',
                'sort_order' => 5
            ],
            [
                'name_uk' => 'Аксесуари',
                'name_en' => 'Accessories',
                'description_uk' => 'Корисні аксесуари для гаджетів',
                'description_en' => 'Useful accessories for gadgets',
                'slug' => 'accessories',
                'sort_order' => 6
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        $this->command->info('Категорії створені успішно!');
    }
}
