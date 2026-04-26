import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  favorites: string[];
  compareList: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  isInFavorites: (id: string) => boolean;
  isInCompare: (id: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    const saved = localStorage.getItem('compareList');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: string) => {
    setCompareList(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isInFavorites = (id: string) => favorites.includes(id);
  const isInCompare = (id: string) => compareList.includes(id);

  return (
    <AppContext.Provider value={{ 
      favorites, 
      compareList, 
      toggleFavorite, 
      toggleCompare, 
      isInFavorites, 
      isInCompare 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
