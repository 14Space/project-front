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

interface CPUFiltersProps {
  selectedPopular: string[];
  onPopularChange: (label: string) => void;
  selectedBrands: string[];
  onBrandsChange: (label: string) => void;
  selectedSockets: string[];
  onSocketsChange: (label: string) => void;
  selectedCores: string[];
  onCoresChange: (label: string) => void;
  selectedIGPU: string[];
  onIGPUChange: (label: string) => void;
  selectedCache: string[];
  onCacheChange: (label: string) => void;
  selectedYears: string[];
  onYearsChange: (label: string) => void;
  selectedTDP: string[];
  onTDPChange: (label: string) => void;
  selectedPackage: string[];
  onPackageChange: (label: string) => void;
  minPrice: string;
  onMinPriceChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
}

export default function CPUFilters({ 
  selectedPopular, onPopularChange,
  selectedBrands, onBrandsChange,
  selectedSockets, onSocketsChange,
  selectedCores, onCoresChange,
  selectedIGPU, onIGPUChange,
  selectedCache, onCacheChange,
  selectedYears, onYearsChange,
  selectedTDP, onTDPChange,
  selectedPackage, onPackageChange,
  minPrice, onMinPriceChange,
  maxPrice, onMaxPriceChange
}: CPUFiltersProps) {
  const { t } = useTranslation();

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

      {/* Популярные фильтры */}
      <FilterSection title="Популярные фильтры">
        {['Процессоры AMD с 3D V-Cache', 'Производительная iGPU', 'Процессор для игровых ПК', 'Процессор для рабочих станций'].map(label => (
          <Checkbox 
            key={label} 
            label={label} 
            checked={selectedPopular.includes(label)} 
            onChange={() => onPopularChange(label)} 
          />
        ))}
      </FilterSection>

      {/* Марка процессора */}
      <FilterSection title="Марка процессора">
        {['Все AMD', 'Все Intel', 'Core Ultra 9 2xx', 'Core Ultra 7 2xx', 'Core Ultra 5 2xx', 'Intel Xeon', 'Ryzen 9 9xxx', 'Ryzen 7 9xxx', 'Ryzen 5 9xxx', 'Ryzen 7 8xxx', 'Ryzen 5 8xxx', 'Ryzen Threadripper'].map(b => (
          <Checkbox 
            key={b} 
            label={b} 
            checked={selectedBrands.includes(b)} 
            onChange={() => onBrandsChange(b)} 
          />
        ))}
      </FilterSection>

      {/* Тип разъема */}
      <FilterSection title="Тип разъема" defaultOpen={false}>
        {['Socket 1851', 'Socket 1700', 'Socket 1200', 'Socket 1151-V2', 'Socket AM5', 'Socket sTR5', 'Socket sTRX4', 'Socket sWRX8'].map(s => (
          <Checkbox 
            key={s} 
            label={s} 
            checked={selectedSockets.includes(s)} 
            onChange={() => onSocketsChange(s)} 
          />
        ))}
      </FilterSection>

      {/* Общее количество ядер */}
      <FilterSection title="Общее количество ядер" defaultOpen={false}>
        {['64 и более', '32', '24', '20', '16', '14', '12', '10', '8', '6'].map(c => (
          <Checkbox 
            key={c} 
            label={c} 
            checked={selectedCores.includes(c)} 
            onChange={() => onCoresChange(c)} 
          />
        ))}
      </FilterSection>

      {/* Интегрированная видеокарта */}
      <FilterSection title="Интегрированная видеокарта" defaultOpen={false}>
        {['AMD Radeon 780M/760M/740M', 'AMD Radeon Graphics', 'AMD Radeon Vega', 'AMD Radeon R7', 'AMD Radeon R5', 'Intel Graphics', 'Intel HD Graphics 7xx', 'Intel HD Graphics 6xx', 'нет'].map(v => (
          <Checkbox 
            key={v} 
            label={v} 
            checked={selectedIGPU.includes(v)} 
            onChange={() => onIGPUChange(v)} 
          />
        ))}
      </FilterSection>

      {/* Кэш-память третьего уровня */}
      <FilterSection title="Кэш-память третьего уровня" defaultOpen={false}>
        {['256 МБ и более', '128 МБ', '96 МБ', '64 МБ', '32-36 МБ', '20-30 МБ', '16-19 МБ', '15 МБ и менее'].map(m => (
          <Checkbox 
            key={m} 
            label={m} 
            checked={selectedCache.includes(m)} 
            onChange={() => onCacheChange(m)} 
          />
        ))}
      </FilterSection>

      {/* Модельный год */}
      <FilterSection title="Модельный год" defaultOpen={false}>
        {['2026', '2025', '2024', 'более ранние'].map(y => (
          <Checkbox 
            key={y} 
            label={y} 
            checked={selectedYears.includes(y)} 
            onChange={() => onYearsChange(y)} 
          />
        ))}
      </FilterSection>

      {/* Базовое тепловыделение TDP */}
      <FilterSection title="Базовое тепловыделение TDP" defaultOpen={false}>
        {['49 Вт и менее', '50-69 Вт', '70-94 Вт', '95-119 Вт', '120 Вт и более'].map(t => (
          <Checkbox 
            key={t} 
            label={t} 
            checked={selectedTDP.includes(t)} 
            onChange={() => onTDPChange(t)} 
          />
        ))}
      </FilterSection>

      {/* Комплектация */}
      <FilterSection title="Комплектация" defaultOpen={false} hasBorder={false}>
        {['Box', 'Tray'].map(p => (
          <Checkbox 
            key={p} 
            label={p} 
            checked={selectedPackage.includes(p)} 
            onChange={() => onPackageChange(p)} 
          />
        ))}
      </FilterSection>

    </div>
  );
}
