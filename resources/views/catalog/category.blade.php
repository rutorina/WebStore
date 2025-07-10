@extends('layouts.app')

@section('title', $category->name . ' - ТехноСвіт')
@section('description', $category->description)

@section('content')
<div class="container my-4">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ route('home') }}">Головна</a></li>
            <li class="breadcrumb-item"><a href="{{ route('catalog') }}">Каталог</a></li>
            <li class="breadcrumb-item active" aria-current="page">{{ $category->name }}</li>
        </ol>
    </nav>

    <div class="row">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1>{{ $category->name }}</h1>
                    @if($category->description)
                        <p class="lead text-muted">{{ $category->description }}</p>
                    @endif
                </div>
                <div class="d-flex align-items-center">
                    <label for="sort" class="me-2">Сортування:</label>
                    <select class="form-select" style="width: auto;" id="sort" name="sort" onchange="applySorting()">
                        <option value="name" {{ request('sort') == 'name' ? 'selected' : '' }}>За назвою</option>
                        <option value="price_asc" {{ request('sort') == 'price_asc' ? 'selected' : '' }}>Ціна: за зростанням</option>
                        <option value="price_desc" {{ request('sort') == 'price_desc' ? 'selected' : '' }}>Ціна: за спаданням</option>
                        <option value="newest" {{ request('sort') == 'newest' ? 'selected' : '' }}>Найновіші</option>
                    </select>
                </div>
            </div>

            @if($products->count() > 0)
                <div class="row">
                    @foreach($products as $product)
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="card h-100 shadow-sm product-card position-relative" style="cursor: pointer;" onclick="window.location.href='{{ route('product.show', $product->slug) }}'">
                                @if($product->main_image)
                                    <div class="card-img-top bg-light d-flex align-items-center justify-content-center" style="height: 200px;">
                                        <img src="{{ $product->main_image }}" 
                                             alt="{{ $product->name_uk }}"
                                             class="img-fluid" style="max-height: 180px; object-fit: contain;">
                                    </div>
                                @else
                                    <div class="card-img-top bg-light d-flex align-items-center justify-content-center" 
                                         style="height: 200px;">
                                    </div>
                                @endif
                                
                                <div class="card-body d-flex flex-column">
                                    <h6 class="card-title">{{ $product->name_uk }}</h6>
                                    <p class="card-text flex-grow-1">{{ Str::limit($product->short_description_uk, 100) }}</p>
                                    <div class="mt-auto">
                                        <div class="d-flex justify-content-between align-items-center mb-2">
                                            <div>
                                                <strong class="text-primary h5">{{ number_format($product->price, 0, ',', ' ') }} ₴</strong>
                                                @if($product->old_price)
                                                <small class="text-muted text-decoration-line-through ms-1">{{ number_format($product->old_price, 0, ',', ' ') }} ₴</small>
                                                @endif
                                            </div>
                                            @if($product->stock_quantity > 0)
                                                <span class="badge bg-success">В наявності</span>
                                            @else
                                                <span class="badge bg-danger">Немає в наявності</span>
                                            @endif
                                        </div>
                                        <div class="d-flex gap-2">
                                            <span class="btn btn-outline-primary btn-sm flex-grow-1 d-flex align-items-center justify-content-center">
                                                <i class="bi bi-eye"></i> Детальніше
                                            </span>
                                            @if($product->stock_quantity > 0)
                                                <button class="btn btn-primary btn-sm add-to-cart" data-product-id="{{ $product->id }}" onclick="event.stopPropagation();">
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

                <!-- Pagination -->
                <div class="d-flex justify-content-center">
                    {{ $products->appends(request()->query())->links() }}
                </div>
            @else
                <div class="text-center py-5">
                    <i class="bi bi-box" style="font-size: 4rem; color: #6c757d;"></i>
                    <h3 class="mt-3 text-muted">У цій категорії товарів немає</h3>
                    <p class="text-muted">Товари з'являться незабаром</p>
                    <a href="{{ route('catalog') }}" class="btn btn-primary mt-3">
                        Переглянути весь каталог
                    </a>
                </div>
            @endif
        </div>
    </div>
</div>

<script>
function applySorting() {
    const sort = document.getElementById('sort').value;
    const url = new URL(window.location);
    url.searchParams.set('sort', sort);
    window.location.href = url.toString();
}

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
@endsection
