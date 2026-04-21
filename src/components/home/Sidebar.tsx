import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CATEGORIES } from '../../constants/catalogData';


interface SidebarProps {
  height?: string;
}

export default function Sidebar({ height }: SidebarProps) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <aside 
      style={{ 
        position: 'relative',
        width: '100%',
        height: height || 'auto',
        backgroundColor: 'var(--card-bg)', 
        borderRadius: '8px', 
        border: '1px solid var(--border-color)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseLeave={() => setActiveCategory(null)}
    >
      <ul style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
        {CATEGORIES.map((cat, idx) => {
          const isActive = activeCategory === cat.key;
          return (
            <li 
              key={idx} 
              onMouseEnter={() => setActiveCategory(cat.key)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                gap: '12px', 
                padding: '0 16px', 
                flex: 1,
                borderBottom: idx !== CATEGORIES.length - 1 ? '1px solid var(--border-color)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                color: isActive ? 'var(--primary-color)' : 'var(--text-color)',
                fontWeight: 500,
                fontSize: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ 
                  color: isActive ? 'var(--primary-color)' : '#999', 
                  display: 'flex', 
                  alignItems: 'center',
                  transition: 'color 0.2s'
                }}>
                  {cat.icon}
                </span>
                {t(`${cat.key}.title`)}
              </div>
              <ChevronRight 
                size={16} 
                style={{ 
                  opacity: isActive ? 1 : 0.3, 
                  transition: 'all 0.2s',
                  transform: isActive ? 'translateX(4px)' : 'none'
                }} 
              />
            </li>
          );
        })}
      </ul>

      {/* Flyout Menu */}
      {activeCategory && (
        <div 
          style={{
            position: 'absolute',
            left: 'calc(100% + 1px)',
            top: -1,
            width: '1080px',
            minHeight: 'calc(100% + 2px)',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '0 8px 8px 0',
            padding: '30px 40px',
            zIndex: 50,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
            boxShadow: '20px 0 50px rgba(0,0,0,0.5)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >


          {(t(`${activeCategory}.sub`, { returnObjects: true }) as any[]).map((section, sIdx) => (
            <div key={sIdx}>
              <h4 style={{ 
                color: 'var(--primary-color)', 
                fontSize: '15px', 
                fontWeight: 700, 
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {section.title}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {section.items.map((item: string, iIdx: number) => (
                  <li 
                    key={iIdx} 
                    style={{ 
                      fontSize: '14px', 
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'color 0.2s',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateX(10px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </aside>
  );
}
