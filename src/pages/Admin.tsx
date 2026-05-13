import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  ShoppingBag, 
  RefreshCw, 
  Users, 
  Plus,
  Settings,
  Layers,
  List,
  FileText,
  ChevronLeft,
  Search,
  Edit2,
  Trash2,
  GripVertical,
  X,
  MessageSquare,
  Check
} from 'lucide-react';

import AdminProductFilters from '../components/admin/AdminProductFilters';
import AdminSpecFilters from '../components/admin/AdminSpecFilters';
import AdminUsers from '../components/admin/AdminUsers';
import { useAppContext } from '../context/AppContext';

// Categories mapping
const CATEGORIES_DATA = {
  'PCs': {
    label: 'Компьютеры',
    subcategories: ['Игровые', 'Мини-ПК', 'Моноблоки', 'Рабочие станции']
  },
  'Laptops': {
    label: 'Ноутбуки',
    subcategories: ['Игровые', 'Для учёбы', 'MacBook', 'Ультрабуки']
  },
  'Components': {
    label: 'Комплектующие',
    subcategories: ['Процессоры', 'Видеокарты', 'Материнские платы', 'Оперативная память', 'Накопители', 'Блоки питания', 'Корпуса', 'Охлаждение']
  },
  'Monitors': {
    label: 'Мониторы',
    subcategories: ['Игровые', '4K', 'Ultrawide', 'Офисные']
  },
  'Peripherals': {
    label: 'Периферия',
    subcategories: ['Клавиатуры', 'Мыши', 'Наушники', 'Коврики']
  }
};

// Sub-components for Admin views
const AdminProducts = ({ onBack }: { onBack: () => void }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'brands'>('products');
  const [isAddingBrand, setIsAddingBrand] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState('');
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    category: '',
    subcategory: '',
    images: [] as string[]
  });
  const [brands, setBrands] = useState([
    { id: 1, name: 'MSI' },
    { id: 2, name: 'ASUS' },
    { id: 3, name: 'Gigabyte' },
    { id: 4, name: 'AMD' },
    { id: 5, name: 'Intel' },
  ]);

  const [products, setProducts] = useState([
    { id: '100101', name: 'Product Name Example 1', price: 26000, category: 'PCs', subcategory: 'Gaming' },
    { id: '100102', name: 'Product Name Example 2', price: 27000, category: 'PCs', subcategory: 'Gaming' },
    { id: '100103', name: 'Product Name Example 3', price: 28000, category: 'PCs', subcategory: 'Gaming' },
    { id: '100104', name: 'Product Name Example 4', price: 29000, category: 'PCs', subcategory: 'Gaming' },
    { id: '100105', name: 'Product Name Example 5', price: 30000, category: 'PCs', subcategory: 'Gaming' },
  ]);

  const filteredProducts = products.filter(p => 
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', position: 'relative' }}>
        <button 
          onClick={onBack}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#fff', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '14px',
            padding: 0,
            position: 'absolute',
            left: 0,
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
        >
          <ChevronLeft size={18} />
          {t('common.back')}
        </button>
        <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#fff' }}>
          {t('admin.actions.addEditDelete')}
        </h2>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <AdminProductFilters />
        
        <div style={{ 
          backgroundColor: 'var(--card-bg)', 
          borderRadius: '12px', 
          padding: '20px 20px 0px 20px',
          border: '1px solid var(--border-color)',
          flex: 1,
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
            <button 
              onClick={() => setActiveTab('products')}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'products' ? 'var(--primary-color)' : '#888',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '5px 0',
                position: 'relative',
                transition: 'all 0.2s'
              }}
            >
              Товары
              {activeTab === 'products' && (
                <div style={{ position: 'absolute', bottom: '-11px', left: 0, right: 0, height: '2px', backgroundColor: 'var(--primary-color)' }} />
              )}
            </button>
            <button 
              onClick={() => setActiveTab('brands')}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === 'brands' ? 'var(--primary-color)' : '#888',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '5px 0',
                position: 'relative',
                transition: 'all 0.2s'
              }}
            >
              Бренды
              {activeTab === 'brands' && (
                <div style={{ position: 'absolute', bottom: '-11px', left: 0, right: 0, height: '2px', backgroundColor: 'var(--primary-color)' }} />
              )}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} color="#666" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder={t('catalog.search')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '10px 12px 10px 40px', 
                  backgroundColor: 'rgba(0,0,0,0.2)', 
                  border: '1px solid #333', 
                  borderRadius: '8px', 
                  color: '#fff',
                  outline: 'none'
                }} 
              />
            </div>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => {
                  if (activeTab === 'brands') {
                    setIsAddingBrand(true);
                  } else {
                    setIsProductModalOpen(true);
                  }
                }}
                style={{ 
                  backgroundColor: 'var(--primary-color)', 
                  color: '#000', 
                  border: 'none', 
                  padding: '10px 20px', 
                  borderRadius: '8px', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  height: '100%'
                }}
              >
                <Plus size={18} />
                {t('common.add')}
              </button>
            </div>
          </div>

          {isAddingBrand && (
            <div style={{ 
              padding: '15px', 
              backgroundColor: 'rgba(255, 255, 255, 0.02)', 
              border: '1px solid #333', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              animation: 'fadeIn 0.2s ease',
              marginBottom: '20px'
            }}>
              <input 
                autoFocus
                type="text" 
                placeholder="Введите название бренда..."
                value={newBrandName}
                onChange={(e) => setNewBrandName(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 15px',
                  backgroundColor: '#111',
                  border: '1px solid #333',
                  borderRadius: '6px',
                  color: '#fff',
                  outline: 'none'
                }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => {
                    if (newBrandName.trim()) {
                      setBrands([...brands, { id: Date.now(), name: newBrandName.trim() }]);
                      setNewBrandName('');
                      setIsAddingBrand(false);
                      setActiveTab('brands');
                    }
                  }}
                  style={{
                    padding: '8px 20px',
                    backgroundColor: 'var(--primary-color)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Сохранить
                </button>
                <button 
                  onClick={() => {
                    setIsAddingBrand(false);
                    setNewBrandName('');
                  }}
                  style={{
                    padding: '8px 20px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    border: '1px solid #333',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Отмена
                </button>
              </div>
            </div>
          )}

          {activeTab === 'products' ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333', textAlign: 'left' }}>
                  <th style={{ padding: '12px', fontSize: '14px', color: '#888' }}>ID</th>
                  <th style={{ padding: '12px', fontSize: '14px', color: '#888' }}>{t('common.title')}</th>
                  <th style={{ padding: '12px', fontSize: '14px', color: '#888' }}>{t('common.price')}</th>
                  <th style={{ padding: '12px', fontSize: '14px', color: '#888' }}>{t('admin.actions.categories')}</th>
                  <th style={{ padding: '12px', fontSize: '14px', color: '#888' }}>{t('admin.actions.subcategories')}</th>
                  <th style={{ padding: '12px', fontSize: '14px', color: '#888', textAlign: 'right' }}>{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p, idx) => (
                  <tr key={p.id} style={{ borderBottom: idx === filteredProducts.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{p.id}</td>
                    <td style={{ padding: '12px', fontSize: '14px', fontWeight: 500 }}>
                      {p.name}
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{p.price} MDL</td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      {p.category}
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      {p.subcategory}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '25px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => {
                            setEditingProduct(p);
                            setProductForm({
                              title: p.name,
                              price: p.price.toString(),
                              category: Object.keys(CATEGORIES_DATA).find(key => (CATEGORIES_DATA as any)[key].label === p.category) || p.category,
                              subcategory: p.subcategory,
                              images: [] // In real app, load existing images
                            });
                            setIsProductModalOpen(true);
                          }}
                          style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', transition: 'color 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm('Вы уверены, что хотите удалить этот товар?')) {
                              setProducts(products.filter(item => item.id !== p.id));
                            }
                          }}
                          style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', transition: 'color 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#ff4d4d'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                      {t('common.noData')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333', textAlign: 'left' }}>
                  <th style={{ padding: '12px', fontSize: '14px', color: '#888' }}>ID</th>
                  <th style={{ padding: '12px', fontSize: '14px', color: '#888' }}>Название бренда</th>
                  <th style={{ padding: '12px', fontSize: '14px', color: '#888', textAlign: 'right' }}>{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {brands.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase())).map((b, idx, arr) => (
                  <tr key={b.id} style={{ borderBottom: idx === arr.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px', fontSize: '14px' }}>{b.id}</td>
                    <td style={{ padding: '12px', fontSize: '14px', fontWeight: 500 }}>{b.name}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '25px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => {
                            const newName = prompt('Введите новое название бренда:', b.name);
                            if (newName && newName.trim()) {
                              setBrands(brands.map(item => item.id === b.id ? { ...item, name: newName.trim() } : item));
                            }
                          }}
                          style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', transition: 'color 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => {
                            if (window.confirm(`Вы уверены, что хотите удалить бренд "${b.name}"?`)) {
                              setBrands(brands.filter(item => item.id !== b.id));
                            }
                          }}
                          style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', transition: 'color 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#ff4d4d'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {brands.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                      {t('common.noData')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {/* Add Product Modal */}
          {isProductModalOpen && (
            <div style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              backdropFilter: 'blur(5px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}>
              <div style={{ 
                backgroundColor: '#1a1b1c', 
                width: '100%', 
                maxWidth: '600px', 
                borderRadius: '16px', 
                border: '1px solid var(--border-color)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                animation: 'fadeInScale 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh'
              }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, color: '#fff', fontSize: '20px' }}>
                    {editingProduct ? 'Редактирование товара' : 'Добавление товара'}
                  </h3>
                  <button 
                    onClick={() => {
                      setIsProductModalOpen(false);
                      setEditingProduct(null);
                      setProductForm({ title: '', price: '', category: '', subcategory: '', images: [] });
                    }}
                    style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div style={{ padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>Заголовок товара</label>
                    <input 
                      type="text" 
                      placeholder="Например: Видеокарта Asus ROG Strix..."
                      value={productForm.title}
                      onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                      style={{ width: '100%', padding: '12px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>Цена (MDL)</label>
                      <input 
                        type="text" 
                        placeholder="0"
                        value={productForm.price}
                        onKeyDown={(e) => {
                          // Allow: backspace, delete, tab, escape, enter and .
                          if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
                             // Allow: Ctrl+A, Command+A
                            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                             // Allow: home, end, left, right, down, up
                            (e.keyCode >= 35 && e.keyCode <= 40)) {
                                 // let it happen, don't do anything
                                 return;
                          }
                          // Ensure that it is a number and stop the keypress
                          if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                              e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '' || /^\d+$/.test(val)) {
                            setProductForm({...productForm, price: val});
                          }
                        }}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          backgroundColor: '#111', 
                          border: '1px solid #333', 
                          borderRadius: '8px', 
                          color: '#fff', 
                          outline: 'none',
                          // Hide spinners (though type is text now, good practice)
                          appearance: 'none'
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>Категория</label>
                      <select 
                        value={productForm.category}
                        onChange={(e) => setProductForm({...productForm, category: e.target.value, subcategory: ''})}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          backgroundColor: '#111', 
                          border: '1px solid #333', 
                          borderRadius: '8px', 
                          color: '#fff', 
                          outline: 'none', 
                          cursor: 'pointer',
                          height: '45px' // Match input height
                        }}
                      >
                        <option value="">Выберите...</option>
                        {Object.entries(CATEGORIES_DATA).map(([key, data]) => (
                          <option key={key} value={key}>{data.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>Подкатегория</label>
                    <select 
                      disabled={!productForm.category}
                      value={productForm.subcategory}
                      onChange={(e) => setProductForm({...productForm, subcategory: e.target.value})}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        backgroundColor: '#111', 
                        border: '1px solid #333', 
                        borderRadius: '8px', 
                        color: productForm.category ? '#fff' : '#444', 
                        outline: 'none', 
                        cursor: productForm.category ? 'pointer' : 'not-allowed',
                        height: '45px'
                      }}
                    >
                      <option value="">{productForm.category ? 'Выберите...' : 'Сначала выберите категорию'}</option>
                      {productForm.category && (CATEGORIES_DATA as any)[productForm.category].subcategories.map((sub: string) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>Фотографии (до 5 шт.)</label>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {/* Existing Previews */}
                      {productForm.images.map((img, i) => (
                        <div 
                          key={i} 
                          style={{ 
                            width: '100px', 
                            height: '100px', 
                            borderRadius: '8px', 
                            border: 'none', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            position: 'relative',
                            overflow: 'hidden',
                            backgroundColor: '#000'
                          }}
                        >
                          <img src={img} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <div 
                            style={{ 
                              position: 'absolute', 
                              top: 0, 
                              left: 0, 
                              right: 0, 
                              bottom: 0, 
                              backgroundColor: 'rgba(0,0,0,0.5)', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              opacity: 0, 
                              transition: 'opacity 0.2s',
                              cursor: 'pointer'
                            }} 
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} 
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                            onClick={() => {
                              const newImages = [...productForm.images];
                              newImages.splice(i, 1);
                              setProductForm({...productForm, images: newImages});
                            }}
                          >
                            <Trash2 size={20} color="#fff" />
                          </div>
                        </div>
                      ))}

                      {/* Add Button (only if less than 5) */}
                      {productForm.images.length < 5 && (
                        <div 
                          onClick={() => document.getElementById('product-image-upload')?.click()}
                          style={{ 
                            width: '100px', 
                            height: '100px', 
                            borderRadius: '8px', 
                            border: '2px dashed #333', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            backgroundColor: 'transparent'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary-color)'}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333'}
                        >
                          <Plus size={24} color="#333" />
                          <input 
                            type="file" 
                            id="product-image-upload"
                            accept="image/*"
                            multiple
                            style={{ display: 'none' }}
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              const remainingSlots = 5 - productForm.images.length;
                              const filesToProcess = files.slice(0, remainingSlots);
                              
                              filesToProcess.forEach(file => {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setProductForm(prev => ({
                                    ...prev,
                                    images: [...prev.images, reader.result as string].slice(0, 5)
                                  }));
                                };
                                reader.readAsDataURL(file);
                              });
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div style={{ padding: '20px', borderTop: '1px solid #333', display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={() => setIsProductModalOpen(false)}
                    style={{ padding: '10px 25px', backgroundColor: 'transparent', border: '1px solid #333', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Отмена
                  </button>
                  <button 
                    onClick={() => {
                      if (!productForm.title.trim()) {
                        alert('Пожалуйста, введите название товара');
                        return;
                      }
                      
                      if (editingProduct) {
                        setProducts(products.map(p => p.id === editingProduct.id ? {
                          ...p,
                          name: productForm.title.trim(),
                          price: Number(productForm.price) || 0,
                          category: (CATEGORIES_DATA as any)[productForm.category]?.label || productForm.category || 'Other',
                          subcategory: productForm.subcategory || 'Default'
                        } : p));
                        alert('Товар успешно обновлен!');
                      } else {
                        const newProduct = {
                          id: Math.floor(10000000 + Math.random() * 90000000).toString(),
                          name: productForm.title.trim(),
                          price: Number(productForm.price) || 0,
                          category: (CATEGORIES_DATA as any)[productForm.category]?.label || productForm.category || 'Other',
                          subcategory: productForm.subcategory || 'Default'
                        };
                        
                        setProducts([newProduct, ...products]);
                        alert('Товар успешно добавлен!');
                      }
                      
                      setIsProductModalOpen(false);
                      setEditingProduct(null);
                      setProductForm({ title: '', price: '', category: '', subcategory: '', images: [] });
                    }}
                    style={{ padding: '10px 25px', backgroundColor: 'var(--primary-color)', border: 'none', borderRadius: '8px', color: '#000', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminOrders = ({ onBack }: { onBack: () => void }) => {
  const { t } = useTranslation();
  const { orders, updateOrderStatus } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusModal, setStatusModal] = useState<{ orderId: string, currentStatus: string } | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus);
    setStatusModal(null);
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.userId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#eab308';
      case 'shipped': return '#3b82f6';
      case 'delivered': return '#A6CE39';
      default: return '#888';
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', position: 'relative' }}>
        <button 
          onClick={onBack}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#fff', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '14px',
            padding: 0,
            position: 'absolute',
            left: 0
          }}
        >
          <ChevronLeft size={18} />
          {t('common.back')}
        </button>
        <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#fff' }}>
          {t('admin.actions.viewOrders')}
        </h2>
        
        <div style={{ position: 'absolute', right: 0, width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          <input 
            type="text" 
            placeholder="Поиск по ID заказа или клиента..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              backgroundColor: 'rgba(255,255,255,0.03)', 
              border: '1px solid var(--border-color)', 
              borderRadius: '8px', 
              padding: '10px 15px 10px 40px', 
              color: '#fff',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888', fontWeight: 500 }}>ID Заказа</th>
                <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888', fontWeight: 500 }}>Дата</th>
                <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888', fontWeight: 500 }}>ID Клиента</th>
                <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888', fontWeight: 500 }}>Товары</th>
                <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888', fontWeight: 500 }}>Сумма</th>
                <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888', fontWeight: 500 }}>Статус</th>
                <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888', fontWeight: 500 }}>Управление</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '15px 20px', fontSize: '14px', fontWeight: 600 }}>
                    <button 
                      onClick={() => alert(`Opening details for ${order.id}...`)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'var(--primary-color)', 
                        cursor: 'pointer', 
                        fontSize: '14px', 
                        padding: 0,
                        fontWeight: 600,
                        textDecoration: 'underline'
                      }}
                    >
                      {order.id}
                    </button>
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: '14px', color: '#fff' }}>
                    {new Date(order.date).toLocaleDateString('ru-RU')}
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: '14px' }}>
                    <button 
                      onClick={() => alert(`Opening profile for ${order.userId}...`)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'var(--primary-color)', 
                        cursor: 'pointer', 
                        fontSize: '14px', 
                        padding: 0,
                        textDecoration: 'underline'
                      }}
                    >
                      {order.userId}
                    </button>
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: '14px', color: '#fff', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {order.items.map(i => t(i.title)).join(', ')}
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: '14px', color: '#fff', fontWeight: 600 }}>
                    {order.totalPrice.toLocaleString()} MDL
                  </td>
                  <td style={{ padding: '15px 20px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '100px', 
                      fontSize: '12px', 
                      backgroundColor: `${getStatusColor(order.status)}20`, 
                      color: getStatusColor(order.status),
                      border: `1px solid ${getStatusColor(order.status)}40`
                    }}>
                      {order.status === 'pending' ? 'В обработке' : order.status === 'shipped' ? 'Отправлен' : 'Доставлен'}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px' }}>
                    <button 
                      onClick={() => {
                        setStatusModal({ orderId: order.id, currentStatus: order.status });
                        setSelectedStatus(order.status);
                      }}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'var(--primary-color)', 
                        cursor: 'pointer', 
                        fontSize: '14px', 
                        padding: 0 
                      }}
                    >
                      Изменить статус
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {statusModal && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.85)', 
          zIndex: 1000, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          animation: 'fadeIn 0.2s ease',
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{ 
            backgroundColor: '#111', 
            border: '1px solid var(--border-color)', 
            borderRadius: '16px', 
            padding: '30px', 
            width: '400px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            position: 'relative'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: 700, color: '#fff' }}>Изменить статус</h3>
            <p style={{ margin: '0 0 25px 0', fontSize: '14px', color: '#888' }}>
              Выберите новый статус для заказа <span style={{ color: 'var(--primary-color)' }}>{statusModal.orderId}</span>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
              {[
                { id: 'pending', label: 'В обработке' },
                { id: 'shipped', label: 'Отправлен' },
                { id: 'delivered', label: 'Доставлен' }
              ].map((status) => (
                <div 
                  key={status.id}
                  onClick={() => setSelectedStatus(status.id)}
                  style={{ 
                    padding: '12px 16px', 
                    borderRadius: '10px', 
                    border: `1px solid ${selectedStatus === status.id ? 'var(--primary-color)' : 'var(--border-color)'}`,
                    backgroundColor: selectedStatus === status.id ? 'rgba(166, 206, 57, 0.05)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedStatus !== status.id) e.currentTarget.style.borderColor = '#444';
                  }}
                  onMouseLeave={(e) => {
                    if (selectedStatus !== status.id) e.currentTarget.style.borderColor = 'var(--border-color)';
                  }}
                >
                  <span style={{ fontSize: '14px', color: selectedStatus === status.id ? '#fff' : '#888', fontWeight: selectedStatus === status.id ? 600 : 400 }}>
                    {status.label}
                  </span>
                  {selectedStatus === status.id && (
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-color)' }} />
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setStatusModal(null)}
                style={{ 
                  flex: 1, 
                  padding: '12px', 
                  borderRadius: '100px', 
                  border: '1px solid var(--border-color)', 
                  backgroundColor: 'transparent', 
                  color: '#fff', 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {t('common.cancel')}
              </button>
              <button 
                onClick={() => handleStatusChange(statusModal.orderId, selectedStatus)}
                style={{ 
                  flex: 1, 
                  padding: '12px', 
                  borderRadius: '100px', 
                  border: 'none', 
                  backgroundColor: 'var(--primary-color)', 
                  color: '#000', 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminTradeIn = ({ onBack }: { onBack: () => void }) => {
  const { t } = useTranslation();
  const { tradeInRequests, updateTradeInRequest } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [evalModal, setEvalModal] = useState<{ id: string, amount: string } | null>(null);
  const [detailsModal, setDetailsModal] = useState<any | null>(null);

  const filteredRequests = tradeInRequests.filter(req => 
    req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    req.userId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEvaluate = (id: string, amount: number) => {
    updateTradeInRequest(id, { status: 'evaluated', offerAmount: amount });
    setEvalModal(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#eab308';
      case 'evaluated': return '#3b82f6';
      case 'accepted': return '#A6CE39';
      case 'rejected': return '#ff4d4d';
      default: return '#888';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'В ожидании';
      case 'evaluated': return 'Оценен';
      case 'accepted': return 'Принят';
      case 'rejected': return 'Отклонен';
      default: return status;
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', position: 'relative' }}>
        <button 
          onClick={onBack}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#fff', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '14px',
            padding: 0,
            position: 'absolute',
            left: 0
          }}
        >
          <ChevronLeft size={18} />
          {t('common.back')}
        </button>
        <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#fff' }}>
          Заявки на оценку Trade-In
        </h2>
        
        <div style={{ position: 'absolute', right: 0, width: '300px' }}>
          <input 
            type="text" 
            placeholder="Поиск по ID заявки или клиента..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px 15px 10px 40px', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)', 
              backgroundColor: '#111', 
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <Search size={16} color="#888" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500, width: '160px' }}>ID Заявки</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>Дата</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>ID Клиента</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>Категория</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>Статус</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>Оценка (MDL)</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500, width: '150px' }}>Состояние</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(req => (
                <tr key={req.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.01)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '15px 20px', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    <button 
                      onClick={() => setDetailsModal(req)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'var(--primary-color)', 
                        cursor: 'pointer', 
                        fontSize: '14px', 
                        padding: 0,
                        fontWeight: 600,
                        textDecoration: 'underline'
                      }}
                    >
                      {req.id}
                    </button>
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: '14px', color: '#fff' }}>
                    {new Date(req.date).toLocaleDateString('ru-RU')}
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: '14px' }}>
                    <button 
                      onClick={() => alert(`Opening profile for ${req.userId}...`)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'var(--primary-color)', 
                        cursor: 'pointer', 
                        fontSize: '14px', 
                        padding: 0,
                        textDecoration: 'underline'
                      }}
                    >
                      {req.userId}
                    </button>
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: '14px', color: '#fff' }}>
                    {t(`tradeIn.form.categories.${req.category}`)}
                  </td>
                  <td style={{ padding: '15px 20px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '100px', 
                      fontSize: '12px', 
                      backgroundColor: `${getStatusColor(req.status)}20`, 
                      color: getStatusColor(req.status),
                      border: `1px solid ${getStatusColor(req.status)}40`
                    }}>
                      {getStatusText(req.status)}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: '14px', color: '#fff', fontWeight: 600 }}>
                    {req.offerAmount ? `${req.offerAmount.toLocaleString()} MDL` : '—'}
                  </td>
                  <td style={{ padding: '15px 20px' }}>
                    {req.status === 'rejected' ? (
                      <span style={{ color: '#ff4d4d', fontSize: '13px', fontWeight: 600 }}>Отказ</span>
                    ) : req.status === 'accepted' ? (
                      <span style={{ color: '#A6CE39', fontSize: '13px', fontWeight: 600 }}>Принято</span>
                    ) : (
                      <button 
                        onClick={() => setEvalModal({ id: req.id, amount: req.offerAmount ? req.offerAmount.toString() : '' })}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: 'var(--primary-color)', 
                          cursor: 'pointer', 
                          fontSize: '13px', 
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                      >
                        {req.status === 'pending' ? 'Оценить' : 'Изменить оценку'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '40px 20px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
                    Заявки не найдены
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Evaluation */}
      {evalModal && (
        <div style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.8)', 
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.2s ease',
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{ 
            backgroundColor: '#111', 
            border: '1px solid var(--border-color)', 
            borderRadius: '16px', 
            padding: '30px', 
            width: '400px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            position: 'relative'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: 700, color: '#fff' }}>Оценка заявки</h3>
            <p style={{ margin: '0 0 25px 0', fontSize: '14px', color: '#888' }}>
              Введите предложенную сумму для заявки <span style={{ color: 'var(--primary-color)' }}>{evalModal.id}</span>
            </p>

            <div style={{ marginBottom: '30px' }}>
              <input 
                type="text"
                value={evalModal.amount}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setEvalModal({ ...evalModal, amount: val });
                }}
                placeholder="Сумма в MDL"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  color: '#fff',
                  fontSize: '16px',
                  outline: 'none'
                }}
                autoFocus
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setEvalModal(null)}
                style={{ 
                  flex: 1, 
                  padding: '12px', 
                  borderRadius: '100px', 
                  border: '1px solid var(--border-color)', 
                  backgroundColor: 'transparent', 
                  color: '#fff', 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Отмена
              </button>
              <button 
                onClick={() => {
                  const num = parseInt(evalModal.amount);
                  if (!isNaN(num) && num > 0) {
                    handleEvaluate(evalModal.id, num);
                  } else {
                    alert('Введите корректную сумму');
                  }
                }}
                style={{ 
                  flex: 1, 
                  padding: '12px', 
                  borderRadius: '100px', 
                  border: 'none', 
                  backgroundColor: 'var(--primary-color)', 
                  color: '#000', 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Оценить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Details */}
      {detailsModal && (
        <div style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.8)', 
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.2s ease',
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{ 
            backgroundColor: '#111', 
            border: '1px solid var(--border-color)', 
            borderRadius: '16px', 
            padding: '30px', 
            width: '500px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '20px', fontWeight: 700, color: '#fff' }}>Детали заявки</h3>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--primary-color)' }}>{detailsModal.id}</p>
              </div>
              <button 
                onClick={() => setDetailsModal(null)}
                style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: '5px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1, padding: '15px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Категория</div>
                  <div style={{ fontSize: '14px', color: '#fff', fontWeight: 500 }}>{t(`tradeIn.form.categories.${detailsModal.category}`)}</div>
                </div>

                <div style={{ flex: 1, padding: '15px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Состояние</div>
                  <div style={{ fontSize: '14px', color: '#fff', fontWeight: 500 }}>
                    {detailsModal.condition === 'new' ? 'Новое' : 'Б/У'}
                  </div>
                </div>
              </div>

              <div style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>Описание от пользователя</div>
                <div style={{ fontSize: '14px', color: '#fff', lineHeight: '1.5', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                  {detailsModal.description || <span style={{ color: '#555', fontStyle: 'italic' }}>Нет описания</span>}
                </div>
              </div>
            </div>

            {(detailsModal.photos && detailsModal.photos.length > 0) ? (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>Фотографии устройства ({detailsModal.photos.length})</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {detailsModal.photos.map((photo: string, idx: number) => (
                    <img 
                      key={idx}
                      src={photo} 
                      alt={`Item ${idx + 1}`} 
                      style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--border-color)' }} 
                    />
                  ))}
                </div>
              </div>
            ) : detailsModal.photo ? (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>Фотографии устройства</div>
                <img 
                  src={detailsModal.photo} 
                  alt="Item" 
                  style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--border-color)' }} 
                />
              </div>
            ) : null}
            
            <button 
              onClick={() => setDetailsModal(null)}
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '100px', 
                border: '1px solid var(--border-color)', 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                color: '#fff', 
                fontSize: '14px', 
                fontWeight: 600, 
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const AdminBlog = ({ onBack }: { onBack: () => void }) => {
  const { t } = useTranslation();
  const { blogPosts, addBlogPost, deleteBlogPost } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleAdd = () => {
    if (!newTitle || !newImage) return;
    addBlogPost({
      id: newTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newTitle,
      image: newImage,
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
    });
    setNewTitle('');
    setNewImage('');
    setIsAdding(false);
  };

  const defaultPosts = [
    { 
      id: 'how-to-choose-gpu',
      title: t('home.blog.posts.how-to-choose-gpu.title'), 
      image: '/blog/BLOG-how-to-choose-gpu.png', 
      date: t('home.blog.posts.how-to-choose-gpu.date')
    },
    { 
      id: 'cross-play-multiplatform',
      title: t('home.blog.posts.cross-play-multiplatform.title'), 
      image: '/blog/BLOG-crossplay-multiplatform.png', 
      date: t('home.blog.posts.cross-play-multiplatform.date')
    },
    { 
      id: 'gta-6-price',
      title: t('home.blog.posts.gta-6-price.title'), 
      image: '/blog/BLOG-gta-price.png', 
      date: t('home.blog.posts.gta-6-price.date')
    },
    { 
      id: 'how-to-choose-console',
      title: t('home.blog.posts.how-to-choose-console.title'), 
      image: '/blog/BLOG-how-to-choose-gaming-console.png', 
      date: t('home.blog.posts.how-to-choose-console.date')
    },
    { 
      id: 'ryzen-9000-review',
      title: t('home.blog.posts.ryzen-9000-review.title'), 
      image: '/blog/BLOG-amd-ryzen-9000.png', 
      date: t('home.blog.posts.ryzen-9000-review.date')
    }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.3s ease', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', position: 'relative' }}>
        <button 
          onClick={onBack}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#fff', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '14px',
            padding: 0,
            position: 'absolute',
            left: 0,
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
        >
          <ChevronLeft size={18} />
          {t('common.back')}
        </button>
        <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#fff' }}>
          {t('admin.actions.editBlog')}
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {/* Кнопка добавления статьи */}
        <div 
          onClick={() => setIsAdding(true)}
          style={{ 
            borderRadius: '8px', 
            overflow: 'hidden', 
            border: '1px dashed #333', 
            backgroundColor: '#111212',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            minHeight: '280px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#A6CE39';
            e.currentTarget.style.backgroundColor = '#151617';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#333';
            e.currentTarget.style.backgroundColor = '#111212';
          }}
        >
          <div style={{
            width: '56px',
            height: '56px',
            backgroundColor: 'rgba(166, 206, 57, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <Plus size={28} color="#A6CE39" />
          </div>
          <span style={{ color: '#fff', fontSize: '15px', fontWeight: 600 }}>Добавить статью</span>
        </div>

        {[...blogPosts, ...defaultPosts].map((post, idx) => (
          <div 
            key={idx} 
            onClick={() => alert(`Editing article ${post.id}`)}
            style={{ 
              borderRadius: '8px', 
              overflow: 'hidden', 
              border: '1px solid var(--border-color)', 
              backgroundColor: 'var(--card-bg)',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            {/* Delete Button for custom posts */}
            {blogPosts.some(p => p.id === post.id) && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if(window.confirm('Вы уверены, что хотите удалить эту статью?')) {
                    deleteBlogPost(post.id);
                  }
                }}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'rgba(0,0,0,0.6)',
                  border: 'none',
                  color: '#fff',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#ff4d4d'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
              >
                <X size={16} />
              </button>
            )}
            
            <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '8px' }}>{post.date}</div>
              <div style={{ fontWeight: 600, fontSize: '18px', color: 'var(--text-color)', transition: 'color 0.2s', lineHeight: '1.4' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                   onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-color)'}
              >
                {post.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'fadeIn 0.2s ease',
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: '#111',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '30px',
            width: '400px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#fff' }}>Новая статья</h3>
              <button 
                onClick={() => setIsAdding(false)}
                style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: '5px' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: '12px', marginBottom: '5px' }}>Заголовок статьи</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Введите заголовок..."
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #333', backgroundColor: 'rgba(255,255,255,0.02)', color: '#fff', fontSize: '14px', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: '12px', marginBottom: '5px' }}>URL обложки</label>
                <input 
                  type="text" 
                  value={newImage}
                  onChange={e => setNewImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #333', backgroundColor: 'rgba(255,255,255,0.02)', color: '#fff', fontSize: '14px', outline: 'none' }}
                />
              </div>
            </div>
            
            <button 
              onClick={handleAdd}
              disabled={!newTitle || !newImage}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: newTitle && newImage ? 'var(--primary-color)' : '#333',
                color: newTitle && newImage ? '#000' : '#888',
                fontWeight: 600,
                cursor: newTitle && newImage ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s'
              }}
            >
              Создать статью
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
// AdminUsers now imported from components


const AdminReviews = ({ onBack }: { onBack: () => void }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const [reviews, setReviews] = useState([
    { id: 1, product: '87101195', user: 'user-regular', rating: 5, comment: 'Отличная видеокарта, тянет всё на ультра!', status: 'pending', date: '12.05.2026' },
    { id: 2, product: '45291032', user: 'user-3', rating: 4, comment: 'Хороший проц, но греется прилично.', status: 'approved', date: '10.05.2026' },
    { id: 3, product: '11928374', user: 'user-4', rating: 2, comment: 'Пришел с браком экрана...', status: 'rejected', date: '08.05.2026' },
  ]);

  const handleStatusChange = (id: number, newStatus: 'approved' | 'rejected') => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Удалить этот отзыв?')) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  const filteredReviews = reviews.filter(r => 
    r.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ animation: 'fadeIn 0.3s ease', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', position: 'relative' }}>
        <button 
          onClick={onBack}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: '#fff', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '14px',
            padding: 0,
            position: 'absolute',
            left: 0,
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
        >
          <ChevronLeft size={18} />
          {t('common.back')}
        </button>
        <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#fff' }}>
          Модерация отзывов
        </h2>
        
        <div style={{ position: 'absolute', right: 0, width: '300px' }}>
          <input 
            type="text" 
            placeholder="Поиск по ID товара, ID клиента или тексту..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px 15px 10px 40px', 
              borderRadius: '8px', 
              border: '1px solid var(--border-color)', 
              backgroundColor: '#111', 
              color: '#fff',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <Search size={16} color="#888" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>ID Товара</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>ID Клиента</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>Оценка</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>Комментарий</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>Статус</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((review, idx) => (
                <tr key={review.id} style={{ borderBottom: idx === filteredReviews.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                  <td style={{ padding: '15px 20px', fontSize: '14px' }}>
                    <button 
                      onClick={() => alert(`Opening product details for ${review.product}...`)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'var(--primary-color)', 
                        cursor: 'pointer', 
                        fontSize: '14px', 
                        padding: 0,
                        fontWeight: 600,
                        textDecoration: 'underline'
                      }}
                    >
                      {review.product}
                    </button>
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: '14px' }}>
                    <button 
                      onClick={() => alert(`Opening client profile for ${review.user}...`)}
                      style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: 'var(--primary-color)', 
                        cursor: 'pointer', 
                        fontSize: '14px', 
                        padding: 0,
                        fontWeight: 600,
                        textDecoration: 'underline'
                      }}
                    >
                      {review.user}
                    </button>
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: '14px', color: '#fff' }}>{review.rating}/5</td>
                  <td style={{ padding: '15px 20px', fontSize: '14px', color: '#fff', maxWidth: '300px' }}>{review.comment}</td>
                  <td style={{ padding: '15px 20px', fontSize: '14px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '12px', 
                      fontWeight: 600,
                      backgroundColor: review.status === 'approved' ? 'rgba(166, 206, 57, 0.1)' : review.status === 'rejected' ? 'rgba(255, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      color: review.status === 'approved' ? 'var(--primary-color)' : review.status === 'rejected' ? '#ff4d4d' : '#aaa'
                    }}>
                      {review.status === 'approved' ? 'Одобрен' : review.status === 'rejected' ? 'Отклонен' : 'Ожидает'}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px' }}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {review.status !== 'approved' && (
                        <button 
                          onClick={() => handleStatusChange(review.id, 'approved')}
                          style={{ background: 'none', border: 'none', color: '#A6CE39', cursor: 'pointer' }}
                          title="Одобрить"
                        >
                          <Check size={18} />
                        </button>
                      )}
                      {review.status !== 'rejected' && (
                        <button 
                          onClick={() => handleStatusChange(review.id, 'rejected')}
                          style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}
                          title="Отклонить"
                        >
                          <X size={18} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(review.id)}
                        style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
                        title="Удалить"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const { t } = useTranslation();
  const { user } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'manager')) {
      navigate('/');
    }
  }, [user, navigate]);
  const [activeView, setActiveView] = useState<'dashboard' | 'products' | 'specs' | 'categories' | 'subcategories' | 'viewOrders' | 'tradeInRequests' | 'editBlog' | 'userDatabase' | 'reviewModeration'>(
    user?.role === 'manager' ? 'userDatabase' : 'dashboard'
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    if (view && ['products', 'specs', 'categories', 'subcategories', 'viewOrders', 'tradeInRequests', 'editBlog', 'userDatabase', 'reviewModeration'].includes(view)) {
      setActiveView(view as any);
    } else if (user?.role === 'admin') {
      // Since dashboard moved to profile, redirect admin to profile if no view is specified
      navigate('/profile');
    }
  }, [user, navigate]);
  const [selectedSpecCategory, setSelectedSpecCategory] = useState<string | null>(null);
  const [categorySpecs, setCategorySpecs] = useState<Record<string, string[]>>({});
  const [isAddingParam, setIsAddingParam] = useState(false);
  const [newParamName, setNewParamName] = useState('');
  const [isEditingSpecs, setIsEditingSpecs] = useState(false);
  const [categorySubcategories, setCategorySubcategories] = useState<Record<string, string[]>>({});
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const handleAddParam = () => {
    if (!selectedSpecCategory || !newParamName.trim()) return;
    
    const trimmedName = newParamName.trim();
    const isSpecs = activeView === 'specs';
    const currentData = isSpecs ? (categorySpecs[selectedSpecCategory] || []) : (categorySubcategories[selectedSpecCategory] || []);
    
    if (currentData.some(p => p.toLowerCase() === trimmedName.toLowerCase())) {
      alert(`Такой ${isSpecs ? 'параметр' : 'подкатегория'} уже существует в этой категории`);
      return;
    }

    if (isSpecs) {
      setCategorySpecs(prev => ({
        ...prev,
        [selectedSpecCategory]: [...currentData, trimmedName]
      }));
    } else {
      setCategorySubcategories(prev => ({
        ...prev,
        [selectedSpecCategory]: [...currentData, trimmedName]
      }));
    }
    setNewParamName('');
    setIsAddingParam(false);
  };

  const handleDeleteParam = (paramToDelete: string) => {
    if (!selectedSpecCategory) return;
    if (activeView === 'specs') {
      setCategorySpecs(prev => ({
        ...prev,
        [selectedSpecCategory]: prev[selectedSpecCategory].filter(p => p !== paramToDelete)
      }));
    } else {
      setCategorySubcategories(prev => ({
        ...prev,
        [selectedSpecCategory]: prev[selectedSpecCategory].filter(p => p !== paramToDelete)
      }));
    }
  };

  const handleUpdateParam = (oldName: string, newName: string) => {
    if (!selectedSpecCategory) return;
    if (activeView === 'specs') {
      setCategorySpecs(prev => ({
        ...prev,
        [selectedSpecCategory]: prev[selectedSpecCategory].map(p => p === oldName ? newName : p)
      }));
    } else {
      setCategorySubcategories(prev => ({
        ...prev,
        [selectedSpecCategory]: prev[selectedSpecCategory].map(p => p === oldName ? newName : p)
      }));
    }
  };

  const handleDragStart = (idx: number) => {
    setDraggedItemIndex(idx);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetIdx: number) => {
    if (draggedItemIndex === null || draggedItemIndex === targetIdx || !selectedSpecCategory) return;

    const isSpecs = activeView === 'specs';
    const list = isSpecs ? [...(categorySpecs[selectedSpecCategory] || [])] : [...(categorySubcategories[selectedSpecCategory] || [])];
    
    const [movedItem] = list.splice(draggedItemIndex, 1);
    list.splice(targetIdx, 0, movedItem);

    if (isSpecs) {
      setCategorySpecs(prev => ({ ...prev, [selectedSpecCategory]: list }));
    } else {
      setCategorySubcategories(prev => ({ ...prev, [selectedSpecCategory]: list }));
    }
    
    setDraggedItemIndex(null);
  };

  const sections = [
    {
      id: 'catalog',
      title: t('admin.sections.catalog'),
      icon: <Package size={24} color="#A6CE39" />,
      actions: [
        { id: 'products', label: t('admin.actions.addEditDelete'), icon: <Plus size={16} /> },
        { id: 'specs', label: t('admin.actions.specs'), icon: <Settings size={16} /> },
        { id: 'categories', label: t('admin.actions.categoriesAndSubcategories'), icon: <Layers size={16} /> },
      ]
    },
    {
      id: 'orders',
      title: t('admin.sections.orders'),
      icon: <ShoppingBag size={24} color="#A6CE39" />,
      actions: [
        { id: 'viewOrders', label: t('admin.actions.viewOrders'), icon: <List size={16} /> },
        { id: 'returns', label: t('admin.actions.returns'), icon: <RefreshCw size={16} /> },
        { id: 'tradeInRequests', label: t('admin.actions.tradeInRequests'), icon: <FileText size={16} /> },
      ]
    },
    {
      id: 'users',
      title: t('admin.sections.users'),
      icon: <Users size={24} color="#A6CE39" />,
      actions: [
        { id: 'userDatabase', label: t('admin.actions.userDatabase'), icon: <List size={16} /> },
        { id: 'editBlog', label: t('admin.actions.editBlog'), icon: <FileText size={16} /> },
        { id: 'reviewModeration', label: t('admin.actions.reviewModeration'), icon: <MessageSquare size={16} /> },
      ]
    }
  ];

  const handleActionClick = (actionId: string) => {
    if (['products', 'specs', 'categories', 'subcategories', 'viewOrders', 'tradeInRequests', 'editBlog', 'userDatabase', 'reviewModeration'].includes(actionId)) {
      setActiveView(actionId as any);
      setSelectedSpecCategory(null); // Reset category when switching views
      setIsEditingSpecs(false);
      setIsAddingParam(false);
    } else {
      alert(`Feature "${actionId}" is coming soon!`);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <section className="section" style={{ padding: '10px 0 40px 0' }}>
        <div className="container">
          {activeView === 'dashboard' ? (
            <>
              <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, marginBottom: '20px' }}>
                {t('profile.adminTitle')}
              </h1>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                gap: '20px' 
              }}>
                {sections.map((section) => (
                  <div 
                    key={section.id}
                    style={{ 
                      backgroundColor: 'var(--card-bg)', 
                      borderRadius: '12px', 
                      padding: '20px',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                      {section.icon}
                      <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#fff' }}>
                        {section.title}
                      </h2>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {section.actions.map((action, idx) => (
                        <button 
                          key={idx}
                          onClick={() => handleActionClick(action.id)}
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px', 
                            padding: '12px 16px', 
                            backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                            border: '1px solid var(--border-color)', 
                            borderRadius: '8px', 
                            color: '#fff', 
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            textAlign: 'left'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--primary-color)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-color)';
                          }}
                        >
                          <span style={{ color: 'var(--primary-color)' }}>{action.icon}</span>
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : activeView === 'products' ? (
            <AdminProducts onBack={() => navigate('/profile')} />
          ) : activeView === 'viewOrders' ? (
            <AdminOrders onBack={() => navigate('/profile')} />
          ) : activeView === 'tradeInRequests' ? (
            <AdminTradeIn onBack={() => navigate('/profile')} />
          ) : activeView === 'editBlog' ? (
            <AdminBlog onBack={() => navigate('/profile')} />
          ) : activeView === 'userDatabase' ? (
            <AdminUsers onBack={() => navigate('/profile')} />
          ) : activeView === 'reviewModeration' ? (
            <AdminReviews onBack={() => navigate('/profile')} />
          ) : (
            <div style={{ animation: 'fadeIn 0.3s ease', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', position: 'relative' }}>
                <button 
                  onClick={() => navigate('/profile')}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#fff', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    fontSize: '14px',
                    padding: 0,
                    position: 'absolute',
                    left: 0,
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
                >
                  <ChevronLeft size={18} />
                  {t('common.back')}
                </button>
                <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0, color: '#fff' }}>
                  {activeView === 'specs' ? t('admin.actions.specs') : 
                   activeView === 'categories' ? t('admin.actions.categoriesAndSubcategories') : 
                   t('admin.actions.subcategories')}
                </h2>
              </div>

              <div style={{ display: 'flex', gap: '25px' }}>
                <div style={{ width: '280px', flexShrink: 0 }}>
                  <AdminSpecFilters 
                    selectedCategory={selectedSpecCategory}
                    hideTitle={activeView === 'categories'}
                    onSelect={(cat) => {
                      setSelectedSpecCategory(prev => prev === cat ? null : cat);
                      setIsEditingSpecs(false);
                    }}
                  />
                </div>
                <div style={{ 
                  flex: 1, 
                  backgroundColor: 'var(--card-bg)', 
                  borderRadius: '12px', 
                  border: '1px solid var(--border-color)',
                  padding: '20px 20px 0px 20px',
                  minHeight: '600px',
                  position: 'relative'
                }}>
                  {selectedSpecCategory && (
                    <div style={{ 
                      position: 'absolute', 
                      top: '15px', 
                      left: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      animation: 'fadeIn 0.3s ease'
                    }}>
                      <span style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>
                        {selectedSpecCategory}
                      </span>
                      <button 
                        onClick={() => {
                          const nextEditing = !isEditingSpecs;
                          setIsEditingSpecs(nextEditing);
                          if (!nextEditing) {
                            setIsAddingParam(false);
                            setNewParamName('');
                          }
                        }}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: isEditingSpecs ? '#fff' : 'var(--primary-color)', 
                          backgroundColor: isEditingSpecs ? 'var(--primary-color)' : 'transparent',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          padding: '4px',
                          transition: 'all 0.2s',
                          transform: isEditingSpecs ? 'scale(1.1)' : 'scale(1)'
                        }}
                        onMouseEnter={(e) => {
                          if (!isEditingSpecs) e.currentTarget.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isEditingSpecs) e.currentTarget.style.transform = 'scale(1)';
                        }}
                        title={t('common.edit')}
                      >
                        <Edit2 size={20} />
                      </button>
                    </div>
                  )}
                  
                  {!selectedSpecCategory ? (
                    <div style={{ color: '#888', textAlign: 'center', marginTop: '100px' }} />
                  ) : (
                    <div style={{ marginTop: '60px', color: '#fff', animation: 'fadeIn 0.3s ease' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        {(activeView === 'specs' ? (categorySpecs[selectedSpecCategory] || []) : (categorySubcategories[selectedSpecCategory] || [])).map((spec, idx) => (
                          <div 
                            key={`${selectedSpecCategory}-${idx}`}
                            draggable={isEditingSpecs}
                            onDragStart={() => handleDragStart(idx)}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(idx)}
                            style={{ 
                              padding: isEditingSpecs ? '4px 4px 4px 12px' : '12px 16px', 
                              backgroundColor: draggedItemIndex === idx ? 'rgba(166, 206, 57, 0.1)' : 'rgba(255,255,255,0.03)', 
                              borderRadius: '8px',
                              border: draggedItemIndex === idx ? '1px dashed var(--primary-color)' : '1px solid var(--border-color)',
                              fontSize: '14px',
                              color: '#fff',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              height: '45px',
                              cursor: isEditingSpecs ? 'grab' : 'default',
                              opacity: draggedItemIndex === idx ? 0.8 : 1,
                              transition: 'all 0.2s'
                            }}
                          >
                            {isEditingSpecs ? (
                              <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                                  <GripVertical size={16} color="#444" style={{ cursor: 'grab' }} />
                                  <input 
                                    type="text"
                                    value={spec}
                                    onChange={(e) => handleUpdateParam(spec, e.target.value)}
                                    style={{
                                      backgroundColor: 'transparent',
                                      border: 'none',
                                      color: '#fff',
                                      fontSize: '14px',
                                      width: '100%',
                                      outline: 'none',
                                      padding: 0
                                    }}
                                  />
                                </div>
                                <button 
                                  onClick={() => handleDeleteParam(spec)}
                                  style={{ 
                                    background: 'none', 
                                    border: 'none', 
                                    color: '#888', 
                                    cursor: 'pointer',
                                    width: '37px',
                                    height: '37px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'all 0.2s',
                                    borderRadius: '6px'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#ef4444';
                                    e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#888';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                  title={t('common.delete')}
                                >
                                  <Trash2 size={18} />
                                </button>
                              </>
                            ) : (
                              spec
                            )}
                          </div>
                        ))}

                        {isEditingSpecs && !isAddingParam && (
                          <button 
                            onClick={() => setIsAddingParam(true)}
                            style={{ 
                              backgroundColor: 'transparent', 
                              border: '1px dashed var(--primary-color)', 
                              color: 'var(--primary-color)',
                              padding: '12px 16px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '14px',
                              transition: 'all 0.2s',
                              height: '45px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(166, 206, 57, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <Plus size={16} />
                            {t('common.add')} {activeView === 'specs' ? 'параметр' : 'подкатегорию'}
                          </button>
                        )}

                        {isAddingParam && (
                          <div style={{ 
                            display: 'flex',
                            gap: '8px',
                            height: '45px',
                            alignItems: 'center'
                          }}>
                            <input 
                              autoFocus
                              type="text" 
                              placeholder={activeView === 'specs' ? "Название параметра" : "Название подкатегории"} 
                              value={newParamName}
                              onChange={(e) => setNewParamName(e.target.value)}
                              onKeyDown={(e) => e.key === 'Enter' && handleAddParam()}
                              style={{ 
                                flex: 1, 
                                backgroundColor: 'rgba(255,255,255,0.03)', 
                                border: '1px solid var(--border-color)', 
                                borderRadius: '8px', 
                                padding: '12px 16px', 
                                color: '#fff',
                                fontSize: '14px',
                                height: '100%',
                                transition: 'border-color 0.2s'
                              }} 
                              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--primary-color)'}
                              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                            />
                            <button 
                              onClick={handleAddParam}
                              style={{ 
                                backgroundColor: 'var(--primary-color)', 
                                border: 'none', 
                                color: '#000', 
                                padding: '0 16px', 
                                borderRadius: '8px', 
                                fontWeight: 600,
                                cursor: 'pointer',
                                height: '100%',
                                fontSize: '14px',
                                transition: 'transform 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                              OK
                            </button>
                            <button 
                              onClick={() => setIsAddingParam(false)}
                              style={{ 
                                backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                                border: '1px solid rgba(239, 68, 68, 0.2)', 
                                color: '#ef4444', 
                                width: '45px',
                                height: '45px',
                                borderRadius: '8px', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                              title={t('common.delete')}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
