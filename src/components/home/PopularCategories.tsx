import { useTranslation } from 'react-i18next';

// Импортируем твои новые файлы из assets
import catNvidia from '../../assets/categories/cat-nvidia.png';
import catRadeon from '../../assets/categories/cat-radeon.png';
import catIntel from '../../assets/categories/cat-intel.png';
import catRyzen from '../../assets/categories/cat-ryzen.png';

export default function PopularCategories() {
  const { t } = useTranslation();
  
  const categories = [
    { title: t('home.categories.nvidia'), image: catNvidia },
    { title: t('home.categories.intel_cpu'), image: catIntel },
    { title: t('home.categories.intel_mobo'), image: 'https://cdn-icons-png.flaticon.com/512/902/902404.png' },
    { title: t('home.categories.ddr5'), image: 'https://cdn-icons-png.flaticon.com/512/2888/2888608.png' },
    { title: t('home.categories.amd_gpu'), image: catRadeon },
    { title: t('home.categories.amd_cpu'), image: catRyzen },
    { title: t('home.categories.amd_mobo'), image: 'https://cdn-icons-png.flaticon.com/512/902/902404.png' },
    { title: t('home.categories.ddr4'), image: 'https://cdn-icons-png.flaticon.com/512/2888/2888608.png' }
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
              borderRadius: '12px', 
              textAlign: 'center', 
              cursor: 'pointer',
              border: '1px solid var(--border-color)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              color: 'var(--text-color)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '160px',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary-color)';
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{ 
                width: '80px', 
                height: '80px', 
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%', 
                    objectFit: 'contain'
                  }} 
                />
              </div>
              <div style={{ fontWeight: 600, fontSize: '15px', lineHeight: '1.4' }}>
                {cat.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
