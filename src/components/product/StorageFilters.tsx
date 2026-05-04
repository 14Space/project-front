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

interface StorageFiltersProps {
  selectedPopular: string[];
  onPopularChange: (label: string) => void;
  selectedVolume: string[];
  onVolumeChange: (label: string) => void;
  selectedInterface: string[];
  onInterfaceChange: (label: string) => void;
  selectedBrands: string[];
  onBrandsChange: (label: string) => void;
  selectedNAND: string[];
  onNANDChange: (label: string) => void;
  selectedTBW: string[];
  onTBWChange: (label: string) => void;
  selectedFormFactors: string[];
  onFormFactorsChange: (label: string) => void;
  selectedReadSpeed: string[];
  onReadSpeedChange: (label: string) => void;
  selectedWriteSpeed: string[];
  onWriteSpeedChange: (label: string) => void;
  minPrice: string;
  onMinPriceChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
}

export default function StorageFilters({ 
  selectedPopular, onPopularChange,
  selectedVolume, onVolumeChange,
  selectedInterface, onInterfaceChange,
  selectedBrands, onBrandsChange,
  selectedNAND, onNANDChange,
  selectedTBW, onTBWChange,
  selectedFormFactors, onFormFactorsChange,
  selectedReadSpeed, onReadSpeedChange,
  selectedWriteSpeed, onWriteSpeedChange,
  minPrice, onMinPriceChange,
  maxPrice, onMaxPriceChange
}: StorageFiltersProps) {

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
        {['HDD накопитель', 'SSD накопитель', 'SSD с интерфейсом PCIe 4.0'].map(label => (
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
        <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '5px' }}>
          {['10 ТБ и более', '8 ТБ', '6 ТБ', '5 ТБ', '4 ТБ', '3 ТБ', '2 ТБ', '960-1024 ГБ', '600-800 ГБ', '480-525 ГБ', '300-450 ГБ', '240-280 ГБ', '150-220 ГБ', '120-128 ГБ'].map(v => (
            <Checkbox 
              key={v} 
              label={v} 
              checked={selectedVolume.includes(v)} 
              onChange={() => onVolumeChange(v)} 
            />
          ))}
        </div>
      </FilterSection>

      {/* Разъем подключения */}
      <FilterSection title="Разъем подключения" defaultOpen={false}>
        {['SATA rev. 3.0', 'M.2 (PCI-E 5.0)', 'M.2 (PCI-E 4.0)', 'M.2 (PCI-E 3.0)', 'SATA (SATA2)'].map(i => (
          <Checkbox 
            key={i} 
            label={i} 
            checked={selectedInterface.includes(i)} 
            onChange={() => onInterfaceChange(i)} 
          />
        ))}
      </FilterSection>

      {/* Бренд */}
      <FilterSection title="Бренд" defaultOpen={false}>
        <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
          {[
            'Acer', 'ADATA', 'addlink', 'AFOX', 'AGI', 'AMD', 'Angelbird', 'Apacer', 'ASUS', 'ATRIA', 'Biostar', 'BIWIN', 'Corsair', 'Crucial', 'CUSU', 'Dahua Technology', 'DataLocker', 'DATO', 'Emtec', 'Fikwot', 'FORESEE', 'Freecom', 'G-Technology', 'GameStop', 'GIGABYTE', 'Gigastone', 'Golden Memory', 'GOODRAM', 'GTL', 'HGST', 'Hiksemi', 'HIKVISION', 'Hitachi', 'Hotface', 'HP', 'Innovation IT', 'Integral', 'Intel', 'Intenso', 'iStorage', 'KingCell', 'KingSpec', 'Kingston', 'Kingston FURY', 'Kioxia', 'Klevv', 'LaCie', 'Lexar', 'Lite-On', 'MediaRange', 'Mibrand', 'Micron', 'MSI', 'MyMedia', 'Netac', 'OCPC', 'Orico', 'OWC', 'PATRIOT', 'Philips', 'PNY', 'Prologix', 'Raspberry Pi', 'Samsung', 'SanDisk', 'Seagate', 'Silicon Power', 'SK hynix', 'Solidigm', 'SureFire', 'Synology', 'Tandberg', 'TEAM', 'Timetec', 'Toshiba', 'Transcend', 'Ubiquiti', 'UnionSine', 'Verbatim', 'WD', 'Wibrand', 'Xiaomi'
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

      {/* Тип флеш-памяти NAND */}
      <FilterSection title="Тип флеш-памяти NAND" defaultOpen={false}>
        {['MLC', 'TLC', 'QLC', '3D XPoint'].map(t => (
          <Checkbox 
            key={t} 
            label={t} 
            checked={selectedNAND.includes(t)} 
            onChange={() => onNANDChange(t)} 
          />
        ))}
      </FilterSection>

      {/* Ресурс записи */}
      <FilterSection title="Ресурс записи" defaultOpen={false}>
        {['2000 TBW и более', '1500-1999 TBW', '1000-1499 TBW', '750-999 TBW', '500-749 TBW', '250-499 TBW', '249 TBW и менее'].map(res => (
          <Checkbox 
            key={res} 
            label={res} 
            checked={selectedTBW.includes(res)} 
            onChange={() => onTBWChange(res)} 
          />
        ))}
      </FilterSection>

      {/* Форм-фактор */}
      <FilterSection title="Форм-фактор" defaultOpen={false}>
        {['M.2 22110', 'M.2 2280', 'M.2 2260', 'M.2 2242', 'M.2 2230', '2,5"', '3,5"'].map(f => (
          <Checkbox 
            key={f} 
            label={f} 
            checked={selectedFormFactors.includes(f)} 
            onChange={() => onFormFactorsChange(f)} 
          />
        ))}
      </FilterSection>

      {/* Максимальная скорость чтения */}
      <FilterSection title="Максимальная скорость чтения" defaultOpen={false}>
        <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '5px' }}>
          {['14000 МБ/с и более', '12000-13999 МБ/с', '10000-11999 МБ/с', '8000-9999 МБ/с', '7000-7999 МБ/с', '5500-6999 МБ/с', '4000-5499 МБ/с', '3000-3999 МБ/с', '2000-2999 МБ/с', '1500-1999 МБ/с', '600-1499 МБ/с', '599 МБ/с и менее'].map(s => (
            <Checkbox 
              key={s} 
              label={s} 
              checked={selectedReadSpeed.includes(s)} 
              onChange={() => onReadSpeedChange(s)} 
            />
          ))}
        </div>
      </FilterSection>

      {/* Максимальная скорость записи */}
      <FilterSection title="Максимальная скорость записи" defaultOpen={false} hasBorder={false}>
        <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '5px' }}>
          {['13000 МБ/с и более', '10000-12999 МБ/с', '8000-9999 МБ/с', '6000-7999 МБ/с', '5500-5999 МБ/с', '4000-5499 МБ/с', '3000-3999 МБ/с', '2000-2999 МБ/с', '1000-1999 МБ/с', '560-999 МБ/с', '500-559 МБ/с', '499 МБ/с и менее'].map(s => (
            <Checkbox 
              key={s} 
              label={s} 
              checked={selectedWriteSpeed.includes(s)} 
              onChange={() => onWriteSpeedChange(s)} 
            />
          ))}
        </div>
      </FilterSection>

    </div>
  );
}
