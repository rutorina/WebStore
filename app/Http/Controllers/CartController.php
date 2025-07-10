<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class CartController extends Controller
{
    /**
     * Показати кошик
     */
    public function index()
    {
        $cartItems = $this->getCartItems();
        $total = $cartItems->sum(function($item) {
            return $item->quantity * $item->product->price;
        });
        
        return view('cart.index', compact('cartItems', 'total'));
    }
    
    /**
     * Додати товар до кошика
     */
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);
        
        $product = Product::findOrFail($request->product_id);
        
        // Перевірити наявність товару
        if ($product->stock_quantity < $request->quantity) {
            return response()->json([
                'error' => 'Недостатньо товару на складі'
            ], 400);
        }
        
        $cartData = [
            'product_id' => $product->id,
            'quantity' => $request->quantity
        ];
        
        if (Auth::check()) {
            $cartData['user_id'] = Auth::id();
            
            // Перевірити чи товар вже є в кошику
            $existingItem = CartItem::where('user_id', Auth::id())
                ->where('product_id', $product->id)
                ->first();
                
            if ($existingItem) {
                $existingItem->quantity += $request->quantity;
                $existingItem->save();
            } else {
                CartItem::create($cartData);
            }
        } else {
            $cartData['session_id'] = Session::getId();
            
            // Перевірити чи товар вже є в кошику
            $existingItem = CartItem::where('session_id', Session::getId())
                ->where('product_id', $product->id)
                ->first();
                
            if ($existingItem) {
                $existingItem->quantity += $request->quantity;
                $existingItem->save();
            } else {
                CartItem::create($cartData);
            }
        }
        
        return response()->json([
            'message' => 'Товар додано до кошика',
            'cart_count' => $this->getCartCount()
        ]);
    }
    
    /**
     * Оновити кількість товару в кошику
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);
        
        $cartItem = CartItem::findOrFail($id);
        
        // Перевірити права доступу
        if (!$this->canAccessCartItem($cartItem)) {
            abort(403);
        }
        
        // Перевірити наявність товару
        if ($cartItem->product->stock_quantity < $request->quantity) {
            if ($request->expectsJson()) {
                return response()->json([
                    'error' => 'Недостатньо товару на складі'
                ], 400);
            }
            
            return redirect()->route('cart.index')
                ->with('error', 'Недостатньо товару на складі');
        }
        
        $cartItem->update(['quantity' => $request->quantity]);
        
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Кількість оновлено',
                'total' => $cartItem->quantity * $cartItem->product->price
            ]);
        }
        
        return redirect()->route('cart.index')
            ->with('success', 'Кількість товару оновлено');
    }
    
    /**
     * Видалити товар з кошика
     */
    public function remove(Request $request, $id)
    {
        $cartItem = CartItem::findOrFail($id);
        
        // Перевірити права доступу
        if (!$this->canAccessCartItem($cartItem)) {
            abort(403);
        }
        
        $cartItem->delete();
        
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Товар видалено з кошика',
                'cart_count' => $this->getCartCount()
            ]);
        }
        
        return redirect()->route('cart.index')
            ->with('success', 'Товар видалено з кошика');
    }
    
    /**
     * Очистити кошик
     */
    public function clear(Request $request)
    {
        if (Auth::check()) {
            CartItem::where('user_id', Auth::id())->delete();
        } else {
            CartItem::where('session_id', Session::getId())->delete();
        }
        
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Кошик очищено'
            ]);
        }
        
        return redirect()->route('cart.index')
            ->with('success', 'Кошик очищено');
    }
    
    /**
     * API: Отримати кількість товарів у кошику
     */
    public function getCount()
    {
        return response()->json([
            'count' => $this->getCartCount()
        ]);
    }
    
    /**
     * Отримати елементи кошика
     */
    private function getCartItems()
    {
        if (Auth::check()) {
            return CartItem::with('product.category')
                ->where('user_id', Auth::id())
                ->get();
        } else {
            return CartItem::with('product.category')
                ->where('session_id', Session::getId())
                ->get();
        }
    }
    
    /**
     * Отримати кількість товарів у кошику
     */
    private function getCartCount()
    {
        if (Auth::check()) {
            return CartItem::where('user_id', Auth::id())->sum('quantity');
        } else {
            return CartItem::where('session_id', Session::getId())->sum('quantity');
        }
    }
    
    /**
     * Перевірити чи може користувач змінювати елемент кошика
     */
    private function canAccessCartItem($cartItem)
    {
        if (Auth::check()) {
            return $cartItem->user_id === Auth::id();
        } else {
            return $cartItem->session_id === Session::getId();
        }
    }
}
