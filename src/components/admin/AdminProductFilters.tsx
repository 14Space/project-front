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
          cursor: 'pointer',
          padding: 0,
          textAlign: 'left'
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

interface ActiveFilter {
  categoryName: string;
  subcategoryName: string;
}

interface AdminProductFiltersProps {
  onFilterChange?: (filters: { minPrice: string; maxPrice: string; active: ActiveFilter[] }) => void;
}

export default function AdminProductFilters({ onFilterChange }: AdminProductFiltersProps) {
  const { t } = useTranslation();

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  const buildActive = (sel: Record<string, string[]>, groups: { id: string; title: string; items: string[] }[]): ActiveFilter[] =>
    groups.flatMap(g => (sel[g.id] || []).map(sub => ({ categoryName: g.title, subcategoryName: sub })));

  const notify = (newMin: string, newMax: string, newSel: Record<string, string[]>, groups: { id: string; title: string; items: string[] }[]) => {
    onFilterChange?.({ minPrice: newMin, maxPrice: newMax, active: buildActive(newSel, groups) });
  };

  const toggle = (groupId: string, item: string, groups: { id: string; title: string; items: string[] }[]) => {
    setSelections(prev => {
      const current = prev[groupId] || [];
      const updated = current.includes(item) ? current.filter(i => i !== item) : [...current, item];
      const next = { ...prev, [groupId]: updated };
      notify(minPrice, maxPrice, next, groups);
      return next;
    });
  };

  const filterGroups = [
    {
      id: 'computers',
      title: t('sidebar.computers'),
      items: ['Игровые', 'Мини-ПК', 'Моноблоки', 'Рабочие станции']
    },
    {
      id: 'laptops',
      title: t('sidebar.laptops'),
      items: ['Игровые', 'Для учёбы', 'MacBook']
    },
    {
      id: 'cpus',
      title: t('sidebar.cpus'),
      items: ['Процессоры AMD с 3D V-Cache', 'Производительная iGPU', 'Процессор для игровых ПК', 'Процессор для рабочих станций']
    },
    {
      id: 'gpus',
      title: t('sidebar.gpus'),
      items: ['Игровая видеокарта NVIDIA', 'Игровая видеокарта AMD', 'Профессиональная видеокарта']
    },
    {
      id: 'motherboards',
      title: t('sidebar.motherboards'),
      items: ['Материнские платы для AMD', 'Материнские платы для Intel', 'Материнская плата с Wi-Fi']
    },
    {
      id: 'ram',
      title: t('sidebar.ram'),
      items: ['Комплект 2x16 ГБ DDR5', 'Комплект 2x8 ГБ DDR5', 'DDR5 6000 МТ/с CL30']
    },
    {
      id: 'storage',
      title: t('sidebar.storage'),
      items: ['HDD накопитель', 'SSD накопитель', 'SSD с интерфейсом PCIe 4.0']
    },
    {
      id: 'cases',
      title: t('sidebar.cases'),
      items: ['Корпус с предустановленными вентиляторами', 'Компактный Mini ITX корпус', 'Корпус с окном из закаленного стекла']
    },
    {
      id: 'cooling',
      title: t('sidebar.cooling'),
      items: ['Водяное охлаждение', 'Воздушное охлаждение', 'Вентиляторы']
    },
    {
      id: 'psus',
      title: t('sidebar.psus'),
      items: ['1600 Вт и более', '80 PLUS Titanium', 'ATX']
    }
  ];

  return (
    <div style={{
      backgroundColor: '#0c0d0d',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '20px',
      color: 'var(--text-color)',
      display: 'flex',
      flexDirection: 'column',
      width: '280px',
      flexShrink: 0
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
      <FilterSection title={t('filters.price')} defaultOpen={false}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder={t('filters.from')} 
            value={minPrice}
            onChange={(e) => { const v = e.target.value.replace(/\D/g, ''); setMinPrice(v); notify(v, maxPrice, selections, filterGroups); }}
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
            onChange={(e) => { const v = e.target.value.replace(/\D/g, ''); setMaxPrice(v); notify(minPrice, v, selections, filterGroups); }}
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

      {/* Группы подкатегорий */}
      {filterGroups.map((group, idx) => (
        <FilterSection 
          key={group.id} 
          title={group.title} 
          defaultOpen={false}
          hasBorder={idx !== filterGroups.length - 1}
        >
          <Checkbox 
            label={`Все в ${group.title}`}
            checked={(selections[group.id] || []).length === group.items.length} 
            onChange={(checked) => {
              setSelections(prev => {
                const next = { ...prev, [group.id]: checked ? [...group.items] : [] };
                notify(minPrice, maxPrice, next, filterGroups);
                return next;
              });
            }}
          />
          {group.items.map(label => (
            <Checkbox 
              key={label} 
              label={label} 
              checked={(selections[group.id] || []).includes(label)} 
              onChange={() => toggle(group.id, label, filterGroups)}
            />
          ))}
        </FilterSection>
      ))}
    </div>
  );
}
