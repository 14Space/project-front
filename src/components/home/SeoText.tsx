import { useTranslation } from 'react-i18next';

export default function SeoText() {
  const { t } = useTranslation();
  
  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.8' }}>
      <div className="container">
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-color)', marginBottom: '16px' }}>{t('home.seo.title')}</h1>
        <p style={{ marginBottom: '16px' }}>{t('home.seo.p1')}</p>
        <p style={{ marginBottom: '16px' }}>{t('home.seo.p2')}</p>
        <p style={{ marginBottom: '16px' }}>{t('home.seo.p3')}</p>
        <p>{t('home.seo.p4')}</p>
      </div>
    </section>
  );
}
