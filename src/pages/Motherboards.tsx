import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import SortButtons from '../components/product/SortButtons';
import MotherboardFilters from '../components/product/MotherboardFilters';
import { HOT_DEALS } from '../constants/products';

export default function Motherboards() {
  const { t } = useTranslation();
  
  const [activeSort, setActiveSort] = useState('popularity');
  
  // Состояния фильтров
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedPopular, setSelectedPopular] = useState<string[]>([]);
  const [selectedChipsets, setSelectedChipsets] = useState<string[]>([]);
  const [selectedSockets, setSelectedSockets] = useState<string[]>([]);
  const [selectedFormFactors, setSelectedFormFactors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedVideoInterfaces, setSelectedVideoInterfaces] = useState<string[]>([]);
  const [selectedRAMTypes, setSelectedRAMTypes] = useState<string[]>([]);
  const [selectedWiFi, setSelectedWiFi] = useState<string[]>([]);
  const [selectedM2Version, setSelectedM2Version] = useState<string[]>([]);
  const [selectedM2Count, setSelectedM2Count] = useState<string[]>([]);
  const [selectedRAMSlots, setSelectedRAMSlots] = useState<string[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const subcat = searchParams.get('subcategory');
    if (subcat) {
      const mapping: Record<string, string> = {
        'для AMD': 'Материнские платы для AMD',
        'Для AMD': 'Материнские платы для AMD',
        'для Intel': 'Материнские платы для Intel',
        'Для Intel': 'Материнские платы для Intel',
        'с Wi-Fi': 'Материнская плата с Wi-Fi',
        'С Wi-Fi': 'Материнская плата с Wi-Fi'
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
    let result = HOT_DEALS.filter(p => p.category === 'motherboard');

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
          <h1 className="title" style={{ fontSize: '32px', margin: 0, lineHeight: 1.5 }}>{t('sidebar.motherboards')}</h1>
          <SortButtons onSortChange={setActiveSort} />
        </div>
        
        <ProductGrid 
          products={filteredProducts}
          sidebar={
            <MotherboardFilters 
              minPrice={minPrice}
              onMinPriceChange={setMinPrice}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              selectedPopular={selectedPopular}
              onPopularChange={(val) => toggleFilter(setSelectedPopular, val)}
              selectedChipsets={selectedChipsets}
              onChipsetsChange={(val) => toggleFilter(setSelectedChipsets, val)}
              selectedSockets={selectedSockets}
              onSocketsChange={(val) => toggleFilter(setSelectedSockets, val)}
              selectedFormFactors={selectedFormFactors}
              onFormFactorsChange={(val) => toggleFilter(setSelectedFormFactors, val)}
              selectedBrands={selectedBrands}
              onBrandsChange={(val) => toggleFilter(setSelectedBrands, val)}
              selectedVideoInterfaces={selectedVideoInterfaces}
              onVideoInterfacesChange={(val) => toggleFilter(setSelectedVideoInterfaces, val)}
              selectedRAMTypes={selectedRAMTypes}
              onRAMTypesChange={(val) => toggleFilter(setSelectedRAMTypes, val)}
              selectedWiFi={selectedWiFi}
              onWiFiChange={(val) => toggleFilter(setSelectedWiFi, val)}
              selectedM2Version={selectedM2Version}
              onM2VersionChange={(val) => toggleFilter(setSelectedM2Version, val)}
              selectedM2Count={selectedM2Count}
              onM2CountChange={(val) => toggleFilter(setSelectedM2Count, val)}
              selectedRAMSlots={selectedRAMSlots}
              onRAMSlotsChange={(val) => toggleFilter(setSelectedRAMSlots, val)}
            />
          } 
        />
      </div>
    </div>
  );
}


