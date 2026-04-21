import { useState } from 'react';
import { User, Package, Shield, Bell, Settings, Camera, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ProfileIcon = ({ size = 24, color = 'currentColor' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Profile() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Личные данные', icon: ProfileIcon },
    { id: 'orders', label: 'История заказов', icon: Package },
    { id: 'security', label: 'Безопасность', icon: Shield },
    { id: 'notifications', label: 'Уведомления', icon: Bell },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--bg-color)', border: '2px solid var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <ProfileIcon size={50} color="var(--primary-color)" />
                </div>
                <button style={{ position: 'absolute', bottom: '0', right: '0', backgroundColor: 'var(--primary-color)', color: '#000', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Camera size={16} />
                </button>
              </div>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>Alexey Frame</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Клиент с 2024 года</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {[
                { label: 'ФИО', value: 'Alexey Frame', icon: ProfileIcon },
                { label: 'E-mail', value: 'alexey@frame.md', icon: Mail },
                { label: 'Телефон', value: '+373 60 123 456', icon: Phone },
                { label: 'Адрес', value: 'Кишинев, бул. Штефан чел Маре 1', icon: MapPin },
              ].map(field => (
                <div key={field.label} style={{ backgroundColor: 'var(--bg-color)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase' }}>{field.label}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <field.icon size={18} style={{ color: 'var(--primary-color)' }} />
                    <div style={{ fontWeight: 600 }}>{field.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary" style={{ alignSelf: 'flex-start', padding: '0 32px' }}>Редактировать данные</button>
          </div>
        );
      case 'orders':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { id: 'FR-8892', date: '21.04.2024', total: '145,000 MDL', status: 'Доставлен', items: 'Игровой ПК FRAME Pro G1' },
              { id: 'FR-8841', date: '15.03.2024', total: '32,000 MDL', status: 'Доставлен', items: 'Монитор MSI Optix 27"' },
            ].map(order => (
              <div key={order.id} style={{ backgroundColor: 'var(--bg-color)', padding: '24px', borderRadius: '20px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 800 }}>Заказ #{order.id}</span>
                    <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '6px', backgroundColor: 'rgba(166, 206, 57, 0.1)', color: 'var(--primary-color)' }}>{order.status}</span>
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{order.items}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>{order.date}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: '8px' }}>{order.total}</div>
                  <button style={{ color: 'var(--primary-color)', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>Детали заказа <ChevronRight size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return <div style={{ color: 'var(--text-secondary)' }}>Этот раздел находится в разработке...</div>;
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: 'calc(100vh - 80px)', color: '#fff' }}>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        
        {/* Title */}
        <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ProfileIcon size={32} color="var(--primary-color)" />
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '1px'
          }}>
            Личный кабинет
          </h1>
        </div>


        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '48px', alignItems: 'start' }}>
          {/* Sidebar Tabs */}
          <div style={{ backgroundColor: 'var(--card-bg)', padding: '16px', borderRadius: '24px', border: '1px solid var(--border-color)' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  marginBottom: '8px',
                  backgroundColor: activeTab === tab.id ? 'rgba(166, 206, 57, 0.1)' : 'transparent',
                  color: activeTab === tab.id ? 'var(--primary-color)' : 'var(--text-secondary)',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                  fontWeight: 600
                }}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
            <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '16px 0' }}></div>
            <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderRadius: '16px', color: '#ff4d4d', fontWeight: 600 }}>
              Выйти из аккаунта
            </button>
          </div>

          {/* Tab Content */}
          <div style={{ backgroundColor: 'var(--card-bg)', padding: '40px', borderRadius: '28px', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
