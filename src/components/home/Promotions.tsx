import ProductCard from './ProductCard';
import { useTranslation } from 'react-i18next';
import { HOT_DEALS } from '../../constants/products';

export default function Promotions() {
  const { t } = useTranslation();

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className="title" style={{ marginBottom: '20px' }}>{t('home.promotions')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {HOT_DEALS.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
