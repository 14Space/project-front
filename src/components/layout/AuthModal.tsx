import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Check } from 'lucide-react';
import { useAppContext, MOCK_USER } from '../../context/AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
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
          backgroundColor: '#fff',
          padding: '0 4px',
          fontSize: isFocused || value ? '13px' : '15px',
          color: isFocused ? '#A6CE39' : '#666',
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
          border: `1px solid ${isFocused ? '#A6CE39' : '#E0E0E0'}`,
          outline: 'none',
          fontSize: '15px',
          color: '#000',
          backgroundColor: 'transparent',
          transition: 'border-color 0.2s ease'
        }}
      />
    </div>
  );
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { t } = useTranslation();
  const { login } = useAppContext();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [rememberMe, setRememberMe] = useState(true);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Always log in as the same mock user
    login(MOCK_USER);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Always log in as the same mock user
    login(MOCK_USER);
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
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        className="auth-content"
        style={{
          backgroundColor: '#fff',
          width: '100%',
          maxWidth: '440px',
          borderRadius: '16px',
          position: 'relative',
          padding: '40px',
          maxHeight: '95vh',
          overflowY: 'auto',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: '#999',
            padding: '4px'
          }}
        >
          <X size={24} />
        </button>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          backgroundColor: '#F5F5F5', 
          borderRadius: '30px', 
          padding: '4px',
          marginBottom: '40px'
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
              color: '#000'
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
              color: '#000'
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
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#000', fontWeight: 500 }}
                onClick={() => setRememberMe(!rememberMe)}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: rememberMe ? '#A6CE39' : '#fff',
                  border: `1px solid ${rememberMe ? '#A6CE39' : '#E0E0E0'}`,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}>
                  {rememberMe && <Check size={14} color="#fff" strokeWidth={4} />}
                </div>
                {t('auth.remember')}
              </label>
              <a href="#" style={{ color: '#000', textDecoration: 'none', fontWeight: 500 }}>{t('auth.forgot')}</a>
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
                cursor: 'pointer'
              }}
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
                backgroundColor: '#111',
                color: '#fff',
                border: 'none',
                borderRadius: '30px',
                padding: '16px',
                fontWeight: 700,
                fontSize: '16px',
                marginTop: '10px',
                cursor: 'pointer'
              }}
            >
              {t('auth.submitRegister')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
