<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'birth_date',
        'gender',
        'city',
        'address',
        'postal_code',
        'role',
        'is_active'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'birth_date' => 'date',
            'is_active' => 'boolean'
        ];
    }

    // Відношення з замовленнями
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    // Відношення з елементами кошика
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    // Перевірити чи є користувач адміном
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    // Активні користувачі
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Клієнти
    public function scopeCustomers($query)
    {
        return $query->where('role', 'customer');
    }

    // Адміністратори
    public function scopeAdmins($query)
    {
        return $query->where('role', 'admin');
    }
}
