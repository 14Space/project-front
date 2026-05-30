import React, { useState } from 'react';
import { 
  Wrench, 
  Cpu, 
  CircuitBoard,
  MemoryStick, 
  Monitor, 
  Fan, 
  HardDrive, 
  Box, 
  Zap,
  Plus,
  Trash2,
  X,
  ShoppingCart
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useCategoryProducts } from '../hooks/useCategoryProducts';
import type { Product } from '../data/mockProducts';

const BUILD_CATEGORIES = [
  { id: 'cpu', name: 'Процессоры', icon: <Cpu size={24} />, required: true },
  { id: 'motherboard', name: 'Материнские платы', icon: <CircuitBoard size={24} />, required: true },
  { id: 'ram', name: 'Оперативная память', icon: <MemoryStick size={24} />, required: true },
  { id: 'gpu', name: 'Видеокарты', icon: <Monitor size={24} />, required: false },
  { id: 'cooling', name: 'Охлаждение', icon: <Fan size={24} />, required: true },
  { id: 'storage', name: 'Дисковые накопители', icon: <HardDrive size={24} />, required: true },
  { id: 'cases', name: 'Корпуса', icon: <Box size={24} />, required: true },
  { id: 'psu', name: 'Блоки питания', icon: <Zap size={24} />, required: true },
];

const ComponentSelectorModal = ({ 
  categoryName, 
  isOpen, 
  onClose,
  onSelect
}: { 
  categoryName: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (product: Product) => void;
}) => {
  const { products, isLoading, error } = useCategoryProducts(categoryName);
  
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: '#111',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0, color: '#fff', fontSize: '20px' }}>Выберите: {categoryName}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>
        
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {isLoading && <div style={{ color: '#fff', textAlign: 'center', padding: '40px' }}>Загрузка товаров...</div>}
          {error && <div style={{ color: '#ff4d4d', textAlign: 'center', padding: '40px' }}>{error}</div>}
          {!isLoading && !error && products.length === 0 && (
            <div style={{ color: '#888', textAlign: 'center', padding: '40px' }}>Нет товаров в данной категории</div>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {products.map((p) => (
              <div key={p.id} style={{
                display: 'flex',
                gap: '15px',
                padding: '15px',
                backgroundColor: 'rgba(255,255,255,0.02)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                alignItems: 'center'
              }}>
                <img src={p.images[0]} alt={p.title} style={{ width: '80px', height: '80px', objectFit: 'contain', backgroundColor: '#fff', borderRadius: '8px', padding: '5px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fff', fontSize: '16px', fontWeight: 600, marginBottom: '5px' }}>{p.title}</div>
                  <div style={{ color: 'var(--primary-color)', fontSize: '18px', fontWeight: 700 }}>{p.price} MDL</div>
                </div>
                <button 
                  onClick={() => onSelect(p)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--primary-color)',
                    color: '#000',
                    border: 'none',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Выбрать
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function PCBuild() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateCartQuantity, cart, setIsCatalogOpen } = useAppContext();
  
  const [selectedParts, setSelectedParts] = useState<Record<string, Product | null>>({});
  const [activeCategory, setActiveCategory] = useState<{ id: string, name: string } | null>(null);
  const [needAssembly, setNeedAssembly] = useState(false);

  const handleSelect = (product: Product) => {
    if (activeCategory) {
      setSelectedParts(prev => ({ ...prev, [activeCategory.id]: product }));
      setActiveCategory(null);
    }
  };

  const handleRemove = (id: string) => {
    setSelectedParts(prev => ({ ...prev, [id]: null }));
  };

  const totalPrice = Object.values(selectedParts).reduce((sum, product) => sum + (product ? product.price : 0), 0) + (needAssembly ? 500 : 0);
  const totalCount = Object.values(selectedParts).filter(p => p !== null).length;

  const handleAddAllToCart = () => {
    Object.values(selectedParts).forEach(product => {
      if (product) {
        const currentQty = cart[product.id] || 0;
        updateCartQuantity(product.id, currentQty + 1);
      }
    });
    if (needAssembly) {
      const assemblyProductId = '42';
      const currentQty = cart[assemblyProductId] || 0;
      updateCartQuantity(assemblyProductId, currentQty + 1);
    }
    window.scrollTo(0, 0);
    navigate('/cart');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: 'calc(100vh - 80px)' }}>
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
            <Wrench size={32} color="var(--primary-color)" />
            <h1 style={{ color: '#fff', fontSize: '32px', fontWeight: 800, margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Конфигуратор ПК
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
            
            {/* Left side: Components */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {BUILD_CATEGORIES.map(category => {
                const selected = selectedParts[category.id];
                
                return (
                  <div key={category.id} style={{
                    backgroundColor: '#111',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    padding: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    transition: 'border-color 0.2s'
                  }}>
                    {/* Category Info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', width: '250px', flexShrink: 0 }}>
                      <div style={{ color: selected ? 'var(--primary-color)' : '#888' }}>
                        {category.icon}
                      </div>
                      <div>
                        <div style={{ color: '#fff', fontSize: '16px', fontWeight: 600 }}>{category.name}</div>
                        {category.required && <div style={{ color: '#888', fontSize: '12px' }}>Обязательно</div>}
                      </div>
                    </div>

                    {/* Selected Product or Empty Slot */}
                    <div style={{ flex: 1 }}>
                      {selected ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }} onClick={() => navigate(`/product/${selected.id}`)}>
                          <img src={selected.images[0]} alt={selected.title} style={{ width: '60px', height: '60px', objectFit: 'contain', backgroundColor: '#fff', borderRadius: '8px', padding: '5px' }} />
                          <div>
                            <div style={{ color: '#fff', fontSize: '15px', fontWeight: 500, marginBottom: '5px' }}>{selected.title}</div>
                            <div style={{ color: 'var(--primary-color)', fontSize: '16px', fontWeight: 700 }}>{selected.price} MDL</div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ color: '#666', fontSize: '14px', fontStyle: 'italic' }}>
                          Компонент не выбран
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {selected ? (
                        <>
                          <button 
                            onClick={() => setActiveCategory({ id: category.id, name: category.name })}
                            style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: 'transparent', border: '1px solid #444', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#888'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#444'}
                          >
                            Заменить
                          </button>
                          <button 
                            onClick={() => handleRemove(category.id)}
                            style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(255, 77, 77, 0.1)', border: '1px solid rgba(255, 77, 77, 0.2)', color: '#ff4d4d', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 77, 77, 0.2)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 77, 77, 0.1)'}
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => setActiveCategory({ id: category.id, name: category.name })}
                          style={{ padding: '10px 20px', borderRadius: '8px', backgroundColor: 'var(--primary-color)', border: 'none', color: '#000', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                          <Plus size={18} /> Выбрать
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right side: Summary */}
            <div style={{ 
              width: '350px', 
              backgroundColor: '#111',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              padding: '30px',
              position: 'sticky',
              top: '100px'
            }}>
              <h2 style={{ color: '#fff', fontSize: '20px', margin: '0 0 20px 0', fontWeight: 700 }}>Итог сборки</h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#888' }}>
                <span style={{ fontSize: '15px' }}>Выбрано компонентов:</span>
                <span style={{ color: '#fff', fontWeight: 600 }}>{totalCount} из {BUILD_CATEGORIES.length}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>Общая сумма:</span>
                <span style={{ color: 'var(--primary-color)', fontSize: '28px', fontWeight: 800 }}>{totalPrice} MDL</span>
              </div>

              <div 
                onClick={() => setNeedAssembly(!needAssembly)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '15px',
                  marginBottom: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-color)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                <input 
                  type="checkbox" 
                  checked={needAssembly} 
                  onChange={() => {}} // handled by div click
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: 'var(--primary-color)',
                    cursor: 'pointer'
                  }} 
                />
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>Сборка компьютера</div>
                  <div style={{ color: '#888', fontSize: '12px' }}>Профессиональный монтаж и тест (+500 MDL)</div>
                </div>
              </div>

              <button 
                onClick={handleAddAllToCart}
                disabled={totalCount === 0}
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '12px',
                  backgroundColor: totalCount > 0 ? 'var(--primary-color)' : '#333',
                  color: totalCount > 0 ? '#000' : '#666',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: totalCount > 0 ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => totalCount > 0 && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => totalCount > 0 && (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <ShoppingCart size={20} />
                Добавить в корзину
              </button>
            </div>
            
          </div>
        </div>
      </section>

      {/* Selector Modal */}
      {activeCategory && (
        <ComponentSelectorModal 
          categoryName={activeCategory.name}
          isOpen={true}
          onClose={() => setActiveCategory(null)}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}
