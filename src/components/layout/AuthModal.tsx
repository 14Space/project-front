import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Check, Eye, EyeOff } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { api } from '../../api';

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
  allowOnlyLetters?: boolean;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, type = 'text', value, onChange, allowOnlyLetters }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <label
          style={{
            position: 'absolute', left: '12px',
            top: isFocused || value ? '-10px' : '12px',
            backgroundColor: '#1a1b1c', padding: '0 4px',
            fontSize: isFocused || value ? '13px' : '15px',
            color: isFocused ? '#A6CE39' : '#888',
            zIndex: 1, transition: 'all 0.2s ease', pointerEvents: 'none', fontWeight: 500
          }}
        >
          {label}
        </label>
        <input
          ref={ref}
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            let val = e.target.value;
            if (allowOnlyLetters) val = val.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '');
            onChange(val);
            (e.target as HTMLInputElement).setCustomValidity('');
          }}
          style={{
            width: '100%', padding: '12px 16px',
            paddingRight: isPassword ? '40px' : '16px',
            borderRadius: '12px', border: `1px solid ${isFocused ? '#A6CE39' : '#333'}`,
            outline: 'none', fontSize: '15px', color: '#fff',
            backgroundColor: 'transparent', transition: 'border-color 0.2s ease'
          }}
        />
        {isPassword && (isFocused || showPassword) && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            onMouseDown={(e) => e.preventDefault()}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    );
  }
);

export default function AuthModal({ isOpen, onClose, initialTab = 'login' }: AuthModalProps) {
  const { t } = useTranslation();
  const { login } = useAppContext();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);
  const [rememberMe, setRememberMe] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const showError = (ref: React.RefObject<HTMLInputElement | null>, msg: string) => {
    if (!ref.current) return;
    ref.current.setCustomValidity(msg);
    ref.current.reportValidity();
  };
  const clearValidity = (ref: React.RefObject<HTMLInputElement | null>) => ref.current?.setCustomValidity('');

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setEmail(''); setPassword(''); setFirstName(''); setLastName(''); setConfirmPassword('');
      [emailRef, passwordRef, firstNameRef, lastNameRef, confirmPasswordRef].forEach(clearValidity);
    }
  }, [isOpen, initialTab]);

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    setEmail(''); setPassword(''); setFirstName(''); setLastName(''); setConfirmPassword('');
    [emailRef, passwordRef, firstNameRef, lastNameRef, confirmPasswordRef].forEach(clearValidity);
  };

  const ALLOWED_DOMAINS = ['@gmail.com', '@mail.com', '@icloud.com', '@isa.utm.md', '@outlook.com'];
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    [emailRef, passwordRef].forEach(clearValidity);

    if (!email.trim()) { showError(emailRef, t('validation.emailRequired')); return; }
    if (/[^\x00-\x7F]/.test(email)) { showError(emailRef, t('validation.emailLatin')); return; }
    if (!EMAIL_REGEX.test(email)) { showError(emailRef, t('validation.emailFormat')); return; }
    if (!password.trim()) { showError(passwordRef, t('validation.passwordRequired')); return; }

    try {
      const response = await api.post('/Auth/login', { email, password });
      localStorage.setItem('token', response.token);
      login({ id: response.id.toString(), name: response.name, lastName: response.lastName, phone: response.phone, city: response.city, street: response.street, email, role: response.role.toLowerCase() as 'user' | 'admin' | 'manager' });
      onClose();
    } catch {
      showError(passwordRef, t('validation.loginFailed'));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    [firstNameRef, lastNameRef, emailRef, passwordRef, confirmPasswordRef].forEach(clearValidity);

    if (!firstName.trim()) { showError(firstNameRef, t('validation.firstNameRequired')); return; }
    if (firstName.trim().length < 2) { showError(firstNameRef, t('validation.firstNameMin')); return; }
    if (!lastName.trim()) { showError(lastNameRef, t('validation.lastNameRequired')); return; }
    if (lastName.trim().length < 2) { showError(lastNameRef, t('validation.lastNameMin')); return; }
    if (!email.trim()) { showError(emailRef, t('validation.emailRequired')); return; }
    if (/[^\x00-\x7F]/.test(email)) { showError(emailRef, t('validation.emailLatin')); return; }
    if (!EMAIL_REGEX.test(email)) { showError(emailRef, t('validation.emailFormat')); return; }
    if (!ALLOWED_DOMAINS.some(d => email.toLowerCase().endsWith(d))) { showError(emailRef, t('validation.emailDomain')); return; }
    if (!password) { showError(passwordRef, t('validation.passwordRequired')); return; }
    if (password.length < 8) { showError(passwordRef, t('validation.passwordMin')); return; }
    if (!/[A-Z]/.test(password) && !/[0-9]/.test(password)) { showError(passwordRef, t('validation.passwordWeak')); return; }
    if (!confirmPassword) { showError(confirmPasswordRef, t('validation.passwordConfirmRequired')); return; }
    if (password !== confirmPassword) { showError(confirmPasswordRef, t('validation.passwordMismatch')); return; }

    try {
      const response = await api.post('/Auth/register', { name: firstName.trim(), lastName: lastName.trim(), email, password });
      localStorage.setItem('token', response.token);
      login({ id: response.id.toString(), name: response.name, lastName, email, role: response.role.toLowerCase() as 'user' | 'admin' | 'manager' });
      onClose();
    } catch (error: any) {
      showError(emailRef, error.message || t('validation.emailFormat'));
    }
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
            onClick={() => handleTabChange('login')}
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
            onClick={() => handleTabChange('register')}
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
            <AuthInput ref={emailRef} label={t('auth.emailPhone')} value={email} onChange={setEmail} />
            <AuthInput ref={passwordRef} label={t('auth.password')} type="password" value={password} onChange={setPassword} />

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
              <a href="#" style={{ color: '#888', textDecoration: 'none', fontWeight: 500 }} onClick={e => { e.preventDefault(); alert('Ничем не можем помочь дружище ;)'); }}>{t('auth.forgot')}</a>
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
            <AuthInput ref={firstNameRef} label={t('auth.firstName')} value={firstName} onChange={setFirstName} allowOnlyLetters />
            <AuthInput ref={lastNameRef} label={t('auth.lastName')} value={lastName} onChange={setLastName} allowOnlyLetters />
            <AuthInput ref={emailRef} label={t('auth.email')} value={email} onChange={setEmail} />
            <AuthInput ref={passwordRef} label={t('auth.password')} type="password" value={password} onChange={setPassword} />
            <AuthInput ref={confirmPasswordRef} label={t('auth.confirmPassword')} type="password" value={confirmPassword} onChange={setConfirmPassword} />

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
