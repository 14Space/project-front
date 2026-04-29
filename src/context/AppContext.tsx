import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  lastName?: string;
  email: string;
  phone?: string;
  city?: string;
  street?: string;
  avatar?: string;
}

export interface Order {
  id: string;
  items: { id: string; quantity: number; title: string; price: number; image: string }[];
  totalPrice: number;
  status: string;
  date: string;
}
export const MOCK_USER: User = {
  id: 'user-1',
  name: 'Номинал',
  lastName: 'Номиналович',
  email: '14t.space@gmail.com',
  phone: '+37369467556',
  city: '',
  street: ''
};
interface AppContextType {
  favorites: string[];
  compareList: string[];
  cart: Record<string, number>;
  user: User | null;
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  toggleCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInFavorites: (id: string) => boolean;
  isInCompare: (id: string) => boolean;
  isInCart: (id: string) => boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  orders: Order[];
  createOrder: (order: Order) => void;
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

  const [cart, setCart] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('cart');
    // Migration from old array format to object format if necessary
    const parsed = saved ? JSON.parse(saved) : {};
    if (Array.isArray(parsed)) {
      const migrated: Record<string, number> = {};
      parsed.forEach(id => { migrated[id] = 1; });
      return migrated;
    }
    return parsed;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

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

  const toggleCart = (id: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[id]) {
        delete newCart[id];
      } else {
        newCart[id] = 1;
      }
      return newCart;
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => {
      const newCart = { ...prev };
      newCart[id] = quantity;
      return newCart;
    });
  };

  const clearCart = () => setCart({});

  const isInFavorites = (id: string) => favorites.includes(id);
  const isInCompare = (id: string) => compareList.includes(id);
  const isInCart = (id: string) => !!cart[id];

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  };

  const createOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <AppContext.Provider value={{ 
      favorites, 
      compareList, 
      cart,
      user,
      toggleFavorite, 
      toggleCompare, 
      toggleCart,
      updateCartQuantity,
      clearCart,
      isInFavorites, 
      isInCompare,
      isInCart,
      login,
      logout,
      updateUser,
      orders,
      createOrder
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
