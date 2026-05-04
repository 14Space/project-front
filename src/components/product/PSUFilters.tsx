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

interface PSUFiltersProps {
  selectedPower: string[];
  onPowerChange: (label: string) => void;
  selectedBrands: string[];
  onBrandsChange: (label: string) => void;
  selectedStandards: string[];
  onStandardsChange: (label: string) => void;
  selectedForms: string[];
  onFormsChange: (label: string) => void;
  selectedGPUConnectors: string[];
  onGPUConnectorsChange: (label: string) => void;
  selectedModularity: string[];
  onModularityChange: (label: string) => void;
  selectedCPUConnectors: string[];
  onCPUConnectorsChange: (label: string) => void;
  minPrice: string;
  onMinPriceChange: (val: string) => void;
  maxPrice: string;
  onMaxPriceChange: (val: string) => void;
}

export default function PSUFilters({ 
  selectedPower, onPowerChange,
  selectedBrands, onBrandsChange,
  selectedStandards, onStandardsChange,
  selectedForms, onFormsChange,
  selectedGPUConnectors, onGPUConnectorsChange,
  selectedModularity, onModularityChange,
  selectedCPUConnectors, onCPUConnectorsChange,
  minPrice, onMinPriceChange,
  maxPrice, onMaxPriceChange
}: PSUFiltersProps) {

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

      {/* Мощность */}
      <FilterSection title="Мощность">
        {['1600 Вт и более', '1200-1599 Вт', '1000-1199 Вт', '800-999 Вт', '700-799 Вт', '600-699 Вт', '500-599 Вт', '400-499 Вт', '399 Вт и менее'].map(p => (
          <Checkbox 
            key={p} 
            label={p} 
            checked={selectedPower.includes(p)} 
            onChange={() => onPowerChange(p)} 
          />
        ))}
      </FilterSection>

      {/* Бренд */}
      <FilterSection title="Бренд" defaultOpen={false}>
        <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
          {[
            'ASUS', 'be quiet!', 'Chieftec', 'Corsair', 'Deepcool', 'GameMax', 'GIGABYTE', 'MSI', 'SeaSonic', 'Super Flower', '1StCharger', '1stCOOL', '1STPLAYER', '2E', 'ADATA', 'Aerocool', 'Aigo', 'Akyga', 'ALmordor', 'APNX', 'Aqirys', 'ASRock', 'AZZA', 'Casecom', 'Chieftronic', 'Comstars', 'Cooler Master', 'Cougar', 'Delux', 'Endorfy', 'Enermax', 'EVGA', 'Evolveo', 'Fractal Design', 'Frime', 'FrimeCom', 'FSP', 'GAMDIAS', 'Gamer Storm', 'Gembird', 'Golden Field', 'GreatWall', 'GTL', 'High Power', 'iBOX', 'Inter-Tech', 'Kenweiipc', 'LC-Power', 'Lian Li', 'LogicPower', 'Modecom', 'Montech', 'NZXT', 'OCZ', 'PCCooler', 'Phanteks', 'PREYON', 'Prologix', 'Qdion', 'Qoltec', 'QUBE', 'Rebeltec', 'Redragon', 'Rosewill', 'SAMA', 'Sharkoon', 'Silverstone', 'Spire', 'Tecnoware', 'Thermalright', 'Thermaltake', 'Vinga', 'XILENCE', 'Zalman'
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

      {/* Стандарт */}
      <FilterSection title="Стандарт" defaultOpen={false}>
        {['80 PLUS Titanium', '80 PLUS Platinum', '80 PLUS Gold', '80 PLUS Silver', '80 PLUS Bronze', '80 PLUS'].map(s => (
          <Checkbox 
            key={s} 
            label={s} 
            checked={selectedStandards.includes(s)} 
            onChange={() => onStandardsChange(s)} 
          />
        ))}
      </FilterSection>

      {/* Форм-фактор */}
      <FilterSection title="Форм-фактор" defaultOpen={false}>
        {['ATX', 'SFX', 'SFX-L', 'Flex ATX', 'TFX'].map(f => (
          <Checkbox 
            key={f} 
            label={f} 
            checked={selectedForms.includes(f)} 
            onChange={() => onFormsChange(f)} 
          />
        ))}
      </FilterSection>

      {/* Тип разъемов питания для видеокарт */}
      <FilterSection title="Тип разъемов питания для видеокарт" defaultOpen={false}>
        {['16pin (12VHPWR, 12V-2x6)', '6+2pin, 8pin', '6pin'].map(c => (
          <Checkbox 
            key={c} 
            label={c} 
            checked={selectedGPUConnectors.includes(c)} 
            onChange={() => onGPUConnectorsChange(c)} 
          />
        ))}
      </FilterSection>

      {/* Модульность */}
      <FilterSection title="Модульность" defaultOpen={false}>
        {['модульный', 'полумодульный', 'немодульный'].map(m => (
          <Checkbox 
            key={m} 
            label={m} 
            checked={selectedModularity.includes(m)} 
            onChange={() => onModularityChange(m)} 
          />
        ))}
      </FilterSection>

      {/* Тип разъема подключения питания процессора */}
      <FilterSection title="Тип разъема подключения питания процессора" defaultOpen={false} hasBorder={false}>
        {['3x4+4pin', '2x4+4pin', '1x4+4pin', '1x4pin'].map(c => (
          <Checkbox 
            key={c} 
            label={c} 
            checked={selectedCPUConnectors.includes(c)} 
            onChange={() => onCPUConnectorsChange(c)} 
          />
        ))}
      </FilterSection>

    </div>
  );
}
