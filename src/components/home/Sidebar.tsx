import { Laptop, Cpu, Monitor, Keyboard, Mouse, Gamepad2, Smartphone, HardDrive, Speaker } from 'lucide-react';

const categories = [
  { icon: <Cpu size={20} />, name: 'Компьютеры' },
  { icon: <Laptop size={20} />, name: 'Ноутбуки' },
  { icon: <HardDrive size={20} />, name: 'Комплектующие' },
  { icon: <Mouse size={20} />, name: 'Игровая периферия' },
  { icon: <Monitor size={20} />, name: 'Мониторы' },
  { icon: <Gamepad2 size={20} />, name: 'Товары для геймеров' },
  { icon: <Speaker size={20} />, name: 'Аудио' },
  { icon: <Keyboard size={20} />, name: 'Офисная периферия' },
  { icon: <Smartphone size={20} />, name: 'Гаджеты' },
  { icon: <Laptop size={20} />, name: 'Уценка' },
];

export default function Sidebar() {
  return (
    <aside style={{ 
      width: '280px', 
      flexShrink: 0, 
      backgroundColor: 'var(--card-bg)', 
      borderRadius: '8px', 
      border: '1px solid var(--border-color)',
      overflow: 'hidden'
    }}>
      <ul style={{ display: 'flex', flexDirection: 'column' }}>
        {categories.map((cat, idx) => (
          <li key={idx} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px 16px', 
            borderBottom: idx !== categories.length - 1 ? '1px solid var(--border-color)' : 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s, color 0.2s',
            fontWeight: 500,
            fontSize: '14px',
            color: 'var(--text-color)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
            e.currentTarget.style.color = 'var(--primary-color)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-color)';
          }}
          >
            <span style={{ color: '#999' }}>{cat.icon}</span>
            {cat.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
