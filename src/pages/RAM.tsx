import { useState, useMemo } from 'react';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ProductGrid from '../components/product/ProductGrid';
import SortButtons from '../components/product/SortButtons';
import RAMFilters from '../components/product/RAMFilters';
import { HOT_DEALS } from '../constants/products';

export default function RAM() {
  
  const [activeSort, setActiveSort] = useState('popularity');
  
  // Состояния фильтров
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedPopular, setSelectedPopular] = useState<string[]>([]);
  const [selectedVolume, setSelectedVolume] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);
  const [selectedSticks, setSelectedSticks] = useState<string[]>([]);
  const [selectedTimings, setSelectedTimings] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggleFilter = (setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  // Фильтрация (демонстрация на HOT_DEALS)
  const filteredProducts = useMemo(() => {
    let result = HOT_DEALS.filter(p => p.category === 'ram');

    if (minPrice) result = result.filter(p => p.price >= parseInt(minPrice));
    if (maxPrice) result = result.filter(p => p.price <= parseInt(maxPrice));

    // Сортировка
    if (activeSort === 'price_asc') result.sort((a, b) => a.price - b.price);
    else if (activeSort === 'price_desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [activeSort, minPrice, maxPrice]);

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '60px' }}>
      <div className="container" style={{ padding: '5px 20px 0' }}>
        <Breadcrumbs items={[
          { label: 'Оперативная память', active: true }
        ]} />
      </div>

      <div className="container" style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h1 className="title" style={{ fontSize: '32px', margin: 0 }}>Оперативная память</h1>
          <SortButtons onSortChange={setActiveSort} />
        </div>
        
        <ProductGrid 
          products={filteredProducts}
          sidebar={
            <RAMFilters 
              minPrice={minPrice}
              onMinPriceChange={setMinPrice}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              selectedPopular={selectedPopular}
              onPopularChange={(val) => toggleFilter(setSelectedPopular, val)}
              selectedVolume={selectedVolume}
              onVolumeChange={(val) => toggleFilter(setSelectedVolume, val)}
              selectedFrequency={selectedFrequency}
              onFrequencyChange={(val) => toggleFilter(setSelectedFrequency, val)}
              selectedType={selectedType}
              onTypeChange={(val) => toggleFilter(setSelectedType, val)}
              selectedSticks={selectedSticks}
              onSticksChange={(val) => toggleFilter(setSelectedSticks, val)}
              selectedTimings={selectedTimings}
              onTimingsChange={(val) => toggleFilter(setSelectedTimings, val)}
              selectedBrands={selectedBrands}
              onBrandsChange={(val) => toggleFilter(setSelectedBrands, val)}
            />
          } 
        />
      </div>
    </div>
  );
}
