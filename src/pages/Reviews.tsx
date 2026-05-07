import { useTranslation } from 'react-i18next';

export default function Reviews() {
  const { t } = useTranslation();

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#fff', 
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: 0
            }}>
              {t('footer.links.reviews')}
            </h2>
          </div>

          <div style={{ textAlign: 'center', padding: '100px 0', color: 'rgba(255,255,255,0.5)', fontSize: '18px' }}>
            {t('reviews.placeholder')}
          </div>
        </div>
      </section>
    </div>
  );
}
