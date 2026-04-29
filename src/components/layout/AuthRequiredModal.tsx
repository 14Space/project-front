import { Lock, LogIn, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AuthModal from './AuthModal';
import { useState } from 'react';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthRequiredModal({ isOpen, onClose }: AuthRequiredModalProps) {
  const { i18n } = useTranslation();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

  const openAuth = (tab: 'login' | 'register') => {
    setAuthTab(tab);
    onClose();
    setIsAuthOpen(true);
  };

  if (!isOpen && !isAuthOpen) return null;

  return (
    <>
      {/* Auth Required Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 1500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#1a1b1c',
              borderRadius: '24px',
              border: '1px solid #2a2a2a',
              padding: '40px 36px 36px',
              maxWidth: '360px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '0',
              boxShadow: '0 32px 80px rgba(0,0,0,0.7)',
              animation: 'slideUp 0.25s ease'
            }}
          >
            {/* Lock Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'rgba(166, 206, 57, 0.12)',
              border: '1px solid rgba(166, 206, 57, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <Lock size={34} color="#A6CE39" />
            </div>

            {/* Title */}
            <div style={{ color: '#fff', fontSize: '24px', fontWeight: 700, lineHeight: 1.25, marginBottom: '32px' }}>
              {i18n.language.startsWith('ru') ? 'Войдите, чтобы продолжить' : 'Log in to continue'}
            </div>

            {/* Login button */}
            <button
              onClick={() => openAuth('login')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '15px 24px',
                backgroundColor: '#A6CE39',
                color: '#000',
                border: 'none',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                marginBottom: '12px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#95ba33'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#A6CE39'; }}
            >
              <LogIn size={19} />
              {i18n.language.startsWith('ru') ? 'Войти в аккаунт' : 'Log In'}
            </button>

            {/* Register button */}
            <button
              onClick={() => openAuth('register')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                padding: '15px 24px',
                backgroundColor: 'transparent',
                color: '#A6CE39',
                border: '1.5px solid #A6CE39',
                borderRadius: '30px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(166,206,57,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <UserPlus size={19} />
              {i18n.language.startsWith('ru') ? 'Зарегистрироваться' : 'Register'}
            </button>
          </div>
        </div>
      )}

      {/* Auth Modal with pre-selected tab */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} initialTab={authTab} />

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}
