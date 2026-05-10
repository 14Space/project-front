import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { CATEGORIES } from '../../constants/categories';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import AuthRequiredModal from './AuthRequiredModal';

interface CatalogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Catalog({ isOpen, onClose }: CatalogProps) {
  const { t } = useTranslation();
  const { user, catalogCategory, setCatalogCategory } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lockedCategory, setLockedCategory] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      if (catalogCategory) {
        setLockedCategory(catalogCategory);
      }
    } else {
      setActiveCategory(null);
      setLockedCategory(null);
      setCatalogCategory(null);
    }
  }, [isOpen, catalogCategory, setCatalogCategory]);

  if (!isOpen) return null;

  const displayCategory = activeCategory || lockedCategory;
  const currentCategoryData = displayCategory ? t(`catalog.${displayCategory}`, { returnObjects: true }) as any : null;

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
        paddingTop: '20px',
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
                onMouseLeave={() => setActiveCategory(null)}
                onClick={() => setLockedCategory(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 16px',
                  height: '44px',
                  cursor: 'pointer',
                  backgroundColor: displayCategory === cat.id ? 'var(--bg-secondary)' : 'transparent',
                  color: displayCategory === cat.id ? 'var(--primary-color)' : 'var(--text-color)',
                  transition: 'all 0.1s ease',
                  fontWeight: 500,
                  fontSize: '14px',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: displayCategory === cat.id ? 'var(--primary-color)' : '#999' }}>
                    {cat.icon}
                  </span>
                  {t(cat.key)}
                </div>
                <ChevronRight size={14} style={{ opacity: displayCategory === cat.id ? 1 : 0, transition: 'opacity 0.1s' }} />
              </div>
            ))}
          </div>

          {/* Правая часть: Подкатегории */}
          <div style={{ flex: 1, padding: '20px 40px', overflowY: 'auto', backgroundColor: 'var(--bg-secondary)' }}>
            {currentCategoryData && typeof currentCategoryData !== 'string' ? (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                width: '100%',
                rowGap: '40px'
              }}>
                <style>
                  {`
                    .category-group-link {
                      text-decoration: none;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      transition: all 0.3s ease;
                      cursor: pointer;
                      width: '30%',
                    }
                    .category-group-link:hover h3 {
                      color: #A6CE39 !important;
                    }
                    .category-group-link:hover img {
                      transform: scale(1.05);
                    }
                  `}
                </style>
                {currentCategoryData.groups?.map((group: any, idx: number) => {
                  const isExternal = group.path?.startsWith('http');
                  return (
                    <a 
                      key={idx} 
                      href={group.path || '#'} 
                      className="category-group-link"
                      style={{ textAlign: 'center' }}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        if (group.path?.startsWith('http')) {
                          window.open(group.path, '_blank', 'noopener,noreferrer');
                        } else if (group.path) {
                          if (group.path === '/trade-in' && !user) {
                            setIsAuthModalOpen(true);
                            return;
                          }
                          onClose();
                          navigate(group.path);
                        }
                      }}
                    >
                    <h3 style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#fff',
                      margin: '0 0 8px 0',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      transition: 'color 0.3s ease',
                      whiteSpace: 'nowrap'
                    }}>
                      {group.title}
                    </h3>
                    
                    {group.image && (
                      <div style={{ 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        marginTop: '0' 
                      }}>
                        <img 
                          src={group.image} 
                          alt={group.title} 
                          style={{ 
                            width: 'auto', 
                            height: '180px', 
                            objectFit: 'contain',
                            borderRadius: '8px',
                            transition: 'transform 0.3s ease',
                            padding: group.image.includes('zaglushka') ? '25px' : '0'
                          }}
                        />
                      </div>
                    )}
                    <ul style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      padding: 0,
                      margin: 0,
                      listStyle: 'none'
                    }}>
                      {group.items?.map((item: string, i: number) => (
                        <li key={i} style={{ margin: 0, padding: 0 }}>
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
                  </a>
                );
              })}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <AuthRequiredModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}