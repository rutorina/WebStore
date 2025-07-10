<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'user_id',
        'status',
        'total_amount',
        'shipping_cost',
        'discount_amount',
        'currency',
        'customer_name',
        'customer_email',
        'customer_phone',
        'shipping_city',
        'shipping_address',
        'shipping_postal_code',
        'shipping_notes',
        'payment_method',
        'payment_status',
        'paid_at',
        'notes'
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'paid_at' => 'datetime'
    ];

    // Автоматичне створення номера замовлення
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($order) {
            if (empty($order->order_number)) {
                $order->order_number = 'ORD-' . date('Y') . '-' . str_pad(rand(1, 99999), 5, '0', STR_PAD_LEFT);
            }
        });
    }

    // Відношення з користувачем
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Відношення з елементами замовлення
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Статуси замовлення
    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    // Останні замовлення
    public function scopeRecent($query)
    {
        return $query->orderBy('created_at', 'desc');
    }

    // Отримати загальну суму з доставкою
    public function getTotalWithShippingAttribute()
    {
        return $this->total_amount + $this->shipping_cost - $this->discount_amount;
    }

    // Отримати статус українською
    public function getStatusUkAttribute()
    {
        $statuses = [
            'pending' => 'Очікує обробки',
            'processing' => 'Обробляється',
            'shipped' => 'Відправлено',
            'delivered' => 'Доставлено',
            'cancelled' => 'Скасовано'
        ];
        
        return $statuses[$this->status] ?? $this->status;
    }

    // Отримати статус оплати українською
    public function getPaymentStatusUkAttribute()
    {
        $statuses = [
            'pending' => 'Очікує оплати',
            'paid' => 'Оплачено',
            'failed' => 'Помилка оплати',
            'refunded' => 'Повернено'
        ];
        
        return $statuses[$this->payment_status] ?? $this->payment_status;
    }
}
