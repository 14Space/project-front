import { ShoppingCart, Heart, Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  image: string;
  title: string;
  code: string;
  oldPrice?: number;
  price: number;
  status: string;
}

export default function ProductCard({ image, title, code, oldPrice, price, status }: ProductCardProps) {
  const { t } = useTranslation();
  return (
    <div style={{ 
      backgroundColor: 'var(--card-bg)', 
      borderRadius: '8px', 
      padding: '20px', 
      border: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      position: 'relative',
      transition: 'box-shadow 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'}
    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button style={{ color: '#999' }}><Scale size={20} /></button>
        <button style={{ color: '#999' }}><Heart size={20} /></button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', height: '180px' }}>
        <img src={image} alt={title} style={{ objectFit: 'contain', height: '100%', maxWidth: '100%' }} />
      </div>
      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{t('common.productCode')}: {code}</div>
      <div style={{ fontSize: '14px', fontWeight: 500, lineHeight: '1.4', height: '40px', overflow: 'hidden' }}>{title}</div>
      
      <div style={{ fontWeight: 600, fontSize: '14px', color: status === 'В наличии' ? '#A6CE39' : '#888' }}>{status}</div>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {oldPrice && <span style={{ textDecoration: 'line-through', color: 'var(--text-secondary)', fontSize: '14px' }}>{oldPrice} MDL</span>}
          <span style={{ fontSize: '24px', fontWeight: 700 }}>{price} MDL</span>
        </div>
        <button style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: '#A6CE39', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <ShoppingCart size={24} />
        </button>
      </div>
    </div>
  );
}
