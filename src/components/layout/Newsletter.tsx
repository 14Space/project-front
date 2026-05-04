import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Скрытие ошибки при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (status === 'error') {
          setStatus('idle');
          setMessage('');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Сбрасываем ошибки
    setStatus('idle');
    setMessage('');

    // Простая валидация на фронтенде
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage('Пожалуйста, введите корректный e-mail');
      return;
    }

    setStatus('loading');

    try {
      // Имитируем задержку сети
      await new Promise(resolve => setTimeout(resolve, 800));

      // ВРЕМЕННАЯ ЗАГЛУШКА (успех)
      setStatus('success');
      setEmail('');
      setMessage('Вы успешно подписаны на рассылку!');

      /* В будущем, когда будет готов бэкенд, верните этот код:
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setMessage('Вы успешно подписаны на рассылку!');
      } else {
        throw new Error('Ошибка при подписке');
      }
      */
    } catch (error) {
      setStatus('error');
      setMessage('Что-то пошло не так. Попробуйте позже.');
    }
  };

  return (
    <div ref={containerRef} style={{ backgroundColor: '#A6CE39', padding: '20px 0', color: '#fff' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 25px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <img src="/branding/BRANDING-logo-FRAME.png" alt="FRAME" style={{ height: '32px' }} />
          <div style={{ fontSize: '18px', fontWeight: 600 }}>{t('footer.newsletterTitle')}</div>
        </div>

        <form onSubmit={handleSubmit} style={{ position: 'relative' }} noValidate>
          {status === 'success' ? (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '10px', 
              width: '480px',
              height: '44px',
              backgroundColor: 'rgba(255,255,255,0.2)', 
              borderRadius: '30px',
              border: '1px solid #fff',
              boxSizing: 'border-box'
            }}>
              <CheckCircle2 size={20} />
              <span style={{ fontWeight: 600 }}>{message}</span>
            </div>
          ) : (
            <div style={{ 
              display: 'flex', 
              width: '480px', 
              height: '44px',
              backgroundColor: 'rgba(255,255,255,0.1)', 
              border: status === 'error' ? '1px solid #ff4d4f' : '1px solid rgba(255,255,255,0.4)', 
              borderRadius: '30px',
              padding: '4px',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease'
            }}>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.newsletterPlaceholder')} 
                disabled={status === 'loading'}
                style={{ 
                  flex: 1, 
                  padding: '0 20px', 
                  background: 'none', 
                  border: 'none', 
                  color: '#fff', 
                  outline: 'none',
                  fontSize: '14px'
                }} 
              />
              <button 
                type="submit"
                disabled={status === 'loading'}
                style={{ 
                  backgroundColor: '#fff', 
                  color: '#111', 
                  padding: '10px 24px', 
                  borderRadius: '26px', 
                  fontWeight: 700, 
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                  transition: 'all 0.2s ease'
                }}
              >
                {status === 'loading' ? 'Отправка...' : t('footer.newsletterButton')}
              </button>
            </div>
          )}
          
          {status === 'error' && (
            <div style={{ 
              position: 'absolute', 
              top: 'calc(100% + 4px)', 
              left: '24px', 
              color: '#ff4d4f', 
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 700,
              lineHeight: '12px',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)'
            }}>
              <AlertCircle size={12} />
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
