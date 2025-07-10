<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

class ProductController extends Controller
{
    /**
     * Показати каталог товарів
     */
    public function index(Request $request)
    {
        $query = Product::with('category')->active()->inStock();
        
        // Фільтрація за категорією
        if ($request->has('category') && $request->category) {
            $category = Category::where('slug', $request->category)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }
        
        // Пошук
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }
        
        // Фільтрація за ціною
        if ($request->has('min_price') && $request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price') && $request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }
        
        // Фільтрація за брендом
        if ($request->has('brand') && $request->brand) {
            $query->where('brand', $request->brand);
        }
        
        // Сортування
        $sortBy = $request->get('sort', 'name');
        $sortDirection = $request->get('direction', 'asc');
        
        switch ($sortBy) {
            case 'price':
                $query->orderBy('price', $sortDirection);
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            case 'newest':
                $query->latest();
                break;
            default:
                $query->orderBy('name_uk', $sortDirection);
        }
        
        $products = $query->paginate(20);
        
        // Дані для фільтрів
        $categories = Category::active()->ordered()->get();
        $brands = Product::active()->distinct()->pluck('brand')->filter()->sort();
        $priceRange = [
            'min' => Product::active()->min('price'),
            'max' => Product::active()->max('price')
        ];
        
        return view('catalog.index', compact(
            'products',
            'categories', 
            'brands',
            'priceRange'
        ));
    }
    
    /**
     * Показати сторінку товару
     */
    public function show($slug)
    {
        $product = Product::with('category')
            ->where('slug', $slug)
            ->active()
            ->firstOrFail();
            
        // Збільшити лічильник переглядів
        $product->increment('views_count');
        
        // Схожі товари
        $relatedProducts = Product::with('category')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->active()
            ->inStock()
            ->take(4)
            ->get();
            
        return view('catalog.show', compact('product', 'relatedProducts'));
    }
    
    /**
     * Пошук товарів
     */
    public function search(Request $request)
    {
        $query = $request->get('q');
        
        if (!$query) {
            return redirect()->route('catalog');
        }
        
        $products = Product::with('category')
            ->active()
            ->inStock()
            ->search($query)
            ->paginate(20);
            
        return view('catalog.search', compact('products', 'query'));
    }
    
    /**
     * API: Отримати рекомендовані товари
     */
    public function getFeatured()
    {
        $products = Product::with('category')
            ->active()
            ->featured()
            ->inStock()
            ->take(8)
            ->get();
            
        return response()->json($products);
    }
}
