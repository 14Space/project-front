import { Header } from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Подключаем нашу шапку */}
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Большой баннер */}
        <div className="w-full h-80 bg-slate-900 rounded-3xl mb-12 flex items-center justify-center text-white overflow-hidden relative shadow-xl">
           <img 
            src="https://img.freepik.com/free-photo/view-illuminated-neon-gaming-keyboard-setup_23-2149529350.jpg" 
            className="w-full h-full object-cover opacity-40"
            alt="Gaming Banner"
           />
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-5xl font-black mb-4 tracking-tight">ТОПОВОЕ ЖЕЛЕЗО</h2>
              <p className="text-xl text-lime-400 font-medium uppercase tracking-widest">Для настоящих геймеров</p>
              <button className="mt-6 bg-lime-500 hover:bg-lime-600 text-black font-bold py-3 px-8 rounded-full transition-transform hover:scale-105">
                Смотреть новинки
              </button>
           </div>
        </div>

        <section>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Акционные предложения</h2>
            <button className="text-lime-600 font-semibold hover:underline">Смотреть все</button>
          </div>
          
          {/* Сетка товаров (пока пустая, скоро наполним) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             <div className="border-2 border-dashed border-gray-200 rounded-2xl h-64 flex items-center justify-center text-gray-400 italic">
                Здесь будут твои товары...
             </div>
             <div className="border-2 border-dashed border-gray-200 rounded-2xl h-64 flex items-center justify-center text-gray-400 italic">
                Здесь будут твои товары...
             </div>
             <div className="border-2 border-dashed border-gray-200 rounded-2xl h-64 flex items-center justify-center text-gray-400 italic">
                Здесь будут твои товары...
             </div>
             <div className="border-2 border-dashed border-gray-200 rounded-2xl h-64 flex items-center justify-center text-gray-400 italic">
                Здесь будут твои товары...
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;