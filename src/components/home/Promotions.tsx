import { useState, useEffect, useRef, useCallback } from 'react';
import ProductCard from '../product/ProductCard';
import { useTranslation } from 'react-i18next';
import { api } from '../../api';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Promotions() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    api.get('/Products')
      .then((data: any[]) => setProducts(data.filter((p: any) => p.oldPrice && p.oldPrice > p.price)))
      .catch(() => {});
  }, []);

  const len = products.length;

  const go = useCallback((dir: number) => {
    if (len <= 4) return;
    setOffset(prev => ((prev + dir) % len + len) % len);
  }, [len]);

  useEffect(() => {
    if (len <= 4) return;
    timerRef.current = setInterval(() => go(1), 10000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [len, go]);

  const handleClick = (dir: number) => {
    go(dir);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go(1), 10000);
  };

  if (len === 0) return null;

  const visible: any[] = [];
  for (let i = 0; i < Math.min(4, len); i++) {
    visible.push(products[(offset + i) % len]);
  }

  return (
    <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="title" style={{ margin: 0 }}>{t('home.promotions')}</h2>
          {len > 4 && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleClick(-1)}
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-color)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--card-bg)'}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => handleClick(1)}
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-color)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-color)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--card-bg)'}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {visible.map((product, idx) => (
            <ProductCard
              key={`promo-${(offset + idx) % len}`}
              id={String(product.id)}
              title={product.name}
              price={product.price}
              oldPrice={product.oldPrice}
              inStock
              specs={product.shortSpecs || []}
              images={product.images?.map((img: any) => img.url || img) || ['/products/GPU-zaglushka.png']}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
