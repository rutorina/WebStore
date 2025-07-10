# ТехноСвіт - Laravel E-commerce Store

## Quick Start

### Prerequisites
- PHP 8.2+
- Composer
- Node.js & npm
- Docker Desktop

### Setup

1. **Start Docker services:**
   ```bash
   docker-compose up -d
   ```

2. **Install dependencies:**
   ```bash
   composer install
   npm install
   ```

3. **Run migrations and seed database:**
   ```bash
   php artisan migrate --seed
   ```

4. **Build assets:**
   ```bash
   npm run build
   ```

### Development

**Start the application (2 terminals):**

Terminal 1 - Laravel server:
```bash
php artisan serve --port=8080
```

Terminal 2 - Vite dev server (for hot reload):
```bash
npm run dev
```

### Access

- **Website:** http://localhost:8080
- **Admin Panel:** http://localhost:8080/admin
- **Admin Login:** admin@technosvit.com / admin123

### Services

- **PostgreSQL:** localhost:5433
- **Redis:** localhost:6380

### Features

- ✅ Ukrainian localization
- ✅ Product catalog with categories
- ✅ Shopping cart
- ✅ Order management
- ✅ Admin panel
- ✅ React components with hot reload
- ✅ Bootstrap 5 UI
- ✅ PostgreSQL database
- ✅ Redis caching

### Project Structure

```
├── app/
│   ├── Http/Controllers/     # Controllers
│   ├── Models/              # Eloquent models
│   └── Http/Middleware/     # Custom middleware
├── database/
│   ├── migrations/          # Database migrations
│   └── seeders/            # Database seeders
├── resources/
│   ├── views/              # Blade templates
│   ├── js/                 # React components
│   └── css/                # Styles
└── routes/
    └── web.php             # Web routes
```
