@extends('layouts.app')

@section('title', 'ТехноСвіт - Головна сторінка')
@section('description', 'Інтернет-магазин електроніки ТехноСвіт. Купуйте смартфони, ноутбуки, планшети та аксесуари за найкращими цінами в Україні.')

@section('content')
<div class="container">
    <!-- Hero Section -->
    <div class="row mb-5">
        <div class="col-12">
            <div class="bg-gradient rounded-3 p-5 text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important; color: white !important;">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <h1 class="display-4 fw-bold mb-3 text-white">Ласкаво просимо до ТехноСвіт!</h1>
                        <p class="lead mb-4 text-white">Найкращі товари електроніки за доступними цінами. Швидка доставка по всій Україні.</p>
                        <a href="{{ route('catalog') }}" class="btn btn-light btn-lg text-dark">
                            <i class="bi bi-grid"></i> Переглянути каталог
                        </a>
                    </div>
                    <div class="col-md-6 text-center">
                        <i class="bi bi-lightning-charge display-1 text-white"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Categories Section -->
    @if($categories->count() > 0)
    <div class="row mb-5">
        <div class="col-12">
            <h2 class="text-center mb-4">Популярні категорії</h2>
            <div class="row g-4">
                @foreach($categories as $category)
                <div class="col-md-4 col-lg-2">
                    <a href="{{ route('category.show', $category->slug) }}" class="text-decoration-none">
                        <div class="card h-100 shadow-sm category-card">
                            <div class="card-body text-center p-4">
                                <div class="mb-3">
                                    @switch($category->slug)
                                        @case('smartphones')
                                            <i class="bi bi-phone display-4 text-primary"></i>
                                            @break
                                        @case('laptops')
                                            <i class="bi bi-laptop display-4 text-primary"></i>
                                            @break
                                        @case('tablets')
                                            <i class="bi bi-tablet display-4 text-primary"></i>
                                            @break
                                        @case('headphones')
                                            <i class="bi bi-headphones display-4 text-primary"></i>
                                            @break
                                        @case('watches')
                                            <i class="bi bi-smartwatch display-4 text-primary"></i>
                                            @break
                                        @default
                                            <i class="bi bi-gear display-4 text-primary"></i>
                                    @endswitch
                                </div>
                                <h5 class="card-title">{{ $category->name_uk }}</h5>
                                <p class="card-text text-muted small">{{ $category->products->count() }} товарів</p>
                            </div>
                        </div>
                    </a>
                </div>
                @endforeach
            </div>
        </div>
    </div>
    @endif

    <!-- Featured Products Section -->
    @if($featuredProducts->count() > 0)
    <div class="row mb-5">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>Рекомендовані товари</h2>
                <a href="{{ route('catalog') }}" class="btn btn-outline-primary">
                    Всі товари <i class="bi bi-arrow-right"></i>
                </a>
            </div>
            <div class="row g-4">
                @foreach($featuredProducts as $product)
                <div class="col-md-6 col-lg-3">
                    <div class="card h-100 shadow-sm product-card position-relative" style="cursor: pointer;" onclick="window.location.href='{{ route('product.show', $product->slug) }}'">
                        @if($product->old_price && $product->old_price > $product->price)
                        <div class="position-absolute top-0 end-0 m-2" style="z-index: 2;">
                            <span class="badge bg-danger">-{{ $product->discount_percent }}%</span>
                        </div>
                        @endif
                        
                        <div class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height: 200px;">
                            @if($product->main_image)
                                <img src="{{ $product->main_image }}" alt="{{ $product->name_uk }}" class="img-fluid" style="max-height: 180px; object-fit: contain;">
                            @else
                            @endif
                        </div>
                        
                        <div class="card-body d-flex flex-column">
                            <h6 class="card-title">{{ $product->name_uk }}</h6>
                            <p class="card-text text-muted small flex-grow-1">{{ Str::limit($product->short_description_uk, 80) }}</p>
                            
                            <div class="mt-auto">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <div>
                                        <strong class="text-primary h5">{{ number_format($product->price, 0, ',', ' ') }} ₴</strong>
                                        @if($product->old_price)
                                        <small class="text-muted text-decoration-line-through ms-1">{{ number_format($product->old_price, 0, ',', ' ') }} ₴</small>
                                        @endif
                                    </div>
                                    @if($product->rating > 0)
                                    <div class="text-warning">
                                        @for($i = 1; $i <= 5; $i++)
                                            <i class="bi bi-star{{ $i <= $product->rating ? '-fill' : '' }}"></i>
                                        @endfor
                                    </div>
                                    @endif
                                </div>
                                
                                <div class="d-flex gap-2">
                                    <span class="btn btn-outline-primary btn-sm flex-grow-1 d-flex align-items-center justify-content-center">
                                        <i class="bi bi-eye"></i> Детальніше
                                    </span>
                                    <button class="btn btn-primary btn-sm add-to-cart" data-product-id="{{ $product->id }}" onclick="event.stopPropagation();">
                                        <i class="bi bi-cart-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
    @endif

    <!-- New Products Section -->
    @if($newProducts->count() > 0)
    <div class="row mb-5">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>Новинки</h2>
                <a href="{{ route('catalog', ['sort' => 'newest']) }}" class="btn btn-outline-success">
                    Всі новинки <i class="bi bi-arrow-right"></i>
                </a>
            </div>
            <div class="row g-4">
                @foreach($newProducts->take(4) as $product)
                <div class="col-md-6 col-lg-3">
                    <div class="card h-100 shadow-sm product-card position-relative" style="cursor: pointer;" onclick="window.location.href='{{ route('product.show', $product->slug) }}'">
                        <div class="position-absolute top-0 start-0 m-2" style="z-index: 2;">
                            <span class="badge bg-success">Новинка</span>
                        </div>
                        
                        <div class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height: 200px;">
                            @if($product->main_image)
                                <img src="{{ $product->main_image }}" alt="{{ $product->name_uk }}" class="img-fluid" style="max-height: 180px; object-fit: contain;">
                            @else
                            @endif
                        </div>
                        
                        <div class="card-body d-flex flex-column">
                            <h6 class="card-title">{{ $product->name_uk }}</h6>
                            <p class="card-text text-muted small flex-grow-1">{{ Str::limit($product->short_description_uk, 80) }}</p>
                            
                            <div class="mt-auto">
                                <div class="mb-2">
                                    <strong class="text-primary h5">{{ number_format($product->price, 0, ',', ' ') }} ₴</strong>
                                </div>
                                
                                <div class="d-flex gap-2">
                                    <span class="btn btn-outline-primary btn-sm flex-grow-1 d-flex align-items-center justify-content-center">
                                        <i class="bi bi-eye"></i> Детальніше
                                    </span>
                                    <button class="btn btn-primary btn-sm add-to-cart" data-product-id="{{ $product->id }}" onclick="event.stopPropagation();">
                                        <i class="bi bi-cart-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
    @endif

    <!-- Sale Products Section -->
    @if($saleProducts->count() > 0)
    <div class="row mb-5">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="text-danger">Товари зі знижкою</h2>
                <a href="{{ route('catalog', ['sale' => '1']) }}" class="btn btn-outline-danger">
                    Всі знижки <i class="bi bi-arrow-right"></i>
                </a>
            </div>
            <div class="row g-4">
                @foreach($saleProducts->take(4) as $product)
                <div class="col-md-6 col-lg-3">
                    <div class="card h-100 shadow-sm product-card border-danger position-relative" style="cursor: pointer;" onclick="window.location.href='{{ route('product.show', $product->slug) }}'">
                        <div class="position-absolute top-0 end-0 m-2" style="z-index: 2;">
                            <span class="badge bg-danger">-{{ $product->discount_percent }}%</span>
                        </div>
                        
                        <div class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height: 200px;">
                            @if($product->main_image)
                                <img src="{{ $product->main_image }}" alt="{{ $product->name_uk }}" class="img-fluid" style="max-height: 180px; object-fit: contain;">
                            @else
                            @endif
                        </div>
                        
                        <div class="card-body d-flex flex-column">
                            <h6 class="card-title">{{ $product->name_uk }}</h6>
                            <p class="card-text text-muted small flex-grow-1">{{ Str::limit($product->short_description_uk, 80) }}</p>
                            
                            <div class="mt-auto">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <div>
                                        <strong class="text-danger h5">{{ number_format($product->price, 0, ',', ' ') }} ₴</strong>
                                        <small class="text-muted text-decoration-line-through ms-1">{{ number_format($product->old_price, 0, ',', ' ') }} ₴</small>
                                    </div>
                                </div>
                                
                                <div class="d-flex gap-2">
                                    <span class="btn btn-outline-danger btn-sm flex-grow-1 d-flex align-items-center justify-content-center">
                                        <i class="bi bi-eye"></i> Детальніше
                                    </span>
                                    <button class="btn btn-danger btn-sm add-to-cart" data-product-id="{{ $product->id }}" onclick="event.stopPropagation();">
                                        <i class="bi bi-cart-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
    @endif
</div>
@endsection

@push('styles')
<style>
    .category-card:hover {
        transform: translateY(-5px);
        transition: transform 0.3s ease;
    }
    
    .product-card:hover {
        transform: translateY(-3px);
        transition: transform 0.3s ease;
        box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    }
    
    .bg-gradient {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
</style>
@endpush

@push('scripts')
<script>
    // Додавання товару до кошика
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            const btn = this;
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="bi bi-spinner-border"></i>';
            btn.disabled = true;
            
            fetch('{{ route("cart.add") }}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    product_id: productId,
                    quantity: 1
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert(data.error);
                } else {
                    // Оновити лічильник кошика
                    document.getElementById('cart-count').textContent = data.cart_count;
                    
                    // Показати повідомлення
                    btn.innerHTML = '<i class="bi bi-check"></i>';
                    btn.classList.remove('btn-primary', 'btn-danger');
                    btn.classList.add('btn-success');
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.classList.remove('btn-success');
                        btn.classList.add('btn-primary');
                        btn.disabled = false;
                    }, 2000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                btn.innerHTML = originalText;
                btn.disabled = false;
                alert('Помилка при додаванні товару до кошика');
            });
        });
    });
</script>
@endpush
