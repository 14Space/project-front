import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Blog() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { blogPosts } = useAppContext();

  const defaultPosts = [
    { 
      id: 'how-to-choose-gpu',
      title: t('home.blog.posts.how-to-choose-gpu.title'), 
      image: '/blog/BLOG-how-to-choose-gpu.png', 
      date: t('home.blog.posts.how-to-choose-gpu.date')
    },
    { 
      id: 'cross-play-multiplatform',
      title: t('home.blog.posts.cross-play-multiplatform.title'), 
      image: '/blog/BLOG-crossplay-multiplatform.png', 
      date: t('home.blog.posts.cross-play-multiplatform.date')
    },
    { 
      id: 'gta-6-price',
      title: t('home.blog.posts.gta-6-price.title'), 
      image: '/blog/BLOG-gta-price.png', 
      date: t('home.blog.posts.gta-6-price.date')
    },
    { 
      id: 'how-to-choose-console',
      title: t('home.blog.posts.how-to-choose-console.title'), 
      image: '/blog/BLOG-how-to-choose-gaming-console.png', 
      date: t('home.blog.posts.how-to-choose-console.date')
    },
    { 
      id: 'ryzen-9000-review',
      title: t('home.blog.posts.ryzen-9000-review.title'), 
      image: '/blog/BLOG-amd-ryzen-9000.png', 
      date: t('home.blog.posts.ryzen-9000-review.date')
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', paddingBottom: '40px' }}>
      {/* Заголовок и список статей */}
      <div className="container" style={{ padding: '10px 20px 0' }}>
        <h1 className="title" style={{ fontSize: '32px', marginBottom: '20px', marginTop: 0 }}>{t('home.blog.title')}</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {[...blogPosts, ...defaultPosts].map((post, idx) => (
            <div 
              key={idx} 
              onClick={() => navigate(`/blog/${post.id}`)}
              style={{ 
                borderRadius: '8px', 
                overflow: 'hidden', 
                border: '1px solid var(--border-color)', 
                backgroundColor: 'var(--card-bg)',
                cursor: 'pointer'
              }}
            >
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>{post.date}</div>
                <div style={{ fontWeight: 600, fontSize: '18px', color: 'var(--text-color)', transition: 'color 0.2s', lineHeight: '1.4' }}
                     onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                     onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-color)'}
                >
                  {post.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
