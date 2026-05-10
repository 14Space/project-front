import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Check } from 'lucide-react';
import { useAppContext, MOCK_USER, MOCK_USER_REGULAR } from '../../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

interface AuthInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
}

const AuthInput = ({ label, type = 'text', value, onChange }: AuthInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ position: 'relative', marginBottom: '20px' }}>
      <label 
        style={{
          position: 'absolute',
          left: '12px',
          top: isFocused || value ? '-10px' : '12px',
          backgroundColor: '#1a1b1c',
          padding: '0 4px',
          fontSize: isFocused || value ? '13px' : '15px',
          color: isFocused ? '#A6CE39' : '#888',
          zIndex: 1,
          transition: 'all 0.2s ease',
          pointerEvents: 'none',
          fontWeight: 500
        }}
      >
        {label}
      </label>
      <input 
        type={type}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          border: `1px solid ${isFocused ? '#A6CE39' : '#333'}`,
          outline: 'none',
          fontSize: '15px',
          color: '#fff',
          backgroundColor: 'transparent',
          transition: 'border-color 0.2s ease'
        }}
      />
    </div>
  );
};

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }: AuthModalProps) {
  const { t } = useTranslation();
  const { login } = useAppContext();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Update active tab when modal opens or initialTab changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === '14t.space@gmail.com') {
      login(MOCK_USER);
    } else if (email === 'mihafelciuc@gmail.com') {
      login(MOCK_USER_REGULAR);
    } else {
      login({
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email: email,
        role: 'user'
      });
    }
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: `user-${Date.now()}`,
      name: firstName || email.split('@')[0],
      lastName: lastName,
      email: email,
      role: 'user'
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="auth-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'authFadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <div 
        className="auth-content"
        style={{
          backgroundColor: '#1a1b1c',
          width: '100%',
          maxWidth: '440px',
          borderRadius: '24px',
          position: 'relative',
          padding: '48px 40px 40px',
          maxHeight: '95vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid #2a2a2a'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: '#888',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#888';
          }}
        >
          <X size={20} />
        </button>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          backgroundColor: '#262626', 
          borderRadius: '30px', 
          padding: '4px',
          marginBottom: '40px',
          border: '1px solid #333'
        }}>
          <button 
            onClick={() => setActiveTab('login')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '26px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '14px',
              transition: 'all 0.2s',
              backgroundColor: activeTab === 'login' ? '#A6CE39' : 'transparent',
              color: activeTab === 'login' ? '#000' : '#888'
            }}
          >
            {t('auth.login')}
          </button>
          <button 
            onClick={() => setActiveTab('register')}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '26px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '14px',
              transition: 'all 0.2s',
              backgroundColor: activeTab === 'register' ? '#A6CE39' : 'transparent',
              color: activeTab === 'register' ? '#000' : '#888'
            }}
          >
            {t('auth.registration')}
          </button>
        </div>

        {activeTab === 'login' ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
            <AuthInput label={t('auth.emailPhone')} value={email} onChange={setEmail} />
            <AuthInput label={t('auth.password')} type="password" value={password} onChange={setPassword} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', marginBottom: '32px' }}>
              <label 
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#ccc', fontWeight: 500 }}
                onClick={() => setRememberMe(!rememberMe)}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: rememberMe ? '#A6CE39' : 'transparent',
                  border: `1px solid ${rememberMe ? '#A6CE39' : '#333'}`,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}>
                  {rememberMe && <Check size={14} color="#000" strokeWidth={4} />}
                </div>
                {t('auth.remember')}
              </label>
              <a href="#" style={{ color: '#888', textDecoration: 'none', fontWeight: 500 }}>{t('auth.forgot')}</a>
            </div>

            <button 
              type="submit"
              style={{
                backgroundColor: '#A6CE39',
                color: '#000',
                border: 'none',
                borderRadius: '30px',
                padding: '16px',
                fontWeight: 700,
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#95ba33'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#A6CE39'; }}
            >
              {t('auth.submitLogin')}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column' }}>
            <AuthInput label={t('auth.firstName')} value={firstName} onChange={setFirstName} />
            <AuthInput label={t('auth.lastName')} value={lastName} onChange={setLastName} />
            <AuthInput label={t('auth.email')} value={email} onChange={setEmail} />
            <AuthInput label={t('auth.password')} type="password" value={password} onChange={setPassword} />
            <AuthInput label={t('auth.confirmPassword')} type="password" value={password} onChange={setPassword} />

            <button 
              type="submit"
              style={{
                backgroundColor: '#A6CE39',
                color: '#000',
                border: 'none',
                borderRadius: '30px',
                padding: '16px',
                fontWeight: 700,
                fontSize: '16px',
                marginTop: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#95ba33'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#A6CE39'; }}
            >
              {t('auth.submitRegister')}
            </button>
          </form>
        )}
      </div>
      <style>{`
        @keyframes authFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .auth-content { animation: authSlideUp 0.25s ease; }
        @keyframes authSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
