import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import SortButtons from '../components/product/SortButtons';
import PCFilters from '../components/product/PCFilters';
import { MOCK_COMPUTERS } from '../data/mockProducts';

export default function Computers() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const subcategory = searchParams.get('subcategory');
  
  const [activeSort, setActiveSort] = useState('popularity');
  
  // Состояния фильтров
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCPUs, setSelectedCPUs] = useState<string[]>([]);
  const [selectedGPUs, setSelectedGPUs] = useState<string[]>([]);
  
  // Синхронизация с URL
  useEffect(() => {
    if (subcategory) {
      setSelectedSubcategories([subcategory]);
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

  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  // Сортировка и Фильтрация данных
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...MOCK_COMPUTERS];

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


  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '40px' }}>
      <div className="container" style={{ padding: '10px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h1 className="title" style={{ fontSize: '32px', margin: 0, lineHeight: 1.5 }}>{t('catalog.computers.title')}</h1>
          <SortButtons onSortChange={setActiveSort} />
        </div>
        
        <ProductGrid 
          products={filteredAndSortedProducts} 
          sidebar={
            <PCFilters 
              selectedSubcategories={selectedSubcategories}
              onSubcategoryChange={handleSubcategoryChange}
              subcategoryList={['Игровые', 'Мини-ПК', 'Моноблоки', 'Рабочие станции']}
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
            />
          } 
        />
      </div>
    </div>
  );
}

