export interface Product {
  id: string;
  code: string;
  title: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  specs: string[];
  images: string[];
  category: string;
  subcategory: string;
  rawAttributes?: { attributeId: number; attributeName: string; value: string }[];
}

export const MOCK_COMPUTERS: Product[] = [
  {
    id: 'pc-1',
    code: '100101',
    title: 'Игровой компьютер FRAME Gaming Elite v1 (RTX 5090, i9-14900K)',
    price: 85999,
    oldPrice: 92499,
    inStock: true,
    specs: ['NVIDIA GeForce RTX 5090 24GB', 'Intel Core i9-14900K', '64GB DDR5 6000MHz', '2TB NVMe Gen5 SSD'],
    images: ['/subcategories/SUBCATEGORIES-gaming-pcs.png'],
    category: 'computers',
    subcategory: 'Игровые'
  },
  {
    id: 'pc-2',
    code: '100102',
    title: 'Компактный Мини-ПК FRAME Nano X (Ryzen 7, 32GB RAM)',
    price: 18499,
    inStock: true,
    specs: ['AMD Ryzen 7 7840HS', 'Radeon 780M Graphics', '32GB DDR5 RAM', '1TB SSD'],
    images: ['/subcategories/SUBCATEGORIES-mini-pcs.png'],
    category: 'computers',
    subcategory: 'Мини-ПК'
  },
  {
    id: 'pc-3',
    code: '100103',
    title: 'Моноблок FRAME Vision 27" 4K (i7-13700, 16GB)',
    price: 24599,
    oldPrice: 26999,
    inStock: true,
    specs: ['27" 4K IPS Display', 'Intel Core i7-13700', '16GB RAM', '512GB SSD + 1TB HDD'],
    images: ['/subcategories/SUBCATEGORIES-all-in-one computer.png'],
    category: 'computers',
    subcategory: 'Моноблоки'
  },
  {
    id: 'pc-4',
    code: '100104',
    title: 'Рабочая станция FRAME Studio Pro (RTX A4000, Threadripper)',
    price: 112999,
    inStock: true,
    specs: ['NVIDIA RTX A4000 16GB', 'AMD Ryzen Threadripper 7960X', '128GB DDR5 ECC', '4TB Raid SSD'],
    images: ['/subcategories/SUBCATEGORIES-workstations.png'],
    category: 'computers',
    subcategory: 'Рабочие станции'
  },
  {
    id: 'pc-5',
    code: '100105',
    title: 'Игровой ПК FRAME Gaming Plus (RTX 5070, i7-14700)',
    price: 38999,
    oldPrice: 41500,
    inStock: true,
    specs: ['NVIDIA GeForce RTX 5070 12GB', 'Intel Core i7-14700', '32GB DDR5', '1TB NVMe SSD'],
    images: ['/subcategories/SUBCATEGORIES-gaming-pcs.png'],
    category: 'computers',
    subcategory: 'Игровые'
  },
  {
    id: 'pc-6',
    code: '100106',
    title: 'Мини-ПК FRAME Office Cube (i5-12400, 16GB)',
    price: 9899,
    inStock: false,
    specs: ['Intel Core i5-12400', 'Intel UHD Graphics 730', '16GB RAM', '512GB SSD'],
    images: ['/subcategories/SUBCATEGORIES-mini-pcs.png'],
    category: 'computers',
    subcategory: 'Мини-ПК'
  }
];

export const MOCK_LAPTOPS: Product[] = [
  {
    id: 'lap-1',
    code: '200101',
    title: 'Игровой ноутбук ASUS ROG Strix SCAR 18 (RTX 4090, i9-13980HX)',
    price: 45999,
    oldPrice: 49999,
    inStock: true,
    specs: ['18" QHD+ 240Hz', 'NVIDIA RTX 4090 16GB', 'Intel Core i9-13980HX', '32GB DDR5', '2TB SSD'],
    images: ['/subcategories/SUBCATEGORIES-gaming-laptops.png'],
    category: 'laptops',
    subcategory: 'Игровые'
  },
  {
    id: 'lap-2',
    code: '200102',
    title: 'Apple MacBook Pro 14" M3 Max (14-core CPU, 30-core GPU)',
    price: 62999,
    inStock: true,
    specs: ['14.2" Liquid Retina XDR', 'Apple M3 Max chip', '36GB Unified Memory', '1TB SSD'],
    images: ['/subcategories/SUBCATEGORIES-macbook.png'],
    category: 'laptops',
    subcategory: 'MacBook'
  },
  {
    id: 'lap-3',
    code: '200103',
    title: 'Ноутбук Lenovo IdeaPad Slim 3 (Ryzen 5, 16GB, 512GB)',
    price: 12499,
    oldPrice: 13999,
    inStock: true,
    specs: ['15.6" FHD IPS', 'AMD Ryzen 5 7530U', '16GB DDR4', '512GB SSD'],
    images: ['/subcategories/SUBCATEGORIES-for-study.png'],
    category: 'laptops',
    subcategory: 'Для учёбы'
  },
  {
    id: 'lap-4',
    code: '200104',
    title: 'Игровой ноутбук MSI Raider GE78 (RTX 4080, i7-13700HX)',
    price: 34999,
    inStock: true,
    specs: ['17" QHD+ 240Hz', 'NVIDIA RTX 4080 12GB', 'Intel Core i7-13700HX', '32GB RAM', '1TB SSD'],
    images: ['/subcategories/SUBCATEGORIES-gaming-laptops.png'],
    category: 'laptops',
    subcategory: 'Игровые'
  },
  {
    id: 'lap-5',
    code: '200105',
    title: 'Apple MacBook Air 13" M2 (8-core CPU, 8-core GPU)',
    price: 22999,
    oldPrice: 24500,
    inStock: true,
    specs: ['13.6" Liquid Retina', 'Apple M2 chip', '8GB RAM', '256GB SSD'],
    images: ['/subcategories/SUBCATEGORIES-macbook.png'],
    category: 'laptops',
    subcategory: 'MacBook'
  }
];
