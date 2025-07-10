FROM php:8.2-fpm

# Встановлюємо системні залежності
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    zip \
    unzip \
    nodejs \
    npm

# Очищуємо кеш
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Встановлюємо PHP розширення
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# Отримуємо останню версію Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Створюємо системного користувача для запуску Composer та Artisan
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Встановлюємо робочу директорію
WORKDIR /var/www

# Встановлюємо права доступу для робочої директорії
USER root
RUN chown -R www:www /var/www

# Копіюємо composer.json та package.json спочатку для кешування
COPY --chown=www:www composer.json composer.lock package.json package-lock.json ./

# Встановлюємо залежності
USER www
RUN composer install --no-dev --no-scripts --no-autoloader --no-progress && composer clear-cache
RUN npm ci --silent

# Копіюємо весь код
USER root
COPY --chown=www:www . .

# Завершуємо установку Composer та збираємо фронтенд
USER www
RUN composer dump-autoload --optimize
RUN npm run build

# Налаштовуємо права доступу
USER root
RUN chown -R www:www /var/www/storage /var/www/bootstrap/cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

USER www

# Expose порт 9000 та запускаємо php-fpm сервер
EXPOSE 9000
CMD ["php-fpm"]
