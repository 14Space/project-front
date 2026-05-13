import { PackageSearch, Clock, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { HOT_DEALS } from '../constants/products';

export default function OrderStatus() {
  const { t } = useTranslation();
  const { orders } = useAppContext();

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

          {flattenedOrders.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {flattenedOrders.map((order, idx) => {
                const item = order.currentItem;
                const product = HOT_DEALS.find(p => p.id === item.id);
                const imagePath = product?.images[0] || item.image;

                // Dynamic Status Translation
                let displayStatus = order.status;
                if (order.status === 'pending') {
                  displayStatus = t('adminPage.orders.statusPending');
                } else if (order.status === 'shipped') {
                  displayStatus = t('adminPage.orders.statusShipped');
                } else if (order.status === 'delivered') {
                  displayStatus = t('adminPage.orders.statusDelivered');
                }

                const getStatusColor = (status: string) => {
                  switch (status) {
                    case 'pending': return '#eab308'; // Yellow
                    case 'shipped': return '#3b82f6'; // Blue
                    case 'delivered': return '#A6CE39'; // Green
                    default: return '#888';
                  }
                };
                const statusColor = getStatusColor(order.status);

                // Dynamic Date Formatting (with legacy support)
                let displayDate = order.date;
                const parsedDate = new Date(order.date);
                if (!isNaN(parsedDate.getTime()) && order.date.includes('-')) { // Basic check for ISO or YYYY-MM-DD
                  displayDate = parsedDate.toLocaleDateString(i18n.language.startsWith('ru') ? 'ru-RU' : 'en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  });
                } else if (i18n.language.startsWith('en')) {
                  // Legacy support for hardcoded RU dates (very basic mapping for the screenshot case)
                  displayDate = displayDate
                    .replace('января', 'January').replace('февраля', 'February').replace('марта', 'March')
                    .replace('апреля', 'April').replace('мая', 'May').replace('июня', 'June')
                    .replace('июля', 'July').replace('августа', 'August').replace('сентября', 'September')
                    .replace('октября', 'October').replace('ноября', 'November').replace('декабря', 'December')
                    .replace(' г.', '');
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
                          {t(item.title)}
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
