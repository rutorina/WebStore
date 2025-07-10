<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Admin\AdminController;

// Головна сторінка
Route::get('/', [HomeController::class, 'index'])->name('home');

// Redirect /home to /
Route::get('/home', function () {
    return redirect()->route('home');
});

// Каталог товарів
Route::get('/catalog', [ProductController::class, 'index'])->name('catalog');
Route::get('/product/{slug}', [ProductController::class, 'show'])->name('product.show');
Route::get('/category/{slug}', [CategoryController::class, 'show'])->name('category.show');

// Пошук
Route::get('/search', [ProductController::class, 'search'])->name('search');

// Кошик
Route::prefix('cart')->name('cart.')->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('index');
    Route::post('/add', [CartController::class, 'add'])->name('add');
    Route::patch('/update/{id}', [CartController::class, 'update'])->name('update');
    Route::delete('/remove/{id}', [CartController::class, 'remove'])->name('remove');
    Route::delete('/clear', [CartController::class, 'clear'])->name('clear');
});

// Замовлення
Route::middleware('auth')->prefix('orders')->name('orders.')->group(function () {
    Route::get('/', [OrderController::class, 'index'])->name('index');
    Route::get('/create', [OrderController::class, 'create'])->name('create');
    Route::post('/', [OrderController::class, 'store'])->name('store');
    Route::get('/{order}', [OrderController::class, 'show'])->name('show');
});

// Аутентифікація
Auth::routes();

// Адміністративна панель
Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
    
    // Управління товарами
    Route::resource('products', App\Http\Controllers\Admin\ProductController::class);
    
    // Управління категоріями
    Route::resource('categories', App\Http\Controllers\Admin\CategoryController::class);
    
    // Управління замовленнями
    Route::resource('orders', App\Http\Controllers\Admin\OrderController::class);
});

// API маршрути для React компонентів
Route::prefix('api')->group(function () {
    Route::get('/products/featured', [ProductController::class, 'getFeatured'])->name('api.products.featured');
    Route::get('/categories/menu', [CategoryController::class, 'getForMenu'])->name('api.categories.menu');
    Route::get('/cart/count', [CartController::class, 'getCount'])->name('api.cart.count');
});
