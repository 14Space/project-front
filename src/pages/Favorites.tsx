import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/home/ProductCard';
import { useTranslation } from 'react-i18next';
import { Heart } from 'lucide-react';
import { api } from '../api';

export default function Favorites() {
  const { favorites } = useAppContext();
  const { t, i18n } = useTranslation();
  const [favoriteProducts, setFavoriteProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const promises = favorites.map(id => api.get(`/Products/${id}`).catch(() => null));
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
        setFavoriteProducts(mapped);
      } catch (err) {
        console.error('Failed to load favorites', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (favorites.length > 0) {
      fetchFavorites();
    } else {
      setFavoriteProducts([]);
      setIsLoading(false);
    }
  }, [favorites]);

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <section className="section" style={{ padding: '10px 0 40px 0' }}>
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
