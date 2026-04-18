import { ChevronDown, MapPin } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="top-bar" style={{ backgroundColor: 'var(--bg-secondary)', padding: '8px 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <span>РУС</span> <ChevronDown size={14} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <MapPin size={14} /> <span>Киев</span> <ChevronDown size={14} />
          </div>
          <ul style={{ display: 'flex', gap: '16px' }}>
            <li><a href="#">Магазины</a></li>
            <li><a href="#">Доставка</a></li>
            <li><a href="#">Оплата</a></li>
            <li><a href="#">Гарантия</a></li>
            <li><a href="#">Сборка ПК</a></li>
            <li><a href="#">Трейд-Ин</a></li>
          </ul>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <a href="#" style={{ color: '#4a90e2' }}>Для Бизнеса</a>
          <a href="#" style={{ color: '#ff6b00' }}>SALE</a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, color: 'var(--text-color)' }}>
            <span>(044) 392-84-94</span> <ChevronDown size={14} />
          </div>
        </div>
      </div>
    </div>
  );
}
