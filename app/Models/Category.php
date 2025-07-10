<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_uk',
        'name_en',
        'description_uk',
        'description_en',
        'image',
        'slug',
        'sort_order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer'
    ];

    // Автоматичне створення slug
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($category) {
            if (empty($category->slug)) {
                $category->slug = Str::slug($category->name_uk);
            }
        });
    }

    // Відношення з товарами
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    // Активні категорії
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Сортування за порядком
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name_uk');
    }

    // Отримати ім'я відповідно до локалізації
    public function getNameAttribute()
    {
        $locale = app()->getLocale();
        return $locale === 'uk' ? $this->name_uk : ($this->name_en ?? $this->name_uk);
    }

    // Отримати опис відповідно до локалізації
    public function getDescriptionAttribute()
    {
        $locale = app()->getLocale();
        return $locale === 'uk' ? $this->description_uk : ($this->description_en ?? $this->description_uk);
    }

    // Accessors for simplified attribute names
    public function getSimpleNameAttribute()
    {
        return $this->name_uk ?? $this->name_en;
    }

    public function getSimpleDescriptionAttribute()
    {
        return $this->description_uk ?? $this->description_en;
    }
}
