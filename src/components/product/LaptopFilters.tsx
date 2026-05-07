import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  hasBorder?: boolean;
}

const FilterSection = ({ title, children, defaultOpen = true, hasBorder = true }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{ 
      borderBottom: hasBorder ? '1px solid var(--border-color)' : 'none', 
      paddingTop: '20px',
      paddingBottom: hasBorder ? '20px' : '0'
    }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: 'none',
          border: 'none',
          color: 'var(--text-color)',
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: 1,
          cursor: 'pointer',
          padding: 0
        }}
      >
        {title}
        <div style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', display: 'flex' }}>
          <ChevronDown size={18} />
        </div>
      </button>
      {isOpen && <div style={{ marginTop: '20px' }}>{children}</div>}
    </div>
  );
};

const Checkbox = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) => {
  return (
    <label 
      onClick={(e) => {
        e.preventDefault();
        onChange(!checked);
      }}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        color: '#fff', 
        fontSize: '14px',
        cursor: 'pointer',
        marginBottom: '8px',
        userSelect: 'none'
      }}
    >
      <div 
        style={{
          width: '18px',
          height: '18px',
          borderRadius: '4px',
          border: `1px solid ${checked ? '#A6CE39' : 'rgba(255,255,255,0.2)'}`,
          backgroundColor: checked ? '#A6CE39' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s'
        }}
      >
        {checked && <div style={{ width: '8px', height: '4px', borderLeft: '2px solid #000', borderBottom: '2px solid #000', transform: 'rotate(-45deg)', marginBottom: '2px' }} />}
      </div>
      {label}
    </label>
  );
};

interface LaptopFiltersProps {
  selectedSubcategories: string[];
  onSubcategoryChange: (label: string) => void;
  subcategoryList: string[];
  selectedBrands: string[];
  onBrandsChange: (label: string) => void;
  selectedCPUs: string[];
  onCPUsChange: (label: string) => void;
  selectedGPUs: string[];
  onGPUsChange: (label: string) => void;
  minPrice: string;
  onMinPriceChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
  // Новые параметры для ноутбуков
  selectedDiagonals: string[];
  onDiagonalsChange: (label: string) => void;
  selectedResolutions: string[];
  onResolutionsChange: (label: string) => void;
  selectedMatrix: string[];
  onMatrixChange: (label: string) => void;
  selectedRefreshRates: string[];
  onRefreshRatesChange: (label: string) => void;
  selectedWeights: string[];
  onWeightsChange: (label: string) => void;
}

export default function LaptopFilters({ 
  selectedSubcategories,
  onSubcategoryChange,
  subcategoryList,
  selectedBrands,
  onBrandsChange,
  selectedCPUs,
  onCPUsChange,
  selectedGPUs,
  onGPUsChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  selectedDiagonals,
  onDiagonalsChange,
  selectedResolutions,
  onResolutionsChange,
  selectedMatrix,
  onMatrixChange,
  selectedRefreshRates,
  onRefreshRatesChange,
  selectedWeights,
  onWeightsChange
}: LaptopFiltersProps) {
  const { t } = useTranslation();
  const [selectedVRAM, setSelectedVRAM] = useState<string[]>([]);
  const [selectedRAM, setSelectedRAM] = useState<string[]>([]);
  const [selectedRAMType, setSelectedRAMType] = useState<string[]>([]);
  const [selectedSSD, setSelectedSSD] = useState<string[]>([]);
  const [selectedOS, setSelectedOS] = useState<string[]>([]);

  const toggle = (setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setList(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <div style={{
      backgroundColor: '#0c0d0d',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '20px',
      color: 'var(--text-color)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ 
        fontSize: '20px', 
        fontWeight: 700, 
        lineHeight: 1,
        paddingBottom: '12px', 
        borderBottom: '1px solid var(--border-color)',
        margin: 0
      }}>{t('filters.title')}</div>

      {/* Цена */}
      <FilterSection title={t('filters.price')}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder={t('filters.from')} 
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value.replace(/\D/g, ''))}
            style={{ 
              width: '100%', 
              backgroundColor: '#1a1a1a', 
              border: '1px solid var(--border-color)', 
              borderRadius: '6px', 
              padding: '8px 12px', 
              color: '#fff',
              fontSize: '14px'
            }} 
          />
          <span style={{ color: 'var(--text-secondary)' }}>–</span>
          <input 
            type="text" 
            placeholder={t('filters.to')} 
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value.replace(/\D/g, ''))}
            style={{ 
              width: '100%', 
              backgroundColor: '#1a1a1a', 
              border: '1px solid var(--border-color)', 
              borderRadius: '6px', 
              padding: '8px 12px', 
              color: '#fff',
              fontSize: '14px'
            }} 
          />
        </div>
      </FilterSection>

      {/* Подкатегории */}
      <FilterSection title={t('filters.subcategories')}>
        {subcategoryList.map(label => (
          <Checkbox 
            key={label} 
            label={label} 
            checked={selectedSubcategories.includes(label)} 
            onChange={() => onSubcategoryChange(label)} 
          />
        ))}
      </FilterSection>

      {/* Производители */}
      <FilterSection title={t('filters.brands')}>
        {['Apple', 'ASUS', 'Lenovo'].map(b => (
          <Checkbox 
            key={b} 
            label={b} 
            checked={selectedBrands.includes(b)} 
            onChange={() => onBrandsChange(b)} 
          />
        ))}
      </FilterSection>

      {/* Процессор */}
      <FilterSection title="Процессор" defaultOpen={false}>
        {[
          'Intel (все модели)', 'AMD (все модели)', 'Apple (все модели)',
          'Apple M5', 'Apple M5 Pro', 'Apple M5 Max', 'Apple A18 Pro',
          'Intel Core Ultra 9 Series 3', 'Intel Core Ultra 7 Series 3',
          'AMD Ryzen 9 9xxx', 'AMD Ryzen 7 9xxx', 'AMD Ryzen AI Max',
          'AMD Ryzen AI 9 4xx', 'AMD Ryzen AI 7 4xx', 'AMD Ryzen AI 5 4xx'
        ].map(p => (
          <Checkbox 
            key={p} 
            label={p} 
            checked={selectedCPUs.includes(p)} 
            onChange={() => onCPUsChange(p)} 
          />
        ))}
      </FilterSection>

      {/* Видеокарта */}
      <FilterSection title="Видеокарта" defaultOpen={false}>
        {['NVIDIA GeForce RTX 5090', 'NVIDIA GeForce RTX 5080', 'NVIDIA GeForce RTX 5070 Ti', 'NVIDIA GeForce RTX 5070', 'NVIDIA GeForce RTX 5060', 'NVIDIA GeForce RTX 5050', 'Интегрированная'].map(v => (
          <Checkbox 
            key={v} 
            label={v} 
            checked={selectedGPUs.includes(v)} 
            onChange={() => onGPUsChange(v)} 
          />
        ))}
      </FilterSection>

      {/* Объём памяти видеоадаптера */}
      <FilterSection title="Объём памяти видеоадаптера" defaultOpen={false}>
        {['24 ГБ и более', '16 ГБ', '12 ГБ', '10 ГБ', '8 ГБ', '6 ГБ', '4 ГБ'].map(m => (
          <Checkbox 
            key={m} 
            label={m} 
            checked={selectedVRAM.includes(m)} 
            onChange={() => toggle(setSelectedVRAM, m)} 
          />
        ))}
      </FilterSection>

      {/* Диагональ экрана */}
      <FilterSection title="Диагональ экрана" defaultOpen={false}>
        {['18" и более', '17"', '16"', '15"', '14"', '13"'].map(d => (
          <Checkbox 
            key={d} 
            label={d} 
            checked={selectedDiagonals.includes(d)} 
            onChange={() => onDiagonalsChange(d)} 
          />
        ))}
      </FilterSection>

      {/* Разрешение экрана */}
      <FilterSection title="Разрешение экрана" defaultOpen={false}>
        {['4K (3840x2160)', 'QHD+ (2560x1600)', 'QHD (2560x1440)', 'FHD+ (1920x1200)', 'FHD (1920x1080)'].map(r => (
          <Checkbox 
            key={r} 
            label={r} 
            checked={selectedResolutions.includes(r)} 
            onChange={() => onResolutionsChange(r)} 
          />
        ))}
      </FilterSection>

      {/* Тип матрицы */}
      <FilterSection title="Тип матрицы" defaultOpen={false}>
        {['OLED', 'IPS', 'Mini LED'].map(m => (
          <Checkbox 
            key={m} 
            label={m} 
            checked={selectedMatrix.includes(m)} 
            onChange={() => onMatrixChange(m)} 
          />
        ))}
      </FilterSection>

      {/* Частота обновления экрана */}
      <FilterSection title="Частота обновления экрана" defaultOpen={false}>
        {['240 Гц', '165 Гц', '144 Гц', '120 Гц', '60 Гц'].map(h => (
          <Checkbox 
            key={h} 
            label={h} 
            checked={selectedRefreshRates.includes(h)} 
            onChange={() => onRefreshRatesChange(h)} 
          />
        ))}
      </FilterSection>

      {/* Объём оперативной памяти */}
      <FilterSection title="Объём оперативной памяти" defaultOpen={false}>
        {['128 ГБ и более', '96 ГБ', '64 ГБ', '48 ГБ', '32 ГБ', '24 ГБ', '16 ГБ', '8 ГБ'].map(r => (
          <Checkbox 
            key={r} 
            label={r} 
            checked={selectedRAM.includes(r)} 
            onChange={() => toggle(setSelectedRAM, r)} 
          />
        ))}
      </FilterSection>

      {/* Тип оперативной памяти */}
      <FilterSection title="Тип оперативной памяти" defaultOpen={false}>
        {['DDR5', 'DDR4'].map(t => (
          <Checkbox 
            key={t} 
            label={t} 
            checked={selectedRAMType.includes(t)} 
            onChange={() => toggle(setSelectedRAMType, t)} 
          />
        ))}
      </FilterSection>

      {/* Объём SSD */}
      <FilterSection title="Объём SSD" defaultOpen={false}>
        {['2000 ГБ и более', '960-1024 ГБ', '480-512 ГБ', '240-256 ГБ'].map(s => (
          <Checkbox 
            key={s} 
            label={s} 
            checked={selectedSSD.includes(s)} 
            onChange={() => toggle(setSelectedSSD, s)} 
          />
        ))}
      </FilterSection>

      {/* Предустановленная ОС */}
      <FilterSection title="Предустановленная ОС" defaultOpen={false}>
        {['Windows 11', 'macOS', 'Linux', 'Chrome OS', 'Без ОС'].map(o => (
          <Checkbox 
            key={o} 
            label={o} 
            checked={selectedOS.includes(o)} 
            onChange={() => toggle(setSelectedOS, o)} 
          />
        ))}
      </FilterSection>

      {/* Масса */}
      <FilterSection title="Масса" defaultOpen={false} hasBorder={false}>
        {['до 1.5 кг', '1.5 - 2 кг', '2 - 2.5 кг', 'более 2.5 кг'].map(w => (
          <Checkbox 
            key={w} 
            label={w} 
            checked={selectedWeights.includes(w)} 
            onChange={() => onWeightsChange(w)} 
          />
        ))}
      </FilterSection>

    </div>
  );
}
