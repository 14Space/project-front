// Defines which 5 attribute names to show on product card hover, per category.
// Names must exactly match the attribute names stored in the database.
export const CATEGORY_CARD_SPECS: Record<string, string[]> = {
  'Компьютеры': [
    'Процессор / Processor',
    'Видеокарта / Graphics Card',
    'Оперативная память / RAM Capacity',
    'Объём SSD / SSD Capacity',
    'Предустановленная ОС / Pre-installed OS',
  ],
  'Ноутбуки': [
    'Диагональ экрана / Screen Diagonal',
    'Процессор / Processor',
    'Видеокарта / Graphics Card',
    'Объём оперативной памяти / RAM Capacity',
    'Объём SSD / SSD Capacity',
  ],
  'Процессоры': [
    'Количество ядер / Core Count',
    'Количество потоков / Thread Count',
    'Сокет / Socket',
    'L3 Кэш / L3 Cache',
    'Тепловыделение TDP / TDP',
  ],
  'Видеокарты': [
    'Серия / Series',
    'Объём памяти видеоадаптера / VRAM Capacity',
    'Тип памяти / Memory Type',
    'Шина / Memory Bus',
    'Длина / Length',
  ],
  'Материнские платы': [
    'Разъём / Socket',
    'Форм-фактор / Form Factor',
    'Тип и слоты ОЗУ / RAM Type and Slots',
    'Разъёмов M.2 / M.2 Slots',
    'Разъёмов SATA 3 / SATA 3 Ports',
  ],
  'Оперативная память': [
    'Тип / Type',
    'Объём памяти / Memory Capacity',
    'Скорость / Speed',
    'Форм-фактор / Form Factor',
    'Ранг памяти / Memory Rank',
  ],
  'Дисковые накопители': [
    'Тип накопителя / Drive Type',
    'Объём накопителя / Storage Capacity',
    'Форм-фактор / Form Factor',
    'Скорость чтения / Reading speed',
    'Скорость записи / Write speed',
  ],
  'Корпуса': [
    'Тип МП / Motherboard Support',
    'Форм Фактор / Form Factor',
    'Цвет корпуса / Case Color',
    'Блок питания / Power Supply',
    'Предустановлено вентиляторов / Pre-installed Fans',
  ],
  'Охлаждение': [
    'Тип / Type',
    'Назначение / Purpose',
    'Сокет / Socket',
    'Диаметр вентилятора / Fan Diameter',
    'Максимальный TDP / Maximum TDP',
  ],
  'Блоки питания': [
    'Мощность / Power',
    'Форм-фактор / Form Factor',
    'Сертификат 80PLUS / 80PLUS Certificate',
    'Система кабелей / Cable System',
    'Питание видеокарты / GPU Power Connectors',
  ],
};
