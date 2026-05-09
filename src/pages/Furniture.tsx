import { useTranslation } from 'react-i18next';
import ProductGrid from '../components/product/ProductGrid';
import SortButtons from '../components/product/SortButtons';

export default function Furniture() {
  const { t } = useTranslation();
  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '40px' }}>
      <div className="container" style={{ padding: '10px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h1 className="title" style={{ fontSize: '32px', margin: 0, lineHeight: 1.5 }}>{t('catalog.furniture.title')}</h1>
          <SortButtons />
        </div>
        
        <ProductGrid />
      </div>
    </div>
  );
}


