import ProductCard from './ProductCard';
import { useTranslation } from 'react-i18next';

export default function Promotions() {
  const { t } = useTranslation();
  const products = [
    { image: 'https://via.placeholder.com/150', title: 'Видеокарта Gigabyte GeForce RTX 4060 Ti WINDFORCE OC 8G', code: '402123', price: 16999, oldPrice: 18599, status: t('common.inStock') },
    { image: 'https://via.placeholder.com/150', title: 'Процессор AMD Ryzen 5 5600X 3.7(4.6)GHz', code: '392011', price: 6199, oldPrice: 6999, status: t('common.inStock') },
    { image: 'https://via.placeholder.com/150', title: 'Материнская плата Asus TUF GAMING B550-PLUS', code: '310928', price: 5499, status: t('common.inStock') },
    { image: 'https://via.placeholder.com/150', title: 'Ноутбук Lenovo IdeaPad Gaming 3 15ACH6', code: '445901', price: 29999, status: t('common.inStock') },
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className="title">{t('home.promotions')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {products.map((p, idx) => (
            <ProductCard key={idx} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
