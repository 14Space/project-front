import React from 'react';
import ProductCard from './ProductCard';

interface ProductGridProps {
  sidebar?: React.ReactNode;
  products?: any[];
  isLoading?: boolean;
}

export default function ProductGrid({ sidebar, products = [], isLoading = false }: ProductGridProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 3fr',
      gap: '20px',
      margin: '0',
      alignItems: 'start'
    }}>
      {/* Левая колонка — Фильтры */}
      <div style={{ position: 'sticky', top: '20px' }}>
        {sidebar}
      </div>

      {/* Сетка карточек — 3 в ряд */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '50px', color: '#888' }}>Загрузка товаров...</div>
      ) : (
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
      )}
    </div>
  );
}
