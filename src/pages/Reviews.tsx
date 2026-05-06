export default function Reviews() {
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
              Отзывы наших клиентов
            </h2>
          </div>

          <div style={{ textAlign: 'center', padding: '100px 0', color: 'rgba(255,255,255,0.5)', fontSize: '18px' }}>
            Мы ещё думаем как это реализовать ;)
          </div>
        </div>
      </section>
    </div>
  );
}
