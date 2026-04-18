import Sidebar from './Sidebar';
import HeroSlider from './HeroSlider';

export default function Hero() {
  return (
    <section className="section" style={{ paddingTop: '24px', paddingBottom: '24px' }}>
      <div className="container" style={{ display: 'flex', gap: '24px' }}>
        <Sidebar />
        <HeroSlider />
        <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ height: '208px', backgroundColor: '#e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
            <img src="https://via.placeholder.com/280x208.png?text=Mini+Banner+1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Mini Promo 1" />
          </div>
          <div style={{ height: '208px', backgroundColor: '#e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
            <img src="https://via.placeholder.com/280x208.png?text=Mini+Banner+2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Mini Promo 2" />
          </div>
        </div>
      </div>
    </section>
  );
}
