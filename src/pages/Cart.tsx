import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/home/ProductCard';
import { api } from '../api';

export default function Cart() {
  const { t, i18n } = useTranslation();

  const { cart, clearCart, updateCartQuantity, user } = useAppContext();
  const navigate = useNavigate();

  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      const cartIds = Object.keys(cart);
      try {
        const promises = cartIds.map(id => api.get(`/Products/${id}`).catch(() => null));
        const results = await Promise.all(promises);
        const validProducts = results.filter(p => p !== null);
        
        const mapped = validProducts.map(p => ({
          id: p.id.toString(),
          code: p.id.toString().padStart(6, '0'),
          title: p.name,
          price: p.price,
          oldPrice: p.oldPrice,
          inStock: p.status === 'InStock' || p.status === 'В наличии' || p.status === 'Available',
          images: p.images && p.images.length > 0 ? p.images : ['/subcategories/SUBCATEGORIES-zaglushka.png'],
          specs: p.attributes ? p.attributes.slice(0, 3).map((a: any) => `${a.attributeName.split(' / ')[0]}: ${a.value.split(' / ')[0]}`) : []
        }));
        setCartProducts(mapped);
      } catch (err) {
        console.error('Failed to load cart', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (Object.keys(cart).length > 0) {
      fetchCart();
    } else {
      setCartProducts([]);
      setIsLoading(false);
    }
  }, [cart]);

  const totalPrice = cartProducts.reduce((sum, product) => sum + (product.price * cart[product.id]), 0);
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const handleCheckout = async () => {
    if (!user) {
      alert(i18n.language.startsWith('ru') ? 'Для оформления заказа необходимо войти в аккаунт.' : 'You must log in to place an order.');
      return;
    }

    if (!user.phone || !user.city || !user.street) {
      alert(i18n.language.startsWith('ru')
        ? 'Пожалуйста, укажите ваш номер телефона и полный адрес (город, улица) в личном кабинете перед оформлением заказа.'
        : 'Please fill in your phone number and full address (city, street) in your profile before placing an order.');
      navigate('/profile');
      return;
    }

    const productIds: number[] = [];
    cartProducts.forEach(p => {
      const qty = cart[p.id];
      for (let i = 0; i < qty; i++) {
        productIds.push(parseInt(p.id));
      }
    });

    try {
      await api.post('/Orders', productIds);
      clearCart();
      navigate('/order-status');
    } catch (err) {
      console.error('Failed to create order', err);
      alert(i18n.language.startsWith('ru') ? 'Не удалось оформить заказ. Попробуйте еще раз.' : 'Failed to place order. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <section className="section" style={{ padding: '10px 0 40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <ShoppingCart size={28} color="#A6CE39" />
            <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, margin: 0 }}>
              {t('common.cart')}
            </h1>
          </div>

          {cartProducts.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', alignItems: 'flex-start' }}>
              {/* Левая часть: Товары */}
              <div style={{
                gridColumn: 'span 3',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px'
              }}>
                {cartProducts.map(product => (
                  <ProductCard key={product.id} {...product} isCartView={true} />
                ))}
              </div>

              {/* Правая часть: Оформление */}
              <div style={{
                gridColumn: 'span 1',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid var(--border-color)',
                position: 'sticky',
                top: '100px'
              }}>
                <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
                  {i18n.language.startsWith('ru') ? 'Ваш заказ' : 'Your Order'}
                </h2>

                <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {cartProducts.map(product => (
                    <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '13px' }}>
                      <div style={{ color: '#ccc', paddingRight: '12px', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                        {t(product.title)}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                        <div style={{ color: '#fff', fontWeight: 700, fontSize: '13px' }}>
                          {(product.price * cart[product.id]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} MDL
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => updateCartQuantity(product.id, cart[product.id] - 1)}
                            style={{ width: '22px', height: '22px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: '#1a1b1c', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', opacity: cart[product.id] <= 1 ? 0.3 : 1 }}
                            disabled={cart[product.id] <= 1}
                          >-</button>
                          <span style={{ color: '#A6CE39', fontWeight: 700, width: '16px', textAlign: 'center', fontSize: '14px' }}>{cart[product.id]}</span>
                          <button
                            onClick={() => updateCartQuantity(product.id, cart[product.id] + 1)}
                            style={{ width: '22px', height: '22px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: '#1a1b1c', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}
                          >+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', margin: '0 -24px 20px -24px' }}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ccc', marginBottom: '12px', fontSize: '15px' }}>
                  <span>{i18n.language.startsWith('ru') ? 'Товары' : 'Items'} ({totalItems}):</span>
                  <span>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} MDL</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ccc', marginBottom: '20px', fontSize: '15px' }}>
                  <span>{i18n.language.startsWith('ru') ? 'Доставка' : 'Delivery'}:</span>
                  <span style={{ color: '#A6CE39' }}>{i18n.language.startsWith('ru') ? 'Бесплатно' : 'Free'}</span>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', margin: '0 -24px 20px -24px' }}></div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>
                    {i18n.language.startsWith('ru') ? 'Итого' : 'Total'}:
                  </span>
                  <span style={{ color: '#fff', fontSize: '24px', fontWeight: 700 }}>
                    {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} MDL
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: '#A6CE39',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(166, 206, 57, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#95ba33';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#A6CE39';
                  }}
                >
                  {i18n.language.startsWith('ru') ? 'Оформить заказ' : 'Checkout'}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0', color: '#888' }}>
              <p style={{ fontSize: '18px' }}>
                {i18n.language.startsWith('ru') ? 'Ваша корзина пуста ;)' : 'Your cart is empty ;)'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
