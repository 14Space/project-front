import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '../../api';

interface HeroSliderProps {
  height?: string;
}

const staticSlides = [
  { id: 1, image: '/hero/HERO-moza.png', alt: 'Moza' },
  { id: 2, image: '/hero/HERO-logitech.png', alt: 'Logitech' },
  { id: 3, image: '/hero/HERO-hator.png', alt: 'Hator' }
];

export default function HeroSlider({ height }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<any[]>(staticSlides);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await api.get('/Banners');
        const apiBanners = Array.isArray(res) ? res : [];
        if (apiBanners.length > 0) {
          const apiSlides = apiBanners.map((b: any) => ({
            id: b.id,
            image: b.imageUrl.startsWith('http') ? b.imageUrl : `http://localhost:5036${b.imageUrl}`,
            alt: `Banner ${b.id}`,
            link: b.link
          }));
          setSlides(apiSlides);
        }
      } catch (err) {
        console.error("Failed to fetch banners, using static", err);
      }
    };
    fetchBanners();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, slides.length]);

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
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: currentSlide === index ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
            zIndex: currentSlide === index ? 1 : 0,
            cursor: slide.link ? 'pointer' : 'default'
          }}
          onClick={() => {
            if (slide.link) {
              if (slide.link.startsWith('http')) {
                window.open(slide.link, '_blank');
              } else {
                window.location.href = slide.link;
              }
            }
          }}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        style={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 20,
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          border: 'none',
          padding: 0
        }}
        className="hero-nav-btn"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 20,
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          border: 'none',
          padding: 0
        }}
        className="hero-nav-btn"
      >
        <ChevronRight size={20} />
      </button>

      {/* Слайдер-индикаторы */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
        zIndex: 10
      }}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: currentSlide === index ? 'var(--primary-color)' : 'rgba(255,255,255,0.3)',
              transition: 'all 0.3s ease',
              border: 'none',
              padding: 0,
              cursor: 'pointer'
            }}
          />
        ))}
      </div>

      <style>{`
        .hero-nav-btn:hover {
          transform: translateY(-50%) scale(1.1) !important;
          background-color: var(--primary-color) !important;
          color: white !important;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
