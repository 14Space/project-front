import React, { useState } from 'react';
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

interface MotherboardFiltersProps {
  selectedPopular: string[];
  onPopularChange: (label: string) => void;
  selectedChipsets: string[];
  onChipsetsChange: (label: string) => void;
  selectedSockets: string[];
  onSocketsChange: (label: string) => void;
  selectedFormFactors: string[];
  onFormFactorsChange: (label: string) => void;
  selectedBrands: string[];
  onBrandsChange: (label: string) => void;
  selectedVideoInterfaces: string[];
  onVideoInterfacesChange: (label: string) => void;
  selectedRAMTypes: string[];
  onRAMTypesChange: (label: string) => void;
  selectedWiFi: string[];
  onWiFiChange: (label: string) => void;
  selectedM2Version: string[];
  onM2VersionChange: (label: string) => void;
  selectedM2Count: string[];
  onM2CountChange: (label: string) => void;
  selectedRAMSlots: string[];
  onRAMSlotsChange: (label: string) => void;
  minPrice: string;
  onMinPriceChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
}

export default function MotherboardFilters({ 
  selectedPopular, onPopularChange,
  selectedChipsets, onChipsetsChange,
  selectedSockets, onSocketsChange,
  selectedFormFactors, onFormFactorsChange,
  selectedBrands, onBrandsChange,
  selectedVideoInterfaces, onVideoInterfacesChange,
  selectedRAMTypes, onRAMTypesChange,
  selectedWiFi, onWiFiChange,
  selectedM2Version, onM2VersionChange,
  selectedM2Count, onM2CountChange,
  selectedRAMSlots, onRAMSlotsChange,
  minPrice, onMinPriceChange,
  maxPrice, onMaxPriceChange
}: MotherboardFiltersProps) {

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
      }}>
        Фильтры
      </div>

      {/* Цена */}
      <FilterSection title="Цена">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="от" 
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
            placeholder="до" 
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
        {['Материнские платы для AMD', 'Материнские платы для Intel', 'Материнская плата с Wi-Fi'].map(label => (
          <Checkbox 
            key={label} 
            label={label} 
            checked={selectedPopular.includes(label)} 
            onChange={() => onPopularChange(label)} 
          />
        ))}
      </FilterSection>

      {/* Чипсет */}
      <FilterSection title="Чипсет">
        <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '5px' }}>
          {['Intel Z890', 'Intel B860', 'Intel H810', 'Intel W790', 'AMD X870E', 'AMD X870', 'AMD B850', 'AMD B840', 'AMD X670E', 'AMD X670', 'AMD B650E', 'AMD B650', 'AMD TRX50'].map(c => (
            <Checkbox 
              key={c} 
              label={c} 
              checked={selectedChipsets.includes(c)} 
              onChange={() => onChipsetsChange(c)} 
            />
          ))}
        </div>
      </FilterSection>

      {/* Тип разъема CPU */}
      <FilterSection title="Тип разъема CPU" defaultOpen={false}>
        {['Intel Socket 1851', 'Intel Socket 1700', 'Intel Socket 1200', 'Intel Socket 1151-V2', 'AMD Socket AM5', 'AMD Socket sTR5', 'AMD Socket sTR4', 'AMD Socket sWRX8'].map(s => (
          <Checkbox 
            key={s} 
            label={s} 
            checked={selectedSockets.includes(s)} 
            onChange={() => onSocketsChange(s)} 
          />
        ))}
      </FilterSection>

      {/* Форм-фактор */}
      <FilterSection title="Форм-фактор" defaultOpen={false}>
        {['ATX', 'microATX', 'Mini-ITX', 'Thin Mini-ITX', 'E-ATX, XL-ATX'].map(f => (
          <Checkbox 
            key={f} 
            label={f} 
            checked={selectedFormFactors.includes(f)} 
            onChange={() => onFormFactorsChange(f)} 
          />
        ))}
      </FilterSection>

      {/* Бренд */}
      <FilterSection title="Бренд" defaultOpen={false}>
        {['ASRock', 'ASUS', 'Biostar', 'Colorful', 'GIGABYTE', 'HUANANZHI', 'Maxsun', 'MSI', 'NZXT', 'Sapphire'].map(b => (
          <Checkbox 
            key={b} 
            label={b} 
            checked={selectedBrands.includes(b)} 
            onChange={() => onBrandsChange(b)} 
          />
        ))}
      </FilterSection>

      {/* Видеоинтерфейс */}
      <FilterSection title="Видеоинтерфейс" defaultOpen={false}>
        {['PCI-E 5.0', 'PCI-E 4.0', 'PCI-E 3.0'].map(v => (
          <Checkbox 
            key={v} 
            label={v} 
            checked={selectedVideoInterfaces.includes(v)} 
            onChange={() => onVideoInterfacesChange(v)} 
          />
        ))}
      </FilterSection>

      {/* Тип поддерживаемой памяти */}
      <FilterSection title="Тип поддерживаемой памяти" defaultOpen={false}>
        {['DDR5', 'DDR4'].map(t => (
          <Checkbox 
            key={t} 
            label={t} 
            checked={selectedRAMTypes.includes(t)} 
            onChange={() => onRAMTypesChange(t)} 
          />
        ))}
      </FilterSection>

      {/* Адаптер W-Fi */}
      <FilterSection title="Адаптер W-Fi" defaultOpen={false}>
        {['802.11be (Wi-Fi 7)', '802.11ax (Wi-Fi 6E)', '802.11ax (Wi-Fi 6)', '802.11ac (Wi-Fi 5)'].map(w => (
          <Checkbox 
            key={w} 
            label={w} 
            checked={selectedWiFi.includes(w)} 
            onChange={() => onWiFiChange(w)} 
          />
        ))}
      </FilterSection>

      {/* Версия интерфейса M.2 */}
      <FilterSection title="Версия интерфейса M.2" defaultOpen={false}>
        {['PCI-E 5.0', 'PCI-E 4.0', 'PCI-E 3.0'].map(m => (
          <Checkbox 
            key={m} 
            label={m} 
            checked={selectedM2Version.includes(m)} 
            onChange={() => onM2VersionChange(m)} 
          />
        ))}
      </FilterSection>

      {/* Количество разъемов M.2 */}
      <FilterSection title="Количество разъемов M.2" defaultOpen={false}>
        {['3 и более', '2', '1'].map(count => (
          <Checkbox 
            key={count} 
            label={count} 
            checked={selectedM2Count.includes(count)} 
            onChange={() => onM2CountChange(count)} 
          />
        ))}
      </FilterSection>

      {/* Количество слотов памяти */}
      <FilterSection title="Количество слотов памяти" defaultOpen={false} hasBorder={false}>
        {['2', '4', '8 и более'].map(slots => (
          <Checkbox 
            key={slots} 
            label={slots} 
            checked={selectedRAMSlots.includes(slots)} 
            onChange={() => onRAMSlotsChange(slots)} 
          />
        ))}
      </FilterSection>

    </div>
  );
}
