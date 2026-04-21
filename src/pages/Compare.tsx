import { useState } from 'react';
import { Scale, ShoppingCart, Trash2, X, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const MOCK_COMPARE = [
  {
    id: 1,
    name: 'Игровой ПК FRAME Pro G1',
    price: 145000,
    image: 'https://via.placeholder.com/200x200.png?text=PC+G1',
    specs: {
      'Процессор': 'Intel Core i9-14900K',
      'Видеокарта': 'NVIDIA RTX 4090 24GB',
      'Оперативная память': '64GB DDR5',
      'Накопитель': '2TB NVMe SSD',
      'Охлаждение': 'Жидкостное 360мм'
    }
  },
  {
    id: 2,
    name: 'Игровой ПК FRAME Elite E2',
    price: 98000,
    image: 'https://via.placeholder.com/200x200.png?text=PC+E2',
    specs: {
      'Процессор': 'Intel Core i7-14700K',
      'Видеокарта': 'NVIDIA RTX 4070 Ti',
      'Оперативная память': '32GB DDR5',
      'Накопитель': '1TB NVMe SSD',
      'Охлаждение': 'Воздушное башня'
    }
  }
];

export default function Compare() {
  const { t } = useTranslation();
  
  // Extract all unique spec keys
  const allSpecKeys = Array.from(new Set(
    MOCK_COMPARE.flatMap(item => Object.keys(item.specs))
  ));

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: 'calc(100vh - 80px)', color: '#fff' }}>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        
        {/* Title */}
        <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Scale size={32} style={{ color: 'var(--primary-color)' }} />
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '1px'
          }}>
            {t('common.compare', 'Сравнение')}
          </h1>
        </div>

        {MOCK_COMPARE.length > 0 ? (
          <div style={{ 
            overflowX: 'auto', 
            backgroundColor: 'var(--card-bg)', 
            borderRadius: '28px', 
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr>
                  <th style={{ width: '250px', padding: '32px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500 }}>
                      Сравниваем {MOCK_COMPARE.length} товара
                    </div>
                  </th>
                  {MOCK_COMPARE.map(item => (
                    <th key={item.id} style={{ padding: '32px', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
                      <button style={{ 
                        position: 'absolute', 
                        top: '16px', 
                        right: '16px', 
                        color: 'var(--text-secondary)',
                        transition: 'color 0.2s'
                      }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ff4d4d')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                      >
                        <X size={20} />
                      </button>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                        <div style={{ width: '140px', height: '140px', backgroundColor: '#fff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                          <img src={item.image} alt={item.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', height: '40px', overflow: 'hidden' }}>{item.name}</h3>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '16px' }}>
                          {item.price.toLocaleString()} MDL
                        </div>
                        <button className="btn-primary" style={{ height: '40px', padding: '0 20px', fontSize: '14px', borderRadius: '10px' }}>
                          <ShoppingCart size={18} style={{ marginRight: '8px' }} /> В корзину
                        </button>
                      </div>
                    </th>
                  ))}
                  {/* Empty Slot to add more */}
                  <th style={{ padding: '32px', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ 
                      height: '240px', 
                      border: '2px dashed var(--border-color)', 
                      borderRadius: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary-color)';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      <Plus size={32} />
                      <span style={{ fontSize: '14px', fontWeight: 600 }}>Добавить товар</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {allSpecKeys.map((key, idx) => (
                  <tr key={key} style={{ backgroundColor: idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                    <td style={{ padding: '20px 32px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600 }}>
                      {key}
                    </td>
                    {MOCK_COMPARE.map(item => (
                      <td key={item.id} style={{ padding: '20px 32px', fontSize: '14px', fontWeight: 500, textAlign: 'center' }}>
                        {item.specs[key as keyof typeof item.specs] || '—'}
                      </td>
                    ))}
                    <td style={{ padding: '20px 32px' }}></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '100px 0',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '28px',
            border: '1px solid var(--border-color)',
            textAlign: 'center'
          }}>
            <Scale size={80} style={{ color: 'var(--border-color)', marginBottom: '24px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#fff' }}>Список сравнения пуст</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: '32px' }}>Добавьте хотя бы два товара, чтобы сравнить их характеристики</p>
            <Link to="/" className="btn-primary" style={{ padding: '0 40px' }}>
              Перейти в каталог
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
