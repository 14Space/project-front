import { User, Heart, Scale, ShoppingCart, Search, Menu, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onCatalogClick: () => void;
}

const ProfileIcon = ({ size = 24, color = 'currentColor' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Header({ onCatalogClick }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(nextLang);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="header" style={{ height: '80px', padding: '15px 0', backgroundColor: 'var(--header-bg)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', width: '100%' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', width: '100%' }}>
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/branding/logo-FRAME.png" alt="FRAME" style={{ height: '52px' }} />
        </Link>

        <button 
          onClick={onCatalogClick}
          className="btn-primary" 
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

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'var(--text-color)' }}>
          <button 
            onClick={toggleLanguage}
            style={{ 
              display: 'flex', 
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
          
          <Link to="/compare" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '4px', 
              color: isActive('/compare') ? 'var(--primary-color)' : 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { if(!isActive('/compare')) e.currentTarget.style.color = 'var(--primary-color)' }}
            onMouseLeave={(e) => { if(!isActive('/compare')) e.currentTarget.style.color = 'inherit' }}
          >
            <Scale size={24} />
          </Link>
          
          <Link to="/favorites" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '4px', 
              color: isActive('/favorites') ? 'var(--primary-color)' : 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { if(!isActive('/favorites')) e.currentTarget.style.color = 'var(--primary-color)' }}
            onMouseLeave={(e) => { if(!isActive('/favorites')) e.currentTarget.style.color = 'inherit' }}
          >
            <Heart size={24} fill={isActive('/favorites') ? 'var(--primary-color)' : 'none'} />
          </Link>

          <Link to="/cart" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: isActive('/cart') ? 'var(--primary-color)' : 'var(--text-color)', 
              cursor: 'pointer', 
              textDecoration: 'none', 
              transition: 'all 0.2s ease' 
            }}
            onMouseEnter={(e) => { if(!isActive('/cart')) e.currentTarget.style.color = 'var(--primary-color)' }}
            onMouseLeave={(e) => { if(!isActive('/cart')) e.currentTarget.style.color = 'var(--text-color)' }}
          >
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <ShoppingCart size={28} />
              <span style={{ 
                position: 'absolute', 
                top: '-8px', 
                right: '-8px', 
                backgroundColor: isActive('/cart') ? '#fff' : 'var(--primary-color)', 
                color: '#000', 
                fontSize: '11px', 
                fontWeight: 800, 
                width: '18px', 
                height: '18px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: isActive('/cart') ? '0 0 15px #fff' : '0 0 10px rgba(166, 206, 57, 0.3)',
                transition: 'all 0.2s ease'
              }}>
                0
              </span>
            </div>
          </Link>

          <Link to="/profile" 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '4px', 
              color: isActive('/profile') ? 'var(--primary-color)' : 'inherit',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { if(!isActive('/profile')) e.currentTarget.style.color = 'var(--primary-color)' }}
            onMouseLeave={(e) => { if(!isActive('/profile')) e.currentTarget.style.color = 'inherit' }}
          >
            <User size={24} />
          </Link>

        </div>
      </div>
    </header>
  );
}
