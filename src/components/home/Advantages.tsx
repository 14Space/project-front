import { CheckCircle2, ShieldCheck, Truck, HeadphonesIcon } from 'lucide-react';

export default function Advantages() {
  const advs = [
    { icon: <CheckCircle2 size={40} />, title: '8000+ Отзывов', desc: 'Реальные отзывы покупателей' },
    { icon: <ShieldCheck size={40} />, title: 'Официальная гарантия', desc: 'От производителя' },
    { icon: <Truck size={40} />, title: 'Быстрая доставка', desc: 'По всей Украине' },
    { icon: <HeadphonesIcon size={40} />, title: 'Поддержка 24/7', desc: 'Всегда на связи' }
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="container">
        <h2 className="title">Почему выбирают FRAME</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {advs.map((adv, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 16px', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
              <div style={{ color: '#A6CE39', marginBottom: '16px' }}>{adv.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>{adv.title}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{adv.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
