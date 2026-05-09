import { Wrench } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function PCBuild() {
  const { t } = useTranslation();
  
  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - 80px)' }}>
      <section className="section" style={{ padding: '10px 0 40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Wrench size={28} color="var(--primary-color)" />
            <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, margin: 0 }}>
              {t('pcBuild.title')}
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}
