@extends('layouts.app')

@section('title', $product->name_uk . ' - ТехноСвіт')
@section('description', Str::limit($product->short_description_uk, 160))

@section('content')
<div class="container my-4">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ route('home') }}">Головна</a></li>
            <li class="breadcrumb-item"><a href="{{ route('catalog') }}">Каталог</a></li>
            <li class="breadcrumb-item"><a href="{{ route('category.show', $product->category->slug) }}">{{ $product->category->name_uk }}</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{ $product->name_uk }}</li>
        </ol>
    </nav>

    <div class="row">
        <!-- Product Images -->
        <div class="col-lg-6 mb-4">
            @if($product->images && count($product->images) > 0)
                <!-- Main Image Carousel -->
                <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        @foreach($product->images as $index => $image)
                            <div class="carousel-item {{ $index === 0 ? 'active' : '' }}">
                                <div class="bg-light rounded d-flex align-items-center justify-content-center p-4" style="min-height: 400px;">
                                    <img src="{{ $image }}" 
                                         class="img-fluid rounded" alt="{{ $product->name_uk }}"
                                         style="max-height: 380px; object-fit: contain;">
                                </div>
                            </div>
                        @endforeach
                    </div>
                    
                    <!-- Carousel Controls -->
                    @if(count($product->images) > 1)
                        <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Попереднє</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Наступне</span>
                        </button>
                        
                        <!-- Carousel Indicators -->
                        <div class="carousel-indicators">
                            @foreach($product->images as $index => $image)
                                <button type="button" data-bs-target="#productCarousel" data-bs-slide-to="{{ $index }}" 
                                        class="{{ $index === 0 ? 'active' : '' }}" aria-current="true" aria-label="Slide {{ $index + 1 }}"></button>
                            @endforeach
                        </div>
                    @endif
                </div>
                
                <!-- Thumbnail Images -->
                @if(count($product->images) > 1)
                    <div class="row mt-3">
                        @foreach($product->images as $index => $image)
                            <div class="col-4 mb-2">
                                <img src="{{ $image }}" 
                                     class="img-fluid rounded border cursor-pointer thumbnail-image" 
                                     alt="{{ $product->name_uk }}" 
                                     data-bs-target="#productCarousel" 
                                     data-bs-slide-to="{{ $index }}"
                                     style="height: 80px; object-fit: cover;">
                            </div>
                        @endforeach
                    </div>
                @endif
            @else
                <div class="bg-light rounded d-flex align-items-center justify-content-center" 
                     style="height: 400px;">
                </div>
            @endif
        </div>

        <!-- Product Info -->
        <div class="col-lg-6">
            <h1>{{ $product->name_uk }}</h1>
            
            <div class="mb-3">
                <span class="badge bg-secondary">{{ $product->category->name_uk }}</span>
                @if($product->is_featured)
                    <span class="badge bg-warning">Рекомендований</span>
                @endif
                @if($product->old_price && $product->old_price > $product->price)
                    <span class="badge bg-danger">-{{ $product->discount_percent }}% ЗНИЖКА</span>
                @endif
            </div>

            <div class="mb-3">
                <span class="h3 text-primary">{{ number_format($product->price, 0, ',', ' ') }} ₴</span>
                @if($product->old_price)
                    <span class="h5 text-muted text-decoration-line-through ms-2">{{ number_format($product->old_price, 0, ',', ' ') }} ₴</span>
                @endif
            </div>

            @if($product->rating > 0)
            <div class="mb-3">
                <div class="text-warning">
                    @for($i = 1; $i <= 5; $i++)
                        <i class="bi bi-star{{ $i <= $product->rating ? '-fill' : '' }}"></i>
                    @endfor
                    <span class="text-muted ms-2">({{ $product->rating }}/5)</span>
                </div>
            </div>
            @endif

            <div class="mb-3">
                @if($product->stock_quantity > 0)
                    @if($product->stock_quantity < 5)
                        <span class="badge bg-warning text-dark fs-6">
                            <i class="bi bi-exclamation-triangle"></i> 
                            Залишилось мало ({{ $product->stock_quantity }} шт.)
                        </span>
                    @else
                        <span class="badge bg-success fs-6">
                            <i class="bi bi-check-circle"></i> В наявності
                        </span>
                    @endif
                @else
                    <span class="badge bg-danger fs-6">
                        <i class="bi bi-x-circle"></i> Немає в наявності
                    </span>
                @endif
            </div>

            <!-- Add to Cart Form -->
            @if($product->stock_quantity > 0)
                <div class="mb-4">
                    <div class="row align-items-end">
                        <div class="col-auto">
                            <label for="quantity" class="form-label">Кількість:</label>
                            <input type="number" class="form-control" id="quantity" name="quantity" 
                                   value="1" min="1" max="{{ $product->stock_quantity }}" style="width: 80px;">
                        </div>
                        <div class="col-auto">
                            <button type="button" class="btn btn-primary btn-lg add-to-cart-detail" data-product-id="{{ $product->id }}">
                                <i class="bi bi-cart-plus"></i> Додати в кошик
                            </button>
                        </div>
                    </div>
                </div>
            @endif

            <!-- Product Specifications -->
            @if($product->specifications)
                <div class="card mb-4">
                    <div class="card-header">
                        <h5 class="mb-0">Характеристики</h5>
                    </div>
                    <div class="card-body">
                        @php
                            $specs = is_string($product->specifications) ? json_decode($product->specifications, true) : $product->specifications;
                        @endphp
                        @if($specs)
                            <div class="row">
                                @foreach($specs as $key => $value)
                                    <div class="col-sm-6 mb-2">
                                        <strong>{{ ucfirst($key) }}:</strong> {{ $value }}
                                    </div>
                                @endforeach
                            </div>
                        @endif
                    </div>
                </div>
            @endif
        </div>
    </div>

    <!-- Product Description -->
    <div class="row mt-4">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">Опис товару</h5>
                </div>
                <div class="card-body">
                    <p>{{ $product->description }}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Related Products -->
    @if($relatedProducts->count() > 0)
        <div class="mt-5">
            <h3>Схожі товари</h3>
            <div class="row">
                @foreach($relatedProducts as $relatedProduct)
                    <div class="col-lg-3 col-md-6 mb-4">
                        <div class="card h-100 shadow-sm product-card position-relative" style="cursor: pointer;" onclick="window.location.href='{{ route('product.show', $relatedProduct->slug) }}'">
                            @if($relatedProduct->main_image)
                                <div class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height: 200px;">
                                    <img src="{{ $relatedProduct->main_image }}" 
                                         alt="{{ $relatedProduct->name_uk }}"
                                         class="img-fluid" style="max-height: 180px; object-fit: contain;">
                                </div>
                            @else
                                <div class="card-img-top bg-light d-flex align-items-center justify-content-center" 
                                     style="height: 200px;">
                                </div>
                            @endif
                            
                            <div class="card-body d-flex flex-column">
                                <h6 class="card-title">{{ $relatedProduct->name_uk }}</h6>
                                <p class="card-text flex-grow-1">{{ Str::limit($relatedProduct->short_description_uk, 80) }}</p>
                                <div class="mt-auto">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <div>
                                            <strong class="text-primary h6">{{ number_format($relatedProduct->price, 0, ',', ' ') }} ₴</strong>
                                            @if($relatedProduct->old_price)
                                            <small class="text-muted text-decoration-line-through ms-1">{{ number_format($relatedProduct->old_price, 0, ',', ' ') }} ₴</small>
                                            @endif
                                        </div>
                                        @if($relatedProduct->stock_quantity > 0)
                                            <span class="badge bg-success">В наявності</span>
                                        @else
                                            <span class="badge bg-danger">Немає в наявності</span>
                                        @endif
                                    </div>
                                    <div class="d-flex gap-2">
                                        <span class="btn btn-outline-primary btn-sm flex-grow-1 d-flex align-items-center justify-content-center">
                                            <i class="bi bi-eye"></i> Детальніше
                                        </span>
                                        @if($relatedProduct->stock_quantity > 0)
                                            <button class="btn btn-primary btn-sm add-to-cart" data-product-id="{{ $relatedProduct->id }}" onclick="event.stopPropagation();">
                                                <i class="bi bi-cart-plus"></i>
                                            </button>
                                        @endif
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    @endif
</div>
@endsection

@push('scripts')
<script>
// Додавання товару до кошика з детальної сторінки
document.querySelector('.add-to-cart-detail')?.addEventListener('click', function() {
    const productId = this.dataset.productId;
    const quantity = document.getElementById('quantity').value;
    const btn = this;
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="bi bi-spinner-border spinner-border-sm"></i> Додавання...';
    btn.disabled = true;
    
    fetch('{{ route("cart.add") }}', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            product_id: productId,
            quantity: parseInt(quantity)
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            // Оновити лічильник кошика
            const cartCountElement = document.getElementById('cart-count');
            if (cartCountElement) {
                cartCountElement.textContent = data.cart_count;
            }
            
            // Показати повідомлення про успіх
            btn.innerHTML = '<i class="bi bi-check-circle"></i> Додано в кошик!';
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-success');
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('btn-success');
                btn.classList.add('btn-primary');
                btn.disabled = false;
            }, 3000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        btn.innerHTML = originalText;
        btn.disabled = false;
        alert('Помилка при додаванні товару до кошика');
    });
});

// Додавання товару до кошика зі схожих товарів
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
                const cartCountElement = document.getElementById('cart-count');
                if (cartCountElement) {
                    cartCountElement.textContent = data.cart_count;
                }
                
                // Показати повідомлення
                btn.innerHTML = '<i class="bi bi-check"></i>';
                btn.classList.remove('btn-primary');
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
