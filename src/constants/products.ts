export interface Product {
  id: string;
  title: string;
  code: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  category: string;
  specs: string[];
  images: string[];
  rating: number;
  reviewsCount: number;
}

export const HOT_DEALS: Product[] = [
  { 
    id: '402123', 
    code: '402123',
    title: 'products.gpu.title', 
    price: 16999, 
    oldPrice: 18599, 
    inStock: true,
    category: 'gpu',
    specs: [
      'products.gpu.specs.memory',
      'products.gpu.specs.type',
      'products.gpu.specs.bus',
      'products.gpu.specs.freq'
    ],
    images: ['402123-01.png', '402123-02.png', '402123-03.png'],
    rating: 4.8,
    reviewsCount: 12
  },
  { 
    id: '392750', 
    code: '392750',
    title: 'products.cpu.title', 
    price: 6199, 
    oldPrice: 6999, 
    inStock: true,
    category: 'cpu',
    specs: [
      'products.cpu.specs.cores',
      'products.cpu.specs.freq',
      'products.cpu.specs.cache',
      'products.cpu.specs.tdp'
    ],
    images: ['392750-01.png', '392750-02.png'],
    rating: 4.9,
    reviewsCount: 45
  },
  { 
    id: '310928', 
    code: '310928',
    title: 'products.mb.title', 
    price: 5499, 
    oldPrice: 6299, 
    inStock: true,
    category: 'mb',
    specs: [
      'products.mb.specs.socket',
      'products.mb.specs.chipset',
      'products.mb.specs.form',
      'products.mb.specs.memory'
    ],
    images: ['310928-01.png', '310928-02.png', '310928-03.png'],
    rating: 4.7,
    reviewsCount: 8
  },
  { 
    id: '616016', 
    code: '616016',
    title: 'products.laptop.title', 
    price: 38999, 
    oldPrice: 42999, 
    inStock: true,
    category: 'laptop',
    specs: [
      'products.laptop.specs.cpu',
      'products.laptop.specs.gpu',
      'products.laptop.specs.ram',
      'products.laptop.specs.ssd'
    ],
    images: ['616016-01.png'],
    rating: 4.9,
    reviewsCount: 15
  },
];
