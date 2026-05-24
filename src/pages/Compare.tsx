import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { Scale, X, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getImgUrl } from '../utils/image';
import { api } from '../api';

export default function Compare() {
  const { t, i18n } = useTranslation();
  const { compareList, toggleCompare, toggleCart, isInCart } = useAppContext();
  const navigate = useNavigate();

  const [compareProducts, setCompareProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompare = async () => {
      setIsLoading(true);
      try {
        const promises = compareList.map(id => api.get(`/Products/${id}`).catch(() => null));
        const results = await Promise.all(promises);
        const validProducts = results.filter(p => p !== null);
        setCompareProducts(validProducts);
      } catch (err) {
        console.error('Failed to load compare list', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (compareList.length > 0) {
      fetchCompare();
    } else {
      setCompareProducts([]);
      setIsLoading(false);
    }
  }, [compareList]);

  const allAttributes = Array.from(new Set(
    compareProducts.flatMap(p => p.attributes?.map((a: any) => a.attributeName.split(' / ')[0]) || [])
  ));

  const formatPrice = (num: number) => num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '100px 0', color: '#A6CE39' }}>Загрузка...</div>;
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '60vh' }}>
      <section className="section" style={{ padding: '10px 0 40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Scale size={28} color="#A6CE39" />
            <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, margin: 0 }}>
              {t('common.compare') || 'Сравнение товаров'}
            </h1>
          </div>

          {compareProducts.length > 0 ? (
            <div style={{ overflowX: 'auto', paddingBottom: '20px' }}>
              <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', backgroundColor: 'var(--card-bg)', borderRadius: '12px', overflow: 'hidden' }}>
                <thead>
                  <tr>
                    <th style={{ width: '20%', padding: '20px', borderBottom: '1px solid var(--border-color)', textAlign: 'left', verticalAlign: 'bottom', backgroundColor: '#0c0d0d' }}>
                      <div style={{ color: '#888', fontSize: '18px', fontWeight: 600 }}>Характеристики</div>
                    </th>
                    {compareProducts.map(product => (
                      <th key={product.id} style={{ width: `${80 / compareProducts.length}%`, padding: '20px', borderBottom: '1px solid var(--border-color)', verticalAlign: 'top', position: 'relative', backgroundColor: '#0c0d0d' }}>
                        <button 
                          onClick={() => toggleCompare(product.id.toString())}
                          style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#888', cursor: 'pointer', transition: 'color 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#FF1717'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                        >
                          <X size={20} />
                        </button>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                          <div 
                            style={{ height: '140px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={() => navigate(`/product/${product.id}`)}
                          >
                            <img 
                              src={product.images && product.images.length > 0 ? getImgUrl(product.images[0]) : '/subcategories/SUBCATEGORIES-zaglushka.png'} 
                              alt={product.name}
                              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                            />
                          </div>
                          
                          <div 
                            style={{ fontSize: '15px', color: '#fff', fontWeight: 600, textAlign: 'center', cursor: 'pointer', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '60px' }}
                            onClick={() => navigate(`/product/${product.id}`)}
                          >
                            {product.name}
                          </div>
                          
                          <div style={{ fontSize: '20px', color: '#fff', fontWeight: 700 }}>
                            {formatPrice(product.price)} MDL
                          </div>

                          <button 
                            onClick={() => toggleCart(product.id.toString())}
                            style={{ 
                              width: '100%', 
                              padding: '10px', 
                              backgroundColor: isInCart(product.id.toString()) ? 'transparent' : '#A6CE39', 
                              color: isInCart(product.id.toString()) ? '#A6CE39' : '#000', 
                              border: isInCart(product.id.toString()) ? '2px solid #A6CE39' : 'none', 
                              borderRadius: '8px', 
                              fontSize: '14px', 
                              fontWeight: 700, 
                              cursor: 'pointer',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: '8px',
                              transition: 'all 0.2s'
                            }}
                          >
                            <ShoppingCart size={18} />
                            {isInCart(product.id.toString()) ? 'В корзине' : 'В корзину'}
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allAttributes.map((attrName, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 !== 0 ? '#0c0d0d' : 'transparent' }}>
                      <td style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', color: '#888', fontWeight: 500 }}>
                        {attrName}
                      </td>
                      {compareProducts.map(product => {
                        const productAttr = product.attributes?.find((a: any) => a.attributeName.split(' / ')[0] === attrName);
                        return (
                          <td key={product.id} style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', color: '#fff', textAlign: 'center', fontWeight: 500 }}>
                            {productAttr ? productAttr.value.split(' / ')[0] : '-'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0', color: '#888' }}>
              <p style={{ fontSize: '18px' }}>
                {i18n.language.startsWith('ru') ? 'Нет товаров для сравнения ;)' : 'No products to compare ;)'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
