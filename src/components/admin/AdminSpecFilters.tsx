import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

interface AdminSpecFiltersProps {
  selectedCategory: string | null;
  onSelect: (category: string) => void;
  hideTitle?: boolean;
}

export default function AdminSpecFilters({ selectedCategory, onSelect, hideTitle }: AdminSpecFiltersProps) {
  const { t } = useTranslation();
  
  const categories = [
    'Компьютеры',
    'Ноутбуки',
    'Процессоры',
    'Видеокарты',
    'Материнские платы',
    'Оперативная память',
    'Дисковые накопители',
    'Корпуса',
    'Охлаждение',
    'Блоки питания'
  ];

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
      {!hideTitle && (
        <div style={{ 
          fontSize: '20px', 
          fontWeight: 700, 
          lineHeight: 1,
          paddingBottom: '12px', 
          borderBottom: '1px solid var(--border-color)',
          marginBottom: '0px'
        }}>
          {t('filters.title')}
        </div>
      )}

      {categories.map((cat, idx) => {
        const isSelected = selectedCategory === cat;
        return (
          <div 
            key={cat}
            style={{ 
              borderBottom: idx !== categories.length - 1 ? '1px solid var(--border-color)' : 'none', 
              paddingTop: idx === 0 && hideTitle ? '0px' : '20px',
              paddingBottom: idx !== categories.length - 1 ? '20px' : '0'
            }}
          >
            <button 
              onClick={() => onSelect(cat)}
              style={{ 
                width: '100%', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'none',
                border: 'none',
                color: isSelected ? 'var(--primary-color)' : 'var(--text-color)',
                fontSize: '16px',
                fontWeight: 600,
                lineHeight: 1.4,
                textAlign: 'left',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.2s'
              }}
            >
              {cat}
              <div style={{ 
                transition: 'transform 0.3s ease', 
                transform: isSelected ? 'rotate(-90deg)' : 'rotate(0deg)', 
                display: 'flex' 
              }}>
                <ChevronDown size={18} />
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
