import { useState } from 'react';
import { Wrench, PackageSearch, Repeat, Headphones } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import AuthRequiredModal from '../layout/AuthRequiredModal';

export default function QuickActions() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const actions = [
    { icon: <Wrench size={32} />, title: t('home.quickActions.pcBuild'), desc: t('home.quickActions.pcBuildDesc'), path: '/pc-build' },
    { icon: <PackageSearch size={32} />, title: t('home.quickActions.orderStatus'), desc: t('home.quickActions.orderStatusDesc'), path: '/order-status', requireAuth: true },
    { icon: <Repeat size={32} />, title: t('home.quickActions.tradeIn'), desc: t('home.quickActions.tradeInDesc'), path: '/trade-in', requireAuth: true },
    { icon: <Headphones size={32} />, title: t('home.quickActions.support'), desc: t('home.quickActions.supportDesc'), path: 'https://t.me/SX_Warrior' }
  ];

  const handleActionClick = (action: typeof actions[0]) => {
    if (action.requireAuth && !user) {
      setIsAuthModalOpen(true);
      return;
    }
    if (action.path.startsWith('http')) {
      window.open(action.path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(action.path);
    }
  };

  return (
    <>
      <section className="section" style={{ padding: '0', backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '20px 20px' }}>
          {actions.map((action, idx) => (
            <div key={idx} 
              onClick={() => handleActionClick(action)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px', 
                padding: '24px 16px', 
                borderRadius: '8px',
                width: '100%', 
                cursor: 'pointer', 
                transition: 'all 0.2s' 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1d1d';
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

      <AuthRequiredModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
