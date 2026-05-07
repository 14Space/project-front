import { RotateCcw, Box, ClipboardCheck, Banknote, MessageCircle, Package, Store, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Return() {
  const { t } = useTranslation();

  const features = [
    { 
      icon: <RotateCcw size={24} color="#A6CE39" />, 
      title: t('return.features.days.title'), 
      desc: t('return.features.days.desc') 
    },
    { 
      icon: <Box size={24} color="#A6CE39" />, 
      title: t('return.features.appearance.title'), 
      desc: t('return.features.appearance.desc') 
    },
    { 
      icon: <ClipboardCheck size={24} color="#A6CE39" />, 
      title: t('return.features.completeness.title'), 
      desc: t('return.features.completeness.desc') 
    },
    { 
      icon: <Banknote size={24} color="#A6CE39" />, 
      title: t('return.features.fast.title'), 
      desc: t('return.features.fast.desc') 
    }
  ];

  const steps = [
    { 
      icon: <MessageCircle size={20} color="#A6CE39" />, 
      title: t('return.steps.contact.title'), 
      desc: t('return.steps.contact.desc') 
    },
    { 
      icon: <Package size={20} color="#A6CE39" />, 
      title: t('return.steps.prepare.title'), 
      desc: t('return.steps.prepare.desc') 
    },
    { 
      icon: <Store size={20} color="#A6CE39" />, 
      title: t('return.steps.showroom.title'), 
      desc: t('return.steps.showroom.desc') 
    },
    { 
      icon: <CheckCircle2 size={20} color="#A6CE39" />, 
      title: t('return.steps.money.title'), 
      desc: t('return.steps.money.desc') 
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
              {t('footer.links.return')}
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

          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#fff', 
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: 0
            }}>
              {t('return.stepsTitle')}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ 
                backgroundColor: 'rgba(255,255,255,0.02)', 
                padding: '24px', 
                borderRadius: '16px', 
                border: '1px solid rgba(255,255,255,0.05)',
                position: 'relative'
              }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  backgroundColor: '#A6CE39', 
                  color: '#111', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '14px',
                  position: 'absolute',
                  top: '-16px',
                  left: '24px'
                }}>
                  {i + 1}
                </div>
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  {step.icon}
                  <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: 0 }}>{step.title}</h4>
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.6', margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
