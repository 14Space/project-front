import { MessageCircle, Camera, Video, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer style={{ backgroundColor: '#1D1D1D', color: '#ccc', fontSize: '14px' }}>
      <div style={{ backgroundColor: '#A6CE39', padding: '30px 0', color: '#fff' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 700 }}>{t('footer.newsletterTitle')}</div>
          <div style={{ display: 'flex', gap: '16px', width: '500px' }}>
            <input type="email" placeholder={t('footer.newsletterPlaceholder')} style={{ flex: 1, padding: '12px 20px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.5)', background: 'transparent', color: '#fff', outline: 'none' }} />
            <button style={{ backgroundColor: '#fff', color: '#111', padding: '0 24px', borderRadius: '30px', fontWeight: 600 }}>{t('footer.newsletterButton')}</button>
          </div>
        </div>
      </div>
      
      <div className="container" style={{ padding: '60px 20px', display: 'flex', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          <img src="/logo_FRAME.png" alt="FRAME" style={{ height: '40px', marginBottom: '24px' }} />
          <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
            <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><MessageCircle size={20} /></a>
            <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Camera size={20} /></a>
            <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Video size={20} /></a>
            <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Send size={20} /></a>
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '20px', fontSize: '16px' }}>{t('footer.sections.customers')}</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><a href="#">{t('footer.links.delivery')}</a></li>
            <li><a href="#">{t('footer.links.payment')}</a></li>
            <li><a href="#">{t('footer.links.warranty')}</a></li>
            <li><a href="#">{t('footer.links.return')}</a></li>
          </ul>
        </div>

        <div style={{ flex: 1 }}>
          <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '20px', fontSize: '16px' }}>{t('footer.sections.about')}</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><a href="#">{t('footer.links.aboutUs')}</a></li>
            <li><a href="#">{t('footer.links.contacts')}</a></li>
            <li><a href="#">{t('footer.links.vacancies')}</a></li>
            <li><a href="#">{t('footer.links.reviews')}</a></li>
          </ul>
        </div>
        
        <div style={{ flex: 1 }}>
          <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '20px', fontSize: '16px' }}>{t('footer.sections.categories')}</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><a href="#" style={{ color: '#A6CE39' }}>{t('footer.links.computers')}</a></li>
            <li><a href="#">{t('footer.links.gpus')}</a></li>
            <li><a href="#">{t('footer.links.cpus')}</a></li>
            <li><a href="#">{t('footer.links.laptops')}</a></li>
          </ul>
        </div>
      </div>
      
      <div style={{ borderTop: '1px solid #333', padding: '24px 0', textAlign: 'center', fontSize: '12px', color: '#888' }}>
        © FRAME Since 2026
      </div>
    </footer>
  );
}
