import { useState, useEffect } from 'react';
import { api } from '../api';
import type { Product } from '../data/mockProducts';

export function useCategoryProducts(categoryName: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await api.get('/Products');
        const mapped: Product[] = data
          // We filter on frontend for now, or use `?CategoryId=` if backend supports mapping names to IDs easily
          .filter((p: any) => 
            p.categoryName?.toLowerCase() === categoryName.toLowerCase() || 
            categoryName === 'all'
          )
          .map((p: any) => ({
            id: p.id.toString(),
            code: p.id.toString().padStart(6, '0'),
            title: p.name,
            price: p.price,
            oldPrice: p.oldPrice,
            inStock: p.status === 'InStock' || p.status === 'В наличии',
            specs: p.attributes ? p.attributes.map((a: any) => `${a.attributeName}: ${a.value}`) : [],
            images: p.images?.length > 0 ? p.images.map((img: any) => img.url) : ['/subcategories/default-product.png'],
            category: p.categoryName?.toLowerCase(),
            subcategory: p.subcategoryName || p.brandName || 'Другое'
          }));
        setProducts(mapped);
      } catch (err: any) {
        console.error(`Failed to load products for category ${categoryName}`, err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  return { products, isLoading, error };
}
