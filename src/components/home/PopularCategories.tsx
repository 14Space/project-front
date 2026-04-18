export default function PopularCategories() {
  const categories = [
    { title: 'Видеокарты' },
    { title: 'Процессоры' },
    { title: 'Материнские платы' },
    { title: 'Оперативная память' },
    { title: 'SSD накопители' },
    { title: 'Блоки питания' },
    { title: 'Корпуса' },
    { title: 'Охлаждение' }
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className="title">Популярные категории</h2>
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
