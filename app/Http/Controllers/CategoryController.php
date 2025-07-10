<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;

class CategoryController extends Controller
{
    /**
     * Показати товари категорії
     */
    public function show($slug)
    {
        $category = Category::where('slug', $slug)
            ->active()
            ->firstOrFail();
            
        $query = Product::with('category')
            ->where('category_id', $category->id)
            ->active()
            ->inStock();
            
        $products = $query->paginate(20);
        
        return view('catalog.category', compact('category', 'products'));
    }
    
    /**
     * API: Отримати категорії для меню
     */
    public function getForMenu()
    {
        $categories = Category::active()
            ->ordered()
            ->select('id', 'name_uk', 'slug')
            ->get();
            
        return response()->json($categories);
    }
}
