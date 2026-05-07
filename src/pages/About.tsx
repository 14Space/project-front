import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#fff', 
              textTransform: 'uppercase',
              textAlign: 'left',
              margin: 0
            }}>
              {t('footer.links.aboutUs')}: <span style={{ color: '#A6CE39' }}>{t('home.seo.title')}</span>
            </h2>
          </div>

          <div style={{ maxWidth: '1000px', textAlign: 'left' }}>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p style={{ margin: 0 }}>
                {t('home.seo.p1')}
              </p>
              
              <p style={{ margin: 0 }}>
                {t('home.seo.p2')} {t('home.seo.p3')}
              </p>
              
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#fff' }}>
                {t('home.seo.p4')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
