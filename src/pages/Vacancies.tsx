import { useTranslation } from 'react-i18next';

export default function Vacancies() {
  const { t } = useTranslation();

  const jobs = [
    {
      title: t('vacancies.jobs.sales.title'),
      salary: t('vacancies.jobs.sales.salary'),
      desc: t('vacancies.jobs.sales.desc')
    },
    {
      title: t('vacancies.jobs.assembly.title'),
      salary: t('vacancies.jobs.assembly.salary'),
      desc: t('vacancies.jobs.assembly.desc')
    },
    {
      title: t('vacancies.jobs.service.title'),
      salary: t('vacancies.jobs.service.salary'),
      desc: t('vacancies.jobs.service.desc')
    }
  ];

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
              {t('footer.links.vacancies')}
            </h2>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px' }}>
              {t('vacancies.intro')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '20px' }}>
            {jobs.map((job, i) => (
              <div key={i} style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                padding: '30px', 
                borderRadius: '16px', 
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{job.title}</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{job.desc}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#A6CE39', fontWeight: 700, fontSize: '18px', marginBottom: '10px' }}>{job.salary}</div>
                  <a 
                    href="https://t.me/SX_Warrior" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-block',
                      backgroundColor: 'rgba(255,255,255,0.1)', 
                      color: '#fff', 
                      textDecoration: 'none',
                      padding: '10px 24px', 
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '14px',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#A6CE39';
                      e.currentTarget.style.color = '#111';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = '#fff';
                    }}
                  >
                    {t('vacancies.apply')}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
