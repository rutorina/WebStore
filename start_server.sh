#!/bin/bash

echo "🚀 Starting ТехноСвіт Web Store..."
echo "=================================="

# Clear caches
echo "🧹 Clearing caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Check environment
echo "🔍 Environment check:"
echo "   APP_URL: $(grep APP_URL .env | cut -d '=' -f2)"
echo "   Environment: $(grep APP_ENV .env | cut -d '=' -f2)"

# Start server
echo ""
echo "🌐 Starting Laravel development server..."
echo "📱 Available URLs:"
echo "   🏠 Home: http://localhost:8080/"
echo "   🏠 Home (redirect): http://localhost:8080/home"
echo "   📦 Catalog: http://localhost:8080/catalog"
echo "   🔗 Categories API: http://localhost:8080/api/categories/menu"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

php artisan serve --host=127.0.0.1 --port=8080
