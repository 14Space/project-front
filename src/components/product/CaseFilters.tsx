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

interface CaseFiltersProps {
  selectedPopular: string[];
  onPopularChange: (label: string) => void;
  selectedBrands: string[];
  onBrandsChange: (label: string) => void;
  selectedMoboForms: string[];
  onMoboFormsChange: (label: string) => void;
  selectedSizeTypes: string[];
  onSizeTypesChange: (label: string) => void;
  selectedPSULocations: string[];
  onPSULocationsChange: (label: string) => void;
  selectedCoolerHeights: string[];
  onCoolerHeightsChange: (label: string) => void;
  minPrice: string;
  onMinPriceChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
}

export default function CaseFilters({ 
  selectedPopular, onPopularChange,
  selectedBrands, onBrandsChange,
  selectedMoboForms, onMoboFormsChange,
  selectedSizeTypes, onSizeTypesChange,
  selectedPSULocations, onPSULocationsChange,
  selectedCoolerHeights, onCoolerHeightsChange,
  minPrice, onMinPriceChange,
  maxPrice, onMaxPriceChange
}: CaseFiltersProps) {
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
        {['Корпус с предустановленными вентиляторами', 'Компактный Mini ITX корпус', 'Корпус с окном из закаленного стекла'].map(label => (
          <Checkbox 
            key={label} 
            label={label} 
            checked={selectedPopular.includes(label)} 
            onChange={() => onPopularChange(label)} 
          />
        ))}
      </FilterSection>

      {/* Бренд */}
      <FilterSection title="Бренд" defaultOpen={false}>
        <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
          {[
            '1STPLAYER', 'be quiet!', 'Cougar', 'Deepcool', 'Fractal Design', 'GameMax', 'Jonsbo', 'Lian Li', 'Montech', 'Vinga', '2E', 'ADATA', 'Aerocool', 'Aigo', 'Akasa', 'Akyga', 'ALmordor', 'ALSEYE', 'Antec', 'APNX', 'Arctic', 'ASUS', 'AZZA', 'BitFenix', 'Blizzard', 'Casecom', 'Chenbro', 'Chieftec', 'Cooler Master', 'Corsair', 'CSV', 'DarkFlash', 'Delux', 'Endorfy', 'Frime', 'FrimeCom', 'Frontier', 'FSP', 'FURY', 'GAMDIAS', 'Gembird', 'Genesis', 'Geometric Future', 'GIGABYTE', 'Golden Field', 'GTL', 'HAVN', 'HEXO', 'HYTE', 'I-BOX', 'I-TERRA', 'iBOX', 'In Win', 'Inter-Tech', 'JONSPLUS', 'Kolink', 'KRUX', 'LC-Power', 'Logic concept', 'LogicPower', 'Modecom', 'Morex', 'MSI', 'NATEC', 'NZXT', 'Ocypus', 'PCCooler', 'Phanteks', 'Prologix', 'QUBE', 'Raijintek', 'Razer', 'SAMA', 'Savio', 'Sharkoon', 'Silverstone', 'Super Flower', 'Thermalright', 'Thermaltake', 'TRYX', 'Xigmatek', 'XILENCE', 'Zalman'
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

      {/* Максимальный форм-фактор материнской платы */}
      <FilterSection title="Максимальный форм-фактор материнской платы" defaultOpen={false}>
        {['ATX', 'microATX', 'Mini-ITX', 'E-ATX', 'XL-ATX', 'CEB'].map(f => (
          <Checkbox 
            key={f} 
            label={f} 
            checked={selectedMoboForms.includes(f)} 
            onChange={() => onMoboFormsChange(f)} 
          />
        ))}
      </FilterSection>

      {/* Типоразмер */}
      <FilterSection title="Типоразмер" defaultOpen={false}>
        {['Midi-Tower', 'Mini (Micro)-Tower', 'Full-Tower', 'Cube', 'Desktop', 'Rackmount'].map(t => (
          <Checkbox 
            key={t} 
            label={t} 
            checked={selectedSizeTypes.includes(t)} 
            onChange={() => onSizeTypesChange(t)} 
          />
        ))}
      </FilterSection>

      {/* Расположение БП */}
      <FilterSection title="Расположение БП" defaultOpen={false}>
        {['снизу', 'сверху', 'за передней панелью', 'внешний'].map(l => (
          <Checkbox 
            key={l} 
            label={l} 
            checked={selectedPSULocations.includes(l)} 
            onChange={() => onPSULocationsChange(l)} 
          />
        ))}
      </FilterSection>

      {/* Высота процессорного кулера */}
      <FilterSection title="Высота процессорного кулера" defaultOpen={false} hasBorder={false}>
        {['181 мм и более', '171-180 мм', '161-170 мм', '151-160 мм', '141-150 мм', '140 мм и менее'].map(h => (
          <Checkbox 
            key={h} 
            label={h} 
            checked={selectedCoolerHeights.includes(h)} 
            onChange={() => onCoolerHeightsChange(h)} 
          />
        ))}
      </FilterSection>

    </div>
  );
}
