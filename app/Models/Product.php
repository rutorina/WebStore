<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name_uk',
        'name_en',
        'description_uk',
        'description_en',
        'short_description_uk',
        'short_description_en',
        'sku',
        'slug',
        'price',
        'old_price',
        'quantity',
        'images',
        'image_url', // Add image_url to fillable
        'specifications',
        'weight',
        'brand',
        'model',
        'is_active',
        'is_featured',
        'views_count',
        'rating',
        'reviews_count'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'old_price' => 'decimal:2',
        'weight' => 'decimal:3',
        'rating' => 'decimal:2',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'images' => 'array',
        'specifications' => 'array',
        'quantity' => 'integer',
        'views_count' => 'integer',
        'reviews_count' => 'integer'
    ];

    // Автоматичне створення slug
    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name_uk);
            }
            if (empty($product->sku)) {
                $product->sku = 'P' . str_pad(rand(1, 999999), 6, '0', STR_PAD_LEFT);
            }
        });
    }

    // Відношення з категорією
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Відношення з елементами замовлення
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Відношення з елементами кошика
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }

    // Активні товари
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Рекомендовані товари
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // В наявності
    public function scopeInStock($query)
    {
        return $query->where('quantity', '>', 0);
    }

    // Пошук по назві та опису
    public function scopeSearch($query, $term)
    {
        return $query->where(function($q) use ($term) {
            $q->where('name_uk', 'LIKE', '%' . $term . '%')
              ->orWhere('description_uk', 'LIKE', '%' . $term . '%')
              ->orWhere('brand', 'LIKE', '%' . $term . '%')
              ->orWhere('model', 'LIKE', '%' . $term . '%');
        });
    }

    // Сортування за ціною
    public function scopePriceRange($query, $min = null, $max = null)
    {
        if ($min !== null) {
            $query->where('price', '>=', $min);
        }
        if ($max !== null) {
            $query->where('price', '<=', $max);
        }
        return $query;
    }

    // Отримати ім'я відповідно до локалізації
    public function getNameAttribute($value)
    {
        $locale = app()->getLocale();
        return $locale === 'uk' ? $this->name_uk : ($this->name_en ?? $this->name_uk);
    }

    // Отримати опис відповідно до локалізації
    public function getDescriptionAttribute($value)
    {
        $locale = app()->getLocale();
        return $locale === 'uk' ? $this->description_uk : ($this->description_en ?? $this->description_uk);
    }

    // Отримати короткий опис відповідно до локалізації
    public function getShortDescriptionAttribute($value)
    {
        $locale = app()->getLocale();
        return $locale === 'uk' ? $this->short_description_uk : ($this->short_description_en ?? $this->short_description_uk);
    }

    // Перевірити наявність товару
    public function isInStock()
    {
        return $this->quantity > 0;
    }

    // Отримати ціну зі знижкою
    public function getDiscountPercentAttribute()
    {
        if ($this->old_price && $this->old_price > $this->price) {
            return round((($this->old_price - $this->price) / $this->old_price) * 100);
        }
        return 0;
    }

    public function getImageAttribute()
    {
        if ($this->images && is_array($this->images) && count($this->images) > 0) {
            return $this->images[0];
        }
        return null;
    }

    // Get all images as array
    public function getAllImages()
    {
        $images = [];
        
        // Add primary image_url if exists
        if ($this->image_url) {
            $images[] = $this->image_url;
        }
        
        // Add images from images field
        if ($this->images && is_array($this->images)) {
            foreach ($this->images as $image) {
                if (!in_array($image, $images)) {
                    $images[] = $image;
                }
            }
        } elseif ($this->images && is_string($this->images)) {
            // Handle case where images is stored as JSON string
            $decodedImages = json_decode($this->images, true);
            if (is_array($decodedImages)) {
                foreach ($decodedImages as $image) {
                    if (!in_array($image, $images)) {
                        $images[] = $image;
                    }
                }
            }
        }
        
        return $images;
    }

    // Get primary image (first available image)
    public function getPrimaryImage()
    {
        $images = $this->getAllImages();
        return count($images) > 0 ? $images[0] : null;
    }

    // Get additional images (all except first)
    public function getAdditionalImages()
    {
        $images = $this->getAllImages();
        return count($images) > 1 ? array_slice($images, 1) : [];
    }

    // Check if product has multiple images
    public function hasMultipleImages()
    {
        return count($this->getAllImages()) > 1;
    }

    // Get main image (primary image)
    public function getMainImageAttribute()
    {
        return $this->getPrimaryImage();
    }

    public function getStockQuantityAttribute()
    {
        return $this->quantity;
    }
}
