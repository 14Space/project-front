import { useTranslation } from 'react-i18next';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ProductGrid from '../components/product/ProductGrid';
import SortButtons from '../components/product/SortButtons';

export default function Components() {
  const { t } = useTranslation();
  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '60px' }}>
      <div className="container" style={{ padding: '5px 20px 0' }}>
        <Breadcrumbs items={[{ label: t('catalog.components.title'), active: true }]} />
      </div>

      <div className="container" style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 className="title" style={{ fontSize: '32px', margin: 0 }}>{t('catalog.components.title')}</h1>
          <SortButtons />
        </div>
        
        <ProductGrid />
      </div>
    </div>
  );
}
