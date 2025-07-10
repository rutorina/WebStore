@extends('layouts.app')

@section('title', 'Мої замовлення - ТехноСвіт')
@section('description', 'Перегляд історії ваших замовлень')

@section('content')
<div class="container my-4">
    <div class="row">
        <div class="col-12">
            <h1><i class="bi bi-bag-check"></i> Мої замовлення</h1>
            
            @if($orders->count() > 0)
                <div class="row">
                    @foreach($orders as $order)
                        <div class="col-12 mb-4">
                            <div class="card">
                                <div class="card-header d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 class="mb-0">Замовлення #{{ $order->id }}</h5>
                                        <small class="text-muted">{{ $order->created_at->format('d.m.Y H:i') }}</small>
                                    </div>
                                    <div class="text-end">
                                        <span class="badge 
                                            @if($order->status === 'pending') bg-warning
                                            @elseif($order->status === 'processing') bg-info
                                            @elseif($order->status === 'shipped') bg-primary
                                            @elseif($order->status === 'delivered') bg-success
                                            @elseif($order->status === 'cancelled') bg-danger
                                            @else bg-secondary
                                            @endif
                                        ">
                                            @switch($order->status)
                                                @case('pending')
                                                    Очікує обробки
                                                    @break
                                                @case('processing')
                                                    В обробці
                                                    @break
                                                @case('shipped')
                                                    Відправлено
                                                    @break
                                                @case('delivered')
                                                    Доставлено
                                                    @break
                                                @case('cancelled')
                                                    Скасовано
                                                    @break
                                                @default
                                                    {{ ucfirst($order->status) }}
                                            @endswitch
                                        </span>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <h6>Товари в замовленні:</h6>
                                            @foreach($order->orderItems->take(3) as $item)
                                                <div class="d-flex align-items-center mb-2">
                                                    @php
                                                        $imageUrl = null;
                                                        if ($item->product && $item->product->image) {
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
                                                             style="width: 50px; height: 50px; object-fit: cover;"
                                                             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                                        <div class="me-3 bg-light rounded d-flex align-items-center justify-content-center" 
                                                             style="width: 50px; height: 50px; display: none;">
                                                        </div>
                                                    @else
                                                        <div class="me-3 bg-light rounded d-flex align-items-center justify-content-center" 
                                                             style="width: 50px; height: 50px;">
                                                        </div>
                                                    @endif
                                                    <div>
                                                        @if($item->product)
                                                            <div class="fw-semibold">{{ $item->product->name }}</div>
                                                        @else
                                                            <div class="fw-semibold text-muted">Товар видалено</div>
                                                        @endif
                                                        <small class="text-muted">
                                                            {{ $item->quantity }} шт. × {{ number_format($item->price, 2) }} ₴
                                                        </small>
                                                    </div>
                                                </div>
                                            @endforeach
                                            @if($order->orderItems->count() > 3)
                                                <small class="text-muted">
                                                    і ще {{ $order->orderItems->count() - 3 }} {{ Str::plural('товар', $order->orderItems->count() - 3, ['товар', 'товари', 'товарів']) }}
                                                </small>
                                            @endif
                                        </div>
                                        <div class="col-md-4 text-md-end">
                                            <div class="mb-2">
                                                <strong>Сума: {{ number_format($order->total_amount, 2) }} ₴</strong>
                                            </div>
                                            <div class="mb-2">
                                                <small class="text-muted">
                                                    <i class="bi bi-geo-alt"></i> {{ $order->delivery_address }}
                                                </small>
                                            </div>
                                            <div class="mb-2">
                                                <small class="text-muted">
                                                    <i class="bi bi-telephone"></i> {{ $order->phone }}
                                                </small>
                                            </div>
                                            <a href="{{ route('orders.show', $order) }}" class="btn btn-outline-primary btn-sm">
                                                Детальніше
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>

                <!-- Pagination -->
                <div class="d-flex justify-content-center">
                    {{ $orders->links() }}
                </div>
            @else
                <div class="text-center py-5">
                    <i class="bi bi-bag" style="font-size: 5rem; color: #6c757d;"></i>
                    <h3 class="mt-3 text-muted">У вас ще немає замовлень</h3>
                    <p class="text-muted">Оформіть ваше перше замовлення в нашому магазині</p>
                    <a href="{{ route('catalog') }}" class="btn btn-primary mt-3">
                        <i class="bi bi-bag"></i> Почати покупки
                    </a>
                </div>
            @endif
        </div>
    </div>
</div>
@endsection
