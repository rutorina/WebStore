@echo off
echo 🚀 Starting ТехноСвіт Web Store...
echo ==================================

echo 🧹 Clearing caches...
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo.
echo 🔍 Environment check:
findstr "APP_URL" .env
findstr "APP_ENV" .env

echo.
echo 🌐 Starting Laravel development server...
echo 📱 Available URLs:
echo    🏠 Home: http://localhost:8080/
echo    🏠 Home (redirect): http://localhost:8080/home
echo    📦 Catalog: http://localhost:8080/catalog
echo    🔗 Categories API: http://localhost:8080/api/categories/menu
echo.
echo Press Ctrl+C to stop the server
echo.

php artisan serve --host=127.0.0.1 --port=8080
