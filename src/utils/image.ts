import { API_BASE_URL } from '../api';

const BACKEND_URL = API_BASE_URL.replace('/api', '');

export const getImgUrl = (url?: string): string => {
  if (!url) return '/subcategories/SUBCATEGORIES-zaglushka.png';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/images/')) return `${BACKEND_URL}${url}`;
  if (url.startsWith('/')) return url;
  return `/products/${url}`;
};
