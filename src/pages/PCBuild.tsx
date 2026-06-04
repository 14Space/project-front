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
  ShoppingCart,
  Check
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useCategoryProducts } from '../hooks/useCategoryProducts';
import type { Product } from '../data/mockProducts';

const formatPrice = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const BUILD_CATEGORIES = [
  { id: 'cpu',         name: 'Процессоры',          icon: <Cpu size={22} />,         required: true  },
  { id: 'motherboard', name: 'Материнские платы',    icon: <CircuitBoard size={22} />, required: true  },
  { id: 'ram',         name: 'Оперативная память',   icon: <MemoryStick size={22} />, required: true  },
  { id: 'gpu',         name: 'Видеокарты',           icon: <Monitor size={22} />,     required: false },
  { id: 'cooling',     name: 'Охлаждение',           icon: <Fan size={22} />,         required: true  },
  { id: 'storage',     name: 'Дисковые накопители',  icon: <HardDrive size={22} />,   required: true  },
  { id: 'cases',       name: 'Корпуса',              icon: <Box size={22} />,         required: true  },
  { id: 'psu',         name: 'Блоки питания',        icon: <Zap size={22} />,         required: true  },
];

/* ─── Modal ─────────────────────────────────────────────────────────────── */
const ComponentSelectorModal = ({
  categoryName,
  isOpen,
  onClose,
  onSelect,
}: {
  categoryName: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (product: Product) => void;
}) => {
  const { products, isLoading, error } = useCategoryProducts(categoryName);
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2000, padding: '20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: '16px',
          width: '100%', maxWidth: '760px',
          maxHeight: '82vh',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: 'var(--text-color)' }}>
            Выберите: {categoryName}
          </h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px', display: 'flex' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-color)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          {isLoading && (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px 0' }}>Загрузка товаров...</p>
          )}
          {error && (
            <p style={{ color: '#ff4d4d', textAlign: 'center', padding: '40px 0' }}>{error}</p>
          )}
          {!isLoading && !error && products.length === 0 && (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px 0' }}>
              Нет товаров в данной категории
            </p>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {products.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'flex', gap: '16px', alignItems: 'center',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--primary-color)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
              >
                <img
                  src={p.images[0]}
                  alt={p.title}
                  style={{ width: '72px', height: '72px', objectFit: 'contain', backgroundColor: '#fff', borderRadius: '8px', padding: '4px', flexShrink: 0 }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: 'var(--text-color)', fontSize: '15px', fontWeight: 600, marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.title}
                  </div>
                  <div style={{ color: '#fff', fontSize: '17px', fontWeight: 700 }}>
                    {formatPrice(p.price)} MDL
                  </div>
                </div>
                <button
                  onClick={() => onSelect(p)}
                  style={{
                    padding: '9px 20px', borderRadius: '8px',
                    backgroundColor: 'var(--primary-color)',
                    color: '#000', border: 'none',
                    fontWeight: 600, fontSize: '14px', cursor: 'pointer',
                    flexShrink: 0, transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
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

/* ─── Main page ──────────────────────────────────────────────────────────── */
export default function PCBuild() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateCartQuantity, cart } = useAppContext();

  const [selectedParts, setSelectedParts] = useState<Record<string, Product | null>>({});
  const [activeCategory, setActiveCategory] = useState<{ id: string; name: string } | null>(null);
  const [needAssembly, setNeedAssembly] = useState(false);

  const handleSelect = (product: Product) => {
    if (activeCategory) {
      setSelectedParts((prev) => ({ ...prev, [activeCategory.id]: product }));
      setActiveCategory(null);
    }
  };

  const handleRemove = (id: string) => {
    setSelectedParts((prev) => ({ ...prev, [id]: null }));
  };

  const selectedList = Object.values(selectedParts).filter(Boolean) as Product[];
  const totalCount = selectedList.length;
  const totalPrice =
    selectedList.reduce((s, p) => s + p.price, 0) + (needAssembly ? 500 : 0);

  const handleAddAllToCart = () => {
    selectedList.forEach((product) => {
      updateCartQuantity(product.id, (cart[product.id] || 0) + 1);
    });
    if (needAssembly) {
      const id = '42';
      updateCartQuantity(id, (cart[id] || 0) + 1);
    }
    window.scrollTo(0, 0);
    navigate('/cart');
  };

  const requiredDone = BUILD_CATEGORIES.filter((c) => c.required).every(
    (c) => selectedParts[c.id]
  );

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: '10px', paddingBottom: '40px' }}>

        {/* Page title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <Wrench size={26} color="var(--primary-color)" />
          <h1 className="title" style={{ margin: 0 }}>Сборка ПК</h1>
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

          {/* ── Component list ── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0 }}>
            {BUILD_CATEGORIES.map((category) => {
              const selected = selectedParts[category.id] ?? null;
              return (
                <div
                  key={category.id}
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    borderRadius: '12px',
                    border: `1px solid ${selected ? 'var(--primary-color)' : 'var(--border-color)'}`,
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'border-color 0.2s',
                  }}
                >
                  {/* Icon + label */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '220px', flexShrink: 0 }}>
                    <div style={{ color: selected ? 'var(--primary-color)' : 'var(--text-secondary)' }}>
                      {category.icon}
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-color)', fontSize: '15px', fontWeight: 600, lineHeight: 1.3 }}>
                        {category.name}
                      </div>
                      <div style={{ fontSize: '12px', color: category.required ? 'var(--text-secondary)' : '#555', marginTop: '2px' }}>
                        {category.required ? 'Обязательно' : 'Опционально'}
                      </div>
                    </div>
                  </div>

                  {/* Selected product or placeholder */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {selected ? (
                      <div
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                        onClick={() => navigate(`/product/${selected.id}`)}
                      >
                        <img
                          src={selected.images[0]}
                          alt={selected.title}
                          style={{ width: '52px', height: '52px', objectFit: 'contain', backgroundColor: '#fff', borderRadius: '8px', padding: '4px', flexShrink: 0 }}
                        />
                        <div style={{ minWidth: 0 }}>
                          <div style={{ color: 'var(--text-color)', fontSize: '14px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {selected.title}
                          </div>
                          <div style={{ color: '#fff', fontSize: '15px', fontWeight: 700, marginTop: '2px' }}>
                            {formatPrice(selected.price)} MDL
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span style={{ color: '#555', fontSize: '14px' }}>Компонент не выбран</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    {selected ? (
                      <>
                        <button
                          onClick={() => setActiveCategory({ id: category.id, name: category.name })}
                          style={{
                            padding: '8px 14px', borderRadius: '8px',
                            backgroundColor: 'transparent',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-color)',
                            fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                            transition: 'border-color 0.2s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--text-secondary)')}
                          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
                        >
                          Заменить
                        </button>
                        <button
                          onClick={() => handleRemove(category.id)}
                          style={{
                            padding: '8px', borderRadius: '8px',
                            backgroundColor: 'rgba(255,77,77,0.08)',
                            border: '1px solid rgba(255,77,77,0.2)',
                            color: '#ff4d4d', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'background-color 0.2s',
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,77,77,0.18)')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,77,77,0.08)')}
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setActiveCategory({ id: category.id, name: category.name })}
                        style={{
                          padding: '9px 18px', borderRadius: '8px',
                          backgroundColor: 'var(--primary-color)',
                          border: 'none', color: '#000',
                          fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                          display: 'flex', alignItems: 'center', gap: '6px',
                          transition: 'opacity 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        <Plus size={16} /> Выбрать
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Summary sidebar ── */}
          <div style={{
            width: '320px', flexShrink: 0,
            backgroundColor: 'var(--card-bg)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            padding: '24px',
            position: 'sticky', top: '20px',
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 20px 0', color: 'var(--text-color)' }}>
              Итог сборки
            </h2>

            {/* Progress */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Компонентов выбрано</span>
                <span style={{ fontSize: '13px', color: 'var(--text-color)', fontWeight: 600 }}>
                  {totalCount} / {BUILD_CATEGORIES.length}
                </span>
              </div>
              <div style={{ height: '4px', borderRadius: '4px', backgroundColor: 'var(--border-color)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: '4px',
                  backgroundColor: 'var(--primary-color)',
                  width: `${(totalCount / BUILD_CATEGORIES.length) * 100}%`,
                  transition: 'width 0.3s ease',
                }} />
              </div>
            </div>

            {/* Selected items list */}
            {totalCount > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {BUILD_CATEGORIES.filter((c) => selectedParts[c.id]).map((c) => {
                  const p = selectedParts[c.id]!;
                  return (
                    <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                        {p.title}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-color)', flexShrink: 0 }}>
                        {formatPrice(p.price)} MDL
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-color)' }}>Итого</span>
                <span style={{ fontSize: '24px', fontWeight: 700, color: '#fff' }}>
                  {formatPrice(totalPrice)} MDL
                </span>
              </div>
            </div>

            {/* Assembly checkbox */}
            <div
              onClick={() => setNeedAssembly(!needAssembly)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                border: `1px solid ${needAssembly ? 'var(--primary-color)' : 'var(--border-color)'}`,
                borderRadius: '10px',
                padding: '12px 14px',
                marginBottom: '16px',
                cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => !needAssembly && (e.currentTarget.style.borderColor = 'var(--text-secondary)')}
              onMouseLeave={(e) => !needAssembly && (e.currentTarget.style.borderColor = 'var(--border-color)')}
            >
              <div style={{
                width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0,
                backgroundColor: needAssembly ? 'var(--primary-color)' : 'transparent',
                border: `1px solid ${needAssembly ? 'var(--primary-color)' : 'var(--border-color)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}>
                {needAssembly && <Check size={13} color="#000" strokeWidth={3} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-color)' }}>
                  Сборка компьютера
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Профессиональный монтаж и тест (+500 MDL)
                </div>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddAllToCart}
              disabled={totalCount === 0}
              style={{
                width: '100%', padding: '14px',
                borderRadius: '10px',
                backgroundColor: totalCount > 0 ? 'var(--primary-color)' : 'var(--border-color)',
                color: totalCount > 0 ? '#000' : 'var(--text-secondary)',
                border: 'none', fontSize: '15px', fontWeight: 700,
                cursor: totalCount > 0 ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => totalCount > 0 && (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => totalCount > 0 && (e.currentTarget.style.opacity = '1')}
            >
              <ShoppingCart size={18} />
              Добавить в корзину
            </button>

            {!requiredDone && totalCount > 0 && (
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '10px' }}>
                Не выбраны обязательные компоненты
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeCategory && (
        <ComponentSelectorModal
          categoryName={activeCategory.name}
          isOpen
          onClose={() => setActiveCategory(null)}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}
