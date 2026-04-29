import { useState } from 'react';
import { User, Heart, Scale, ShoppingCart, Search, Menu, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Catalog from '../components/layout/Catalog';
import AuthModal from '../components/layout/AuthModal';
import AuthRequiredModal from '../components/layout/AuthRequiredModal';
import { useAppContext } from '../context/AppContext';
import { HOT_DEALS } from '../constants/products';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { favorites, compareList, cart, user } = useAppContext();
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isAuthRequiredOpen, setIsAuthRequiredOpen] = useState(false);
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('ru') ? 'en' : 'ru';
    i18n.changeLanguage(nextLang);
  };

  const compareItems = HOT_DEALS.filter(p => compareList.includes(p.id));
  const cartItemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  // Группировка товаров для сравнения по категориям
  const groupedCompare = compareItems.reduce((acc, product) => {
    const localizedCat = product.category === 'gpu' ? t('footer.links.gpus') :
                        product.category === 'cpu' ? t('footer.links.cpus') :
                        product.category === 'mb' ? t('catalog.components.groups.0.items.2') : 
                        t('footer.links.laptops');
    
    if (!acc[localizedCat]) acc[localizedCat] = 0;
    acc[localizedCat]++;
    return acc;
  }, {} as Record<string, number>);

  const compareEntries = Object.entries(groupedCompare);

  const handleCartClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setIsAuthRequiredOpen(true);
    }
  };

  return (
    <>
      <header 
        className="header" 
        style={{ 
          height: '80px', 
          padding: '15px 0', 
          backgroundColor: 'var(--header-bg)', 
          borderBottom: '1px solid var(--border-color)', 
          display: 'flex', 
          alignItems: 'center',
          position: isCatalogOpen ? 'fixed' : 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: isCatalogOpen ? 1100 : 1000
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src="/branding/BRANDING-logo-FRAME.png" alt="FRAME" style={{ height: '52px' }} />
          </div>

          <button 
            className="btn-primary" 
            onClick={() => setIsCatalogOpen(!isCatalogOpen)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '130px' }}
          >
            <Menu size={20} /> {t('header.catalog')}
          </button>

          <div className="search-bar" style={{ flex: 1, position: 'relative', maxWidth: '600px' }}>
            <input
              type="text"
              placeholder={t('header.search')}
              style={{ width: '100%', height: '48px', padding: '0 50px 0 20px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', outline: 'none' }}
            />
            <button style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', backgroundColor: '#111', color: '#fff', borderRadius: '6px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Search size={18} />
            </button>
          </div>

          <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button 
              className="header-action-btn"
              onClick={toggleLanguage}
              style={{ 
                display: 'flex', 
                flexDirection: 'row',
                alignItems: 'center', 
                gap: '6px', 
                fontSize: '14px', 
                fontWeight: 600, 
                backgroundColor: 'var(--card-bg)', 
                padding: '6px 12px', 
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                color: 'var(--primary-color)'
              }}
            >
              <Globe size={18} />
              {i18n.language.substring(0, 2).toUpperCase()}
            </button>
            
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setIsCompareOpen(!isCompareOpen)}
                className="header-action-btn" 
                style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
              >
                <Scale size={24} />
                {compareList.length > 0 && (
                  <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#A6CE39', color: '#000', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {compareList.length}
                  </span>
                )}
              </button>

              {isCompareOpen && (
                <div style={{ 
                  position: 'absolute', 
                  top: '100%', 
                  right: 0, 
                  marginTop: '15px', 
                  width: '320px', 
                  backgroundColor: '#1a1b1c', 
                  borderRadius: '12px', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)', 
                  padding: '10px 15px',
                  zIndex: 2000,
                  border: '1px solid #333'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Scale size={20} color="#A6CE39" />
                      <span style={{ fontWeight: 700, color: '#fff', fontSize: '16px' }}>{t('common.compare')}</span>
                    </div>
                    <button onClick={() => setIsCompareOpen(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>✕</button>
                  </div>
                  
                  {compareList.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {compareEntries.map(([category, count], index) => (
                        <Link 
                          key={category} 
                          to="/compare" 
                          className="compare-dropdown-link"
                          onClick={() => setIsCompareOpen(false)}
                          style={{ 
                            color: '#fff', 
                            textDecoration: 'none', 
                            fontSize: '14px', 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            padding: '10px 0',
                            paddingBottom: index === compareEntries.length - 1 ? '0' : '10px',
                            borderBottom: index === compareEntries.length - 1 ? 'none' : '1px solid #2a2b2c',
                            transition: 'color 0.2s ease'
                          }}
                        >
                          <span>{category}</span>
                          <span style={{ color: '#888' }}>({count})</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '10px 0 0 0', color: '#888', fontSize: '14px' }}>
                      {i18n.language.startsWith('ru') ? 'Тут пока ничего нет ;)' : 'Nothing here yet ;)'}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link to="/favorites" className="header-action-btn" style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <Heart size={24} />
              {favorites.length > 0 && (
                <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#FF1717', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link 
              to="/cart" 
              className="header-action-btn" 
              onClick={handleCartClick}
              style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#A6CE39', color: '#000', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => user ? navigate('/profile') : setIsAuthOpen(true)} 
              className="header-action-btn header-user-btn" 
              data-auth-trigger
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '4px', 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                color: 'inherit' 
              }}
            >
              <User size={24} />
            </button>
          </div>
        </div>
        <Catalog isOpen={isCatalogOpen} onClose={() => setIsCatalogOpen(false)} />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        <AuthRequiredModal isOpen={isAuthRequiredOpen} onClose={() => setIsAuthRequiredOpen(false)} />
      </header>
      {isCatalogOpen && <div style={{ height: '80px' }} />}
      
      <style>{`
        .compare-dropdown-link:hover {
          color: #A6CE39 !important;
        }
        .compare-dropdown-link:hover span:last-child {
          color: #A6CE39 !important;
        }
        .header-user-btn:hover {
          color: #A6CE39 !important;
        }
      `}</style>
    </>
  );
}
