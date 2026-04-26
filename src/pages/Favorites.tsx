import { useAppContext } from '../context/AppContext';
import { HOT_DEALS } from '../constants/products';
import ProductCard from '../components/home/ProductCard';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';

export default function Favorites() {
  const { favorites } = useAppContext();
  const { t, i18n } = useTranslation();

  const favoriteProducts = HOT_DEALS.filter(product => favorites.includes(product.id));

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh' }}>
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Heart size={28} color="#FF1717" fill="#FF1717" />
            <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, margin: 0 }}>
              {t('common.favorites')}
            </h1>
          </div>
          
          {favoriteProducts.length > 0 ? (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '20px' 
            }}>
              {favoriteProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0', color: '#888' }}>
              <p style={{ fontSize: '18px' }}>
                {i18n.language.startsWith('ru') ? 'Тут пока ничего нет ;)' : 'Nothing here yet ;)'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
