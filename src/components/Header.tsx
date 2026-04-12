import { Search, User, Heart, ShoppingCart, Menu } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Логотип */}
        <div className="flex items-center gap-2 font-bold text-2xl text-gray-800 cursor-pointer">
          <div className="bg-lime-500 text-white p-1 rounded-lg">TM</div>
          <span>TELEMART</span>
        </div>

        {/* Кнопка Каталог */}
        <button className="bg-lime-500 hover:bg-lime-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
          <Menu size={20} />
          Каталог
        </button>

        {/* Поиск */}
        <div className="flex-1 max-w-xl relative">
          <input 
            type="text" 
            placeholder="Я хочу найти..." 
            className="w-full bg-gray-100 border-none rounded-lg py-2 px-4 focus:ring-2 focus:ring-lime-500 outline-none"
          />
          <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
        </div>

        {/* Иконки пользователя */}
        <div className="flex items-center gap-6 text-gray-600">
          <div className="flex flex-col items-center cursor-pointer hover:text-lime-600 transition-colors">
            <User size={24} />
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-lime-600 transition-colors">
            <Heart size={24} />
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-lime-600 transition-colors relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </div>
        </div>

      </div>
    </header>
  );
};