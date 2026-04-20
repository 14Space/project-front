interface HeroSliderProps {
  height?: string;
}

export default function HeroSlider({ height }: HeroSliderProps) {
  return (
    <div style={{ 
      width: '100%',
      height: height || '440px', 
      borderRadius: '8px', 
      overflow: 'hidden', 
      position: 'relative', 
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)'
    }}>
      <img 
        src="https://via.placeholder.com/1000x440.png?text=Promotional+Banner+1" 
        alt="Promo" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
      
      {/* Слайдер-индикаторы */}
      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        display: 'flex', 
        gap: '8px' 
      }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#A6CE39' }}></div>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }}></div>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.5)' }}></div>
      </div>
    </div>
  );
}
