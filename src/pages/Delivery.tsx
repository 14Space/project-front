import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Delivery() {
  const { t } = useTranslation();

  const features = [
    { 
      icon: <Truck size={24} color="#A6CE39" />, 
      title: t('delivery.features.allMoldova.title'), 
      desc: t('delivery.features.allMoldova.desc') 
    },
    { 
      icon: <ShieldCheck size={24} color="#A6CE39" />, 
      title: t('delivery.features.free.title'), 
      desc: t('delivery.features.free.desc') 
    },
    { 
      icon: <Clock size={24} color="#A6CE39" />, 
      title: t('delivery.features.express.title'), 
      desc: t('delivery.features.express.desc') 
    },
    { 
      icon: <MapPin size={24} color="#A6CE39" />, 
      title: t('delivery.features.floor.title'), 
      desc: t('delivery.features.floor.desc') 
    }
  ];

  const showrooms = [
    { 
      city: t('footer.contactDetails.showroomsList.botanica.city'), 
      address: t('footer.contactDetails.showroomsList.botanica.address'), 
      mall: t('footer.contactDetails.showroomsList.botanica.mall') 
    },
    { 
      city: t('footer.contactDetails.showroomsList.ciocana.city'), 
      address: t('footer.contactDetails.showroomsList.ciocana.address'), 
      mall: t('footer.contactDetails.showroomsList.ciocana.mall') 
    },
    { 
      city: t('footer.contactDetails.showroomsList.riscani.city'), 
      address: t('footer.contactDetails.showroomsList.riscani.address'), 
      mall: t('footer.contactDetails.showroomsList.riscani.mall') 
    },
    { 
      city: t('footer.contactDetails.showroomsList.balti.city'), 
      address: t('footer.contactDetails.showroomsList.balti.address'), 
      mall: t('footer.contactDetails.showroomsList.balti.mall') 
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Главная секция */}
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          {/* Заголовок */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#fff', 
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: 0
            }}>
              {t('footer.links.delivery')}
            </h2>
          </div>

          {/* Сетка преимуществ */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
            {features.map((feature, i) => (
              <div key={i} style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                padding: '24px', 
                borderRadius: '16px', 
                border: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  width: '48px', 
                  height: '48px', 
                  backgroundColor: 'rgba(166, 206, 57, 0.1)', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>{feature.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.5', margin: 0 }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Разделитель */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              color: '#fff', 
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: 0
            }}>
              {t('delivery.pickupTitle')}
            </h2>
          </div>

          {/* Сетка шоурумов */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {showrooms.map((showroom, i) => (
              <div key={i} style={{ 
                backgroundColor: 'rgba(255,255,255,0.03)', 
                padding: '24px', 
                borderRadius: '16px', 
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <MapPin size={18} color="#A6CE39" />
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '16px' }}>{showroom.city}</span>
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}>{showroom.address}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>{showroom.mall}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
