import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import SortButtons from '../components/product/SortButtons';
import GPUFilters from '../components/product/GPUFilters';
import { HOT_DEALS } from '../constants/products';

export default function GPUs() {
  const { t } = useTranslation();
  
  const [activeSort, setActiveSort] = useState('popularity');
  
  // Состояния фильтров
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedPopular, setSelectedPopular] = useState<string[]>([]);
  const [selectedGPUs, setSelectedGPUs] = useState<string[]>([]);
  const [selectedMemory, setSelectedMemory] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedBus, setSelectedBus] = useState<string[]>([]);
  const [selectedMemoryType, setSelectedMemoryType] = useState<string[]>([]);
  const [selectedLength, setSelectedLength] = useState<string[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const subcat = searchParams.get('subcategory');
    if (subcat) {
      const mapping: Record<string, string> = {
        'Игровые NVIDIA': 'Игровая видеокарта NVIDIA',
        'Игровые AMD': 'Игровая видеокарта AMD',
        'Профессиональные': 'Профессиональная видеокарта'
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

  // Фильтрация (демонстрация на HOT_DEALS)
  const filteredProducts = useMemo(() => {
    let result = HOT_DEALS.filter(p => p.category === 'gpu');

    if (minPrice) result = result.filter(p => p.price >= parseInt(minPrice));
    if (maxPrice) result = result.filter(p => p.price <= parseInt(maxPrice));

    // Сортировка
    if (activeSort === 'price_asc') result.sort((a, b) => a.price - b.price);
    else if (activeSort === 'price_desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [activeSort, minPrice, maxPrice]);

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '40px' }}>
      <div className="container" style={{ padding: '10px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h1 className="title" style={{ fontSize: '32px', margin: 0, lineHeight: 1.5 }}>{t('sidebar.gpus')}</h1>
          <SortButtons onSortChange={setActiveSort} />
        </div>
        
        <ProductGrid 
          products={filteredProducts}
          sidebar={
            <GPUFilters 
              minPrice={minPrice}
              onMinPriceChange={setMinPrice}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              selectedPopular={selectedPopular}
              onPopularChange={(val) => toggleFilter(setSelectedPopular, val)}
              selectedGPUs={selectedGPUs}
              onGPUsChange={(val) => toggleFilter(setSelectedGPUs, val)}
              selectedMemory={selectedMemory}
              onMemoryChange={(val) => toggleFilter(setSelectedMemory, val)}
              selectedBrands={selectedBrands}
              onBrandsChange={(val) => toggleFilter(setSelectedBrands, val)}
              selectedBus={selectedBus}
              onBusChange={(val) => toggleFilter(setSelectedBus, val)}
              selectedMemoryType={selectedMemoryType}
              onMemoryTypeChange={(val) => toggleFilter(setSelectedMemoryType, val)}
              selectedLength={selectedLength}
              onLengthChange={(val) => toggleFilter(setSelectedLength, val)}
            />
          } 
        />
      </div>
    </div>
  );
}


