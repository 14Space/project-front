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

interface GPUFiltersProps {
  selectedPopular: string[];
  onPopularChange: (label: string) => void;
  selectedGPUs: string[];
  onGPUsChange: (label: string) => void;
  selectedMemory: string[];
  onMemoryChange: (label: string) => void;
  selectedBrands: string[];
  onBrandsChange: (label: string) => void;
  selectedBus: string[];
  onBusChange: (label: string) => void;
  selectedMemoryType: string[];
  onMemoryTypeChange: (label: string) => void;
  selectedLength: string[];
  onLengthChange: (label: string) => void;
  minPrice: string;
  onMinPriceChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
}

export default function GPUFilters({ 
  selectedPopular, onPopularChange,
  selectedGPUs, onGPUsChange,
  selectedMemory, onMemoryChange,
  selectedBrands, onBrandsChange,
  selectedBus, onBusChange,
  selectedMemoryType, onMemoryTypeChange,
  selectedLength, onLengthChange,
  minPrice, onMinPriceChange,
  maxPrice, onMaxPriceChange
}: GPUFiltersProps) {
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

      {/* Подкатегории */}
      <FilterSection title={t('filters.subcategories')}>
        {['Игровая видеокарта NVIDIA', 'Игровая видеокарта AMD', 'Профессиональная видеокарта'].map(label => (
          <Checkbox 
            key={label} 
            label={label} 
            checked={selectedPopular.includes(label)} 
            onChange={() => onPopularChange(label)} 
          />
        ))}
      </FilterSection>

      {/* GPU */}
      <FilterSection title="GPU">
        {['Все AMD', 'Все Nvidia', 'Nvidia GeForce RTX 5090', 'Nvidia GeForce RTX 5080', 'Nvidia GeForce RTX 5070 Ti', 'Nvidia GeForce RTX 5070', 'Nvidia GeForce RTX 5060 Ti', 'Nvidia GeForce RTX 5060', 'Nvidia GeForce RTX 5050', 'NVIDIA RTX 6000 Ada', 'NVIDIA RTX 5880 Ada', 'NVIDIA RTX 5000 Ada', 'NVIDIA RTX 4500 Ada', 'Radeon RX 9070 XT', 'Radeon RX 9070', 'Radeon RX 9060 XT', 'Radeon RX 9060', 'Radeon Pro W7700', 'Radeon Pro W7500'].map(g => (
          <Checkbox 
            key={g} 
            label={g} 
            checked={selectedGPUs.includes(g)} 
            onChange={() => onGPUsChange(g)} 
          />
        ))}
      </FilterSection>

      {/* Объем памяти */}
      <FilterSection title="Объем памяти" defaultOpen={false}>
        {['48 ГБ и более', '32 ГБ', '24 ГБ', '20 ГБ', '16 ГБ', '12 ГБ', '10 ГБ', '8 ГБ', '6 ГБ', '4 ГБ', '2 ГБ'].map(m => (
          <Checkbox 
            key={m} 
            label={m} 
            checked={selectedMemory.includes(m)} 
            onChange={() => onMemoryChange(m)} 
          />
        ))}
      </FilterSection>

      {/* Бренд */}
      <FilterSection title="Бренд" defaultOpen={false}>
        <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
          {['ASUS', 'GIGABYTE', 'INNO3D', 'MSI', 'Palit', 'PNY', 'PowerColor', 'Sapphire', 'XFX', 'Zotac', 'Acer', 'AFOX', 'AMD', 'ARKTEK', 'ASRock', 'Biostar', 'Colorful', 'Dell', 'EVGA', 'Gainward', 'Golden Memory', 'HP', 'Intel', 'KFA2', 'Lenovo', 'Manli', 'Maxsun', 'NVIDIA', 'Sparkle'].map(b => (
            <Checkbox 
              key={b} 
              label={b} 
              checked={selectedBrands.includes(b)} 
              onChange={() => onBrandsChange(b)} 
            />
          ))}
        </div>
      </FilterSection>

      {/* Шина памяти */}
      <FilterSection title="Шина памяти" defaultOpen={false}>
        {['512 бит и более', '384 бит', '352 бит', '160 бит', '320 бит', '256 бит', '192 бит', '128 бит', '64 бит'].map(bus => (
          <Checkbox 
            key={bus} 
            label={bus} 
            checked={selectedBus.includes(bus)} 
            onChange={() => onBusChange(bus)} 
          />
        ))}
      </FilterSection>

      {/* Тип памяти */}
      <FilterSection title="Тип памяти" defaultOpen={false}>
        {['GDDR7', 'GDDR6X', 'GDDR6', 'GDDR5X', 'GDDR5', 'HBM2'].map(t => (
          <Checkbox 
            key={t} 
            label={t} 
            checked={selectedMemoryType.includes(t)} 
            onChange={() => onMemoryTypeChange(t)} 
          />
        ))}
      </FilterSection>

      {/* Длина */}
      <FilterSection title="Длина" defaultOpen={false} hasBorder={false}>
        {['149 мм и менее', '150-174 мм', '175-199 мм', '200-229 мм', '230-249 мм', '250-269 мм', '270-279 мм', '280-299 мм', '300-319 мм', '320 мм и более'].map(l => (
          <Checkbox 
            key={l} 
            label={l} 
            checked={selectedLength.includes(l)} 
            onChange={() => onLengthChange(l)} 
          />
        ))}
      </FilterSection>

    </div>
  );
}
