@echo off
echo 🧹 Clearing Laravel caches to fix the duplicate method error...
echo ===============================================================

echo Clearing config cache...
php artisan config:clear

echo Clearing route cache...
php artisan route:clear

echo Clearing view cache...
php artisan view:clear

echo Clearing compiled class cache...
php artisan clear-compiled

echo.
echo ✅ All caches cleared!
echo 🚀 The duplicate method error should now be resolved.
echo.
echo Try starting your server again:
echo   php artisan serve --host=127.0.0.1 --port=8080
echo.
pause
