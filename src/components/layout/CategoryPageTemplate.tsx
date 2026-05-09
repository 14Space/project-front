import { useTranslation } from 'react-i18next';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryPageProps {
  categoryKey: string; // e.g. "computers"
}

export default function CategoryPageTemplate({ categoryKey }: CategoryPageProps) {
  const { t } = useTranslation();
  const categoryData = t(`catalog.${categoryKey}`, { returnObjects: true }) as any;

  if (!categoryData || typeof categoryData === 'string') {
    return <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>Category not found</div>;
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '80px' }}>

      {/* Hero Section */}
      <div style={{ 
        background: 'linear-gradient(180deg, #1a1d1d 0%, var(--bg-color) 100%)',
        padding: '40px 0 60px 0',
        borderBottom: '1px solid var(--border-color)'
      }}>
        <div className="container" style={{ padding: '0 20px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 800, marginBottom: '16px', textTransform: 'uppercase' }}>
            {categoryData.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '600px', lineHeight: 1.6 }}>
            {t(`catalog.${categoryKey}.description`) || `Откройте для себя наш ассортимент в категории ${categoryData.title}. Лучшие предложения и новинки уже здесь.`}
          </p>
        </div>
      </div>

      {/* Subcategories Grid */}
      <div className="container" style={{ padding: '60px 20px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '30px' 
        }}>
          {categoryData.groups?.map((group: any, idx: number) => (
            <Link 
              key={idx}
              to={group.path || '#'}
              style={{ 
                textDecoration: 'none',
                backgroundColor: 'var(--card-bg)',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid var(--border-color)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'var(--primary-color)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Image Container */}
              <div style={{ 
                height: '240px', 
                backgroundColor: '#000', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '20px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <img 
                  src={group.image || '/subcategories/SUBCATEGORIES-zaglushka.png'} 
                  alt={group.title}
                  style={{ 
                    maxHeight: '100%', 
                    maxWidth: '100%', 
                    objectFit: 'contain',
                    transition: 'transform 0.5s ease'
                  }}
                  className="group-image"
                />
                {/* Overlay Gradient */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '50%',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)'
                }} />
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', margin: 0 }}>
                    {group.title}
                  </h3>
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    backgroundColor: 'rgba(166,206,57,0.1)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--primary-color)'
                  }}>
                    <ArrowRight size={18} />
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5, margin: 0 }}>
                  {t(`catalog.${categoryKey}.groups.${idx}.description`) || `Посмотрите все товары в категории ${group.title}.`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="container" style={{ padding: '0 20px' }}>
        <div style={{ 
          backgroundColor: 'var(--card-bg)', 
          borderRadius: '24px', 
          padding: '40px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700 }}>Почему выбирают FRAME?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '12px', fontSize: '18px' }}>Топовое железо</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>Работаем только с проверенными брендами и новейшими технологиями.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '12px', fontSize: '18px' }}>Гарантия качества</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>На всю продукцию предоставляется официальная гарантия и сервисное обслуживание.</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '12px', fontSize: '18px' }}>Экспертная помощь</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>Наши специалисты помогут подобрать идеальное решение под ваши задачи.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
