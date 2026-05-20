import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import SortButtons from '../components/product/SortButtons';
import CoolingFilters from '../components/product/CoolingFilters';
import { useCategoryProducts } from '../hooks/useCategoryProducts';

export default function Cooling() {
  const { t } = useTranslation();
  
  const [activeSort, setActiveSort] = useState('popularity');
  const { products: apiProducts, isLoading } = useCategoryProducts('Охлаждение');
  
  // Состояния фильтров
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedPopular, setSelectedPopular] = useState<string[]>([]);
  const [selectedFanSizes, setSelectedFanSizes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [selectedSockets, setSelectedSockets] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTDP, setSelectedTDP] = useState<string[]>([]);
  const [selectedFanCounts, setSelectedFanCounts] = useState<string[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const subcat = searchParams.get('subcategory');
    if (subcat) {
      const mapping: Record<string, string> = {
        'Водяное охлаждение': 'Водяное охлаждение для Intel 1700/AMD AM5',
        'Воздушное охлаждение': 'Воздушный кулер для Intel 1700/AMD AM5',
        'Вентиляторы': 'Вентиляторы с подсветкой'
      };
      const filterValue = mapping[subcat];
      if (filterValue) {
        setSelectedPopular([filterValue]);
      }
    }
  }, [searchParams]);

  const toggleFilter = (setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  // Фильтрация
  const filteredProducts = useMemo(() => {
    let result = [...apiProducts];

    if (minPrice) result = result.filter(p => p.price >= parseInt(minPrice));
    if (maxPrice) result = result.filter(p => p.price <= parseInt(maxPrice));

    // Сортировка
    if (activeSort === 'price_asc') result.sort((a, b) => a.price - b.price);
    else if (activeSort === 'price_desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [activeSort, minPrice, maxPrice, apiProducts]);

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '40px' }}>
      <div className="container" style={{ padding: '10px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h1 className="title" style={{ fontSize: '32px', margin: 0, lineHeight: 1.5 }}>{t('sidebar.cooling')}</h1>
          <SortButtons onSortChange={setActiveSort} />
        </div>
        
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>Загрузка товаров...</div>
        ) : (
          <ProductGrid 
            products={filteredProducts}
            sidebar={
            <CoolingFilters 
              minPrice={minPrice}
              onMinPriceChange={setMinPrice}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              selectedPopular={selectedPopular}
              onPopularChange={(val) => toggleFilter(setSelectedPopular, val)}
              selectedFanSizes={selectedFanSizes}
              onFanSizesChange={(val) => toggleFilter(setSelectedFanSizes, val)}
              selectedBrands={selectedBrands}
              onBrandsChange={(val) => toggleFilter(setSelectedBrands, val)}
              selectedPurposes={selectedPurposes}
              onPurposesChange={(val) => toggleFilter(setSelectedPurposes, val)}
              selectedSockets={selectedSockets}
              onSocketsChange={(val) => toggleFilter(setSelectedSockets, val)}
              selectedTypes={selectedTypes}
              onTypesChange={(val) => toggleFilter(setSelectedTypes, val)}
              selectedTDP={selectedTDP}
              onTDPChange={(val) => toggleFilter(setSelectedTDP, val)}
              selectedFanCounts={selectedFanCounts}
              onFanCountsChange={(val) => toggleFilter(setSelectedFanCounts, val)}
            />
          } 
        />
        )}
      </div>
    </div>
  );
}


