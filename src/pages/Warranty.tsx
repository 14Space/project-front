import { ShieldCheck, Wrench, RefreshCw, Headphones } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Warranty() {
  const { t } = useTranslation();

  const features = [
    { 
      icon: <ShieldCheck size={24} color="#A6CE39" />, 
      title: t('warranty.features.official.title'), 
      desc: t('warranty.features.official.desc') 
    },
    { 
      icon: <Wrench size={24} color="#A6CE39" />, 
      title: t('warranty.features.service.title'), 
      desc: t('warranty.features.service.desc') 
    },
    { 
      icon: <RefreshCw size={24} color="#A6CE39" />, 
      title: t('warranty.features.replace.title'), 
      desc: t('warranty.features.replace.desc') 
    },
    { 
      icon: <Headphones size={24} color="#A6CE39" />, 
      title: t('warranty.features.support.title'), 
      desc: t('warranty.features.support.desc') 
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
              {t('footer.links.warranty')}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
            {features.map((feature, i) => (
              <div key={i} style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                padding: '24px', 
                borderRadius: '16px', 
                border: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  backgroundColor: 'rgba(166, 206, 57, 0.1)', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>{feature.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.5', margin: 0 }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.02)', 
            padding: '30px', 
            borderRadius: '16px', 
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>{t('warranty.importantTitle')}</h3>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ margin: 0 }}>{t('warranty.rules.r1')}</p>
              <p style={{ margin: 0 }}>{t('warranty.rules.r2')}</p>
              <p style={{ margin: 0 }}>{t('warranty.rules.r3')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
