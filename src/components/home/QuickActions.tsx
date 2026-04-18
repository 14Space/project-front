import { Wrench, PackageSearch, Gift, CreditCard } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { icon: <Wrench size={32} />, title: 'Сборка ПК', desc: 'Конфигуратор ПК' },
    { icon: <PackageSearch size={32} />, title: 'Статус заказа', desc: 'Проверить статус' },
    { icon: <Gift size={32} />, title: 'Бонусы', desc: 'Программа лояльности' },
    { icon: <CreditCard size={32} />, title: 'Кредит', desc: 'Оплата частями' }
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        {actions.map((action, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '8px', cursor: 'pointer', transition: 'background-color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f8f8'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div style={{ color: '#A6CE39' }}>{action.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>{action.title}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{action.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
