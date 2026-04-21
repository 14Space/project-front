import { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CATEGORIES } from '../../constants/catalogData';

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CatalogModal({ isOpen, onClose }: CatalogModalProps) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<string | null>(CATEGORIES[0].key);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(12, 13, 13, 0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Inter', sans-serif",
      }}
      onClick={onClose}
    >
      <div 
        style={{
          width: '1360px',
          maxWidth: '95vw',
          backgroundColor: 'var(--bg-color)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          height: '440px',
          overflow: 'hidden',
          boxShadow: '0 25px 100px -12px rgba(0, 0, 0, 0.8)',
          animation: 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Sidebar */}
        <div style={{ 
          width: '280px', 
          borderRight: '1px solid var(--border-color)', 
          backgroundColor: 'var(--card-bg)', 
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <ul style={{ display: 'flex', flexDirection: 'column', padding: '0', flex: 1 }}>
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
                    padding: '0 20px',
                    flex: 1,
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: isActive ? 'var(--bg-secondary)' : 'transparent',
                    color: isActive ? 'var(--primary-color)' : 'var(--text-color)',
                    fontWeight: 500,
                    borderBottom: idx !== CATEGORIES.length - 1 ? '1px solid var(--border-color)' : 'none',
                    fontSize: '14px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ 
                      color: isActive ? 'var(--primary-color)' : '#999',
                      transition: 'color 0.2s',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      {cat.icon}
                    </span>
                    <span>{t(`${cat.key}.title`)}</span>
                  </div>
                  <ChevronRight size={16} style={{ 
                    opacity: isActive ? 1 : 0.3, 
                    transform: isActive ? 'translateX(4px)' : 'none',
                    transition: 'all 0.2s ease'
                  }} />
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Content */}
        <div style={{ 
          flex: 1, 
          padding: '30px 40px', 
          overflowY: 'auto', 
          backgroundColor: 'var(--card-bg)', // Matches Home page flyout
          position: 'relative'
        }}>
          <button 
            onClick={onClose} 
            style={{ 
              position: 'absolute', 
              right: '20px', 
              top: '20px', 
              color: '#fff', 
              opacity: 0.3,
              cursor: 'pointer',
              zIndex: 10
            }}
          >
            <X size={20} />
          </button>
          
          {activeCategory && (
            <div style={{ animation: 'contentFadeIn 0.4s ease-out' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
                {(t(`${activeCategory}.sub`, { returnObjects: true }) as any[]).map((section, sIdx) => (
                  <div key={sIdx}>
                    <h3 style={{ 
                      color: 'var(--primary-color)', 
                      fontSize: '15px', 
                      fontWeight: 700, 
                      marginBottom: '16px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      {section.title}
                    </h3>


                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {section.items.map((item, iIdx) => (
                        <li 
                          key={iIdx} 
                          style={{ 
                            color: 'var(--text-secondary)', 
                            fontSize: '15px', 
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#fff';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-secondary)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style>
        {`
          @keyframes modalSlideIn {
            from { opacity: 0; transform: scale(0.9) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          @keyframes contentFadeIn {
            from { opacity: 0; transform: translateX(10px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}
