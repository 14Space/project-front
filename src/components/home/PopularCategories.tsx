import { useTranslation } from 'react-i18next';

export default function PopularCategories() {
  const { t } = useTranslation();
  
  const categories = [
    { title: t('home.categories.gpus') },
    { title: t('home.categories.cpus') },
    { title: t('home.categories.mobos') },
    { title: t('home.categories.ram') },
    { title: t('home.categories.ssd') },
    { title: t('home.categories.psu') },
    { title: t('home.categories.cases') },
    { title: t('home.categories.cooling') }
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className="title">{t('home.popularCategories')}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {categories.map((cat, idx) => (
            <div key={idx} style={{ 
              backgroundColor: 'var(--card-bg)', 
              padding: '24px', 
              borderRadius: '8px', 
              textAlign: 'center', 
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid var(--border-color)',
              transition: 'all 0.2s',
              color: 'var(--text-color)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#A6CE39';
              e.currentTarget.style.color = '#A6CE39';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-color)';
            }}
            >
              {cat.title}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
