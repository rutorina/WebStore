@extends('layouts.app')

@section('title', 'Оформлення замовлення - ТехноСвіт')
@section('description', 'Оформлення замовлення товарів з кошика')

@section('content')
<div class="container my-4">
    <div class="row">
        <div class="col-12">
            <h1><i class="bi bi-check-circle"></i> Оформлення замовлення</h1>
            
            <div class="row">
                <!-- Order Form -->
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">Дані для доставки</h5>
                        </div>
                        <div class="card-body">
                            <form action="{{ route('orders.store') }}" method="POST">
                                @csrf
                                
                                <!-- Customer Info -->
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="name" class="form-label">Ім'я</label>
                                        <input type="text" class="form-control" id="name" 
                                               value="{{ Auth::user()->name }}" readonly>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="email" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="email" 
                                               value="{{ Auth::user()->email }}" readonly>
                                    </div>
                                </div>

                                <!-- Phone -->
                                <div class="mb-3">
                                    <label for="phone" class="form-label">Телефон <span class="text-danger">*</span></label>
                                    <input type="tel" class="form-control @error('phone') is-invalid @enderror" 
                                           id="phone" name="phone" value="{{ old('phone', Auth::user()->phone) }}" required>
                                    @error('phone')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <!-- Delivery Address -->
                                <div class="mb-3">
                                    <label for="delivery_address" class="form-label">Адреса доставки <span class="text-danger">*</span></label>
                                    <textarea class="form-control @error('delivery_address') is-invalid @enderror" 
                                              id="delivery_address" name="delivery_address" rows="3" required 
                                              placeholder="Вкажіть повну адресу доставки">{{ old('delivery_address', Auth::user()->address) }}</textarea>
                                    @error('delivery_address')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <!-- Notes -->
                                <div class="mb-3">
                                    <label for="notes" class="form-label">Коментарій до замовлення</label>
                                    <textarea class="form-control @error('notes') is-invalid @enderror" 
                                              id="notes" name="notes" rows="3" 
                                              placeholder="Додаткові побажання або коментарі">{{ old('notes') }}</textarea>
                                    @error('notes')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <!-- Terms and Conditions -->
                                <div class="mb-3">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" id="terms" required>
                                        <label class="form-check-label" for="terms">
                                            Я погоджуюся з <a href="#" target="_blank">умовами користування</a> 
                                            та <a href="#" target="_blank">політикою конфіденційності</a>
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary btn-lg">
                                    <i class="bi bi-check-circle"></i> Підтвердити замовлення
                                </button>
                                <a href="{{ route('cart.index') }}" class="btn btn-outline-secondary btn-lg ms-2">
                                    <i class="bi bi-arrow-left"></i> Назад до кошика
                                </a>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Order Summary -->
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="mb-0">Ваше замовлення</h5>
                        </div>
                        <div class="card-body">
                            @foreach($cartItems as $item)
                                <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
                                    @php
                                        $imageUrl = null;
                                        if ($item->product->image) {
                                            if (filter_var($item->product->image, FILTER_VALIDATE_URL)) {
                                                $imageUrl = $item->product->image;
                                            } else {
                                                $imageUrl = asset('storage/' . $item->product->image);
                                            }
                                        }
                                    @endphp
                                    
                                    @if($imageUrl)
                                        <img src="{{ $imageUrl }}" 
                                             class="me-3 rounded" alt="{{ $item->product->name }}"
                                             style="width: 60px; height: 60px; object-fit: cover;"
                                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                        <div class="me-3 bg-light rounded d-flex align-items-center justify-content-center" 
                                             style="width: 60px; height: 60px; display: none;">
                                        </div>
                                    @else
                                        <div class="me-3 bg-light rounded d-flex align-items-center justify-content-center" 
                                             style="width: 60px; height: 60px;">
                                        </div>
                                    @endif
                                    <div class="flex-grow-1">
                                        <h6 class="mb-1">{{ $item->product->name }}</h6>
                                        <small class="text-muted">
                                            {{ $item->quantity }} шт. × {{ number_format($item->product->price, 2) }} ₴
                                        </small>
                                        <div class="fw-bold text-primary">
                                            {{ number_format($item->product->price * $item->quantity, 2) }} ₴
                                        </div>
                                    </div>
                                </div>
                            @endforeach

                            <div class="d-flex justify-content-between mb-2">
                                <span>Товарів:</span>
                                <span>{{ $cartItems->sum('quantity') }} шт.</span>
                            </div>
                            <div class="d-flex justify-content-between mb-2">
                                <span>Сума:</span>
                                <span>{{ number_format($total, 2) }} ₴</span>
                            </div>
                            <div class="d-flex justify-content-between mb-3">
                                <span>Доставка:</span>
                                <span class="text-success">
                                    @if($total >= 1000)
                                        Безкоштовно
                                    @else
                                        50.00 ₴
                                    @endif
                                </span>
                            </div>
                            <hr>
                            <div class="d-flex justify-content-between mb-3">
                                <strong>До сплати:</strong>
                                <strong class="text-primary">
                                    {{ number_format($total >= 1000 ? $total : $total + 50, 2) }} ₴
                                </strong>
                            </div>

                            @if($total < 1000)
                                <div class="alert alert-info">
                                    <small>
                                        <i class="bi bi-info-circle"></i>
                                        Додайте товарів на {{ number_format(1000 - $total, 2) }} ₴ 
                                        для безкоштовної доставки
                                    </small>
                                </div>
                            @endif
                        </div>
                    </div>

                    <!-- Benefits -->
                    <div class="card mt-3">
                        <div class="card-body">
                            <h6 class="card-title">Ваші переваги:</h6>
                            <ul class="list-unstyled small">
                                <li><i class="bi bi-truck text-success"></i> Доставка по Україні</li>
                                <li><i class="bi bi-shield-check text-success"></i> Гарантія на всі товари</li>
                                <li><i class="bi bi-arrow-repeat text-success"></i> Повернення протягом 14 днів</li>
                                <li><i class="bi bi-credit-card text-success"></i> Різні способи оплати</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
