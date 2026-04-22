import { useTranslation } from 'react-i18next';

export default function Blog() {
  const { t } = useTranslation();

  const posts = [
    { title: 'Как выбрать видеокарту в 2024 году', image: 'https://via.placeholder.com/400x200?text=Blog+1', date: '18 Апреля 2024' },
    { title: 'Сборка ПК для CS2', image: 'https://via.placeholder.com/400x200?text=Blog+2', date: '15 Апреля 2024' },
    { title: 'Обзор новых процессоров', image: 'https://via.placeholder.com/400x200?text=Blog+3', date: '12 Апреля 2024' }
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 className="title" style={{ margin: 0 }}>{t('home.blog.title')}</h2>
          <button className="blog-all-link">{t('home.blog.allPosts')}</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
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
