import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import SortButtons from '../components/product/SortButtons';
import StorageFilters from '../components/product/StorageFilters';
import { useCategoryProducts } from '../hooks/useCategoryProducts';

export default function Storage() {
  const { t } = useTranslation();
  const [activeSort, setActiveSort] = useState('popularity');
  const { products: apiProducts, isLoading } = useCategoryProducts('Дисковые накопители');
  
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
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const subcat = searchParams.get('subcategory');
    if (subcat) {
      const mapping: Record<string, string> = {
        'HDD накопители': 'HDD накопитель',
        'SSD накопители': 'SSD накопитель',
        'SSD с PCIe 4.0': 'SSD с интерфейсом PCIe 4.0'
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
          <h1 className="title" style={{ fontSize: '32px', margin: 0, lineHeight: 1.5 }}>{t('sidebar.storage')}</h1>
          <SortButtons onSortChange={setActiveSort} />
        </div>
        
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>Загрузка товаров...</div>
        ) : (
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
        )}
      </div>
    </div>
  );
}


