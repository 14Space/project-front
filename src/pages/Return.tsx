import { RotateCcw, Box, CreditCard, HelpCircle } from 'lucide-react';

export default function Return() {
  const returnSteps = [
    {
      icon: <RotateCcw size={24} color="#A6CE39" />,
      title: '14 дней на возврат',
      desc: 'Вы можете вернуть или обменять товар в течение 14 дней с момента покупки.'
    },
    {
      icon: <Box size={24} color="#A6CE39" />,
      title: 'Состояние товара',
      desc: 'Товар должен сохранить товарный вид, упаковку, пломбы и полную комплектацию.'
    },
    {
      icon: <CreditCard size={24} color="#A6CE39" />,
      title: 'Возврат средств',
      desc: 'Деньги возвращаются тем же способом, которым была произведена оплата.'
    },
    {
      icon: <HelpCircle size={24} color="#A6CE39" />,
      title: 'Как оформить?',
      desc: 'Просто свяжитесь с нами по телефону или посетите любой из наших шоурумов.'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#fff', 
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: 0
            }}>
              Возврат товара
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {returnSteps.map((step, i) => (
              <div key={i} style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                padding: '24px', 
                borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ flexShrink: 0 }}>{step.icon}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#fff' }}>{step.title}</h3>
                </div>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6', margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
