import { Phone, Mail } from 'lucide-react';

export default function Contacts() {
  const allContacts = [
    { icon: <Phone size={20} color="#A6CE39" />, value: '+373 69 467 556', label: 'Телефон', href: 'tel:+37369467556' },
    { icon: <Phone size={20} color="#A6CE39" />, value: '+373 78 658 351', label: 'Телефон', href: 'tel:+37378658351' },
    { icon: <Mail size={20} color="#A6CE39" />, value: 'sales@frame.md', label: 'Отдел продаж', href: 'mailto:sales@frame.md' },
    { icon: <Mail size={20} color="#A6CE39" />, value: 'service@frame.md', label: 'Сервис и поддержка', href: 'mailto:service@frame.md' },
    { icon: <Mail size={20} color="#A6CE39" />, value: 'hr@frame.md', label: 'Работа у нас', href: 'mailto:hr@frame.md' },
    { icon: <Mail size={20} color="#A6CE39" />, value: 'corp@frame.md', label: 'Безналичный расчет', href: 'mailto:corp@frame.md' }
  ];

  const socialLinks = [
    { name: 'Telegram', url: 'https://t.me/SX_Warrior' },
    { name: 'Discord', url: 'https://discord.com/users/1304478428015362123' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@dataexpl0rer?_r=1&_t=ZS-95mI3WIT4zw' }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          {/* КОНТАКТЫ */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#fff', 
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: 0
            }}>
              Контакты
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {allContacts.map((contact, i) => (
              <div key={i} style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                padding: '24px', 
                borderRadius: '12px', 
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '12px'
              }}>
                <div style={{ 
                  width: '44px', 
                  height: '44px', 
                  backgroundColor: 'rgba(166, 206, 57, 0.1)', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  {contact.icon}
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>{contact.label}</div>
                  <a 
                    href={contact.href}
                    style={{ 
                      fontSize: '16px', 
                      fontWeight: 700, 
                      color: '#fff', 
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#A6CE39'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
                  >
                    {contact.value}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* РАЗДЕЛИТЕЛЬ СОЦСЕТИ */}
          <div style={{ marginTop: '30px', marginBottom: '20px', textAlign: 'center' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#fff', 
              textTransform: 'uppercase',
              margin: 0
            }}>
              Мы в соцсетях
            </h2>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
            {socialLinks.map((social, i) => (
              <a 
                key={i} 
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  textDecoration: 'none',
                  color: '#fff',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  const span = e.currentTarget.querySelector('span');
                  if (span) span.style.color = '#A6CE39';
                }}
                onMouseLeave={(e) => {
                  const span = e.currentTarget.querySelector('span');
                  if (span) span.style.color = '#fff';
                }}
              >
                <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center' }}>
                  <img 
                    src={`/icons/ICONS-${social.name.toLowerCase()}.png`} 
                    alt={social.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <span style={{ fontSize: '18px', fontWeight: 600, transition: 'color 0.2s ease' }}>{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
