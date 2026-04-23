import Sidebar from './Sidebar';
import HeroSlider from './HeroSlider';

const MAIN_HEIGHT = '440px';
const SIDE_WIDTH = '280px';
const GAP = '20px';

export default function Hero() {
  return (
    <section className="section" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <div className="container" style={{ 
        display: 'flex', 
        gap: GAP, 
        height: MAIN_HEIGHT,
        alignItems: 'stretch' 
      }}>
        {/* Левая часть - Меню */}
        <div style={{ width: SIDE_WIDTH, flexShrink: 0 }}>
          <Sidebar height={MAIN_HEIGHT} />
        </div>

        {/* Центр - Большой баннер */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <HeroSlider height={MAIN_HEIGHT} />
        </div>

        {/* Правая часть - Два маленьких баннера */}
        <div style={{ 
          width: SIDE_WIDTH, 
          flexShrink: 0, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: GAP 
        }}>
          {/* Расчет высоты: (Total - Gap) / 2 */}
          <div style={{ 
            flex: 1, 
            backgroundColor: 'var(--bg-secondary)', 
            borderRadius: '8px', 
            overflow: 'hidden',
            border: '1px solid var(--border-color)'
          }}>
            <img 
              src="https://via.placeholder.com/280x208.png?text=Mini+Banner+1" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              alt="Mini Promo 1" 
            />
          </div>
          <div style={{ 
            flex: 1, 
            backgroundColor: 'var(--bg-secondary)', 
            borderRadius: '8px', 
            overflow: 'hidden',
            border: '1px solid var(--border-color)'
          }}>
            <img 
              src="https://via.placeholder.com/280x208.png?text=Mini+Banner+2" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              alt="Mini Promo 2" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
