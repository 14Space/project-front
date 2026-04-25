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
    title: 'Видеокарта Gigabyte GeForce RTX 4060 Ti WINDFORCE OC 8G', 
    price: 16999, 
    oldPrice: 18599, 
    inStock: true,
    category: 'gpu',
    specs: [
      'Объём памяти: 8 ГБ',
      'Тип памяти: GDDR6',
      'Шина памяти: 128 бит',
      'Частота видеопамяти: 18000 МГц'
    ],
    images: ['402123-01.png', '402123-02.png', '402123-03.png'],
    rating: 4.8,
    reviewsCount: 12
  },
  { 
    id: '392011', 
    code: '392011',
    title: 'Процессор AMD Ryzen 5 5600X 3.7(4.6)GHz', 
    price: 6199, 
    oldPrice: 6999, 
    inStock: true,
    category: 'cpu',
    specs: [
      'Ядер / Потоков: 6 / 12',
      'Частота: 3.7 (4.6) ГГц',
      'Кэш: 32 МБ L3',
      'TDP: 65 Вт'
    ],
    images: ['392011-01.png'],
    rating: 4.9,
    reviewsCount: 45
  },
  { 
    id: '310928', 
    code: '310928',
    title: 'Материнская плата Asus TUF GAMING B550-PLUS', 
    price: 5499, 
    oldPrice: 6299, 
    inStock: true,
    category: 'mb',
    specs: [
      'Сокет: AM4',
      'Чипсет: AMD B550',
      'Форм-фактор: ATX',
      'Слоты памяти: 4 x DDR4'
    ],
    images: ['310928-01.png'],
    rating: 4.7,
    reviewsCount: 8
  },
  { 
    id: '445901', 
    code: '445901',
    title: 'Ноутбук Lenovo IdeaPad Gaming 3 15ACH6', 
    price: 29999, 
    oldPrice: 33999, 
    inStock: true,
    category: 'laptop',
    specs: [
      'Процессор: Ryzen 5 5600H',
      'ОЗУ: 16 ГБ RAM',
      'Накопитель: 512 ГБ SSD',
      'Видеокарта: RTX 3050'
    ],
    images: ['445901-01.png'],
    rating: 4.5,
    reviewsCount: 21
  },
];
