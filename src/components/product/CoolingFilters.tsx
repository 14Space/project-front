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

interface CoolingFiltersProps {
  selectedPopular: string[];
  onPopularChange: (label: string) => void;
  selectedFanSizes: string[];
  onFanSizesChange: (label: string) => void;
  selectedBrands: string[];
  onBrandsChange: (label: string) => void;
  selectedPurposes: string[];
  onPurposesChange: (label: string) => void;
  selectedSockets: string[];
  onSocketsChange: (label: string) => void;
  selectedTypes: string[];
  onTypesChange: (label: string) => void;
  selectedTDP: string[];
  onTDPChange: (label: string) => void;
  selectedFanCounts: string[];
  onFanCountsChange: (label: string) => void;
  minPrice: string;
  onMinPriceChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
}

export default function CoolingFilters({ 
  selectedPopular, onPopularChange,
  selectedFanSizes, onFanSizesChange,
  selectedBrands, onBrandsChange,
  selectedPurposes, onPurposesChange,
  selectedSockets, onSocketsChange,
  selectedTypes, onTypesChange,
  selectedTDP, onTDPChange,
  selectedFanCounts, onFanCountsChange,
  minPrice, onMinPriceChange,
  maxPrice, onMaxPriceChange
}: CoolingFiltersProps) {
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
        {['Водяное охлаждение для Intel 1700/AMD AM5', 'Воздушный кулер для Intel 1700/AMD AM5', 'Вентиляторы с подсветкой'].map(label => (
          <Checkbox 
            key={label} 
            label={label} 
            checked={selectedPopular.includes(label)} 
            onChange={() => onPopularChange(label)} 
          />
        ))}
      </FilterSection>

      {/* Размер вентилятора */}
      <FilterSection title="Размер вентилятора">
        {['150 мм и более', '140 мм', '135 мм', '130 мм', '120 мм', '100 мм', '95 мм', '92 мм', '90 мм', '80 мм', '70 мм', '60 мм', '50 мм', '40 мм'].map(s => (
          <Checkbox 
            key={s} 
            label={s} 
            checked={selectedFanSizes.includes(s)} 
            onChange={() => onFanSizesChange(s)} 
          />
        ))}
      </FilterSection>

      {/* Бренд */}
      <FilterSection title="Бренд" defaultOpen={false}>
        <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
          {[
            'Arctic', 'ASUS', 'be quiet!', 'Deepcool', 'ID-COOLING', 'Jonsbo', 'Lian Li', 'Noctua', 'PCCooler', 'Thermalright', '1STPLAYER', '2E', 'ADATA', 'Aerocool', 'Aigo', 'Akasa', 'Alpenfoehn', 'Alphacool', 'ALSEYE', 'AMD', 'Antec', 'APNX', 'Argus', 'ASRock', 'ATcom', 'AXAGON', 'AZZA', 'Bitspower', 'Brushless', 'Chieftec', 'Cooler Master', 'Cooling Baby', 'Coolmoon', 'Corsair', 'Cougar', 'Crown', 'DarkFlash', 'Dynatron', 'EKWB', 'Endorfy', 'Enermax', 'Fractal Design', 'Frime', 'FrimeCom', 'FSP', 'GAMDIAS', 'GameMax', 'GELID Solutions', 'Gembird', 'Genesis', 'GIGABYTE', 'GlacialTech', 'Golden Field', 'GTL', 'HYTE', 'Iceberg Thermal', 'IceGiant', 'Intel', 'Inter-Tech', 'KRUX', 'LC-Power', 'Lexar', 'Merlion', 'Montech', 'MSI', 'Noiseblocker', 'NZXT', 'OCPC', 'Ocypus', 'Phanteks', 'QUBE', 'Razer', 'Revoltec', 'SAMA', 'Scythe', 'SeaSonic', 'Sharkoon', 'SilentiumPC', 'Silverstone', 'Snowman', 'SRHX', 'Super Flower', 'Thermaltake', 'Titan', 'TRYX', 'Upsiren', 'Vinga', 'XILENCE', 'Zalman', 'Zezzio'
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

      {/* Назначение */}
      <FilterSection title="Назначение" defaultOpen={false}>
        {['для процессора', 'для корпуса'].map(p => (
          <Checkbox 
            key={p} 
            label={p} 
            checked={selectedPurposes.includes(p)} 
            onChange={() => onPurposesChange(p)} 
          />
        ))}
      </FilterSection>

      {/* Процессорная совместимость */}
      <FilterSection title="Процессорная совместимость" defaultOpen={false}>
        {['Socket 1700, 1851', 'Socket 1200, 115x', 'Socket 3647', 'Socket 2066, 2011', 'Socket 1366', 'Socket 775', 'Socket AM5', 'Socket TR4/SP3'].map(s => (
          <Checkbox 
            key={s} 
            label={s} 
            checked={selectedSockets.includes(s)} 
            onChange={() => onSocketsChange(s)} 
          />
        ))}
      </FilterSection>

      {/* Тип */}
      <FilterSection title="Тип" defaultOpen={false}>
        {['водяное охлаждение', 'воздушное охлаждение', 'вентилятор'].map(t => (
          <Checkbox 
            key={t} 
            label={t} 
            checked={selectedTypes.includes(t)} 
            onChange={() => onTypesChange(t)} 
          />
        ))}
      </FilterSection>

      {/* Рассеиваемая мощность кулера (TDP) */}
      <FilterSection title="Рассеиваемая мощность кулера (TDP)" defaultOpen={false}>
        {['350 Вт и более', '280-349 Вт', '220-279 Вт', '170-219 Вт', '130-169 Вт', '90-129 Вт', '70-89 Вт', '69 Вт и менее'].map(p => (
          <Checkbox 
            key={p} 
            label={p} 
            checked={selectedTDP.includes(p)} 
            onChange={() => onTDPChange(p)} 
          />
        ))}
      </FilterSection>

      {/* Количество вентиляторов */}
      <FilterSection title="Количество вентиляторов" defaultOpen={false} hasBorder={false}>
        {['4 и более', '3', '2', '1'].map(count => (
          <Checkbox 
            key={count} 
            label={count} 
            checked={selectedFanCounts.includes(count)} 
            onChange={() => onFanCountsChange(count)} 
          />
        ))}
      </FilterSection>

    </div>
  );
}
