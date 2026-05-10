import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import SortButtons from '../components/product/SortButtons';
import LaptopFilters from '../components/product/LaptopFilters';
import { MOCK_LAPTOPS } from '../data/mockProducts';

export default function Laptops() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const subcategory = searchParams.get('subcategory');
  
  const [activeSort, setActiveSort] = useState('popularity');
  
  // Состояния фильтров
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCPUs, setSelectedCPUs] = useState<string[]>([]);
  const [selectedGPUs, setSelectedGPUs] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  // Новые состояния для ноутбуков
  const [selectedDiagonals, setSelectedDiagonals] = useState<string[]>([]);
  const [selectedResolutions, setSelectedResolutions] = useState<string[]>([]);
  const [selectedMatrix, setSelectedMatrix] = useState<string[]>([]);
  const [selectedRefreshRates, setSelectedRefreshRates] = useState<string[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);

  // Синхронизация с URL
  useEffect(() => {
    if (subcategory) {
      const mapping: Record<string, string> = {
        'Игровые': 'Игровые',
        'Для учёбы': 'Для учёбы',
        'Macbook': 'MacBook',
        'MacBook': 'MacBook'
      };
      const filterValue = mapping[subcategory] || subcategory;
      setSelectedSubcategories([filterValue]);
    } else {
      setSelectedSubcategories([]);
    }
  }, [subcategory]);

  // Обработчики изменений
  const handleSubcategoryChange = (label: string) => {
    toggleFilter(setSelectedSubcategories, label);
  };

  const toggleFilter = (setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  // Сортировка и Фильтрация данных
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...MOCK_LAPTOPS];

    // 1. Фильтрация по подкатегориям
    if (selectedSubcategories.length > 0) {
      result = result.filter(p => selectedSubcategories.includes(p.subcategory));
    }

    // 2. Фильтрация по цене
    if (minPrice) {
      result = result.filter(p => p.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => p.price <= parseInt(maxPrice));
    }

    // 3. Логика сортировки
    if (activeSort === 'price_asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price_desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'popularity') {
      result.sort((a, b) => a.id.localeCompare(b.id));
    }

    return result;
  }, [activeSort, selectedSubcategories, minPrice, maxPrice]);

  const breadcrumbItems = [
    { label: t('catalog.laptops.title'), active: true }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '40px' }}>
      <div className="container" style={{ padding: '10px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h1 className="title" style={{ fontSize: '32px', margin: 0, lineHeight: 1.5 }}>{t('catalog.laptops.title')}</h1>
          <SortButtons onSortChange={setActiveSort} />
        </div>
        
        <ProductGrid 
          products={filteredAndSortedProducts} 
          sidebar={
            <LaptopFilters 
              selectedSubcategories={selectedSubcategories}
              onSubcategoryChange={handleSubcategoryChange}
              subcategoryList={['Игровые', 'Для учёбы', 'MacBook']}
              selectedBrands={selectedBrands}
              onBrandsChange={(b) => toggleFilter(setSelectedBrands, b)}
              selectedCPUs={selectedCPUs}
              onCPUsChange={(c) => toggleFilter(setSelectedCPUs, c)}
              selectedGPUs={selectedGPUs}
              onGPUsChange={(g) => toggleFilter(setSelectedGPUs, g)}
              minPrice={minPrice}
              onMinPriceChange={setMinPrice}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              selectedDiagonals={selectedDiagonals}
              onDiagonalsChange={(d) => toggleFilter(setSelectedDiagonals, d)}
              selectedResolutions={selectedResolutions}
              onResolutionsChange={(r) => toggleFilter(setSelectedResolutions, r)}
              selectedMatrix={selectedMatrix}
              onMatrixChange={(m) => toggleFilter(setSelectedMatrix, m)}
              selectedRefreshRates={selectedRefreshRates}
              onRefreshRatesChange={(h) => toggleFilter(setSelectedRefreshRates, h)}
              selectedWeights={selectedWeights}
              onWeightsChange={(w) => toggleFilter(setSelectedWeights, w)}
            />
          } 
        />
      </div>
    </div>
  );
}


