import { Laptop, Cpu, Monitor, Keyboard, Mouse, Gamepad2, Gift, HardDrive, Wifi, Armchair, Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const categories = [
  { icon: <Cpu size={20} />, key: 'sidebar.computers' },
  { icon: <Laptop size={20} />, key: 'sidebar.laptops' },
  { icon: <HardDrive size={20} />, key: 'sidebar.components' },
  { icon: <Monitor size={20} />, key: 'sidebar.monitors' },
  { icon: <Mouse size={20} />, key: 'sidebar.peripherals' },
  { icon: <Gamepad2 size={20} />, key: 'sidebar.consoleGaming' },
  { icon: <Wifi size={20} />, key: 'sidebar.networking' },
  { icon: <Armchair size={20} />, key: 'sidebar.furniture' },
  { icon: <Gift size={20} />, key: 'sidebar.merch' },
  { icon: <Wrench size={20} />, key: 'sidebar.services' },
];

interface SidebarProps {
  height?: string;
}

export default function Sidebar({ height }: SidebarProps) {
  const { t } = useTranslation();
  return (
    <aside style={{ 
      width: '100%',
      height: height || 'auto',
      backgroundColor: 'var(--card-bg)', 
      borderRadius: '8px', 
      border: '1px solid var(--border-color)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <ul style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
        {categories.map((cat, idx) => (
          <li key={idx} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '0 16px', 
            flex: 1,
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
            <span style={{ color: '#999', display: 'flex', alignItems: 'center' }}>{cat.icon}</span>
            {t(cat.key)}
          </li>
        ))}
      </ul>
    </aside>
  );
}
