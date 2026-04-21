import { Wrench, PackageSearch, Repeat, Headphones } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function QuickActions() {
  const { t } = useTranslation();
  
  const actions = [
    { icon: <Wrench size={32} />, title: t('home.quickActions.pcBuild'), desc: t('home.quickActions.pcBuildDesc'), link: '#' },
    { icon: <PackageSearch size={32} />, title: t('home.quickActions.orderStatus'), desc: t('home.quickActions.orderStatusDesc'), link: '#' },
    { icon: <Repeat size={32} />, title: t('home.quickActions.tradeIn'), desc: t('home.quickActions.tradeInDesc'), link: '#' },
    { icon: <Headphones size={32} />, title: t('home.quickActions.support'), desc: t('home.quickActions.supportDesc'), link: '/support' }
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        {actions.map((action, idx) => (
          <Link key={idx} to={action.link} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            padding: '16px', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            transition: 'all 0.2s',
            textDecoration: 'none',
            color: 'inherit'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.transform = 'translateY(-4px)';
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
          </Link>
        ))}
      </div>
    </section>
  );
}

