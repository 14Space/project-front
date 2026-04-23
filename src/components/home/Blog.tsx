import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Blog() {
  const { t } = useTranslation();
  
  const posts = [
    { 
      title: 'Как выбрать видеокарту', 
      image: '/blog/MAIN-how-to-choose-gpu.jpg', 
      date: '18 Апреля 2024' 
    },
    { 
      title: 'Cross-play и мультиплатформенность: что это меняет для PC-геймеров', 
      image: '/blog/MAIN-crossplay-multiplatform.jpg', 
      date: '15 Апреля 2024' 
    },
    { 
      title: 'Цена GTA 6: сколько может стоить игра на старте продаж', 
      image: '/blog/MAIN-gta-price.jpg', 
      date: '12 Апреля 2024' 
    }
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
           <h2 className="title" style={{ margin: 0 }}>{t('home.blog.title')}</h2>
            <Link to="/blog" className="blog-all-link">{t('home.blog.allPosts')}</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {posts.map((post, idx) => (
            <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '20px', backgroundColor: 'var(--card-bg)' }}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>{post.date}</div>
                <div style={{ fontWeight: 600, fontSize: '18px', color: 'var(--text-color)' }}>{post.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
