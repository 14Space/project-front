import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ProductGrid from '../components/product/ProductGrid';
import SortButtons from '../components/product/SortButtons';
import DynamicCategoryFilters from '../components/product/DynamicCategoryFilters';
import { useCategoryProducts } from '../hooks/useCategoryProducts';

export default function GPUs() {
  const { t } = useTranslation();
  
  const [activeSort, setActiveSort] = useState('popularity');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<Record<number, string[]>>({});
  
  const { products: apiProducts, isLoading } = useCategoryProducts('Видеокарты', {
    minPrice,
    maxPrice,
    selectedFilters
  });
  
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...apiProducts];

    if (activeSort === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'popularity') {
      result.sort((a, b) => a.id.localeCompare(b.id));
    }

    return result;
  }, [activeSort, apiProducts]);

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '40px' }}>
      <div className="container" style={{ padding: '10px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h1 className="title" style={{ fontSize: '32px', margin: 0, lineHeight: 1.5 }}>{t('sidebar.gpus')}</h1>
          <SortButtons onSortChange={setActiveSort} />
        </div>
        
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>Загрузка товаров...</div>
        ) : (
          <ProductGrid 
            products={filteredAndSortedProducts} 
            sidebar={
              <DynamicCategoryFilters 
                categoryName="Видеокарты"
                selectedFilters={selectedFilters}
                onFilterChange={setSelectedFilters}
                minPrice={minPrice}
                onMinPriceChange={setMinPrice}
                maxPrice={maxPrice}
                onMaxPriceChange={setMaxPrice}
              />
            } 
          />
        )}
      </div>
    </div>
  );
}


