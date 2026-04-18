import { User, Heart, Scale, ShoppingCart, Search, Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="header" style={{ padding: '20px 0', backgroundColor: 'var(--header-bg)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="https://telemart.ua/images/logo.svg" alt="FRAME" style={{ height: '40px' }} />
        </div>
        
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '130px' }}>
          <Menu size={20} /> Каталог
        </button>

        <div className="search-bar" style={{ flex: 1, position: 'relative', maxWidth: '600px' }}>
          <input 
            type="text" 
            placeholder="Я хочу найти..." 
            style={{ width: '100%', padding: '14px 20px', borderRadius: '24px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', outline: 'none' }}
          />
          <button style={{ position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)', backgroundColor: '#111', color: '#fff', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Search size={18} />
          </button>
        </div>

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px', color: 'var(--text-color)' }}>
          <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <User size={24} />
          </button>
          <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <Heart size={24} />
          </button>
          <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <Scale size={24} />
          </button>
          <button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <ShoppingCart size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
