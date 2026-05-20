import { useState, useEffect } from 'react';
import { api } from '../api';

export interface Brand {
  id: number;
  name: string;
}

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await api.get('/Brands');
        setBrands(data);
      } catch (err) {
        console.error('Failed to load brands', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBrands();
  }, []);

  return { brands, isLoading };
}
