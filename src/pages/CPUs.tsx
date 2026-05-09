import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ProductGrid from '../components/product/ProductGrid';
import SortButtons from '../components/product/SortButtons';
import CPUFilters from '../components/product/CPUFilters';
import { HOT_DEALS } from '../constants/products';

export default function CPUs() {
  const { t } = useTranslation();
  
  const [activeSort, setActiveSort] = useState('popularity');
  
  // Состояния фильтров
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedPopular, setSelectedPopular] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSockets, setSelectedSockets] = useState<string[]>([]);
  const [selectedCores, setSelectedCores] = useState<string[]>([]);
  const [selectedIGPU, setSelectedIGPU] = useState<string[]>([]);
  const [selectedCache, setSelectedCache] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedTDP, setSelectedTDP] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string[]>([]);

  const toggleFilter = (setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  // Фильтрация (заглушка на данных HOT_DEALS для демонстрации)
  const filteredProducts = useMemo(() => {
    let result = HOT_DEALS.filter(p => p.category === 'cpu');

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
          <h1 className="title" style={{ fontSize: '32px', margin: 0, lineHeight: 1.5 }}>{t('sidebar.cpus')}</h1>
          <SortButtons onSortChange={setActiveSort} />
        </div>
        
        <ProductGrid 
          products={filteredProducts}
          sidebar={
            <CPUFilters 
              minPrice={minPrice}
              onMinPriceChange={setMinPrice}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              selectedPopular={selectedPopular}
              onPopularChange={(val) => toggleFilter(setSelectedPopular, val)}
              selectedBrands={selectedBrands}
              onBrandsChange={(val) => toggleFilter(setSelectedBrands, val)}
              selectedSockets={selectedSockets}
              onSocketsChange={(val) => toggleFilter(setSelectedSockets, val)}
              selectedCores={selectedCores}
              onCoresChange={(val) => toggleFilter(setSelectedCores, val)}
              selectedIGPU={selectedIGPU}
              onIGPUChange={(val) => toggleFilter(setSelectedIGPU, val)}
              selectedCache={selectedCache}
              onCacheChange={(val) => toggleFilter(setSelectedCache, val)}
              selectedYears={selectedYears}
              onYearsChange={(val) => toggleFilter(setSelectedYears, val)}
              selectedTDP={selectedTDP}
              onTDPChange={(val) => toggleFilter(setSelectedTDP, val)}
              selectedPackage={selectedPackage}
              onPackageChange={(val) => toggleFilter(setSelectedPackage, val)}
            />
          } 
        />
      </div>
    </div>
  );
}


