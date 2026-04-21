import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const showrooms = [
    { 
      city: t('footer.contactDetails.showroomsList.botanica.city'), 
      address: t('footer.contactDetails.showroomsList.botanica.address'), 
      mall: t('footer.contactDetails.showroomsList.botanica.mall'), 
      time: `${t('footer.contactDetails.allWeek')}: 10:00-22:00` 
    },
    { 
      city: t('footer.contactDetails.showroomsList.ciocana.city'), 
      address: t('footer.contactDetails.showroomsList.ciocana.address'), 
      mall: t('footer.contactDetails.showroomsList.ciocana.mall'), 
      time: `${t('footer.contactDetails.allWeek')}: 10:00-22:00` 
    },
    { 
      city: t('footer.contactDetails.showroomsList.riscani.city'), 
      address: t('footer.contactDetails.showroomsList.riscani.address'), 
      mall: t('footer.contactDetails.showroomsList.riscani.mall'), 
      time: `${t('footer.contactDetails.allWeek')}: 09:00-20:00` 
    },
    { 
      city: t('footer.contactDetails.showroomsList.balti.city'), 
      address: t('footer.contactDetails.showroomsList.balti.address'), 
      mall: t('footer.contactDetails.showroomsList.balti.mall'), 
      time: `${t('footer.contactDetails.allWeek')}: 09:00-20:00` 
    }
  ];

  const titleStyle: React.CSSProperties = { 
    color: '#fff', 
    fontSize: '15px', 
    textTransform: 'uppercase', 
    fontWeight: 700, 
    height: '14px', 
    lineHeight: '14px', 
    letterSpacing: '0.8px',
    textAlign: 'left'
  };

  return (
    <footer style={{ backgroundColor: '#1D1D1D', color: '#ccc', fontSize: '14px' }}>
      {/* 1. Newsletter Block */}
      <div style={{ backgroundColor: '#A6CE39', padding: '20px 0', color: '#fff' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 25px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
             <img src="/branding/logo-FRAME.png" alt="FRAME" style={{ height: '32px' }} />
             <div style={{ fontSize: '18px', fontWeight: 600 }}>{t('footer.newsletterTitle')}</div>
          </div>
          <div style={{ 
            display: 'flex', 
            width: '480px', 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            border: '1px solid rgba(255,255,255,0.4)', 
            borderRadius: '30px',
            padding: '4px'
          }}>
            <input 
              type="email" 
              placeholder={t('footer.newsletterPlaceholder')} 
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
            <button style={{ 
              backgroundColor: '#fff', 
              color: '#111', 
              padding: '10px 24px', 
              borderRadius: '26px', 
              fontWeight: 700, 
              fontSize: '13px',
              whiteSpace: 'nowrap'
            }}>
              {t('footer.newsletterButton')}
            </button>
          </div>
        </div>
      </div>
      
      <div className="container" style={{ padding: '60px 20px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 2fr', 
          gap: '0 60px', 
          marginBottom: '60px', 
          borderBottom: '1px solid #333', 
          paddingBottom: '60px' 
        }}>
          
          {/* Row 1: Titles */}
          <div style={{ gridRow: '1', display: 'flex', gap: '40px', paddingLeft: '5px' }}>
             <div style={{ flex: 1, ...titleStyle }}>{t('footer.contactDetails.workTimeTitle')}</div>
             <div style={{ flex: 1.2, height: '14px' }}></div>
          </div>
          <div style={{ gridRow: '1', ...titleStyle }}>
             {t('footer.contactDetails.showroomsTitle')}
          </div>

          {/* Row 2 & 3: Contacts Grouped by Column */}
          <div style={{ gridRow: '2 / span 2', display: 'flex', gap: '40px', paddingTop: '32px', paddingLeft: '5px' }}>
             <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <div style={{ marginBottom: '44px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', height: '24px' }}>
                    <span style={{ backgroundColor: '#252525', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, color: '#fff' }}>{t('footer.contactDetails.monFri')}</span>
                    <span style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>09:00-20:00</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '24px' }}>
                    <span style={{ backgroundColor: '#252525', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, color: '#fff' }}>{t('footer.contactDetails.satSun')}</span>
                    <span style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>10:00-20:00</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: 'auto' }}>
                   <div>
                      <a href="mailto:service@frame.md" className="footer-contact-link" style={{ fontWeight: 600, fontSize: '14px' }}>service@frame.md</a>
                      <div style={{ color: '#666', fontSize: '12px', marginTop: '2px', lineHeight: '14px' }}>{t('footer.contactDetails.supportTitle')}</div>
                   </div>
                   <div>
                      <a href="mailto:corp@frame.md" className="footer-contact-link" style={{ fontWeight: 600, fontSize: '14px' }}>corp@frame.md</a>
                      <div style={{ color: '#666', fontSize: '12px', marginTop: '2px', lineHeight: '14px' }}>{t('footer.contactDetails.corpTitle')}</div>
                   </div>
                </div>
             </div>

             <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', borderRight: '1px solid #333', paddingRight: '40px' }}>
                <div style={{ marginBottom: '44px' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', height: '24px' }}>
                     <Phone size={22} style={{ color: '#A6CE39', flexShrink: 0 }} />
                     <a href="tel:+37369467556" className="footer-contact-link" style={{ fontSize: '18px', fontWeight: 700 }}>+373 69 467 556</a>
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '24px' }}>
                     <Phone size={22} style={{ color: '#A6CE39', flexShrink: 0 }} />
                     <a href="tel:+37378658351" className="footer-contact-link" style={{ fontSize: '18px', fontWeight: 700 }}>+373 78 658 351</a>
                   </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: 'auto' }}>
                   <div>
                      <a href="mailto:sales@frame.md" className="footer-contact-link" style={{ fontWeight: 600, fontSize: '14px' }}>sales@frame.md</a>
                      <div style={{ color: '#666', fontSize: '12px', marginTop: '2px', lineHeight: '14px' }}>{t('footer.contactDetails.salesTitle')}</div>
                   </div>
                   <div>
                      <a href="mailto:hr@frame.md" className="footer-contact-link" style={{ fontWeight: 600, fontSize: '14px' }}>hr@frame.md</a>
                      <div style={{ color: '#666', fontSize: '12px', marginTop: '2px', lineHeight: '14px' }}>{t('footer.contactDetails.hrTitle')}</div>
                   </div>
                </div>
             </div>
          </div>

          <div style={{ gridRow: '2', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', paddingTop: '14px', paddingBottom: '58px' }}>
              {[showrooms[0], showrooms[1]].map((shop, i) => (
                <div key={i}>
                   <div style={{ color: '#666', fontSize: '11px', marginBottom: '4px', height: '14px', paddingLeft: '40px' }}>{t('footer.contactDetails.showroomPrefix')} {shop.city}</div>
                   <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <MapPin size={24} style={{ color: '#A6CE39', flexShrink: 0, marginTop: '1px' }} />
                      <div>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '2px', cursor: 'pointer', display: 'inline-block', lineHeight: '22px' }}>{shop.address}</span>
                        <div style={{ color: '#fff', fontSize: '13px', marginTop: '6px', fontWeight: 500 }}>{shop.mall}</div>
                        <div style={{ color: '#666', fontSize: '12px', marginTop: '4px', lineHeight: '14px' }}>{shop.time}</div>
                      </div>
                   </div>
                </div>
              ))}
          </div>

          <div style={{ gridRow: '3', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignSelf: 'end' }}>
              {[showrooms[2], showrooms[3]].map((shop, i) => (
                <div key={i}>
                   <div style={{ color: '#666', fontSize: '11px', marginBottom: '4px', height: '14px', paddingLeft: '40px' }}>{t('footer.contactDetails.showroomPrefix')} {shop.city}</div>
                   <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <MapPin size={24} style={{ color: '#A6CE39', flexShrink: 0, marginTop: '1px' }} />
                      <div>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '15px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '2px', cursor: 'pointer', display: 'inline-block', lineHeight: '22px' }}>{shop.address}</span>
                        <div style={{ color: '#fff', fontSize: '13px', marginTop: '6px', fontWeight: 500 }}>{shop.mall}</div>
                        <div style={{ color: '#666', fontSize: '12px', marginTop: '4px', lineHeight: '14px' }}>{shop.time}</div>
                      </div>
                   </div>
                </div>
              ))}
          </div>
        </div>

        {/* 3. Bottom Level: Links Grid */}
        <div style={{ display: 'flex', alignItems: 'flex-start', paddingLeft: '5px', paddingRight: '5px' }}>
          <div style={{ width: '180px', marginRight: '110px' }}>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '20px', fontSize: '15px', textTransform: 'uppercase' }}>{t('footer.sections.customers')}</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              <li><a href="#" className="footer-nav-link">{t('footer.links.delivery')}</a></li>
              <li><a href="#" className="footer-nav-link">{t('footer.links.payment')}</a></li>
              <li><a href="#" className="footer-nav-link">{t('footer.links.warranty')}</a></li>
              <li><a href="#" className="footer-nav-link">{t('footer.links.return')}</a></li>
            </ul>
          </div>

          <div style={{ width: '180px', marginRight: '110px' }}>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '20px', fontSize: '15px', textTransform: 'uppercase' }}>{t('footer.sections.about')}</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              <li><a href="#" className="footer-nav-link">{t('footer.links.aboutUs')}</a></li>
              <li><a href="#" className="footer-nav-link">{t('footer.links.contacts')}</a></li>
              <li><a href="#" className="footer-nav-link">{t('footer.links.vacancies')}</a></li>
              <li><a href="#" className="footer-nav-link">{t('footer.links.reviews')}</a></li>
            </ul>
          </div>
          
          <div style={{ width: '180px' }}>
            <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '20px', fontSize: '15px', textTransform: 'uppercase' }}>{t('footer.sections.socialTitle')}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { name: 'Telegram' },
                { name: 'Discord' },
                { name: 'TikTok' }
              ].map((item) => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={`/icons/icon-${item.name.toLowerCase()}.png`} 
                      alt={item.name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'contain'
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <span style={{ color: '#ccc', fontSize: '14px', fontWeight: 500 }}>{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Branding Zone: Logo fixed, only signature moves */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/branding/logo-full-FRAME.png" alt="FRAME" style={{ height: '120px', width: 'auto', objectFit: 'contain', opacity: 0.9 }} />
            <div style={{ 
              color: '#666', 
              fontSize: '13px', 
              lineHeight: '1.6', 
              whiteSpace: 'nowrap',
              marginTop: '24px' /* Perfectly aligned with TikTok text baseline */
            }}>
              {t('footer.copyright')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
