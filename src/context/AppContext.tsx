import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';

interface User {
  id: string;
  name: string;
  lastName?: string;
  email: string;
  phone?: string;
  city?: string;
  street?: string;
  avatar?: string;
  role?: 'user' | 'admin' | 'manager';
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
  id: number;
  userId: number;
  category: string;
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
// Mock users removed
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
  tradeInRequests: TradeInRequest[];
  createTradeInRequest: (dto: { category: string; description: string; photos: string[] }) => Promise<void>;
  updateTradeInRequest: (requestId: number, updates: { status?: string; offerAmount?: number }) => Promise<void>;
  deleteTradeInRequest: (requestId: number) => Promise<void>;
  refreshTradeIn: () => Promise<void>;
  isCatalogOpen: boolean;
  setIsCatalogOpen: (open: boolean) => void;
  catalogCategory: string | null;
  setCatalogCategory: (cat: string | null) => void;
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  users: User[];
  addUser: (userData: User) => void;
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

  const [user, setUser] = useState<User | null>(null);

  // Check auth on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/Auth/me')
        .then((res: any) => {
          setUser({
            id: res.id.toString(),
            name: res.username,
            lastName: res.lastName,
            email: res.email,
            phone: res.phone,
            city: res.city,
            street: res.street,
            role: res.role.toLowerCase() as 'user' | 'admin' | 'manager'
          });
        })
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        });
    }
  }, []);

  const [tradeInRequests, setTradeInRequests] = useState<TradeInRequest[]>([]);

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('app_blog_posts');
    return saved ? JSON.parse(saved) : [];
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('app_users');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const key = user ? `favorites_${user.id}` : 'favorites';
    localStorage.setItem(key, JSON.stringify(favorites));
  }, [favorites, user?.id]);

  useEffect(() => {
    const key = user ? `compareList_${user.id}` : 'compareList';
    localStorage.setItem(key, JSON.stringify(compareList));
  }, [compareList, user?.id]);

  useEffect(() => {
    const key = user ? `cart_${user.id}` : 'cart';
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, user?.id]);

  useEffect(() => {
    if (user) {
      // Merge guest lists with user-specific lists on login
      const userFavsStr = localStorage.getItem(`favorites_${user.id}`);
      const userFavs = userFavsStr ? JSON.parse(userFavsStr) : [];
      setFavorites(prev => Array.from(new Set([...prev, ...userFavs])));

      const userCompStr = localStorage.getItem(`compareList_${user.id}`);
      const userComp = userCompStr ? JSON.parse(userCompStr) : [];
      setCompareList(prev => Array.from(new Set([...prev, ...userComp])));

      const userCartStr = localStorage.getItem(`cart_${user.id}`);
      const userCart = userCartStr ? JSON.parse(userCartStr) : {};
      setCart(prev => {
        const merged = { ...userCart };
        for (const [id, qty] of Object.entries(prev)) {
          merged[id] = (merged[id] || 0) + (qty as number);
        }
        return merged;
      });
    } else {
      // Clear lists when logging out
      setFavorites([]);
      setCompareList([]);
      setCart({});
    }
  }, [user?.id]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) refreshTradeIn();
  }, [user?.id]);

  // Загружаем Trade-In заявки с бекенда когда пользователь авторизован
  const refreshTradeIn = async () => {
    const token = localStorage.getItem('token');
    if (!token) { setTradeInRequests([]); return; }
    try {
      const data: any[] = await api.get('/TradeIn');
      const mapped: TradeInRequest[] = data.map((r: any) => ({
        id: r.id,
        userId: r.userId,
        category: r.category,
        description: r.description,
        photos: r.photos || [],
        status: r.status as TradeInRequest['status'],
        offerAmount: r.offerAmount,
        date: r.date
      }));
      setTradeInRequests(mapped);
    } catch {
      setTradeInRequests([]);
    }
  };

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
    } else if (userData.email === 'm12.claude.green@gmail.com') {
      userData.role = 'manager';
    } else {
      userData.role = userData.role || 'user';
    }
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateUser = async (userData: Partial<User>) => {
    if (!user) return;
    
    try {
      const response = await api.put('/Auth/update', {
        username: userData.name,
        lastName: userData.lastName,
        phone: userData.phone,
        city: userData.city,
        street: userData.street
      });
      
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      
      const updatedUser = { 
        ...user, 
        name: response.username,
        lastName: response.lastName,
        phone: response.phone,
        city: response.city,
        street: response.street
      };
      setUser(updatedUser);
      setUsers(prev => {
        const updated = prev.map(u => u.id === updatedUser.id ? { ...u, ...updatedUser } : u);
        localStorage.setItem('app_users', JSON.stringify(updated));
        return updated;
      });
    } catch (error: any) {
      console.error('Failed to update user profile', error);
      alert(`Ошибка при обновлении: ${error.message}`);
    }
  };

  const createTradeInRequest = async (dto: { category: string; description: string; photos: string[] }) => {
    try {
      const created: any = await api.post('/TradeIn', dto);
      const newReq: TradeInRequest = {
        id: created.id,
        userId: created.userId,
        category: created.category,
        description: created.description,
        photos: created.photos || [],
        status: created.status,
        offerAmount: created.offerAmount,
        date: created.date
      };
      setTradeInRequests(prev => [newReq, ...prev]);
    } catch (e: any) {
      console.error('Failed to create trade-in request', e);
    }
  };

  const updateTradeInRequest = async (requestId: number, updates: { status?: string; offerAmount?: number }) => {
    try {
      await api.put(`/TradeIn/${requestId}`, updates);
      setTradeInRequests(prev => prev.map(req =>
        req.id === requestId ? { ...req, ...updates } as TradeInRequest : req
      ));
    } catch (e: any) {
      console.error('Failed to update trade-in request', e);
    }
  };

  const deleteTradeInRequest = async (requestId: number) => {
    try {
      await api.delete(`/TradeIn/${requestId}`);
      setTradeInRequests(prev => prev.filter(req => req.id !== requestId));
    } catch (e: any) {
      console.error('Failed to delete trade-in request', e);
    }
  };

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogCategory, setCatalogCategory] = useState<string | null>(null);

  const addBlogPost = (post: BlogPost) => {
    setBlogPosts(prev => [post, ...prev]);
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
  };
  
  const addUser = (userData: User) => {
    setUsers(prev => [...prev, userData]);
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
      tradeInRequests,
      createTradeInRequest,
      updateTradeInRequest,
      deleteTradeInRequest,
      refreshTradeIn,
      isCatalogOpen,
      setIsCatalogOpen,
      catalogCategory,
      setCatalogCategory,
      blogPosts,
      addBlogPost,
      deleteBlogPost,
      users,
      addUser
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
