<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

class HomeController extends Controller
{
    /**
     * Показати головну сторінку магазину
     */
    public function index()
    {
        // Рекомендовані товари
        $featuredProducts = Product::with('category')
            ->active()
            ->featured()
            ->inStock()
            ->take(8)
            ->get();

        // Популярні категорії
        $categories = Category::active()
            ->ordered()
            ->take(6)
            ->get();

        // Новинки
        $newProducts = Product::with('category')
            ->active()
            ->inStock()
            ->latest()
            ->take(8)
            ->get();

        // Товари зі знижкою
        $saleProducts = Product::with('category')
            ->active()
            ->inStock()
            ->whereNotNull('old_price')
            ->where('old_price', '>', 'price')
            ->take(8)
            ->get();

        return view('home', compact(
            'featuredProducts',
            'categories', 
            'newProducts',
            'saleProducts'
        ));
    }
}
