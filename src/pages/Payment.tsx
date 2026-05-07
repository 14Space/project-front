import { Wallet, CreditCard, Percent, Building2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Payment() {
  const { t } = useTranslation();

  const methods = [
    { 
      icon: <Wallet size={24} color="#A6CE39" />, 
      title: t('payment.methods.cash.title'), 
      desc: t('payment.methods.cash.desc') 
    },
    { 
      icon: <CreditCard size={24} color="#A6CE39" />, 
      title: t('payment.methods.card.title'), 
      desc: t('payment.methods.card.desc') 
    },
    { 
      icon: <Percent size={24} color="#A6CE39" />, 
      title: t('payment.methods.credit.title'), 
      desc: t('payment.methods.credit.desc') 
    },
    { 
      icon: <Building2 size={24} color="#A6CE39" />, 
      title: t('payment.methods.corp.title'), 
      desc: t('payment.methods.corp.desc') 
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
              {t('footer.links.payment')}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {methods.map((method, i) => (
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
                  {method.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>{method.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.5', margin: 0 }}>{method.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
