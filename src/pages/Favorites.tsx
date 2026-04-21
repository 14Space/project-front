import { useState, useMemo } from 'react';
import { Heart, ShoppingCart, ArrowUpDown, Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const MOCK_FAVORITES = [
  {
    id: 1,
    name: 'Игровой ПК FRAME Pro G1',
    price: 145000,
    category: 'computers',
    image: 'https://via.placeholder.com/300x300.png?text=PC',
    popularity: 98,
    discount: 10,
    isNew: true,
    dateAdded: '2024-03-20'
  },
  {
    id: 2,
    name: 'Монитор MSI Optix 27"',
    price: 32000,
    category: 'monitors',
    image: 'https://via.placeholder.com/300x300.png?text=Monitor',
    popularity: 85,
    discount: 0,
    isNew: false,
    dateAdded: '2024-02-15'
  },
  {
    id: 3,
    name: 'iPhone 15 Pro Max 256GB',
    price: 24500,
    category: 'smartphones',
    image: 'https://via.placeholder.com/300x300.png?text=iPhone',
    popularity: 100,
    discount: 5,
    isNew: true,
    dateAdded: '2024-03-28'
  },
  {
    id: 4,
    name: 'MacBook Pro 14 M3',
    price: 42000,
    category: 'laptops',
    image: 'https://via.placeholder.com/300x300.png?text=MacBook',
    popularity: 95,
    discount: 0,
    isNew: true,
    dateAdded: '2024-03-10'
  },
  {
    id: 5,
    name: 'Видеокарта RTX 4090',
    price: 38500,
    category: 'components',
    image: 'https://via.placeholder.com/300x300.png?text=GPU',
    popularity: 90,
    discount: 8,
    isNew: false,
    dateAdded: '2024-01-15'
  },
  {
    id: 6,
    name: 'AirPods Max',
    price: 11500,
    category: 'audio',
    image: 'https://via.placeholder.com/300x300.png?text=AirPods',
    popularity: 88,
    discount: 12,
    isNew: false,
    dateAdded: '2024-02-01'
  }
];

export default function Favorites() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price-desc');

  const categories = [
    { id: 'all', label: 'Все' },
    { id: 'computers', label: 'Компьютеры' },
    { id: 'laptops', label: 'Ноутбуки' },
    { id: 'components', label: 'Комплектующие для ПК' },
    { id: 'monitors', label: 'Мониторы' },
    { id: 'peripherals', label: 'Периферия' },
    { id: 'gaming', label: 'Консольный гейминг' },
    { id: 'network', label: 'Сетевое оборудование' },
    { id: 'furniture', label: 'Мебель и аксессуары' },
    { id: 'merch', label: 'Мерч и подарки' },
    { id: 'services', label: 'Услуги' }
  ];

  const sortedAndFilteredItems = useMemo(() => {
    let result = [...MOCK_FAVORITES];

    // Category Filter
    if (activeCategory !== 'all') {
      result = result.filter(item => item.category === activeCategory);
    }

    // Sorting Logic
    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-desc':
          return b.price - a.price;
        case 'price-asc':
          return a.price - b.price;
        case 'popularity':
          return b.popularity - a.popularity;
        case 'discount':
          return b.discount - a.discount;
        case 'new':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [activeCategory, sortBy]);

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: 'calc(100vh - 80px)', color: '#fff' }}>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        
        {/* Title */}
        <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Heart size={32} style={{ color: 'var(--primary-color)' }} fill="var(--primary-color)" />
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '1px'
          }}>
            {t('common.favorites', 'Избранное')}
          </h1>
        </div>

        {/* Controls Bar */}
        <div style={{ 
          backgroundColor: 'var(--card-bg)', 
          padding: '24px 30px', 
          borderRadius: '24px', 
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {/* Categories Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{ 
                  padding: '10px 20px', 
                  borderRadius: '12px', 
                  fontSize: '14px', 
                  fontWeight: 600,
                  backgroundColor: activeCategory === cat.id ? 'var(--primary-color)' : 'var(--bg-color)',
                  color: activeCategory === cat.id ? '#000' : 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.2s',
                  minWidth: '110px'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'var(--border-color)', opacity: 0.5 }}></div>

          {/* Sorting Row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <ArrowUpDown size={14} /> Сортировка:
            </div>
            
            {[
              { id: 'price-desc', label: 'Сначала дорогие' },
              { id: 'price-asc', label: 'Сначала дешевые' },
              { id: 'popularity', label: 'Популярные' },
              { id: 'new', label: 'Новинки' },
              { id: 'discount', label: 'Со скидкой' }
            ].map(sort => (
              <button
                key={sort.id}
                onClick={() => setSortBy(sort.id)}
                style={{
                  fontSize: '13px',
                  fontWeight: sortBy === sort.id ? 700 : 500,
                  color: sortBy === sort.id ? 'var(--primary-color)' : 'var(--text-secondary)',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  padding: '6px 16px',
                  borderRadius: '8px',
                  border: sortBy === sort.id ? '1px solid var(--primary-color)' : '1px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                {sort.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '24px' 
        }}>
          {sortedAndFilteredItems.map(item => (
            <div key={item.id} style={{ 
              backgroundColor: 'var(--card-bg)', 
              borderRadius: '24px', 
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, border-color 0.3s ease',
              position: 'relative'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(166, 206, 57, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              {/* Badges */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 5 }}>
                {item.isNew && (
                  <div style={{ backgroundColor: 'var(--primary-color)', color: '#000', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>NEW</div>
                )}
                {item.discount > 0 && (
                  <div style={{ backgroundColor: '#ff4d4d', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>-{item.discount}%</div>
                )}
              </div>

              <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 5, display: 'flex', gap: '8px' }}>
                <button style={{ 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: 'rgba(0,0,0,0.5)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.2s'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--primary-color)';
                    e.currentTarget.style.borderColor = 'rgba(166, 206, 57, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <Scale size={18} />
                </button>
                <button style={{ 
                  width: '40px', 
                  height: '40px', 
                  backgroundColor: 'rgba(0,0,0,0.5)', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#ff4d4d',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <Heart size={20} fill="#ff4d4d" />
                </button>
              </div>

              <div style={{ height: '220px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={item.image} alt={item.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
              </div>

              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--primary-color)', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase' }}>
                  {item.category}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', height: '40px', overflow: 'hidden', lineHeight: '1.4' }}>
                  {item.name}
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {item.discount > 0 && (
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textDecoration: 'line-through', marginBottom: '2px' }}>
                        {(item.price * (1 + item.discount/100)).toLocaleString()} MDL
                      </span>
                    )}
                    <div style={{ fontSize: '20px', fontWeight: 800 }}>
                      {item.price.toLocaleString()} MDL
                    </div>
                  </div>
                  <button className="btn-primary" style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '12px', 
                    padding: 0,
                    boxShadow: '0 4px 12px rgba(166, 206, 57, 0.2)'
                  }}>
                    <ShoppingCart size={20} />
                  </button>


                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
