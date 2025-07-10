@extends('layouts.app')

@section('title', 'Кошик - ТехноСвіт')
@section('description', 'Перегляд товарів у вашому кошику')

@section('content')
<div class="container my-4">
    <div class="row">
        <div class="col-12">
            <h1><i class="bi bi-cart3"></i> Кошик</h1>
            
            @if($cartItems->count() > 0)
                <div class="row">
                    <!-- Cart Items -->
                    <div class="col-lg-8">
                        <div class="card">
                            <div class="card-body">
                                @foreach($cartItems as $item)
                                    <div class="row align-items-center border-bottom py-3">
                                        <!-- Product Image -->
                                        <div class="col-2">
                                            @php
                                                $imageUrl = null;
                                                if ($item->product->image) {
                                                    // Check if it's already a full URL
                                                    if (filter_var($item->product->image, FILTER_VALIDATE_URL)) {
                                                        $imageUrl = $item->product->image;
                                                    } else {
                                                        // Assume it's a local file
                                                        $imageUrl = asset('storage/' . $item->product->image);
                                                    }
                                                }
                                            @endphp
                                            
                                            @if($imageUrl)
                                                <img src="{{ $imageUrl }}" 
                                                     class="img-fluid rounded" 
                                                     alt="{{ $item->product->name }}"
                                                     style="height: 80px; width: 80px; object-fit: cover;"
                                                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                                <div class="bg-light rounded d-flex align-items-center justify-content-center" 
                                                     style="height: 80px; width: 80px; display: none;">
                                                </div>
                                            @else
                                                <div class="bg-light rounded d-flex align-items-center justify-content-center" 
                                                     style="height: 80px; width: 80px;">
                                                </div>
                                            @endif
                                        </div>
                                        
                                        <!-- Product Info -->
                                        <div class="col-4">
                                            <h6 class="mb-1">
                                                <a href="{{ route('product.show', $item->product->slug) }}" 
                                                   class="text-decoration-none">
                                                    {{ $item->product->name }}
                                                </a>
                                            </h6>
                                            <small class="text-muted">{{ $item->product->category->name }}</small>
                                        </div>
                                        
                                        <!-- Quantity Controls -->
                                        <div class="col-3">
                                            <div class="d-flex align-items-center">
                                                <form action="{{ route('cart.update', $item->id) }}" method="POST" class="d-inline">
                                                    @csrf
                                                    @method('PATCH')
                                                    <input type="hidden" name="quantity" value="{{ max(1, $item->quantity - 1) }}">
                                                    <button type="submit" class="btn btn-outline-secondary btn-sm" 
                                                            {{ $item->quantity <= 1 ? 'disabled' : '' }}>
                                                        <i class="bi bi-dash"></i>
                                                    </button>
                                                </form>
                                                
                                                <span class="mx-3 fw-bold">{{ $item->quantity }}</span>
                                                
                                                <form action="{{ route('cart.update', $item->id) }}" method="POST" class="d-inline">
                                                    @csrf
                                                    @method('PATCH')
                                                    <input type="hidden" name="quantity" value="{{ $item->quantity + 1 }}">
                                                    <button type="submit" class="btn btn-outline-secondary btn-sm"
                                                            {{ $item->quantity >= $item->product->stock_quantity ? 'disabled' : '' }}>
                                                        <i class="bi bi-plus"></i>
                                                    </button>
                                                </form>
                                            </div>
                                            <small class="text-muted">
                                                Доступно: {{ $item->product->stock_quantity }} шт.
                                            </small>
                                        </div>
                                        
                                        <!-- Price and Remove -->
                                        <div class="col-3 text-end">
                                            <div class="fw-bold text-primary mb-2">
                                                {{ number_format($item->product->price * $item->quantity, 2) }} ₴
                                            </div>
                                            <form action="{{ route('cart.remove', $item->id) }}" method="POST" class="d-inline">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-outline-danger btn-sm"
                                                        onclick="return confirm('Видалити товар з кошика?')">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                        
                        <!-- Clear Cart Button -->
                        <div class="mt-3">
                            <form action="{{ route('cart.clear') }}" method="POST" class="d-inline">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-outline-danger"
                                        onclick="return confirm('Очистити весь кошик?')">
                                    <i class="bi bi-trash"></i> Очистити кошик
                                </button>
                            </form>
                        </div>
                    </div>
                    
                    <!-- Order Summary -->
                    <div class="col-lg-4">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Разом до сплати</h5>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between mb-2">
                                    <span>Товарів:</span>
                                    <span>{{ $cartItems->sum('quantity') }} шт.</span>
                                </div>
                                <div class="d-flex justify-content-between mb-2">
                                    <span>Сума:</span>
                                    <span>{{ number_format($total, 2) }} ₴</span>
                                </div>
                                <hr>
                                <div class="d-flex justify-content-between mb-3">
                                    <strong>До сплати:</strong>
                                    <strong class="text-primary">{{ number_format($total, 2) }} ₴</strong>
                                </div>
                                
                                @auth
                                    <a href="{{ route('orders.create') }}" class="btn btn-primary w-100 mb-2">
                                        <i class="bi bi-check-circle"></i> Оформити замовлення
                                    </a>
                                @else
                                    <div class="text-center mb-3">
                                        <p class="small text-muted">Для оформлення замовлення необхідно увійти в систему</p>
                                        <a href="{{ route('login') }}" class="btn btn-primary w-100 mb-2">
                                            <i class="bi bi-person-check"></i> Увійти
                                        </a>
                                        <a href="{{ route('register') }}" class="btn btn-outline-primary w-100">
                                            <i class="bi bi-person-plus"></i> Реєстрація
                                        </a>
                                    </div>
                                @endauth
                                
                                <a href="{{ route('catalog') }}" class="btn btn-outline-secondary w-100">
                                    <i class="bi bi-arrow-left"></i> Продовжити покупки
                                </a>
                            </div>
                        </div>
                        
                        <!-- Benefits -->
                        <div class="card mt-3">
                            <div class="card-body">
                                <h6 class="card-title">Ваші переваги:</h6>
                                <ul class="list-unstyled small">
                                    <li><i class="bi bi-truck text-success"></i> Безкоштовна доставка від 1000 ₴</li>
                                    <li><i class="bi bi-shield-check text-success"></i> Гарантія на всі товари</li>
                                    <li><i class="bi bi-arrow-repeat text-success"></i> Повернення протягом 14 днів</li>
                                    <li><i class="bi bi-headset text-success"></i> Підтримка 24/7</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            @else
                <!-- Empty Cart -->
                <div class="text-center py-5">
                    <i class="bi bi-cart3" style="font-size: 5rem; color: #6c757d;"></i>
                    <h3 class="mt-3 text-muted">Кошик порожній</h3>
                    <p class="text-muted">Додайте товари для їх покупки</p>
                    <a href="{{ route('catalog') }}" class="btn btn-primary mt-3">
                        <i class="bi bi-bag"></i> Почати покупки
                    </a>
                </div>
            @endif
        </div>
    </div>
</div>

@if(session('success'))
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div class="toast show" role="alert">
            <div class="toast-header">
                <i class="bi bi-check-circle-fill text-success me-2"></i>
                <strong class="me-auto">Успішно</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                {{ session('success') }}
            </div>
        </div>
    </div>
@endif

@if(session('error'))
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
        <div class="toast show" role="alert">
            <div class="toast-header">
                <i class="bi bi-exclamation-triangle-fill text-danger me-2"></i>
                <strong class="me-auto">Помилка</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                {{ session('error') }}
            </div>
        </div>
    </div>
@endif
@endsection
