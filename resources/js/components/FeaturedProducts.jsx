import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const ProductCard = ({ product, onAddToCart }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = async () => {
        setIsLoading(true);
        try {
            await onAddToCart(product.id);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="col-md-6 col-lg-3 mb-4">
            <div className="card h-100 shadow-sm product-card">
                {product.old_price && product.old_price > product.price && (
                    <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-danger">
                            -{Math.round(((product.old_price - product.price) / product.old_price) * 100)}%
                        </span>
                    </div>
                )}
                
                <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{height: '200px'}}>
                    {product.images && product.images[0] ? (
                        <img src={product.images[0]} alt={product.name_uk} className="img-fluid" />
                    ) : (
                        <i className="bi bi-image text-muted display-4"></i>
                    )}
                </div>
                
                <div className="card-body d-flex flex-column">
                    <h6 className="card-title">{product.name_uk}</h6>
                    <p className="card-text text-muted small flex-grow-1">
                        {product.short_description_uk && product.short_description_uk.length > 80 
                            ? product.short_description_uk.substring(0, 80) + '...' 
                            : product.short_description_uk}
                    </p>
                    
                    <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <div>
                                <strong className="text-primary h5">
                                    {new Intl.NumberFormat('uk-UA').format(product.price)} ₴
                                </strong>
                                {product.old_price && (
                                    <small className="text-muted text-decoration-line-through ms-1">
                                        {new Intl.NumberFormat('uk-UA').format(product.old_price)} ₴
                                    </small>
                                )}
                            </div>
                            {product.rating > 0 && (
                                <div className="text-warning">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className={`bi bi-star${i < product.rating ? '-fill' : ''}`}></i>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                        <div className="d-flex gap-2">
                            <a href={`/product/${product.slug}`} className="btn btn-outline-primary btn-sm flex-grow-1">
                                <i className="bi bi-eye"></i> Детальніше
                            </a>
                            <button 
                                className="btn btn-primary btn-sm" 
                                onClick={handleAddToCart}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <i className="bi bi-spinner-border spinner-border-sm"></i>
                                ) : (
                                    <i className="bi bi-cart-plus"></i>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeaturedProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFeaturedProducts();
    }, []);

    const fetchFeaturedProducts = async () => {
        try {
            const response = await fetch('/api/products/featured');
            if (!response.ok) throw new Error('Failed to fetch products');
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            const response = await fetch('/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    product_id: productId,
                    quantity: 1
                })
            });

            const data = await response.json();
            
            if (data.error) {
                alert(data.error);
            } else {
                // Оновити лічильник кошика
                const cartCountElement = document.getElementById('cart-count');
                if (cartCountElement) {
                    cartCountElement.textContent = data.cart_count;
                }
                
                // Показати повідомлення про успіх
                const toast = document.createElement('div');
                toast.className = 'toast align-items-center text-bg-success border-0 position-fixed top-0 end-0 m-3';
                toast.style.zIndex = '9999';
                toast.innerHTML = `
                    <div class="d-flex">
                        <div class="toast-body">
                            <i class="bi bi-check-circle me-2"></i>
                            Товар додано до кошика!
                        </div>
                        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                    </div>
                `;
                document.body.appendChild(toast);
                
                const bsToast = new bootstrap.Toast(toast);
                bsToast.show();
                
                // Видалити toast після закриття
                toast.addEventListener('hidden.bs.toast', () => {
                    document.body.removeChild(toast);
                });
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Помилка при додаванні товару до кошика');
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Завантаження...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger text-center">
                <i className="bi bi-exclamation-triangle me-2"></i>
                Помилка завантаження товарів: {error}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-5 text-muted">
                <i className="bi bi-inbox display-4 mb-3"></i>
                <p>Рекомендовані товари не знайдено</p>
            </div>
        );
    }

    return (
        <div className="row g-4">
            {products.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart} 
                />
            ))}
        </div>
    );
};

// Ініціалізація компонента
document.addEventListener('DOMContentLoaded', function() {
    const featuredProductsContainer = document.getElementById('featured-products-react');
    if (featuredProductsContainer) {
        const root = createRoot(featuredProductsContainer);
        root.render(<FeaturedProducts />);
    }
});

export default FeaturedProducts;
