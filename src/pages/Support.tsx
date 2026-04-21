import { Headphones, Send, ExternalLink, Clock, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const GmailIcon = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4.5V19.5C24 20.3284 23.3284 21 22.5 21H18V9L12 13.5L6 9V21H1.5C0.671573 21 0 20.3284 0 19.5V4.5C0 3.67157 0.671573 3 1.5 3H3L12 9.75L21 3H22.5C23.3284 3 24 3.67157 24 4.5Z" fill="#EA4335" />
    <path d="M0 4.5V7.5L12 16.5L24 7.5V4.5L12 13.5L0 4.5Z" fill="#C5221F" />
    <path d="M22.5 3H21L12 9.75L3 3H1.5C0.671573 3 0 3.67157 0 4.5V5.25L12 14.25L24 5.25V4.5C24 3.67157 23.3284 3 22.5 3Z" fill="#F44336" />
    <path d="M24 19.5V4.5L21 6.75V21H22.5C23.3284 21 24 20.3284 24 19.5Z" fill="#34A853" />
    <path d="M0 4.5V19.5C0 20.3284 0.671573 21 1.5 21H3V6.75L0 4.5Z" fill="#4285F4" />
    <path d="M3 21H12V14.25L3 6.75V21Z" fill="#FBBC04" />
    <path d="M21 21H12V14.25L21 6.75V21Z" fill="#FBBC04" />
  </svg>
);

const TelegramIcon = ({ size = 32 }: { size?: number }) => (
  <div style={{
    width: size,
    height: size,
    backgroundColor: '#229ED9',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }}>
    <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.435 2.58189C21.849 2.40489 22.316 2.68489 22.35 3.13289L23.914 20.2529C23.957 20.7229 23.473 21.0569 23.037 20.8669L17.214 18.3249L14.341 21.1979C13.979 21.5599 13.364 21.3039 13.364 20.7919V17.5859L20.178 5.75389C20.251 5.62689 20.106 5.49689 19.988 5.58189L11.564 11.6669L7.382 9.84189C6.911 9.63689 6.906 8.96689 7.375 8.75489L21.435 2.58189Z" fill="white" />
    </svg>
  </div>
);

const iPhonePhoneIcon = ({ size = 32, color = 'currentColor' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" fill={color} />
  </svg>
);

export default function Support() {
  const { t } = useTranslation();

  const contactMethods = [
    {
      id: 'telegram',
      name: 'Telegram',
      description: 'Самый быстрый ответ в чате',
      icon: TelegramIcon,
      color: '#0088cc',
      action: 'Написать в Telegram',
      link: 'https://t.me/frame_support'
    },
    {
      id: 'phone',
      name: 'Телефон',
      description: 'Позвоните нам напрямую',
      icon: iPhonePhoneIcon,
      color: 'var(--primary-color)',
      action: '+373 60 123 456',
      link: 'tel:+37360123456'
    },
    {
      id: 'email',
      name: 'Gmail',
      description: 'Для официальных запросов',
      icon: GmailIcon,
      color: '#EA4335',
      action: 'support@frame.md',
      link: 'mailto:support@frame.md'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: 'calc(100vh - 80px)', color: '#fff' }}>
      <div className="container" style={{ paddingTop: '60px', paddingBottom: '100px' }}>

        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            backgroundColor: 'rgba(166, 206, 57, 0.1)',
            borderRadius: '50%',
            marginBottom: '24px',
            border: '1px solid rgba(166, 206, 57, 0.2)'
          }}>
            <Headphones size={40} style={{ color: 'var(--primary-color)' }} />
          </div>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '16px'
          }}>
            Служба поддержки
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            Мы всегда на связи, чтобы помочь вам с выбором, заказом или техническим вопросом.
          </p>
        </div>

        {/* Status Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '40px',
          marginBottom: '60px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--primary-color)' }}>
            <Clock size={20} />
            <span style={{ fontWeight: 600 }}>Работаем 24/7 без выходных</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff' }}>
            <ShieldCheck size={20} style={{ color: 'var(--primary-color)' }} />
            <span style={{ fontWeight: 600 }}>Официальная гарантия FRAME</span>
          </div>
        </div>

        {/* Contact Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {contactMethods.map(method => (
            <a
              key={method.id}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: 'var(--card-bg)',
                padding: '40px 32px',
                borderRadius: '32px',
                border: '1px solid var(--border-color)',
                textDecoration: 'none',
                color: '#fff',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = method.color;
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: method.id === 'telegram' ? '#229ED9' : '#ffffff',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                border: method.id === 'telegram' ? 'none' : '1px solid #eee',
                overflow: 'hidden'
              }}>




                {method.id === 'telegram' ? (
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.77 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.01 10.46 14.01 10.35 13.95 10.29C13.89 10.23 13.8 10.25 13.74 10.27C13.65 10.29 12.25 11.22 9.52 13.06C9.12 13.33 8.76 13.47 8.44 13.46C8.08 13.45 7.4 13.26 6.89 13.09C6.26 12.89 5.76 12.78 5.81 12.43C5.83 12.25 6.08 12.07 6.55 11.88C9.47 10.61 11.41 9.77 12.38 9.37C15.16 8.21 15.73 8.01 16.11 8.01C16.19 8.01 16.38 8.03 16.5 8.13C16.6 8.21 16.63 8.32 16.64 8.4C16.65 8.46 16.65 8.64 16.64 8.8Z" fill="white" />
                  </svg>
                ) : method.id === 'email' ? (
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
                    alt="Gmail"
                    style={{ width: '56px', height: '56px', objectFit: 'contain' }}
                  />
                ) : method.id === 'phone' ? (
                  <method.icon size={32} color="#000000" />
                ) : (
                  <method.icon size={32} />
                )}



              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>{method.name}</h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '24px', lineHeight: '1.5' }}>{method.description}</p>
              <div style={{
                marginTop: 'auto',
                padding: '12px 24px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: method.color
              }}>
                {method.action} <ExternalLink size={14} />
              </div>
            </a>
          ))}
        </div>

        {/* Help Note */}
        <div style={{
          marginTop: '80px',
          padding: '40px',
          backgroundColor: 'rgba(166, 206, 57, 0.03)',
          borderRadius: '32px',
          border: '1px solid rgba(166, 206, 57, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>Нужна техническая помощь?</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Наши специалисты готовы удаленно помочь с настройкой вашего нового ПК FRAME или ответить на любые вопросы по комплектующим. Среднее время ответа в мессенджерах составляет менее 5 минут.
          </p>
        </div>
      </div>
    </div>
  );
}
