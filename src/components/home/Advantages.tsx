import { CheckCircle2, ShieldCheck, Truck, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Advantages() {
  const { t } = useTranslation();
  const advs = [
    { icon: <CheckCircle2 size={40} />, title: t('home.advantages.reviews'), desc: t('home.advantages.reviewsDesc') },
    { icon: <ShieldCheck size={40} />, title: t('home.advantages.warranty'), desc: t('home.advantages.warrantyDesc') },
    { icon: <Truck size={40} />, title: t('home.advantages.delivery'), desc: t('home.advantages.deliveryDesc') },
    { icon: <Zap size={40} />, title: t('home.advantages.promotions'), desc: t('home.advantages.promotionsDesc') }
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="container">
        <h2 className="title" style={{ marginBottom: '20px' }}>{t('home.advantages.sectionTitle')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
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
