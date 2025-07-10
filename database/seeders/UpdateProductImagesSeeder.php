<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class UpdateProductImagesSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'slug' => 'iphone-15-pro',
                'images' => [
                    'https://via.placeholder.com/600x600/007bff/ffffff?text=iPhone+15+Pro',
                    'https://via.placeholder.com/600x600/6c757d/ffffff?text=iPhone+15+Pro+Back'
                ]
            ],
            [
                'slug' => 'samsung-galaxy-s24-ultra',
                'images' => [
                    'https://via.placeholder.com/600x600/28a745/ffffff?text=Galaxy+S24+Ultra',
                    'https://via.placeholder.com/600x600/6c757d/ffffff?text=Galaxy+S24+Ultra+Back'
                ]
            ],
            [
                'slug' => 'macbook-air-m3',
                'images' => [
                    'https://via.placeholder.com/600x600/6f42c1/ffffff?text=MacBook+Air+M3',
                    'https://via.placeholder.com/600x600/6c757d/ffffff?text=MacBook+Air+M3+Side'
                ]
            ],
            [
                'slug' => 'asus-rog-strix-g15',
                'images' => [
                    'https://via.placeholder.com/600x600/dc3545/ffffff?text=ASUS+ROG+Strix+G15',
                    'https://via.placeholder.com/600x600/6c757d/ffffff?text=ASUS+ROG+Strix+G15+Side'
                ]
            ],
            [
                'slug' => 'ipad-pro-12-9',
                'images' => [
                    'https://via.placeholder.com/600x600/fd7e14/ffffff?text=iPad+Pro+12.9',
                    'https://via.placeholder.com/600x600/6c757d/ffffff?text=iPad+Pro+12.9+Back'
                ]
            ],
            [
                'slug' => 'sony-wh-1000xm5',
                'images' => [
                    'https://via.placeholder.com/600x600/20c997/ffffff?text=Sony+WH-1000XM5',
                    'https://via.placeholder.com/600x600/6c757d/ffffff?text=Sony+WH-1000XM5+Side'
                ]
            ]
        ];

        foreach ($products as $productData) {
            $product = Product::where('slug', $productData['slug'])->first();
            if ($product) {
                $product->update(['images' => $productData['images']]);
            }
        }

        echo "Зображення товарів оновлені успішно!\n";
    }
}
