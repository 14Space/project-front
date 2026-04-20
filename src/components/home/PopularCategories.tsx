import { useTranslation } from 'react-i18next';

// Импорты твоих файлов
import catNvidia from '../../assets/categories/cat-nvidia.png';
import catRadeon from '../../assets/categories/cat-radeon.png';
import catIntel from '../../assets/categories/cat-intel.png';
import catRyzen from '../../assets/categories/cat-ryzen.png';
import catIntelMobo from '../../assets/categories/cat-intel-motherboards.png';
import catAmdMobo from '../../assets/categories/cat-amd-motherboards.png';

export default function PopularCategories() {
  const { t } = useTranslation();
  
  const categories = [
    { title: t('home.categories.nvidia'), image: catNvidia },
    { title: t('home.categories.intel_cpu'), image: catIntel },
    { title: t('home.categories.intel_mobo'), image: catIntelMobo },
    { title: t('home.categories.ddr5'), image: 'https://cdn-icons-png.flaticon.com/512/2888/2888608.png' },
    { title: t('home.categories.amd_gpu'), image: catRadeon },
    { title: t('home.categories.amd_cpu'), image: catRyzen },
    { title: t('home.categories.amd_mobo'), image: catAmdMobo },
    { title: t('home.categories.ddr4'), image: 'https://cdn-icons-png.flaticon.com/512/2888/2888608.png' }
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-color)', padding: '40px 0' }}>
      <div className="container">
        <h2 style={{ 
          fontSize: '24px', 
          fontWeight: 700, 
          marginBottom: '24px', 
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          <span style={{ color: 'var(--text-color)' }}>{t('home.popularCategories').split(' ')[0]}</span>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 400, marginLeft: '8px' }}>
            {t('home.popularCategories').split(' ')[1]}
          </span>
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '12px' 
        }}>
          {categories.map((cat, idx) => (
            <div key={idx} style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              padding: '8px 16px', 
              borderRadius: '50px', 
              cursor: 'pointer',
              border: '1px solid transparent',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              height: '56px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--card-bg)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.transform = 'translateX(0)';
            }}
            >
              {/* Маленькая иконка как в Телемарте */}
              <div style={{ 
                width: '40px', 
                height: '40px', 
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff', // Белый фон для иконки, чтобы логотипы всегда читались
                borderRadius: '50%',
                padding: '4px',
                overflow: 'hidden'
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

              {/* Текст справа */}
              <div style={{ 
                fontSize: '14px', 
                fontWeight: 500, 
                color: 'var(--text-color)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {cat.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
