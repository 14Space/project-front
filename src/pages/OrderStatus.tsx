import { PackageSearch, Clock, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { HOT_DEALS } from '../constants/products';
import { api } from '../api';
import { useEffect, useState } from 'react';

export default function OrderStatus() {
  const { t, i18n } = useTranslation();
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res: any = await api.get('/Orders/my');
        setOrders(res);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // Flatten orders: split each order into separate blocks per item
  const flattenedOrders = orders.flatMap(order => 
    order.items.map(item => ({
      ...order,
      currentItem: item
    }))
  );

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '60vh' }}>
      <section className="section" style={{ padding: '10px 0 40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <PackageSearch size={28} color="#A6CE39" />
            <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, margin: 0 }}>
              {t('orderStatus.titles.main')}
            </h1>
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '100px 0', color: '#888' }}>
              <p style={{ fontSize: '18px' }}>
                {t('common.loading', 'Loading...')}
              </p>
            </div>
          ) : flattenedOrders.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {flattenedOrders.map((order, idx) => {
                const item = order.currentItem;
                const itemId = item.id || item.productId;
                const product = HOT_DEALS.find(p => p.id === itemId?.toString());
                const imagePath = product?.images[0] || item.image;

                // Dynamic Status Translation
                let displayStatus = order.status;
                if (order.status === 'pending') {
                  displayStatus = t('adminPage.orders.statusPending');
                } else if (order.status === 'shipped') {
                  displayStatus = t('adminPage.orders.statusShipped');
                } else if (order.status?.toLowerCase() === 'delivered') {
                  displayStatus = t('adminPage.orders.statusDelivered', 'Доставлен');
                } else if (order.status?.toLowerCase() === 'returned') {
                  displayStatus = t('adminPage.orders.statusReturned', 'Возврат');
                }

                const getStatusColor = (status: string) => {
                  switch (status) {
                    case 'pending': return '#eab308'; // Yellow
                    case 'shipped': return '#3b82f6'; // Blue
                    case 'delivered': return '#A6CE39'; // Green
                    case 'returned': return '#ff4d4d'; // Red
                    default: return '#888';
                  }
                };
                const statusColor = getStatusColor(order.status);

                // Dynamic Date Formatting
                let displayDate = order.orderDate || order.date;
                const parsedDate = new Date(order.orderDate || order.date);
                if (!isNaN(parsedDate.getTime())) {
                  displayDate = parsedDate.toLocaleDateString(i18n.language.startsWith('ru') ? 'ru-RU' : 'en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  });
                }

                return (
                  <div 
                    key={`${order.id}-${idx}`}
                    style={{
                      backgroundColor: 'var(--card-bg)',
                      borderRadius: '16px',
                      padding: '0 24px 0 0',
                      border: '1px solid var(--border-color)',
                      display: 'grid',
                      gridTemplateColumns: 'auto 1fr auto',
                      alignItems: 'center',
                      gap: '24px',
                      overflow: 'hidden',
                      height: '160px'
                    }}
                  >
                    {/* Product Image Preview */}
                    <div style={{ 
                      width: '160px', 
                      height: '100%',
                      backgroundColor: '#0c0d0d', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      padding: '12px',
                      borderRight: '1px solid #333'
                    }}>
                      {imagePath ? (
                        <img 
                           src={imagePath.startsWith('http') ? imagePath : `/products/${imagePath}`} 
                          alt={item.title} 
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                      ) : (
                        <PackageSearch size={32} color="#333" />
                      )}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>#{order.id}</span>
                        <span style={{ 
                          backgroundColor: `${statusColor}20`, 
                          color: statusColor, 
                          border: `1px solid ${statusColor}40`,
                          fontSize: '12px', 
                          fontWeight: 700, 
                          padding: '4px 12px', 
                          borderRadius: '20px'
                        }}>
                          {displayStatus}
                        </span>
                      </div>
                      <div style={{ color: '#888', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={14} />
                        {displayDate}
                      </div>
                      <div style={{ marginTop: '16px' }}>
                        <div style={{ color: '#ccc', fontSize: '15px', fontWeight: 600, marginBottom: '4px' }}>
                          {t(item.title || item.name)}
                        </div>
                        <div style={{ color: '#888', fontSize: '13px' }}>
                          {t('orderStatus.quantity')}: {item.quantity}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
                        {(item.price * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} MDL
                      </div>
                      <button style={{ 
                        backgroundColor: 'transparent', 
                        border: '1px solid #333', 
                        color: '#888', 
                        padding: '8px 16px', 
                        borderRadius: '8px', 
                        fontSize: '14px', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#A6CE39'; e.currentTarget.style.color = '#A6CE39'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#888'; }}
                      >
                        {t('orderStatus.details')}
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0', color: '#888' }}>
              <p style={{ fontSize: '18px' }}>
                {t('orderStatus.empty')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
