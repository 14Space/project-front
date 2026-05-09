import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ProductGrid from '../components/product/ProductGrid';
import SortButtons from '../components/product/SortButtons';
import PSUFilters from '../components/product/PSUFilters';
import { HOT_DEALS } from '../constants/products';

export default function PSUs() {
  const { t } = useTranslation();
  
  const [activeSort, setActiveSort] = useState('popularity');
  
  // Состояния фильтров
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedPower, setSelectedPower] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedStandards, setSelectedStandards] = useState<string[]>([]);
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [selectedGPUConnectors, setSelectedGPUConnectors] = useState<string[]>([]);
  const [selectedModularity, setSelectedModularity] = useState<string[]>([]);
  const [selectedCPUConnectors, setSelectedCPUConnectors] = useState<string[]>([]);

  const toggleFilter = (setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  // Фильтрация (демонстрация на HOT_DEALS)
  const filteredProducts = useMemo(() => {
    let result = HOT_DEALS.filter(p => p.category === 'psu');

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
          <h1 className="title" style={{ fontSize: '32px', margin: 0, lineHeight: 1.5 }}>{t('sidebar.psus')}</h1>
          <SortButtons onSortChange={setActiveSort} />
        </div>
        
        <ProductGrid 
          products={filteredProducts}
          sidebar={
            <PSUFilters 
              minPrice={minPrice}
              onMinPriceChange={setMinPrice}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              selectedPower={selectedPower}
              onPowerChange={(val) => toggleFilter(setSelectedPower, val)}
              selectedBrands={selectedBrands}
              onBrandsChange={(val) => toggleFilter(setSelectedBrands, val)}
              selectedStandards={selectedStandards}
              onStandardsChange={(val) => toggleFilter(setSelectedStandards, val)}
              selectedForms={selectedForms}
              onFormsChange={(val) => toggleFilter(setSelectedForms, val)}
              selectedGPUConnectors={selectedGPUConnectors}
              onGPUConnectorsChange={(val) => toggleFilter(setSelectedGPUConnectors, val)}
              selectedModularity={selectedModularity}
              onModularityChange={(val) => toggleFilter(setSelectedModularity, val)}
              selectedCPUConnectors={selectedCPUConnectors}
              onCPUConnectorsChange={(val) => toggleFilter(setSelectedCPUConnectors, val)}
            />
          } 
        />
      </div>
    </div>
  );
}


