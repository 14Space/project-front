import { useState, useEffect } from 'react';
import ProductCard from '../product/ProductCard';
import { useTranslation } from 'react-i18next';
import { api } from '../../api';

export default function Promotions() {
  const { t } = useTranslation();
  const [discountedProducts, setDiscountedProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchDiscounted = async () => {
      try {
        const data = await api.get('/Products');
        // Filter products that have an oldPrice and take the first 4
        const deals = data.filter((p: any) => p.oldPrice && p.oldPrice > p.price).slice(0, 4);
        setDiscountedProducts(deals);
      } catch (error) {
        console.error("Failed to fetch hot deals", error);
      }
    };
    fetchDiscounted();
  }, []);

  if (discountedProducts.length === 0) {
    return null; // Don't show the section if there are no promotions
  }

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className="title" style={{ marginBottom: '20px' }}>{t('home.promotions')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {discountedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              id={product.id.toString()}
              title={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              images={product.images && product.images.length > 0 ? product.images : ['/products/GPU-zaglushka.png']}
              inStock={product.status !== 'Out of stock'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
