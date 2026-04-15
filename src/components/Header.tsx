import { Target, Search, ShoppingCart, User, Heart } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-slate-950 border-b border-cyan-900/30 sticky top-0 z-50 antialiased font-sans text-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-6">
        
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-12 h-12 flex items-center justify-center border-2 border-lime-400 rounded-sm bg-black/30 shadow-[0_0_10px_rgba(163,230,53,0.3)]">
            <Target className="text-lime-400 opacity-80" size={28} strokeWidth={1.5} />
            <div className="absolute -inset-1 border border-cyan-400 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-150"></div>
          </div>
          
          <div className="flex flex-col">
            <h1 className="text-4xl font-black tracking-tighter text-white leading-none relative">
              F R
              <span className="relative inline-block text-lime-400 mx-[-0.05em] scale-110">
                A
                <span className="absolute inset-0 text-cyan-400 opacity-60 translate-x-[-1.5px] group-hover:translate-x-[-4px] group-hover:opacity-100 transition-all duration-150 blur-[0.5px]">
                  A
                </span>
                <span className="absolute inset-0 text-red-500 opacity-60 translate-x-[1.5px] group-hover:translate-x-[4px] group-hover:opacity-100 transition-all duration-150 blur-[0.5px]">
                  A
                </span>
                <span className="absolute inset-0 text-white opacity-10 group-hover:animate-pulse group-hover:opacity-30">A</span>
              </span>
              M E
            </h1>
            
            <div className="w-full h-px bg-lime-900 mt-1 mb-0.5 relative overflow-hidden">
                <div className="absolute inset-0 bg-lime-400 w-1/3 animate-glitch-line"></div>
            </div>
            
            <span className="text-[10px] uppercase tracking-[0.4em] text-cyan-300 font-bold opacity-70 group-hover:opacity-100 transition-opacity">
              C Y B E R . H A R D W A R E
            </span>
          </div>
        </div>

        <div className="flex-1 max-w-xl relative group">
          <input 
            type="text" 
            placeholder="Я ищу киберимпланты..." 
            className="w-full bg-slate-900 border border-cyan-900 rounded-lg px-4 py-2.5 pl-12 text-sm text-cyan-100 placeholder:text-cyan-800 focus:ring-1 focus:ring-lime-500 focus:border-lime-500 outline-none transition-all shadow-inner"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-800 group-focus-within:text-lime-500 transition-colors" size={20} />
        </div>

        <div className="flex items-center gap-5 text-cyan-700">
          <button className="flex flex-col items-center gap-1 hover:text-lime-400 transition-colors group">
            <User size={22} className="group-hover:animate-pulse" />
            <span className="text-xs font-semibold tracking-wide">Профиль</span>
          </button>
          
          <button className="flex flex-col items-center gap-1 hover:text-red-500 transition-colors group relative">
            <Heart size={22} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold tracking-wide">Желания</span>
          </button>
          
          <div className="w-px h-10 bg-cyan-950"></div>
          
          <button className="flex flex-col items-center gap-1 text-white bg-lime-500 hover:bg-lime-600 px-5 py-2.5 rounded-lg shadow-lg shadow-lime-500/10 transition-all active:scale-95 group relative overflow-hidden">
            <div className="flex items-center gap-2">
              <ShoppingCart size={22} className="group-hover:animate-bounce" />
              <span className="font-bold text-sm text-slate-950">КОРЗИНА</span>
            </div>
            <span className="absolute -top-1.5 -right-1.5 bg-black text-lime-400 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-lime-500 shadow-lg">0</span>
          </button>
        </div>
      </div>
    </header>
  );
};