import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ProductGrid from '../components/product/ProductGrid';
import SortButtons from '../components/product/SortButtons';
import DynamicCategoryFilters from '../components/product/DynamicCategoryFilters';
import { useCategoryProducts } from '../hooks/useCategoryProducts';

export default function Cases() {
  const { t } = useTranslation();
  
  const [activeSort, setActiveSort] = useState('popularity');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<Record<number, string[]>>({});
  
  // Backend fetching and filtering
  const { products: apiProducts, isLoading } = useCategoryProducts('Корпуса', {
    minPrice,
    maxPrice,
    selectedFilters
  });
  
  // Сортировка данных
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...apiProducts];

    // Логика сортировки
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
          <h1 className="title" style={{ fontSize: '32px', margin: 0, lineHeight: 1.5 }}>{t('sidebar.cases')}</h1>
          <SortButtons onSortChange={setActiveSort} />
        </div>
        
        <ProductGrid
          products={filteredAndSortedProducts}
          isLoading={isLoading}
          sidebar={
            <DynamicCategoryFilters
              categoryName="Корпуса"
              selectedFilters={selectedFilters}
              onFilterChange={setSelectedFilters}
              minPrice={minPrice}
              onMinPriceChange={setMinPrice}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
            />
          }
        />
      </div>
    </div>
  );
}



