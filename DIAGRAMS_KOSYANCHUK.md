# ДІАГРАМИ ДЛЯ ПРОЄКТУ KOSYANCHUK
## Файл для імпорту в Draw.io

### Аркуш 1: Діаграма прецедентів (Use Case Diagram)
```
Назва аркуша: "Діаграма прецедентів системи ТехноСвіт"

Актори:
- Відвідувач (Visitor)
- Зареєстрований користувач (Registered User)  
- Адміністратор (Administrator)

Прецеденти:
1. Перегляд каталогу товарів
2. Пошук товарів
3. Фільтрація за категоріями
4. Реєстрація в системі
5. Авторизація
6. Додавання товару в кошик
7. Оформлення замовлення
8. Перегляд історії замовлень
9. Управління товарами
10. Управління категоріями
11. Управління замовленнями

Зв'язки:
- Відвідувач → Перегляд каталогу
- Відвідувач → Пошук товарів
- Відвідувач → Фільтрація
- Відвідувач → Реєстрація
- Зареєстрований користувач → extends Відвідувач
- Зареєстрований користувач → Авторизація
- Зареєстрований користувач → Додавання в кошик
- Зареєстрований користувач → Оформлення замовлення
- Зареєстрований користувач → Історія замовлень
- Адміністратор → Управління товарами
- Адміністратор → Управління категоріями
- Адміністратор → Управління замовленнями
```

### Аркуш 2: ER-діаграма (Entity Relationship Diagram)
```
Назва аркуша: "ER-діаграма бази даних системи"

Сутності:

1. Users (Користувачі)
   - id (PK, INT)
   - name (VARCHAR)
   - email (VARCHAR, UNIQUE)
   - password (VARCHAR)
   - is_admin (BOOLEAN)
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)

2. Categories (Категорії)
   - id (PK, INT)
   - name_uk (VARCHAR)
   - name_en (VARCHAR)
   - slug (VARCHAR, UNIQUE)
   - description_uk (TEXT)
   - description_en (TEXT)
   - is_active (BOOLEAN)
   - sort_order (INT)
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)

3. Products (Товари)
   - id (PK, INT)
   - category_id (FK, INT)
   - name_uk (VARCHAR)
   - name_en (VARCHAR)
   - description_uk (TEXT)
   - description_en (TEXT)
   - short_description_uk (TEXT)
   - short_description_en (TEXT)
   - sku (VARCHAR, UNIQUE)
   - slug (VARCHAR, UNIQUE)
   - price (DECIMAL)
   - old_price (DECIMAL)
   - quantity (INT)
   - images (JSON)
   - image_url (VARCHAR)
   - specifications (JSON)
   - weight (DECIMAL)
   - brand (VARCHAR)
   - model (VARCHAR)
   - is_active (BOOLEAN)
   - is_featured (BOOLEAN)
   - views_count (INT)
   - rating (DECIMAL)
   - reviews_count (INT)
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)

4. Cart_Items (Кошик)
   - id (PK, INT)
   - user_id (FK, INT)
   - product_id (FK, INT)
   - quantity (INT)
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)

5. Orders (Замовлення)
   - id (PK, INT)
   - user_id (FK, INT)
   - total_amount (DECIMAL)
   - status (ENUM: pending, processing, shipped, delivered, cancelled)
   - customer_name (VARCHAR)
   - customer_email (VARCHAR)
   - customer_phone (VARCHAR)
   - shipping_address (TEXT)
   - notes (TEXT)
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)

6. Order_Items (Позиції замовлення)
   - id (PK, INT)
   - order_id (FK, INT)
   - product_id (FK, INT)
   - quantity (INT)
   - price (DECIMAL)
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)

Зв'язки:
- Categories (1) → Products (M): category_id
- Users (1) → Cart_Items (M): user_id
- Products (1) → Cart_Items (M): product_id
- Users (1) → Orders (M): user_id
- Orders (1) → Order_Items (M): order_id
- Products (1) → Order_Items (M): product_id
```

### Аркуш 3: Діаграма класів (Class Diagram)
```
Назва аркуша: "Діаграма класів системи ТехноСвіт"

Класи:

1. User
   Атрибути:
   - id: int
   - name: string
   - email: string
   - password: string
   - is_admin: boolean
   
   Методи:
   + register(): boolean
   + login(): boolean
   + logout(): void
   + updateProfile(): boolean
   + getOrders(): Order[]

2. Category
   Атрибути:
   - id: int
   - name_uk: string
   - name_en: string
   - slug: string
   - is_active: boolean
   - sort_order: int
   
   Методи:
   + create(): boolean
   + update(): boolean
   + delete(): boolean
   + getProducts(): Product[]
   + isActive(): boolean

3. Product
   Атрибути:
   - id: int
   - category_id: int
   - name_uk: string
   - price: decimal
   - quantity: int
   - images: array
   - is_active: boolean
   - is_featured: boolean
   
   Методи:
   + create(): boolean
   + update(): boolean
   + delete(): boolean
   + getCategory(): Category
   + isInStock(): boolean
   + getMainImage(): string
   + updateStock(int quantity): void

4. CartItem
   Атрибути:
   - id: int
   - user_id: int
   - product_id: int
   - quantity: int
   
   Методи:
   + add(): boolean
   + update(): boolean
   + remove(): boolean
   + getTotal(): decimal

5. Order
   Атрибути:
   - id: int
   - user_id: int
   - total_amount: decimal
   - status: string
   - customer_name: string
   - shipping_address: string
   
   Методи:
   + create(): boolean
   + updateStatus(string status): boolean
   + getItems(): OrderItem[]
   + calculateTotal(): decimal

6. OrderItem
   Атрибути:
   - id: int
   - order_id: int
   - product_id: int
   - quantity: int
   - price: decimal
   
   Методи:
   + getSubtotal(): decimal
   + getProduct(): Product

Зв'язки:
- User (1) ←→ (0..*) Order
- User (1) ←→ (0..*) CartItem
- Category (1) ←→ (0..*) Product
- Product (1) ←→ (0..*) CartItem
- Product (1) ←→ (0..*) OrderItem
- Order (1) ←→ (1..*) OrderItem
```

### Аркуш 4: Діаграма діяльності (Activity Diagram)
```
Назва аркуша: "Діаграма діяльності - Процес оформлення замовлення"

Учасники:
- Покупець
- Система
- База даних

Процес:
1. [Початок] → Покупець натискає "Оформити замовлення"
2. Система → Перевірка авторизації
3. [Умова] Користувач авторизований?
   - НІ → Перенаправлення на сторінку входу → Авторизація → Повернення до кошика
   - ТАК → Продовження
4. Система → Отримання товарів з кошика
5. Система → Перевірка наявності товарів
6. [Умова] Всі товари доступні?
   - НІ → Повідомлення про недоступні товари → Оновлення кошика
   - ТАК → Продовження
7. Система → Відображення форми замовлення
8. Покупець → Заповнення контактних даних
9. Покупець → Вибір способу доставки
10. Покупець → Підтвердження замовлення
11. Система → Валідація даних форми
12. [Умова] Дані коректні?
    - НІ → Відображення помилок валідації → Повернення до форми
    - ТАК → Продовження
13. Система → Створення замовлення в БД
14. Система → Очищення кошика
15. Система → Відправка email підтвердження
16. Система → Відображення сторінки успіху
17. [Кінець]

Альтернативні потоки:
- Скасування на будь-якому етапі → Повернення до кошика
- Помилка системи → Відображення сторінки помилки
```

### Аркуш 5: Діаграма послідовності (Sequence Diagram)  
```
Назва аркуша: "Діаграма послідовності - Додавання товару в кошик"

Учасники:
- Користувач
- Веб-браузер
- CartController
- Product Model
- CartItem Model
- База даних
- Session

Послідовність дій:
1. Користувач → Веб-браузер: Натискає "Додати в кошик"
2. Веб-браузер → CartController: POST /cart/add {product_id, quantity}
3. CartController → CartController: Валідація запиту
4. CartController → Product Model: findOrFail(product_id)
5. Product Model → База даних: SELECT * FROM products WHERE id=?
6. База даних → Product Model: Дані про товар
7. Product Model → CartController: Об'єкт Product
8. CartController → Product Model: Перевірка наявності (quantity >= requested)
9. Product Model → CartController: Результат перевірки
10. [Умова] Товар доступний?
    - НІ → CartController → Веб-браузер: JSON response {error: "Товар недоступний"}
    - ТАК → Продовження
11. CartController → Session: Отримання session_id
12. Session → CartController: session_id
13. CartController → CartItem Model: updateOrCreate({session_id, product_id}, {quantity})
14. CartItem Model → База даних: INSERT/UPDATE cart_items
15. База даних → CartItem Model: Підтвердження
16. CartItem Model → CartController: Об'єкт CartItem
17. CartController → Session: Оновлення cart_count
18. CartController → Веб-браузер: JSON response {success: true, cart_count}
19. Веб-браузер → Користувач: Оновлення UI (лічильник кошика)

Виключні ситуації:
- Помилка валідації → Повернення JSON error
- Товар не знайдено → 404 error
- Помилка БД → 500 internal server error
```

### Аркуш 6: BPMN діаграма
```
Назва аркуша: "BPMN діаграма - Бізнес-процес управління замовленнями"

Учасники:
- Клієнт (Customer)
- Система (System)
- Адміністратор (Administrator)
- Служба доставки (Delivery Service)

Процес:
1. [Початок] → Клієнт оформляє замовлення
2. Система → Автоматична перевірка даних
3. [Шлюз] Дані коректні?
   - НІ → Повернення до клієнта з помилками
   - ТАК → Продовження
4. Система → Створення замовлення зі статусом "Нове"
5. Система → Відправка email клієнту
6. [Подія] Нове замовлення створено
7. Адміністратор → Отримує сповіщення про нове замовлення
8. Адміністратор → Перевіряє замовлення
9. [Шлюз] Замовлення підтверджено?
   - НІ → Адміністратор → Скасування замовлення → Повідомлення клієнта → [Кінець]
   - ТАК → Продовження
10. Адміністратор → Змінює статус на "В обробці"
11. Адміністратор → Формує пакування товарів
12. Адміністратор → Передає замовлення службі доставки
13. Адміністратор → Змінює статус на "Відправлено"
14. Система → Відправка email клієнту з трек-номером
15. Служба доставки → Доставляє товар
16. [Подія] Товар доставлено
17. Служба доставки → Повідомляє про доставку
18. Адміністратор → Змінює статус на "Доставлено"
19. Система → Відправка email про успішну доставку
20. [Кінець]

Підпроцеси:
- Валідація замовлення
- Обробка платежу
- Формування звітності
```

### Аркуш 7: DFD Діаграма потоків даних
```
Назва аркуша: "DFD - Діаграма потоків даних рівень 0"

Зовнішні сутності:
- Клієнт
- Адміністратор
- Постачальник
- Платіжна система

Центральний процес:
P1: Система електронного магазину

Потоки даних:
1. Клієнт → P1: Запит каталогу, Дані реєстрації, Дані замовлення
2. P1 → Клієнт: Каталог товарів, Підтвердження реєстрації, Статус замовлення
3. Адміністратор → P1: Дані товарів, Управління категоріями, Налаштування
4. P1 → Адміністратор: Звіти, Дані аналітики, Статуси систем
5. Постачальник → P1: Інформація про товари, Оновлення наявності
6. P1 → Постачальник: Запити на поповнення, Звіти продажів
7. Платіжна система → P1: Підтвердження платежу, Дані транзакції
8. P1 → Платіжна система: Запит на оплату, Дані платежу

Сховища даних:
D1: База даних користувачів
D2: База даних товарів
D3: База даних замовлень
D4: База даних категорій
D5: Логи системи
```

### Аркуш 8: SADT діаграма
```
Назва аркуша: "SADT діаграма - Контекстна діаграма системи"

Функція: A0 - Управління електронним магазином

Входи (Input):
- Запити клієнтів
- Дані про товари
- Дані замовлень
- Налаштування системи

Виходи (Output):
- Каталог товарів
- Оформлені замовлення
- Звіти та аналітика
- Підтвердження операцій

Управління (Control):
- Бізнес-правила
- Політики безпеки
- Регламенти процесів
- Законодавчі вимоги

Механізми (Mechanism):
- Laravel Framework
- MySQL/SQLite база даних
- Веб-сервер Apache/Nginx
- PHP 8.1+
- HTML/CSS/JavaScript

Декомпозиція A0:
A1: Управління каталогом товарів
A2: Обробка замовлень клієнтів
A3: Управління користувачами
A4: Адміністрування системи
```

### Аркуш 9: Архітектурна діаграма
```
Назва аркуша: "Архітектурна діаграма системи ТехноСвіт"

Рівні архітектури:

1. Рівень представлення (Presentation Layer):
   - Веб-браузер клієнта
   - Мобільний браузер
   - Адміністративна панель

2. Рівень веб-сервера (Web Server Layer):
   - Apache/Nginx
   - SSL/TLS сертифікати
   - Балансування навантаження

3. Рівень додатку (Application Layer):
   - Laravel Framework
   - PHP 8.1 Runtime
   - Composer (Dependency Manager)

4. Рівень бізнес-логіки (Business Logic Layer):
   - Controllers (Контролери)
   - Models (Моделі)
   - Services (Сервіси)
   - Middleware (Проміжне ПЗ)

5. Рівень даних (Data Layer):
   - Eloquent ORM
   - Database Migrations
   - Seeders

6. Рівень бази даних (Database Layer):
   - SQLite (розробка)
   - MySQL (продакшн)
   - Redis (кешування)

7. Рівень зовнішніх сервісів (External Services):
   - Email провайдер
   - Файлове сховище
   - API інтеграції

Компоненти:
- Frontend: Blade + Tailwind CSS + Alpine.js
- Backend: Laravel Controllers + Models
- API: RESTful endpoints
- Authentication: Laravel Sanctum
- File Storage: Local/Cloud storage
- Session Management: Database/Redis
```

## Інструкції для імпорту в Draw.io:

1. Відкрийте draw.io (app.diagrams.net)
2. Створіть новий файл з назвою "Kosyanchuk_Diagrams"
3. Для кожного аркуша:
   - Додайте новий аркуш
   - Назвіть його відповідно до опису вище
   - Створіть діаграму на основі наданого опису
4. Збережіть файл у форматі .drawio

Кожна діаграма має бути максимально деталізованою та відповідати стандартам UML/BPMN.
