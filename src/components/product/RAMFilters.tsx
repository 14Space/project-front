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

interface RAMFiltersProps {
  selectedPopular: string[];
  onPopularChange: (label: string) => void;
  selectedVolume: string[];
  onVolumeChange: (label: string) => void;
  selectedFrequency: string[];
  onFrequencyChange: (label: string) => void;
  selectedType: string[];
  onTypeChange: (label: string) => void;
  selectedSticks: string[];
  onSticksChange: (label: string) => void;
  selectedTimings: string[];
  onTimingsChange: (label: string) => void;
  selectedBrands: string[];
  onBrandsChange: (label: string) => void;
  minPrice: string;
  onMinPriceChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
}

export default function RAMFilters({ 
  selectedPopular, onPopularChange,
  selectedVolume, onVolumeChange,
  selectedFrequency, onFrequencyChange,
  selectedType, onTypeChange,
  selectedSticks, onSticksChange,
  selectedTimings, onTimingsChange,
  selectedBrands, onBrandsChange,
  minPrice, onMinPriceChange,
  maxPrice, onMaxPriceChange
}: RAMFiltersProps) {
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
        {['Комплект 2x16 ГБ DDR5', 'Комплект 2x8 ГБ DDR5', 'DDR5 6000 МТ/с CL30'].map(label => (
          <Checkbox 
            key={label} 
            label={label} 
            checked={selectedPopular.includes(label)} 
            onChange={() => onPopularChange(label)} 
          />
        ))}
      </FilterSection>

      {/* Объем */}
      <FilterSection title="Объем">
        {['192 ГБ и более', '128 ГБ', '96 ГБ', '64 ГБ', '48 ГБ', '32 ГБ', '24 ГБ', '16 ГБ', '12 ГБ', '8 ГБ'].map(v => (
          <Checkbox 
            key={v} 
            label={v} 
            checked={selectedVolume.includes(v)} 
            onChange={() => onVolumeChange(v)} 
          />
        ))}
      </FilterSection>

      {/* Частота */}
      <FilterSection title="Частота" defaultOpen={false}>
        <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
          {[
            '8600 МТ/с и более', '8400 МТ/с', '8200 МТ/с', '8000 МТ/с', '7800 МТ/с', '7600 МТ/с', '7200 МТ/с', '7000 МТ/с', '6800 МТ/с', '6600 МТ/с', '6400 МТ/с', '6200 МТ/с', '6000 МТ/с', '5600 МТ/с', '5200 МТ/с', '4800 МТ/с', '4600 МТ/с', '4400 МТ/с', '4266 МТ/с', '4133 МТ/с', '4000 МТ/с', '3733 МТ/с', '3600 МТ/с', '3333 МТ/с', '3200 МТ/с', '3000 МТ/с', '2933 МТ/с', '2800 МТ/с', '2666 МТ/с', '2400 МТ/с', '2133 МТ/с', '1866 МТ/с', '1600 МТ/с', '1333 МТ/с', '1066 МТ/с', '800 МТ/с и менее'
          ].map(f => (
            <Checkbox 
              key={f} 
              label={f} 
              checked={selectedFrequency.includes(f)} 
              onChange={() => onFrequencyChange(f)} 
            />
          ))}
        </div>
      </FilterSection>

      {/* Тип */}
      <FilterSection title="Тип" defaultOpen={false}>
        {['DDR5'].map(t => (
          <Checkbox 
            key={t} 
            label={t} 
            checked={selectedType.includes(t)} 
            onChange={() => onTypeChange(t)} 
          />
        ))}
      </FilterSection>

      {/* Количество планок */}
      <FilterSection title="Количество планок" defaultOpen={false}>
        {['1', '2', '4', '8'].map(s => (
          <Checkbox 
            key={s} 
            label={s} 
            checked={selectedSticks.includes(s)} 
            onChange={() => onSticksChange(s)} 
          />
        ))}
      </FilterSection>

      {/* Тайминги (латентность) */}
      <FilterSection title="Тайминги (латентность)" defaultOpen={false}>
        <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
          {[
            'CL52', 'CL48', 'CL46', 'CL42', 'CL40', 'CL38', 'CL36', 'CL34', 'CL32', 'CL30', 'CL28', 'CL26', 'CL22', 'CL21', 'CL20', 'CL19', 'CL18', 'CL17', 'CL16', 'CL15', 'CL14', 'CL13', 'CL12', 'CL11', 'CL10', 'CL9 и менее'
          ].map(time => (
            <Checkbox 
              key={time} 
              label={time} 
              checked={selectedTimings.includes(time)} 
              onChange={() => onTimingsChange(time)} 
            />
          ))}
        </div>
      </FilterSection>

      {/* Бренд */}
      <FilterSection title="Бренд" defaultOpen={false} hasBorder={false}>
        <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
          {[
            'Corsair', 'Crucial', 'G.Skill', 'GOODRAM', 'Kingston', 'Kingston FURY', 'PATRIOT', 'Prologix', 'Samsung', 'SK hynix', 'A-Tech', 'Acer', 'ADATA', 'AFOX', 'AGI', 'AMD', 'Apacer', 'Apple', 'ARKTEK', 'ATRIA', 'Axiom', 'Dahua Technology', 'DATO', 'Dell', 'Elixir', 'Exceleram', 'Geil', 'Golden Memory', 'GTL', 'Hiksemi', 'HP', 'HyperX', 'Integral', 'INTELIGENTES', 'JUHOR', 'Klevv', 'Lexar', 'Micron', 'Mushkin', 'Nanya', 'Netac', 'OCPC', 'OLOy', 'PNY', 'Ramaxel', 'Silicon Power', 'Synology', 'TEAM', 'Thermaltake', 'Timetec', 'Transcend', 'V-Color', 'Wibrand'
          ].map(b => (
            <Checkbox 
              key={b} 
              label={b} 
              checked={selectedBrands.includes(b)} 
              onChange={() => onBrandsChange(b)} 
            />
          ))}
        </div>
      </FilterSection>

    </div>
  );
}
