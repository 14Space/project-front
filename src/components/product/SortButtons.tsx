import { useState } from 'react';

interface SortButtonsProps {
  onSortChange?: (sort: string) => void;
}

export default function SortButtons({ onSortChange }: SortButtonsProps) {
  const [activeSort, setActiveSort] = useState('popularity');

  const options = [
    { id: 'popularity', label: 'По популярности' },
    { id: 'price_asc', label: 'По увеличению цены' },
    { id: 'price_desc', label: 'По снижению цены' }
  ];

  const handleSort = (id: string) => {
    setActiveSort(id);
    if (onSortChange) onSortChange(id);
  };

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      {options.map((option) => {
        const isActive = activeSort === option.id;
        return (
          <button
            key={option.id}
            onClick={() => handleSort(option.id)}
            style={{
              padding: '8px 20px',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              backgroundColor: isActive ? 'rgba(166, 206, 57, 0.1)' : 'transparent',
              border: `1px solid ${isActive ? '#A6CE39' : 'rgba(255, 255, 255, 0.2)'}`,
              color: isActive ? '#A6CE39' : 'var(--text-color)',
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
