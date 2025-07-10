@extends('layouts.app')

@section('title', 'Пошук: ' . $query . ' - ТехноСвіт')
@section('description', 'Результати пошуку товарів по запиту: ' . $query)

@section('content')
<div class="container my-4">
    <div class="row">
        <div class="col-12">
            <h1>Результати пошуку</h1>
            <p class="lead">По запиту: <strong>"{{ $query }}"</strong></p>
            
            @if($products->count() > 0)
                <p class="text-muted">Знайдено {{ $products->total() }} {{ Str::plural('товар', $products->total(), ['товар', 'товари', 'товарів']) }}</p>
                
                <div class="row">
                    @foreach($products as $product)
                        <div class="col-lg-3 col-md-6 mb-4">
                            <div class="card h-100">
                                @php
                                    $imageUrl = null;
                                    if ($product->image) {
                                        if (filter_var($product->image, FILTER_VALIDATE_URL)) {
                                            $imageUrl = $product->image;
                                        } else {
                                            $imageUrl = asset('storage/' . $product->image);
                                        }
                                    }
                                @endphp
                                
                                @if($imageUrl)
                                    <img src="{{ $imageUrl }}" 
                                         class="card-img-top" alt="{{ $product->name }}"
                                         style="height: 200px; object-fit: cover;"
                                         onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                    <div class="card-img-top bg-light d-flex align-items-center justify-content-center" 
                                         style="height: 200px; display: none;">
                                    </div>
                                @else
                                    <div class="card-img-top bg-light d-flex align-items-center justify-content-center" 
                                         style="height: 200px;">
                                    </div>
                                @endif
                                
                                <div class="card-body d-flex flex-column">
                                    <h6 class="card-title">{{ $product->name }}</h6>
                                    <p class="card-text text-muted small">{{ $product->category->name }}</p>
                                    <p class="card-text">{{ Str::limit($product->description, 100) }}</p>
                                    <div class="mt-auto">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <span class="h6 mb-0 text-primary">{{ number_format($product->price, 2) }} ₴</span>
                                            @if($product->stock_quantity > 0)
                                                <span class="badge bg-success">В наявності</span>
                                            @else
                                                <span class="badge bg-danger">Немає в наявності</span>
                                            @endif
                                        </div>
                                        <div class="mt-2">
                                            <a href="{{ route('product.show', $product->slug) }}" 
                                               class="btn btn-outline-primary btn-sm me-2">Детальніше</a>
                                            @if($product->stock_quantity > 0)
                                                <form action="{{ route('cart.add') }}" method="POST" class="d-inline">
                                                    @csrf
                                                    <input type="hidden" name="product_id" value="{{ $product->id }}">
                                                    <input type="hidden" name="quantity" value="1">
                                                    <button type="submit" class="btn btn-primary btn-sm">
                                                        <i class="bi bi-cart-plus"></i>
                                                    </button>
                                                </form>
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
                    {{ $products->appends(['query' => $query])->links() }}
                </div>
            @else
                <div class="text-center py-5">
                    <i class="bi bi-search" style="font-size: 4rem; color: #6c757d;"></i>
                    <h3 class="mt-3 text-muted">Нічого не знайдено</h3>
                    <p class="text-muted">За вашим запитом <strong>"{{ $query }}"</strong> товарів не знайдено.</p>
                    <p class="text-muted">Спробуйте:</p>
                    <ul class="list-unstyled text-muted">
                        <li>• Перевірити правильність написання</li>
                        <li>• Використати менш конкретні терміни</li>
                        <li>• Переглянути всі категорії в каталозі</li>
                    </ul>
                    <a href="{{ route('catalog') }}" class="btn btn-primary mt-3">
                        Переглянути каталог
                    </a>
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
