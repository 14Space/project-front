import React from 'react';
import ProductCard from './ProductCard';

interface ProductGridProps {
  sidebar?: React.ReactNode;
  products?: any[];
}

export default function ProductGrid({ sidebar, products = [] }: ProductGridProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 3fr',
      gap: '20px',
      margin: '0 0 20px',
      alignItems: 'start'
    }}>
      {/* Левая колонка — Фильтры */}
      <div style={{ position: 'sticky', top: '20px' }}>
        {sidebar}
      </div>

      {/* Сетка карточек — 3 в ряд */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px'
      }}>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            id={product.id}
            code={product.code}
            title={product.title}
            price={product.price}
            oldPrice={product.oldPrice}
            inStock={product.inStock}
            specs={product.specs}
            images={product.images}
          />
        ))}
      </div>
    </div>
  );
}
