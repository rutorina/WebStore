<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>@yield('title', 'ТехноСвіт - Інтернет-магазин електроніки')</title>
    <meta name="description" content="@yield('description', 'Купуйте найкращу електроніку в ТехноСвіт. Смартфони, ноутбуки, планшети та аксесуари за найкращими цінами.')">
    
    <!-- Favicon - Modern Shopping Cart Icon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iNiIgZmlsbD0iIzAwN0FGRiIvPgo8cGF0aCBkPSJNNiA4VjZIMlY4SDZaTTggOEgyNkwyNCAxOEg4TDYgOFpNMTAgMjJDMTEuMTA0NiAyMiAxMiAyMS4xMDQ2IDEyIDIwQzEyIDE4Ljg5NTQgMTEuMTA0NiAxOCAxMCAxOEM4Ljg5NTQ0IDE4IDggMTguODk1NCA4IDIwQzggMjEuMTA0NiA4Ljg5NTQ0IDIyIDEwIDIyWk0yMCAyMkMyMS4xMDQ2IDIyIDIyIDIxLjEwNDYgMjIgMjBDMjIgMTguODk1NCAyMS4xMDQ2IDE4IDIwIDE4QzE4Ljg5NTQgMTggMTggMTguODk1NCAxOCAyMEMxOCAyMS4xMDQ2IDE4Ljg5NTQgMjIgMjAgMjJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K">
    <link rel="apple-touch-icon" href="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDE4MCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxODAiIGhlaWdodD0iMTgwIiByeD0iMzAiIGZpbGw9IiMwMDdBRkYiLz4KPHA+Cjxwb2x5Z29uIHBvaW50cz0iMzMsNDUgMzMsMzMuNzUgMTEuMjUsMzMuNzUgMTEuMjUsNDUgMzMsNDUiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik00NSA0NUgxNDYuMjVMMTM1IDEwMS4yNUg0NUwzMyA0NVpNNTYuMjUgMTIzLjc1QzYyLjIzNDQgMTIzLjc1IDY3LjUgMTE4LjQ4NDQgNjcuNSAxMTIuNUM2Ny41IDEwNi41MTU2IDYyLjIzNDQgMTAxLjI1IDU2LjI1IDEwMS4yNUM1MC4yNjU2IDEwMS4yNSA0NSAxMDYuNTE1NiA0NSAxMTIuNUM0NSAxMTguNDg0NCA1MC4yNjU2IDEyMy43NSA1Ni4yNSAxMjMuNzVaTTExMi41IDEyMy43NUMxMTguNDg0NCAxMjMuNzUgMTIzLjc1IDExOC40ODQ0IDEyMy43NSAxMTIuNUMxMjMuNzUgMTA2LjUxNTYgMTE4LjQ4NDQgMTAxLjI1IDExMi41IDEwMS4yNUMxMDYuNTE1NiAxMDEuMjUgMTAxLjI1IDEwNi41MTU2IDEwMS4yNSAxMTIuNUMxMDEuMjUgMTE4LjQ4NDQgMTA2LjUxNTYgMTIzLjc1IDExMi41IDEyMy43NVoiIGZpbGw9IndoaXRlIi8+CjwvcG9seWdvbj4KPC9wYXRoPgo8L3N2Zz4K">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    
    <!-- Custom CSS -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    
    @stack('styles')
</head>
<body data-bs-theme="light" class="d-flex flex-column min-vh-100">
    <div id="app" class="d-flex flex-column flex-grow-1">
        <!-- Header -->
        <header class="bg-primary text-white shadow-sm">
            <div class="container">
                <!-- Top Bar -->
                <div class="row py-2 border-bottom border-white border-opacity-25">
                    <div class="col-md-6">
                        <small>
                            <i class="bi bi-telephone"></i> +380 (44) 123-45-67
                            <span class="ms-3">
                                <i class="bi bi-envelope"></i> info@technosvit.com
                            </span>
                        </small>
                    </div>
                    <div class="col-md-6 text-end">
                        <!-- Theme Toggle -->
                        <button class="btn btn-sm btn-outline-light me-3" id="theme-toggle" title="Перемкнути тему">
                            <i class="bi bi-sun-fill" id="theme-icon"></i>
                        </button>
                        
                        @guest
                            <a href="{{ route('login') }}" class="text-white text-decoration-none me-3">
                                <i class="bi bi-person"></i> Увійти
                            </a>
                            <a href="{{ route('register') }}" class="text-white text-decoration-none">
                                <i class="bi bi-person-plus"></i> Реєстрація
                            </a>
                        @else
                            <div class="dropdown d-inline-block">
                                <a class="text-white text-decoration-none dropdown-toggle" href="#" role="button" id="userDropdown" data-bs-toggle="dropdown">
                                    <i class="bi bi-person-circle"></i> {{ Auth::user()->name }}
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li><a class="dropdown-item" href="{{ route('orders.index') }}">Мої замовлення</a></li>
                                    @if(Auth::user()->isAdmin())
                                        <li><hr class="dropdown-divider"></li>
                                        <li><a class="dropdown-item" href="{{ route('admin.dashboard') }}">Адмін панель</a></li>
                                    @endif
                                    <li><hr class="dropdown-divider"></li>
                                    <li>
                                        <a class="dropdown-item" href="{{ route('logout') }}"
                                           onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                            Вийти
                                        </a>
                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                            @csrf
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        @endguest
                    </div>
                </div>
                
                <!-- Main Header -->
                <div class="row py-3 align-items-center">
                    <div class="col-md-3">
                        <a href="{{ route('home') }}" class="text-white text-decoration-none">
                            <h2 class="mb-0">
                                <i class="bi bi-lightning-charge"></i>
                                ТехноСвіт
                            </h2>
                        </a>
                    </div>
                    
                    <div class="col-md-6">
                        <form action="{{ route('search') }}" method="GET" class="d-flex">
                            <input type="text" name="q" class="form-control me-2" 
                                   placeholder="Пошук товарів..." 
                                   value="{{ request('q') }}">
                            <button type="submit" class="btn btn-light">
                                <i class="bi bi-search"></i>
                            </button>
                        </form>
                    </div>
                    
                    <div class="col-md-3 text-end">
                        <a href="{{ route('cart.index') }}" class="text-white text-decoration-none position-relative">
                            <i class="bi bi-cart3 fs-4"></i>
                            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark" id="cart-count">
                                0
                            </span>
                            <span class="d-none d-md-inline ms-2">Кошик</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
        
        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div class="container">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link {{ request()->routeIs('home') ? 'active' : '' }}" href="{{ route('home') }}">
                                <i class="bi bi-house"></i> Головна
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {{ request()->routeIs('catalog') ? 'active' : '' }}" href="{{ route('catalog') }}">
                                <i class="bi bi-grid"></i> Каталог
                            </a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="categoriesDropdown" role="button" data-bs-toggle="dropdown">
                                <i class="bi bi-list"></i> Категорії
                            </a>
                            <ul class="dropdown-menu" id="categories-menu">
                                @if(isset($navbarCategories) && count($navbarCategories) > 0)
                                    @foreach($navbarCategories as $category)
                                        <li>
                                            <a class="dropdown-item" href="{{ route('category.show', $category->slug) }}">
                                                {{ $category->name_uk }}
                                            </a>
                                        </li>
                                    @endforeach
                                @else
                                    <li><span class="dropdown-item-text text-muted">Немає категорій</span></li>
                                @endif
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        
        <!-- Main Content -->
        <main class="py-4 flex-grow-1">
            @yield('content')
        </main>
        
        <!-- Footer -->
        <footer class="bg-dark text-white py-5 mt-auto">
            <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <h5>ТехноСвіт</h5>
                        <p>Ваш надійний партнер у світі електроніки. Якісні товари за доступними цінами.</p>
                        <div class="d-flex gap-3">
                            <a href="#" class="text-white"><i class="bi bi-facebook"></i></a>
                            <a href="#" class="text-white"><i class="bi bi-instagram"></i></a>
                            <a href="#" class="text-white"><i class="bi bi-telegram"></i></a>
                        </div>
                    </div>
                    
                    <div class="col-md-2">
                        <h6>Каталог</h6>
                        <ul class="list-unstyled">
                            <li><a href="{{ route('catalog', ['category' => 'smartphones']) }}" class="text-white-50 text-decoration-none">Смартфони</a></li>
                            <li><a href="{{ route('catalog', ['category' => 'laptops']) }}" class="text-white-50 text-decoration-none">Ноутбуки</a></li>
                            <li><a href="{{ route('catalog', ['category' => 'tablets']) }}" class="text-white-50 text-decoration-none">Планшети</a></li>
                            <li><a href="{{ route('catalog', ['category' => 'headphones']) }}" class="text-white-50 text-decoration-none">Навушники</a></li>
                        </ul>
                    </div>
                    
                    <div class="col-md-3">
                        <h6>Інформація</h6>
                        <ul class="list-unstyled">
                            <li><a href="#" class="text-white-50 text-decoration-none">Про нас</a></li>
                            <li><a href="#" class="text-white-50 text-decoration-none">Доставка</a></li>
                            <li><a href="#" class="text-white-50 text-decoration-none">Оплата</a></li>
                            <li><a href="#" class="text-white-50 text-decoration-none">Гарантія</a></li>
                        </ul>
                    </div>
                    
                    <div class="col-md-3">
                        <h6>Контакти</h6>
                        <p class="text-white-50 mb-1">
                            <i class="bi bi-geo-alt"></i> м. Київ, вул. Хрещатик, 1
                        </p>
                        <p class="text-white-50 mb-1">
                            <i class="bi bi-telephone"></i> +380 (44) 123-45-67
                        </p>
                        <p class="text-white-50 mb-1">
                            <i class="bi bi-envelope"></i> info@technosvit.com
                        </p>
                    </div>
                </div>
                
                <hr class="border-white border-opacity-25 my-4">
                
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <p class="text-white-50 mb-0">&copy; 2025 ТехноСвіт. Всі права захищені.</p>
                    </div>
                    <div class="col-md-6 text-end">
                        <p class="text-white-50 mb-0">Розроблено з ❤️ в Україні</p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    
    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Custom Scripts -->
    <script>
        // Завантажити кількість товарів у кошику
        fetch('{{ route("api.cart.count") }}')
            .then(response => response.json())
            .then(data => {
                const cartCount = document.getElementById('cart-count');
                if (cartCount) {
                    cartCount.textContent = data.count || 0;
                }
            })
            .catch(error => {
                console.error('Error loading cart count:', error);
            });

        // Theme Toggle Functionality
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        const body = document.body;

        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });

        function setTheme(theme) {
            body.setAttribute('data-bs-theme', theme);
            
            if (theme === 'dark') {
                themeIcon.className = 'bi bi-moon-fill';
                themeToggle.title = 'Перемкнути на світлу тему';
            } else {
                themeIcon.className = 'bi bi-sun-fill';
                themeToggle.title = 'Перемкнути на темну тему';
            }
        }
    </script>
    
    @stack('scripts')
</body>
</html>
