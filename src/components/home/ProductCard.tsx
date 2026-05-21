import { useState } from 'react';
import { ShoppingCart, Heart, Scale, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import { getImgUrl } from '../../utils/image';

interface ProductCardProps {
  id: string;
  code: string;
  title: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  specs: string[];
  images: string[];
  category: string;
  isCartView?: boolean;
}

export default function ProductCard({ id, code, title, price, oldPrice, inStock, specs, images, isCartView }: ProductCardProps) {
  const { t } = useTranslation();
  const { toggleFavorite, toggleCompare, isInFavorites, isInCompare, toggleCart, isInCart } = useAppContext();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const isFav = isInFavorites(id);
  const isComp = isInCompare(id);
  const inCart = isInCart(id);

  return (
    <div style={{ position: 'relative', height: '445px' }}>
      <div 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#0c0d0d', 
          borderRadius: '12px', 
          padding: '10px 16px 16px', 
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'box-shadow 0.3s ease',
          zIndex: isHovered ? 10 : 1,
          boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.6)' : 'none'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setCurrentImgIndex(0);
        }}
      >
        {/* 1. Верхняя панель: Код слева, Действия справа */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '15px', color: '#666' }}>
            {t('common.code')}: <span style={{ fontWeight: 700, color: 'var(--text-color)' }}>{code}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={`telemart-action-btn ${isComp ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); toggleCompare(id); }}
              style={{ color: isComp ? '#A6CE39' : '#fff' }}
            >
              <Scale size={25} />
            </button>
            <button 
              className={`telemart-action-btn ${isFav ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); toggleFavorite(id); }}
              style={{ color: isFav ? '#FF1717' : '#fff' }}
            >
              <Heart size={25} />
            </button>
          </div>
        </div>
        
        {/* 2. Зона изображения */}
        <div style={{ 
          height: '200px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'flex-end',
          marginTop: '5px', 
          position: 'relative'
        }}>
          <img 
            src={getImgUrl(images[currentImgIndex])} 
            alt={title} 
            style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%', height: 'auto' }} 
          />
        </div>

        {/* 3. Пагинация со стрелками */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '3px' }}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImgIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', color: '#ccc' }}
          >
            <ChevronLeft size={16} />
          </button>
          
          <div style={{ display: 'flex', gap: '6px' }}>
            {images.map((_, idx) => (
              <div 
                key={idx}
                style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: currentImgIndex === idx ? '#A6CE39' : '#E0E0E0',
                  transition: 'all 0.2s'
                }}
              />
            ))}
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImgIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', color: '#ccc' }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* 4. Заголовок */}
        <div style={{ 
          marginTop: '5px', 
          fontSize: '17px', 
          fontWeight: 700, 
          lineHeight: '1.3', 
          color: 'var(--text-color)', 
          height: '45px', 
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {t(title)}
        </div>

        {/* 5. Статус наличия */}
        <div style={{ fontSize: '15px', color: inStock ? '#A6CE39' : '#888', marginTop: '8px', fontWeight: 700 }}>
          {inStock ? t('common.inStock') : t('common.outOfStock')}
        </div>

        {/* 6. Цена и Корзина */}
        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {oldPrice && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '14px' }}>
                  {oldPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} MDL
                </span>
                <span style={{ backgroundColor: '#FF1717', color: '#fff', fontSize: '12px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                  -{discount}%
                </span>
              </div>
            )}
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#fff' }}>
              {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} MDL
            </div>
          </div>

          {isCartView ? (
            <button 
              className="telemart-remove-btn"
              onClick={(e) => { e.stopPropagation(); toggleCart(id); }}
            >
              <X size={24} color="#ff4d4d" />
            </button>
          ) : (
            <button 
              className="telemart-cart-btn"
              onClick={(e) => { e.stopPropagation(); toggleCart(id); }}
              style={{ 
                backgroundColor: inCart ? 'transparent' : '#A6CE39',
                border: inCart ? '2px solid #A6CE39' : 'none',
                boxShadow: inCart ? 'none' : '0 4px 12px rgba(166, 206, 57, 0.3)'
              }}
            >
              <ShoppingCart size={24} color={inCart ? '#A6CE39' : '#fff'} />
            </button>
          )}
        </div>

        {/* 7. Характеристики — просто продолжение карточки */}
        {isHovered && (
          <div style={{
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {specs.map((spec, i) => (
              <div key={i} style={{ fontSize: '13px', color: 'var(--text-color)' }}>
                {t(spec)}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .telemart-action-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
        }
        .telemart-action-btn:hover {
          color: #A6CE39;
        }
        .telemart-cart-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: #A6CE39;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(166, 206, 57, 0.3);
        }
        .telemart-cart-btn:hover {
          transform: scale(1.05);
          background-color: #95ba33;
        }
        .telemart-remove-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background-color: transparent;
          border: 2px solid #ff4d4d;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .telemart-remove-btn:hover {
          transform: scale(1.05);
          background-color: rgba(255, 77, 77, 0.1) !important;
        }
      `}</style>
    </div>
  );
}
