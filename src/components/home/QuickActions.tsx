import { Wrench, PackageSearch, Headphones, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function QuickActions() {
  const { t } = useTranslation();
  
  const actions = [
    { icon: <Wrench size={32} />, title: t('home.quickActions.pcBuild'), desc: t('home.quickActions.pcBuildDesc') },
    { icon: <PackageSearch size={32} />, title: t('home.quickActions.orderStatus'), desc: t('home.quickActions.orderStatusDesc') },
    { icon: <Headphones size={32} />, title: t('home.quickActions.support'), desc: t('home.quickActions.supportDesc') },
    { icon: <ShieldCheck size={32} />, title: t('home.quickActions.warranty'), desc: t('home.quickActions.warrantyDesc') }
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        {actions.map((action, idx) => (
          <div key={idx} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            padding: '16px', 
            borderRadius: '8px', 
            cursor: 'pointer', 
            transition: 'all 0.2s' 
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ color: 'var(--primary-color)' }}>{action.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px' }}>{action.title}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>{action.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
