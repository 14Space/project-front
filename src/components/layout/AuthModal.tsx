import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface AuthInputProps {
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthInput = ({ label, type = 'text' }: AuthInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div style={{ position: 'relative', marginBottom: '20px' }}>
      <label 
        style={{
          position: 'absolute',
          left: '12px',
          top: '-10px',
          backgroundColor: '#fff',
          padding: '0 4px',
          fontSize: '13px',
          color: '#666',
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
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== '');
        }}
        onChange={(e) => setHasValue(e.target.value !== '')}
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
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [rememberMe, setRememberMe] = useState(true);

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
          <form style={{ display: 'flex', flexDirection: 'column' }}>
            <AuthInput label={t('auth.emailPhone')} />
            <AuthInput label={t('auth.password')} type="password" />
            
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
          <form style={{ display: 'flex', flexDirection: 'column' }}>
            {['firstName', 'lastName', 'email', 'password', 'confirmPassword'].map((field) => (
              <AuthInput 
                key={field} 
                label={t(`auth.${field}`)} 
                type={field.includes('password') ? 'password' : 'text'} 
              />
            ))}

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
