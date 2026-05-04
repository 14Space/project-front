import { Wrench } from 'lucide-react';

export default function PCBuild() {
  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - 80px)' }}>
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Wrench size={28} color="var(--primary-color)" />
            <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, margin: 0 }}>
              Конфигуратор ПК
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
