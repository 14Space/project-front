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
          lineHeight: 1.4,
          textAlign: 'left',
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

interface PCFiltersProps {
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
}

export default function PCFilters({ 
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
  onMaxPriceChange
}: PCFiltersProps) {
  const { t } = useTranslation();
  // Остальные состояния (SSD, RAM и т.д.) пока оставим локальными для простоты, 
  // так как мы оживляем только основные фильтры по просьбе пользователя.
  const [selectedVRAM, setSelectedVRAM] = useState<string[]>([]);
  const [selectedRAM, setSelectedRAM] = useState<string[]>([]);
  const [selectedRAMType, setSelectedRAMType] = useState<string[]>([]);
  const [selectedSSD, setSelectedSSD] = useState<string[]>([]);
  const [selectedHDD, setSelectedHDD] = useState<string[]>([]);
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
          'Apple M4', 'Apple M4 Pro', 'Apple M4 Max',
          'Intel Core Ultra 9 2xx', 'Intel Core Ultra 7 2xx', 'Intel Core Ultra 5 2xx', 'Intel Xeon',
          'AMD Ryzen 9 9xxx', 'AMD Ryzen 7 9xxx', 'AMD Ryzen 5 9xxx',
          'AMD Ryzen AI 3xx', 'AMD Threadripper', 'AMD EPYC'
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
        {['NVIDIA GeForce RTX 5090', 'NVIDIA GeForce RTX 5080', 'NVIDIA GeForce RTX 5070 Ti', 'NVIDIA GeForce RTX 5070', 'NVIDIA GeForce RTX 5060 Ti', 'NVIDIA GeForce RTX 5060', 'NVIDIA GeForce RTX 5050', 'NVIDIA RTX PRO', 'AMD Radeon RX 9070 XT', 'AMD Radeon RX 9070', 'AMD Radeon RX 9060 XT'].map(v => (
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
        {['24 ГБ и более', '20 ГБ', '16 ГБ', '12 ГБ', '10 ГБ', '8 ГБ', '6 ГБ'].map(m => (
          <Checkbox 
            key={m} 
            label={m} 
            checked={selectedVRAM.includes(m)} 
            onChange={() => toggle(setSelectedVRAM, m)} 
          />
        ))}
      </FilterSection>

      {/* Объём оперативной памяти */}
      <FilterSection title="Объём оперативной памяти" defaultOpen={false}>
        {['128 ГБ и более', '96 ГБ', '64 ГБ', '48 ГБ', '32 ГБ', '24 ГБ', '16 ГБ'].map(r => (
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
        {['4000 ГБ и более', '2000-4000 ГБ', '960-1024 ГБ', '480-512 ГБ', '240-256 ГБ'].map(s => (
          <Checkbox 
            key={s} 
            label={s} 
            checked={selectedSSD.includes(s)} 
            onChange={() => toggle(setSelectedSSD, s)} 
          />
        ))}
      </FilterSection>

      {/* Обьём HDD */}
      <FilterSection title="Обьём HDD" defaultOpen={false}>
        {['3000 ГБ и более', '2000 ГБ', '1000 ГБ', '500 ГБ'].map(h => (
          <Checkbox 
            key={h} 
            label={h} 
            checked={selectedHDD.includes(h)} 
            onChange={() => toggle(setSelectedHDD, h)} 
          />
        ))}
      </FilterSection>

      {/* Предустановленная ОС */}
      <FilterSection title="Предустановленная ОС" defaultOpen={false} hasBorder={false}>
        {['Windows 11', 'Mac OS', 'Linux', 'Без ОС'].map(o => (
          <Checkbox 
            key={o} 
            label={o} 
            checked={selectedOS.includes(o)} 
            onChange={() => toggle(setSelectedOS, o)} 
          />
        ))}
      </FilterSection>

    </div>
  );
}
