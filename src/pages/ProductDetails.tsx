import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Scale, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../context/AppContext';
import { getImgUrl } from '../utils/image';
import { getBilingualText } from '../utils/bilingual';
import { api } from '../api';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toggleFavorite, toggleCompare, isInFavorites, isInCompare, toggleCart, isInCart } = useAppContext();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.get(`/Products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Failed to load product details", err);
        setError("Товар не найден или произошла ошибка.");
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ fontSize: '20px', color: '#A6CE39' }}>Загрузка товара...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
        <h2 style={{ color: '#FF1717' }}>{error || "Товар не найден"}</h2>
        <button 
          onClick={() => navigate(-1)} 
          style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#A6CE39', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Вернуться назад
        </button>
      </div>
    );
  }

  const isFav = isInFavorites(product.id.toString());
  const isComp = isInCompare(product.id.toString());
  const inCart = isInCart(product.id.toString());
  const inStock = product.status === "Available";
  const formatPrice = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  const handleToggleCompare = () => toggleCompare(product.id.toString());
  const handleToggleFavorite = () => toggleFavorite(product.id.toString());
  const handleToggleCart = () => toggleCart(product.id.toString());

  const handlePrevImg = () => {
    if (!product.images || product.images.length === 0) return;
    setCurrentImgIndex((prev) => (prev > 0 ? prev - 1 : product.images.length - 1));
  };

  const handleNextImg = () => {
    if (!product.images || product.images.length === 0) return;
    setCurrentImgIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : 0));
  };

  // Group attributes for better display (if needed) or just sort them
  const attributes = product.attributes || [];

  return (
    <div style={{ padding: '40px 0', color: 'var(--text-color)', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Breadcrumbs / Back button */}
      <button 
        onClick={() => navigate(-1)}
        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#A6CE39', cursor: 'pointer', marginBottom: '20px', fontSize: '16px', fontWeight: 500 }}
      >
        <ArrowLeft size={20} /> Назад
      </button>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        {/* Top section: Images & Basic Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '40px' }}>
          
          {/* Images Gallery */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#0c0d0d', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ position: 'relative', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {product.images && product.images.length > 0 ? (
                <>
                  <img 
                    src={getImgUrl(product.images[currentImgIndex])} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                  {product.images.length > 1 && (
                    <>
                      <button onClick={handlePrevImg} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', padding: '10px', cursor: 'pointer', color: '#fff' }}>
                        <ChevronLeft size={24} />
                      </button>
                      <button onClick={handleNextImg} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', padding: '10px', cursor: 'pointer', color: '#fff' }}>
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div style={{ color: '#555' }}>Нет изображений</div>
              )}
            </div>
            
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                {product.images.map((img: string, idx: number) => (
                  <div 
                    key={idx}
                    onClick={() => setCurrentImgIndex(idx)}
                    style={{ 
                      width: '80px', 
                      height: '80px', 
                      borderRadius: '8px', 
                      border: currentImgIndex === idx ? '2px solid #A6CE39' : '2px solid transparent',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      backgroundColor: '#1a1b1b',
                      flexShrink: 0
                    }}
                  >
                    <img src={getImgUrl(img)} alt={`Thumb ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ color: '#888', fontSize: '14px', marginBottom: '8px' }}>Код товара: {product.id.toString().padStart(6, '0')}</div>
              <h1 style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 16px 0', lineHeight: 1.2 }}>{product.name}</h1>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: inStock ? '#A6CE39' : '#FF1717' }}>
                  {inStock ? 'В наличии' : 'Нет в наличии'}
                </div>
                {product.brandName && (
                  <div style={{ padding: '4px 12px', backgroundColor: '#1a1b1b', borderRadius: '20px', fontSize: '14px', border: '1px solid #333' }}>
                    Бренд: <span style={{ fontWeight: 'bold' }}>{product.brandName}</span>
                  </div>
                )}
              </div>
            </div>

            <div style={{ fontSize: '42px', fontWeight: 800, color: '#fff' }}>
              {formatPrice(product.price)} MDL
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
              <button 
                onClick={handleToggleCart}
                style={{ 
                  flex: 1, 
                  padding: '16px', 
                  backgroundColor: inCart ? 'transparent' : '#A6CE39', 
                  color: inCart ? '#A6CE39' : '#000', 
                  border: inCart ? '2px solid #A6CE39' : 'none', 
                  borderRadius: '12px', 
                  fontSize: '18px', 
                  fontWeight: 700, 
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s'
                }}
              >
                <ShoppingCart size={24} />
                {inCart ? 'В корзине' : 'В корзину'}
              </button>

              <button 
                onClick={handleToggleFavorite}
                style={{ width: '60px', height: '60px', backgroundColor: '#1a1b1b', border: '1px solid #333', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: isFav ? '#FF1717' : '#fff', transition: 'all 0.2s' }}
                title="В избранное"
              >
                <Heart size={24} fill={isFav ? '#FF1717' : 'none'} />
              </button>

              <button 
                onClick={handleToggleCompare}
                style={{ width: '60px', height: '60px', backgroundColor: '#1a1b1b', border: '1px solid #333', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: isComp ? '#A6CE39' : '#fff', transition: 'all 0.2s' }}
                title="Сравнить"
              >
                <Scale size={24} />
              </button>
            </div>

            {/* Quick Specs / Delivery info can go here */}
            <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#1a1b1b', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#A6CE39' }} />
                <span>Доставка по Кишиневу — <strong style={{ color: '#A6CE39' }}>Бесплатно</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#A6CE39' }} />
                <span>Официальная гарантия — <strong>24 месяца</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#A6CE39' }} />
                <span>Возврат товара в течение <strong>14 дней</strong></span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom section: Full Specs */}
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid #333' }}>Характеристики</h2>
          {attributes.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', backgroundColor: '#333', borderRadius: '12px', overflow: 'hidden' }}>
              {attributes.map((attr: any, idx: number) => {
                const displayName = getBilingualText(attr.attributeName, i18n.language);
                const displayValue = getBilingualText(attr.value, i18n.language);

                return (
                  <div key={idx} style={{ display: 'flex', backgroundColor: '#0c0d0d', padding: '16px 24px' }}>
                    <div style={{ flex: 1, color: '#aaa' }}>{displayName}</div>
                    <div style={{ flex: 2, fontWeight: 500 }}>{displayValue}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ color: '#888' }}>Характеристики не указаны</div>
          )}
        </div>
        
        {/* Description section if present */}
        {product.description && (
          <div style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid #333' }}>Описание</h2>
            <div style={{ lineHeight: '1.6', color: '#ccc', fontSize: '16px', whiteSpace: 'pre-wrap' }}>
              {product.description}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
