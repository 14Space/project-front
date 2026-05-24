import { useState, useEffect } from 'react';
import { api } from '../api';
import { getImgUrl } from '../utils/image';
import type { Product } from '../data/mockProducts';

export interface CategoryFilterParams {
  categoryId?: number;
  minPrice?: string;
  maxPrice?: string;
  selectedFilters?: Record<number, string[]>;
}

export function useCategoryProducts(categoryName: string, filters?: CategoryFilterParams) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryId = filters?.categoryId;
  const minPrice = filters?.minPrice;
  const maxPrice = filters?.maxPrice;
  const selectedFiltersStr = JSON.stringify(filters?.selectedFilters);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let url = `/Products/filter?CategoryName=${encodeURIComponent(categoryName)}`;
        
        if (categoryId) url += `&CategoryId=${categoryId}`;
        if (minPrice) url += `&MinPrice=${minPrice}`;
        if (maxPrice) url += `&MaxPrice=${maxPrice}`;
        
        if (filters?.selectedFilters) {
          Object.entries(filters.selectedFilters).forEach(([attrId, values]) => {
            values.forEach(val => {
              url += `&Attributes=${attrId}:${encodeURIComponent(val)}`;
            });
          });
        }

        console.log('Fetching products with URL:', url);
        const data = await api.get(url);
        console.log('Received data:', data);
        
        const mapped: Product[] = data.map((p: any) => ({
          id: p.id.toString(),
          code: p.id.toString().padStart(6, '0'),
          title: p.name,
          price: p.price,
          oldPrice: p.oldPrice,
          inStock: p.status === 'InStock' || p.status === 'В наличии' || p.status === 'Available',
          specs: p.attributes ? p.attributes.map((a: any) => `${a.attributeName}: ${a.value}`) : [],
          images: p.images && p.images.length > 0 
            ? p.images.map((img: string) => getImgUrl(img)) 
            : ['/subcategories/SUBCATEGORIES-zaglushka.png'],
          category: p.categoryName?.toLowerCase(),
          subcategory: p.subcategoryName || p.brandName || 'Другое',
          rawAttributes: p.attributeValues || p.attributes || [] // Depending on backend mapping
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
  }, [categoryName, categoryId, minPrice, maxPrice, selectedFiltersStr]);

  return { products, isLoading, error };
}

