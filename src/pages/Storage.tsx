import { useState, useMemo } from 'react';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ProductGrid from '../components/product/ProductGrid';
import SortButtons from '../components/product/SortButtons';
import StorageFilters from '../components/product/StorageFilters';
import { HOT_DEALS } from '../constants/products';

export default function Storage() {
  
  const [activeSort, setActiveSort] = useState('popularity');
  
  // Состояния фильтров
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedPopular, setSelectedPopular] = useState<string[]>([]);
  const [selectedVolume, setSelectedVolume] = useState<string[]>([]);
  const [selectedInterface, setSelectedInterface] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedNAND, setSelectedNAND] = useState<string[]>([]);
  const [selectedTBW, setSelectedTBW] = useState<string[]>([]);
  const [selectedFormFactors, setSelectedFormFactors] = useState<string[]>([]);
  const [selectedReadSpeed, setSelectedReadSpeed] = useState<string[]>([]);
  const [selectedWriteSpeed, setSelectedWriteSpeed] = useState<string[]>([]);

  const toggleFilter = (setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  // Фильтрация (демонстрация на HOT_DEALS)
  const filteredProducts = useMemo(() => {
    let result = HOT_DEALS.filter(p => p.category === 'storage');

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
          { label: 'Дисковые накопители', active: true }
        ]} />
      </div>

      <div className="container" style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h1 className="title" style={{ fontSize: '32px', margin: 0 }}>Дисковые накопители</h1>
          <SortButtons onSortChange={setActiveSort} />
        </div>
        
        <ProductGrid 
          products={filteredProducts}
          sidebar={
            <StorageFilters 
              minPrice={minPrice}
              onMinPriceChange={setMinPrice}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              selectedPopular={selectedPopular}
              onPopularChange={(val) => toggleFilter(setSelectedPopular, val)}
              selectedVolume={selectedVolume}
              onVolumeChange={(val) => toggleFilter(setSelectedVolume, val)}
              selectedInterface={selectedInterface}
              onInterfaceChange={(val) => toggleFilter(setSelectedInterface, val)}
              selectedBrands={selectedBrands}
              onBrandsChange={(val) => toggleFilter(setSelectedBrands, val)}
              selectedNAND={selectedNAND}
              onNANDChange={(val) => toggleFilter(setSelectedNAND, val)}
              selectedTBW={selectedTBW}
              onTBWChange={(val) => toggleFilter(setSelectedTBW, val)}
              selectedFormFactors={selectedFormFactors}
              onFormFactorsChange={(val) => toggleFilter(setSelectedFormFactors, val)}
              selectedReadSpeed={selectedReadSpeed}
              onReadSpeedChange={(val) => toggleFilter(setSelectedReadSpeed, val)}
              selectedWriteSpeed={selectedWriteSpeed}
              onWriteSpeedChange={(val) => toggleFilter(setSelectedWriteSpeed, val)}
            />
          } 
        />
      </div>
    </div>
  );
}
