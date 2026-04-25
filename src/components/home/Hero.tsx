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

        {/* Центр - Один большой баннер-слайдер */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <HeroSlider height={MAIN_HEIGHT} />
        </div>
      </div>
    </section>
  );
}
