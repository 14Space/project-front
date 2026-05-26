import { useState, useEffect, useRef } from 'react';
import ProductCard from '../product/ProductCard';
import { useTranslation } from 'react-i18next';
import { api } from '../../api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Promotions() {
  const { t } = useTranslation();
  const [discountedProducts, setDiscountedProducts] = useState<any[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDiscounted = async () => {
      try {
        const data = await api.get('/Products');
        // Filter products that have an oldPrice, no slice so it shows all promotions
        const deals = data.filter((p: any) => p.oldPrice && p.oldPrice > p.price);
        setDiscountedProducts(deals);
      } catch (error) {
        console.error("Failed to fetch hot deals", error);
      }
    };
    fetchDiscounted();
  }, []);

  if (discountedProducts.length === 0) {
    return null; // Don't show the section if there are no promotions
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="title" style={{ margin: 0 }}>{t('home.promotions')}</h2>
          
          {discountedProducts.length > 4 && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={scrollLeft}
                style={{ 
                  background: 'var(--card-bg)', 
                  border: '1px solid var(--border-color)', 
                  color: 'var(--text-color)',
                  width: '40px', height: '40px', borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-color)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--card-bg)'}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={scrollRight}
                style={{ 
                  background: 'var(--card-bg)', 
                  border: '1px solid var(--border-color)', 
                  color: 'var(--text-color)',
                  width: '40px', height: '40px', borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--primary-color)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--card-bg)'}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
        
        <div 
          ref={scrollContainerRef}
          style={{ 
            display: 'flex', 
            gap: '20px', 
            overflowX: 'auto', 
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none', // for Firefox
            msOverflowStyle: 'none' // for IE and Edge
          }}
        >
          <style>
            {`
              div::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>
          {discountedProducts.map((product) => (
            <div key={product.id} style={{ minWidth: 'calc(25% - 15px)', scrollSnapAlign: 'start' }}>
              <ProductCard 
                id={product.id.toString()}
                title={product.name}
                price={product.price}
                oldPrice={product.oldPrice}
                images={product.images && product.images.length > 0 ? product.images : ['/products/GPU-zaglushka.png']}
                inStock={product.status !== 'Out of stock'}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
