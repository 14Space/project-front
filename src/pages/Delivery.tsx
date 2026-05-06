import { Truck, Clock, Package, ShieldCheck, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Delivery() {
  const { t } = useTranslation();

  const perks = [
    {
      icon: <Truck size={24} color="#A6CE39" />,
      title: 'Бесплатная доставка',
      desc: 'Доставляем бесплатно любые заказы на любую сумму по всей стране.'
    },
    {
      icon: <Clock size={24} color="#A6CE39" />,
      title: 'Срок 1-2 дня',
      desc: 'Доставка в течение одного-двух дней с момента подтверждения заказа.'
    },
    {
      icon: <Package size={24} color="#A6CE39" />,
      title: 'Надежная упаковка',
      desc: 'Ваше оборудование защищено многослойной противоударной упаковкой.'
    },
    {
      icon: <ShieldCheck size={24} color="#A6CE39" />,
      title: 'Проверка при получении',
      desc: 'Вы можете вскрыть посылку и проверить целостность товара перед оплатой.'
    }
  ];

  const showrooms = [
    { 
      city: 'Кишинев (Ботаника)', 
      address: 'ул. Арборилор, 21', 
      mall: 'ТЦ «Shopping MallDova»', 
      time: 'Пн-Вс: 10:00-22:00' 
    },
    { 
      city: 'Кишинев (Чеканы)', 
      address: 'ул. Михаил Садовяну, 42/6', 
      mall: 'ТЦ «Port Mall»', 
      time: 'Пн-Вс: 10:00-22:00' 
    },
    { 
      city: 'Кишинев (Рышкановка)', 
      address: 'ул. Студенцилор, 7/1', 
      mall: 'Шоурум FRAME', 
      time: 'Пн-Вс: 09:00-20:00' 
    },
    { 
      city: 'Бельцы', 
      address: 'ул. Николае Йорги, 1', 
      mall: 'ТЦ «Evimall»', 
      time: 'Пн-Вс: 09:00-20:00' 
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          {/* ВАРИАНТ 1: ДОСТАВКА */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: 700, 
              marginBottom: '20px', 
              color: '#fff', 
              textTransform: 'uppercase',
              textAlign: 'center' 
            }}>
              Курьерская доставка по Молдове
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {perks.map((perk, i) => (
                <div key={i} style={{ 
                  backgroundColor: 'rgba(255,255,255,0.03)', 
                  padding: '24px', 
                  borderRadius: '12px', 
                  border: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ flexShrink: 0 }}>{perk.icon}</div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#fff' }}>{perk.title}</h3>
                  </div>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.5', margin: 0 }}>{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* РАЗДЕЛИТЕЛЬ */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px', 
            margin: '30px 0 20px 0',
            opacity: 1
          }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
            <div style={{ 
              color: '#fff', 
              fontSize: '28px', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              whiteSpace: 'nowrap'
            }}>
              ИЛИ САМОВЫВОЗ ПРЯМИКОМ ИЗ ШОУРУМОВ
            </div>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
          </div>

          {/* ВАРИАНТ 2: САМОВЫВОЗ */}
          <div>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px 60px' }}>
                {showrooms.map((shop, i) => (
                  <div key={i}>
                    <div style={{ color: '#666', fontSize: '12px', marginBottom: '6px', paddingLeft: '40px' }}>
                      Шоурум в {shop.city}
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                      <MapPin size={24} style={{ color: '#A6CE39', flexShrink: 0, marginTop: '1px' }} />
                      <div>
                        <span style={{ 
                          color: '#fff', 
                          fontWeight: 700, 
                          fontSize: '18px', 
                          borderBottom: '1px solid rgba(255,255,255,0.3)', 
                          paddingBottom: '2px', 
                          display: 'inline-block', 
                          lineHeight: '24px' 
                        }}>
                          {shop.address}
                        </span>
                        <div style={{ color: '#fff', fontSize: '15px', marginTop: '8px', fontWeight: 500 }}>
                          {shop.mall}
                        </div>
                        <div style={{ color: '#666', fontSize: '13px', marginTop: '6px' }}>
                          {shop.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
