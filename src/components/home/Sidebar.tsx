import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../constants/categories';
import { useAppContext } from '../../context/AppContext';

interface SidebarProps {
  height?: string;
}

export default function Sidebar({ height }: SidebarProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsCatalogOpen, setCatalogCategory } = useAppContext();

  const handleCategoryClick = (id: string) => {
    if (id === 'services' || id === 'components') {
      setCatalogCategory(id);
      setIsCatalogOpen(true);
      return;
    }
    // Преобразуем camelCase в kebab-case для URL
    const path = id.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    navigate(`/${path}`);
  };

  return (
    <aside style={{ 
      width: '100%',
      height: height || 'auto',
      backgroundColor: 'var(--card-bg)', 
      borderRadius: '8px', 
      border: '1px solid var(--border-color)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <ul style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
        {CATEGORIES.map((cat, idx) => (
          <li key={idx} 
            onClick={() => handleCategoryClick(cat.id)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '0 16px', 
              flex: 1,
              borderBottom: idx !== CATEGORIES.length - 1 ? '1px solid var(--border-color)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontWeight: 500,
              fontSize: '14px',
              color: 'var(--text-color)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1a1d1d';
              e.currentTarget.style.color = 'var(--primary-color)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-color)';
            }}
          >
            <span style={{ color: '#999', display: 'flex', alignItems: 'center' }}>{cat.icon}</span>
            {t(cat.key)}
          </li>
        ))}
      </ul>
    </aside>
  );
}

