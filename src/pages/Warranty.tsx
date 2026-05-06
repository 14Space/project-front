import { ShieldCheck, Wrench, Headphones, CheckCircle2 } from 'lucide-react';

export default function Warranty() {
  const warrantyInfo = [
    {
      icon: <ShieldCheck size={24} color="#A6CE39" />,
      title: 'Срок гарантии',
      desc: 'На все новые комплектующие и готовые ПК предоставляется гарантия от 12 до 36 месяцев.'
    },
    {
      icon: <Wrench size={24} color="#A6CE39" />,
      title: 'Сервисный центр',
      desc: 'Собственный технический отдел для быстрой диагностики и качественного ремонта оборудования.'
    },
    {
      icon: <CheckCircle2 size={24} color="#A6CE39" />,
      title: 'Гарантийные случаи',
      desc: 'Бесплатное устранение заводских дефектов или полная замена устройства на новое.'
    },
    {
      icon: <Headphones size={24} color="#A6CE39" />,
      title: 'Поддержка 24/7',
      desc: 'Онлайн-консультации специалистов по вопросам работы и настройки вашего железа.'
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
              Гарантия
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
            {warrantyInfo.map((item, i) => (
              <div key={i} style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                padding: '24px', 
                borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ flexShrink: 0 }}>{item.icon}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#fff' }}>{item.title}</h3>
                </div>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.02)', 
            padding: '30px', 
            borderRadius: '16px', 
            border: '1px solid rgba(255,255,255,0.05)' 
          }}>
            <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: 700, marginBottom: '15px' }}>Важно знать:</h4>
            <ul style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: '1.8', padding: 0, margin: 0, listStyle: 'none' }}>
              <li style={{ marginBottom: '10px' }}>1) Сохраняйте гарантийный талон и чек на протяжении всего срока гарантии.</li>
              <li style={{ marginBottom: '10px' }}>2) Гарантия не распространяется на механические повреждения и следы самостоятельного вскрытия.</li>
              <li>3) При обнаружении неисправности рекомендуем сразу обратиться в нашу службу поддержки.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
