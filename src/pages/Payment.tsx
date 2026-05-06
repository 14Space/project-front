import { Banknote, CreditCard, Coins, ShieldCheck } from 'lucide-react';

export default function Payment() {
  const paymentMethods = [
    {
      icon: <Banknote size={24} color="#A6CE39" />,
      title: 'Наложенный платеж',
      desc: 'Оплата наличными или картой при получении заказа в отделении или у курьера.'
    },
    {
      icon: <CreditCard size={24} color="#A6CE39" />,
      title: 'Карта Visa',
      desc: 'Безопасная оплата картой Visa любого банка через защищенный шлюз.'
    },
    {
      icon: <CreditCard size={24} color="#A6CE39" />,
      title: 'Карта Mastercard',
      desc: 'Быстрая и удобная оплата картой Mastercard любого банка.'
    },
    {
      icon: <Coins size={24} color="#A6CE39" />,
      title: 'Оплата USDT',
      desc: 'Оплата в криптовалюте USDT (TRC-20) по актуальному курсу на момент заказа.'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          {/* ОСНОВНОЙ ЗАГОЛОВОК */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#fff', 
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: 0
            }}>
              Способы оплаты
            </h2>
          </div>

          {/* СЕТКА СПОСОБОВ ОПЛАТЫ */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {paymentMethods.map((method, i) => (
              <div key={i} style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                padding: '24px', 
                borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ flexShrink: 0 }}>{method.icon}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#fff' }}>{method.title}</h3>
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.5', margin: 0 }}>{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
