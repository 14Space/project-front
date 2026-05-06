export default function About() {
  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#fff', 
              textTransform: 'uppercase',
              textAlign: 'left',
              margin: 0
            }}>
              О нас: <span style={{ color: '#A6CE39' }}>FRAME – от ПК до цели</span>
            </h2>
          </div>

          <div style={{ maxWidth: '1000px', textAlign: 'left' }}>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p style={{ margin: 0 }}>
                Мы понимаем: компьютерная техника – это не просто устройства. Это инструмент для достижения ваших целей.
              </p>
              
              <p style={{ margin: 0 }}>
                Кто-то ищет максимальную производительность для киберспортивных побед, кто-то – стабильность для бизнес-задач, 
                кто-то – мощность для креатива и дизайна, а кто-то – идеальный сетап для стриминга. Мы помогаем не просто 
                выбрать «железо», а собрать решение под конкретную задачу. Наша команда компьютерных энтузиастов и технологических 
                экспертов работает по принципу Job to be done: сначала мы выясняем, для чего нужен ПК или гаджет, а затем 
                предлагаем лучшее решение именно под ваш сценарий.
              </p>
              
              <p style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#fff' }}>
                Мы – больше, чем магазин техники. Мы – партнер на пути к вашей цели.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
