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
          lineHeight: 1.2,
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

export default function AdminProductFilters() {
  const { t } = useTranslation();
  
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  const toggle = (category: string, item: string) => {
    setSelections(prev => {
      const current = prev[category] || [];
      const updated = current.includes(item) ? current.filter(i => i !== item) : [...current, item];
      return { ...prev, [category]: updated };
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
      items: ['Intel', 'AMD']
    },
    {
      id: 'gpus',
      title: t('sidebar.gpus'),
      items: ['NVIDIA', 'AMD']
    },
    {
      id: 'motherboards',
      title: t('sidebar.motherboards'),
      items: ['Intel', 'AMD']
    },
    {
      id: 'ram',
      title: t('sidebar.ram'),
      items: ['DDR5', 'DDR4']
    },
    {
      id: 'storage',
      title: t('sidebar.storage'),
      items: ['SSD', 'HDD']
    },
    {
      id: 'cases',
      title: t('sidebar.cases'),
      items: ['ATX', 'Micro-ATX', 'Mini-ITX']
    },
    {
      id: 'cooling',
      title: t('sidebar.cooling'),
      items: ['Воздушное', 'Жидкостное']
    },
    {
      id: 'psus',
      title: t('sidebar.psus'),
      items: ['Модульные', 'Стандартные']
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
      <FilterSection title={t('filters.price')}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder={t('filters.from')} 
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value.replace(/\D/g, ''))}
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
            onChange={(e) => setMaxPrice(e.target.value.replace(/\D/g, ''))}
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
          defaultOpen={idx < 2} // Open first two by default
          hasBorder={idx !== filterGroups.length - 1}
        >
          {group.items.map(label => (
            <Checkbox 
              key={label} 
              label={label} 
              checked={(selections[group.id] || []).includes(label)} 
              onChange={() => toggle(group.id, label)} 
            />
          ))}
        </FilterSection>
      ))}
    </div>
  );
}
