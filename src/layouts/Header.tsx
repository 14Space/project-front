import { useState } from 'react';
import { User, Heart, Scale, ShoppingCart, Search, Menu, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
<<<<<<< Updated upstream

export default function Header() {
  const { t, i18n } = useTranslation();
=======
import { Link, useNavigate } from 'react-router-dom';
import Catalog from '../components/layout/Catalog';
import AuthModal from '../components/layout/AuthModal';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const navigate = useNavigate();
>>>>>>> Stashed changes

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('ru') ? 'en' : 'ru';
    i18n.changeLanguage(nextLang);
  };

  return (
<<<<<<< Updated upstream
    <header className="header" style={{ height: '80px', padding: '15px 0', backgroundColor: 'var(--header-bg)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/branding/logo-FRAME.png" alt="FRAME" style={{ height: '52px' }} />
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
              {i18n.language.toUpperCase()}
            </button>
            <button className="header-action-btn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <Scale size={24} />
            </button>
            <button className="header-action-btn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <Heart size={24} />
            </button>
            <button className="header-action-btn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <ShoppingCart size={24} />
            </button>
            <button className="header-action-btn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <User size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
=======
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
          position: isCatalogOpen ? 'fixed' : 'relative',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: isCatalogOpen ? 1100 : 1000
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src="/branding/logo-FRAME.png" alt="FRAME" style={{ height: '52px' }} />
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
            <Link to="/compare" className="header-action-btn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <Scale size={24} />
            </Link>
            <Link to="/favorites" className="header-action-btn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <Heart size={24} />
            </Link>
            <Link to="/cart" className="header-action-btn" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <ShoppingCart size={24} />
            </Link>
            <button 
              onClick={() => setIsAuthOpen(true)} 
              className="header-action-btn" 
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
            >
              <User size={24} />
            </button>
          </div>
        </div>
        <Catalog isOpen={isCatalogOpen} onClose={() => setIsCatalogOpen(false)} />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </header>
      {/* Заглушка, чтобы контент не прыгал вверх при position: fixed */}
      {isCatalogOpen && <div style={{ height: '80px' }} />}
    </>
>>>>>>> Stashed changes
  );
}
