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
  role?: 'user' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: { id: string; quantity: number; title: string; price: number; image: string }[];
  totalPrice: number;
  status: string;
  date: string;
}

export interface TradeInRequest {
  id: string;
  userId: string;
  category: string;
  condition: string;
  description: string;
  photos: string[];
  status: 'pending' | 'evaluated' | 'accepted' | 'rejected';
  offerAmount?: number;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  image: string;
  date: string;
}
export const MOCK_USER: User = {
  id: 'user-admin',
  name: 'Номинал',
  lastName: 'Номиналович',
  email: '14t.space@gmail.com',
  phone: '+37369467556',
  city: '',
  street: '',
  role: 'admin'
};

export const MOCK_USER_REGULAR: User = {
  id: 'user-regular',
  name: 'Mihai',
  lastName: 'Felciuc',
  email: 'mihafelciuc@gmail.com',
  phone: '+37369000000',
  city: 'Chisinau',
  street: 'Stefan cel Mare 1',
  role: 'user'
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
  updateOrderStatus: (orderId: string, status: string) => void;
  tradeInRequests: TradeInRequest[];
  createTradeInRequest: (request: TradeInRequest) => void;
  updateTradeInRequest: (requestId: string, updates: Partial<TradeInRequest>) => void;
  deleteTradeInRequest: (requestId: string) => void;
  isCatalogOpen: boolean;
  setIsCatalogOpen: (open: boolean) => void;
  catalogCategory: string | null;
  setCatalogCategory: (cat: string | null) => void;
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  users: User[];
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
    const parsedUser = saved ? JSON.parse(saved) : null;
    if (parsedUser && parsedUser.email === '14t.space@gmail.com') {
      parsedUser.role = 'admin';
    }
    return parsedUser;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('app_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [tradeInRequests, setTradeInRequests] = useState<TradeInRequest[]>(() => {
    const saved = localStorage.getItem('app_tradein');
    return saved ? JSON.parse(saved) : [];
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('app_blog_posts');
    return saved ? JSON.parse(saved) : [];
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('app_users');
    return saved ? JSON.parse(saved) : [MOCK_USER, MOCK_USER_REGULAR];
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
    localStorage.setItem('app_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('app_tradein', JSON.stringify(tradeInRequests));
  }, [tradeInRequests]);

  useEffect(() => {
    localStorage.setItem('app_blog_posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem('app_users', JSON.stringify(users));
  }, [users]);

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
    if (userData.email === '14t.space@gmail.com') {
      userData.role = 'admin';
    } else {
      userData.role = 'user';
    }
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => {
      const updatedUser = prev ? { ...prev, ...userData } : null;
      if (updatedUser) {
        setUsers(currentUsers => currentUsers.map(u => u.id === updatedUser.id ? { ...u, ...updatedUser } : u));
      }
      return updatedUser;
    });
  };

  const createOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const createTradeInRequest = (request: TradeInRequest) => {
    setTradeInRequests(prev => [request, ...prev]);
  };

  const updateTradeInRequest = (requestId: string, updates: Partial<TradeInRequest>) => {
    setTradeInRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, ...updates } : req
    ));
  };

  const deleteTradeInRequest = (requestId: string) => {
    setTradeInRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogCategory, setCatalogCategory] = useState<string | null>(null);

  const addBlogPost = (post: BlogPost) => {
    setBlogPosts(prev => [post, ...prev]);
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
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
      createOrder,
      updateOrderStatus,
      tradeInRequests,
      createTradeInRequest,
      updateTradeInRequest,
      deleteTradeInRequest,
      isCatalogOpen,
      setIsCatalogOpen,
      catalogCategory,
      setCatalogCategory,
      blogPosts,
      addBlogPost,
      deleteBlogPost,
      users
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
