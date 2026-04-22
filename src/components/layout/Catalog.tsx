import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../../constants/categories';

interface CatalogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Catalog({ isOpen, onClose }: CatalogProps) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string | null>(CATEGORIES[0].id);

  // Lock body scroll when catalog is open - disabled to keep original header stickiness
  useEffect(() => {
    // Scroll locking disabled to avoid breaking sticky header
  }, [isOpen]);

  if (!isOpen) return null;

  const currentCategoryData = activeCategory ? t(`catalog.${activeCategory}`, { returnObjects: true }) as any : null;

  return (
    <div 
      className="catalog-overlay"
      style={{
        position: 'fixed',
        top: '80px',
        left: 0,
        width: '100%',
        height: 'calc(100vh - 80px)',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '24px',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <style>
        {`
          @keyframes fadeIn { opacity: 0; }
          @keyframes slideDown { transform: translateY(-10px); opacity: 0; }
        `}
      </style>
      
      {/* Ограничитель ширины (как .container) */}
      <div style={{ width: '100%', maxWidth: '1400px', padding: '0 20px', display: 'flex' }}>
        <div 
          className="catalog-content"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            height: '440px',
            display: 'flex',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            width: '100%',
            animation: 'slideDown 0.15s ease-out'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Левая часть: Меню */}
          <div 
            className="catalog-sidebar"
            style={{ 
              width: '280px',
              borderRight: '1px solid var(--border-color)',
              backgroundColor: 'var(--card-bg)',
              padding: '0',
              overflow: 'hidden'
            }}
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 16px',
                  height: '44px',
                  cursor: 'pointer',
                  backgroundColor: activeCategory === cat.id ? 'var(--bg-secondary)' : 'transparent',
                  color: activeCategory === cat.id ? 'var(--primary-color)' : 'var(--text-color)',
                  transition: 'all 0.1s ease',
                  fontWeight: 500,
                  fontSize: '14px',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: activeCategory === cat.id ? 'var(--primary-color)' : '#999' }}>
                    {cat.icon}
                  </span>
                  {t(cat.key)}
                </div>
                <ChevronRight size={14} style={{ opacity: activeCategory === cat.id ? 1 : 0, transition: 'opacity 0.1s' }} />
              </div>
            ))}
          </div>

          {/* Правая часть: Подкатегории */}
          <div style={{ flex: 1, padding: '30px 40px', overflowY: 'auto', backgroundColor: 'var(--bg-secondary)' }}>
            {currentCategoryData && typeof currentCategoryData !== 'string' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
                {currentCategoryData.groups?.map((group: any, idx: number) => (
                  <div key={idx}>
                    <h3 style={{ 
                      fontSize: '15px', 
                      fontWeight: 700, 
                      color: '#fff', 
                      marginBottom: '18px',
                      textTransform: 'uppercase'
                    }}>
                      {group.title}
                    </h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {group.items?.map((item: string, i: number) => (
                        <li key={i}>
                          <a 
                            href="#" 
                            style={{ 
                              color: 'var(--text-secondary)', 
                              fontSize: '14px', 
                              transition: 'all 0.2s',
                              textDecoration: 'none',
                              display: 'block'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = 'var(--primary-color)';
                              e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'var(--text-secondary)';
                              e.currentTarget.style.transform = 'translateX(0)';
                            }}
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)' }}>
                <div style={{ fontSize: '16px', fontWeight: 500 }}>{t('common.noData')}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
