@extends('layouts.app')

@section('title', 'Каталог товарів - ТехноСвіт')
@section('description', 'Переглядайте весь асортимент електроніки в нашому каталозі')

@section('content')
<div class="container my-4">
    <div class="row">
        <!-- Sidebar with filters -->
        <div class="col-lg-3 mb-4">
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">Фільтри</h5>
                </div>
                <div class="card-body">
                    <!-- Categories filter -->
                    <div class="mb-3">
                        <h6>Категорії</h6>
                        @foreach($categories as $category)
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" 
                                       id="category_{{ $category->id }}" 
                                       name="categories[]" value="{{ $category->id }}"
                                       {{ in_array($category->id, request('categories', [])) ? 'checked' : '' }}>
                                <label class="form-check-label" for="category_{{ $category->id }}">
                                    {{ $category->name }}
                                </label>
                            </div>
                        @endforeach
                    </div>

                    <!-- Price filter -->
                    <div class="mb-3">
                        <h6>Ціна</h6>
                        <div class="row">
                            <div class="col-6">
                                <input type="number" class="form-control" placeholder="Від" 
                                       name="price_from" value="{{ request('price_from') }}">
                            </div>
                            <div class="col-6">
                                <input type="number" class="form-control" placeholder="До"
                                       name="price_to" value="{{ request('price_to') }}">
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-primary w-100" onclick="applyFilters()">
                        Застосувати фільтри
                    </button>
                </div>
            </div>
        </div>

        <!-- Products grid -->
        <div class="col-lg-9">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h1>Каталог товарів</h1>
                <div class="d-flex align-items-center">
                    <label for="sort" class="me-2">Сортування:</label>
                    <select class="form-select" style="width: auto;" id="sort" name="sort">
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
                        <div class="col-md-4 mb-4">
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
                                    <p class="card-text text-muted small">{{ $product->category->name_uk }}</p>
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
                    {{ $products->links() }}
                </div>
            @else
                <div class="text-center py-5">
                    <i class="bi bi-search" style="font-size: 4rem; color: #6c757d;"></i>
                    <h3 class="mt-3 text-muted">Товарів не знайдено</h3>
                    <p class="text-muted">Спробуйте змінити фільтри або пошуковий запит</p>
                </div>
            @endif
        </div>
    </div>
</div>

<script>
function applyFilters() {
    const form = document.createElement('form');
    form.method = 'GET';
    form.action = '{{ route("catalog") }}';
    
    // Get all filter inputs
    const categoryInputs = document.querySelectorAll('input[name="categories[]"]:checked');
    const priceFrom = document.querySelector('input[name="price_from"]').value;
    const priceTo = document.querySelector('input[name="price_to"]').value;
    const sort = document.querySelector('select[name="sort"]').value;
    
    // Add category filters
    categoryInputs.forEach(input => {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'categories[]';
        hiddenInput.value = input.value;
        form.appendChild(hiddenInput);
    });
    
    // Add price filters
    if (priceFrom) {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'price_from';
        hiddenInput.value = priceFrom;
        form.appendChild(hiddenInput);
    }
    
    if (priceTo) {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'price_to';
        hiddenInput.value = priceTo;
        form.appendChild(hiddenInput);
    }
    
    // Add sort
    if (sort) {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'sort';
        hiddenInput.value = sort;
        form.appendChild(hiddenInput);
    }
    
    document.body.appendChild(form);
    form.submit();
}

// Apply sorting on change
document.getElementById('sort').addEventListener('change', applyFilters);

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
