<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'session_id',
        'product_id',
        'quantity'
    ];

    protected $casts = [
        'quantity' => 'integer'
    ];

    // Відношення з користувачем
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Відношення з товаром
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Отримати елементи кошика для користувача
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    // Отримати елементи кошика для сесії
    public function scopeForSession($query, $sessionId)
    {
        return $query->where('session_id', $sessionId);
    }

    // Отримати загальну суму елемента
    public function getTotalAttribute()
    {
        return $this->quantity * $this->product->price;
    }
}
