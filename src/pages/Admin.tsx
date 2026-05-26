import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  Plus,
  Layers,
  List,
  FileText,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  Edit2,
  Trash2,
  X,
  MessageSquare,
  Check,
  Filter,
  ArrowUp,
  ArrowDown
} from 'lucide-react';


import AdminUsers from '../components/admin/AdminUsers';
import AdminBanners from '../components/admin/AdminBanners';
import AdminProductFilters from '../components/admin/AdminProductFilters';
import { useAppContext } from '../context/AppContext';
import { api } from '../api';

const CATEGORIES_DATA = {
  'computers': {
    label: 'Компьютеры',
    subcategories: ['Игровые', 'Мини-ПК', 'Моноблоки', 'Рабочие станции']
  },
  'laptops': {
    label: 'Ноутбуки',
    subcategories: ['Игровые', 'Для учёбы', 'MacBook']
  },
  'cpus': {
    label: 'Процессоры',
    subcategories: ['Процессоры AMD с 3D V-Cache', 'Производительная iGPU', 'Процессор для игровых ПК', 'Процессор для рабочих станций']
  },
  'gpus': {
    label: 'Видеокарты',
    subcategories: ['Игровая видеокарта NVIDIA', 'Игровая видеокарта AMD', 'Профессиональная видеокарта']
  },
  'motherboards': {
    label: 'Материнские платы',
    subcategories: ['Для AMD', 'Для Intel', 'С Wi-Fi']
  },
  'ram': {
    label: 'Оперативная память',
    subcategories: ['Комплект 2x16 ГБ DDR5', 'Комплект 2x8 ГБ DDR5', 'DDR5 6000 МТ/с CL30']
  },
  'storage': {
    label: 'Дисковые накопители',
    subcategories: ['HDD накопитель', 'SSD накопитель', 'SSD с интерфейсом PCIe 4.0']
  },
  'cases': {
    label: 'Корпуса',
    subcategories: ['Корпус с предустановленными вентиляторами', 'Компактный Mini ITX корпус', 'Корпус с окном из закаленного стекла']
  },
  'cooling': {
    label: 'Системы охлаждения',
    subcategories: ['Водяное охлаждение для Intel 1700/AMD AM5', 'Воздушный кулер для Intel 1700/AMD AM5', 'Вентиляторы с подсветкой']
  },
  'psus': {
    label: 'Блоки питания',
    subcategories: ['1600 Вт и более', '80 PLUS Titanium', 'ATX']
  }
};

// 10 hardcoded categories — not editable, match the sidebar filters 1:1
const HARDCODED_CATEGORIES = [
  { key: 'computers',    label: 'Компьютеры' },
  { key: 'laptops',      label: 'Ноутбуки' },
  { key: 'cpus',         label: 'Процессоры' },
  { key: 'gpus',         label: 'Видеокарты' },
  { key: 'motherboards', label: 'Материнские платы' },
  { key: 'ram',          label: 'Оперативная память' },
  { key: 'storage',      label: 'Дисковые накопители' },
  { key: 'cases',        label: 'Корпуса' },
  { key: 'cooling',      label: 'Охлаждение' },
  { key: 'psus',         label: 'Блоки питания' },
];

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
    oldPrice: '',
    status: 'Available',
    description: '',
    category: '', // DB Category ID string
    subcategory: '',
    brandId: '',
    images: [] as string[],
    imageFiles: [] as File[],
    attributes: {} as Record<number, string>
  });

  const [products, setProducts] = useState<any[]>([]);
  const [brands, setBrands] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [topLevelCategories, setTopLevelCategories] = useState<{ id: number; name: string }[]>([]);
  const [attributes, setAttributes] = useState<{ id: number; name: string; options?: string[]; Options?: string[] }[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);

  const fetchInitialData = async () => {
    try {
      const [prodData, brandData, catData] = await Promise.all([
        api.get('/Products'),
        api.get('/Brands'),
        api.get('/Categories')
      ]);
      setProducts(prodData);
      setBrands(brandData);
      setCategories(catData);
      setTopLevelCategories(catData.filter((c: any) => Object.values(CATEGORIES_DATA).some(cd => cd.label === c.name)));
    } catch (err) {
      console.error("Failed to fetch initial admin products data:", err);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleCategoryChange = async (categoryIdStr: string) => {
    const categoryId = categoryIdStr ? Number(categoryIdStr) : null;
    setProductForm(prev => ({ ...prev, category: categoryIdStr, subcategory: '', attributes: {} }));
    setAttributes([]);
    setSubcategories([]);

    if (categoryId) {
      try {
        const attrs = await api.get(`/Attributes?categoryId=${categoryId}`);
        // Filter out duplicate Russian-only attributes if a bilingual version exists
        const filteredAttrs = attrs.filter((attr: any) => {
          return !attrs.some((a: any) => a.id !== attr.id && a.name.startsWith(attr.name + ' /'));
        });
        setAttributes(filteredAttrs);
      } catch (err) {
        console.error("Error loading attributes:", err);
      }

      const categoryObj = categories.find(c => c.id === categoryId);
      if (categoryObj) {
        const localKey = `subcategories_${categoryObj.name}`;
        const stored = localStorage.getItem(localKey);
        
        const matched = Object.values(CATEGORIES_DATA).find(c => c.label === categoryObj.name);
        const initialSubcats = matched ? matched.subcategories : [];
        
        if (stored) {
          // Merge stored and initial to ensure new defaults always appear
          const parsedStored = JSON.parse(stored);
          const merged = Array.from(new Set([...initialSubcats, ...parsedStored]));
          setSubcategories(merged);
          localStorage.setItem(localKey, JSON.stringify(merged));
        } else {
          setSubcategories(initialSubcats);
          localStorage.setItem(localKey, JSON.stringify(initialSubcats));
        }
      }
    }
  };

  const handleEditProductClick = async (p: any) => {
    setEditingProduct(p);
    
    const categoryObj = categories.find(c => c.name === p.categoryName || c.name === p.category);
    const categoryIdStr = categoryObj ? categoryObj.id.toString() : '';

    let attrs: any[] = [];
    let subcats: string[] = [];
    const oldToNewMap: Record<number, number> = {};

    const subcatObj = categories.find(c => c.name === p.subcategoryName || c.name === p.subcategory);
    const attrCategoryId = subcatObj ? subcatObj.id : (categoryObj ? categoryObj.id : null);

    if (attrCategoryId) {
      try {
        const fetchedAttrs = await api.get(`/Attributes?categoryId=${attrCategoryId}`);
        // Filter out duplicate Russian-only attributes if a bilingual version exists
        attrs = fetchedAttrs.filter((attr: any) => {
          const newAttr = fetchedAttrs.find((a: any) => a.id !== attr.id && a.name.startsWith(attr.name + ' /'));
          if (newAttr) {
            oldToNewMap[attr.id] = newAttr.id;
            return false;
          }
          return true;
        });
        setAttributes(attrs);
      } catch (err) {
        console.error("Error loading attributes:", err);
      }
    }

    if (categoryObj) {
      const localKey = `subcategories_${categoryObj.name}`;
      const stored = localStorage.getItem(localKey);
      
      const matched = Object.values(CATEGORIES_DATA).find(c => c.label === categoryObj.name);
      const initialSubcats = matched ? matched.subcategories : [];
      
      if (stored) {
        const parsedStored = JSON.parse(stored);
        const merged = Array.from(new Set([...initialSubcats, ...parsedStored]));
        subcats = merged;
        setSubcategories(subcats);
        localStorage.setItem(localKey, JSON.stringify(subcats));
      } else {
        subcats = initialSubcats;
        setSubcategories(subcats);
        localStorage.setItem(localKey, JSON.stringify(subcats));
      }
    }

    const initialAttrValues: Record<number, string> = {};
    if (p.attributes) {
      p.attributes.forEach((attr: any) => {
        let currentAttrId = attr.attributeId;
        if (currentAttrId) {
          // If this is an old attribute ID that was replaced by a new one, use the new ID
          if (oldToNewMap[currentAttrId]) {
            currentAttrId = oldToNewMap[currentAttrId];
          }
          initialAttrValues[currentAttrId] = attr.value;
        } else {
          const match = attrs.find(a => a.name === attr.attributeName);
          if (match) {
            initialAttrValues[match.id] = attr.value;
          }
        }
      });
    }

    setProductForm({
      title: p.name,
      price: p.price ? p.price.toString() : '',
      oldPrice: p.oldPrice ? p.oldPrice.toString() : '',
      status: p.status || 'Available',
      description: p.description || '',
      category: categoryIdStr,
      subcategory: p.subcategoryName || p.subcategory || '',
      brandId: p.brandId ? p.brandId.toString() : '',
      images: p.images || [],
      imageFiles: [],
      attributes: initialAttrValues
    });

    setIsProductModalOpen(true);
  };

  const handleSubcategoryChange = (subName: string) => {
    setProductForm(prev => ({ ...prev, subcategory: subName }));
  };

  const handleSaveProduct = async () => {
    if (!productForm.title.trim()) {
      alert(t('adminPage.products.noTitle'));
      return;
    }
    if (!productForm.category) {
      alert("Выберите категорию");
      return;
    }

    try {
      const uploadedUrls: string[] = productForm.images.filter(img => !img.startsWith('data:'));
      for (const file of productForm.imageFiles) {
        const formData = new FormData();
        formData.append('file', file);
        const res: any = await api.upload('/Files/upload', formData);
        if (res && res.url) {
          uploadedUrls.push(res.url);
        }
      }

      const attributesList = Object.entries(productForm.attributes)
        .filter(([_, value]) => value.trim() !== '')
        .map(([idStr, value]) => ({
          attributeId: Number(idStr),
          value: value.trim()
        }));

      const categoryObj = categories.find(c => c.id === Number(productForm.category));
      const categoryName = categoryObj ? categoryObj.name : '';

      const productPayload = {
        name: productForm.title.trim(),
        price: Number(productForm.price) || 0,
        oldPrice: productForm.oldPrice ? Number(productForm.oldPrice) : null,
        status: productForm.status,
        description: productForm.description.trim(),
        categoryName: categoryName,
        subcategoryName: productForm.subcategory || 'По умолчанию',
        brandId: productForm.brandId ? Number(productForm.brandId) : null,
        images: uploadedUrls,
        attributes: attributesList
      };

      if (editingProduct) {
        await api.put(`/Products/${editingProduct.id}`, productPayload);
        alert(t('adminPage.products.savedOk'));
      } else {
        await api.post('/Products', productPayload);
        alert(t('adminPage.products.addedOk'));
      }

      // Reload products list
      const updatedProducts = await api.get('/Products');
      setProducts(updatedProducts);

      setIsProductModalOpen(false);
      setEditingProduct(null);
      setProductForm({
        title: '',
        price: '',
        oldPrice: '',
        status: 'Available',
        description: '',
        category: '',
        subcategory: '',
        brandId: '',
        images: [],
        imageFiles: [],
        attributes: {}
      });
    } catch (err) {
      console.error('Error saving product', err);
      alert('Ошибка при сохранении товара. Проверьте консоль.');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm(t('adminPage.products.deleteConfirm'))) {
      try {
        await api.delete(`/Products/${id}`);
        setProducts(prev => prev.filter(item => item.id !== id));
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Ошибка удаления товара: " + err);
      }
    }
  };

  const handleAddBrand = async () => {
    if (!newBrandName.trim()) return;
    try {
      const created = await api.post('/Brands', { name: newBrandName.trim() });
      setBrands(prev => [...prev, created]);
      setNewBrandName('');
      setIsAddingBrand(false);
      setActiveTab('brands');
    } catch (err) {
      alert("Ошибка добавления бренда: " + err);
    }
  };

  const handleDeleteBrand = async (id: number, name: string) => {
    if (window.confirm(`Вы уверены, что хотите удалить бренд "${name}"?`)) {
      try {
        await api.delete(`/Brands/${id}`);
        setBrands(prev => prev.filter(item => item.id !== id));
      } catch (err) {
        console.error("Error deleting brand:", err);
        alert("Ошибка удаления бренда: " + err);
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBrandsForSelect = (() => {
    if (!productForm.category) return brands;

    const brandAttr = attributes.find(a => {
      const lower = a.name.toLowerCase();
      return lower.includes('производител') || lower.includes('brand') || lower.includes('manufacturer');
    });

    const opts = brandAttr?.options || (brandAttr as any)?.Options;

    if (brandAttr && opts && opts.length > 0) {
      const allowedNames = opts.map((opt: string) => opt.split(' / ')[0].trim().toLowerCase());
      return brands.filter(b => {
        const bName = b.name.split(' / ')[0].trim().toLowerCase();
        return allowedNames.includes(bName) || 
               allowedNames.some((a: string) => {
                 // only allow includes if it's a multi-word brand name or separated by space
                 if (bName === a) return true;
                 if (bName.includes(` ${a} `) || bName.startsWith(`${a} `) || bName.endsWith(` ${a}`)) return true;
                 if (a.includes(` ${bName} `) || a.startsWith(`${bName} `) || a.endsWith(` ${bName}`)) return true;
                 return false;
               });
      });
    }

    return brands;
  })();

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
              <span>{t('adminPage.products.items')}</span>
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
              <span>{t('adminPage.products.brands')}</span>
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
                    // Reset attributes, subcategories, brand list
                    setAttributes([]);
                    setSubcategories([]);
                    setProductForm({
                      title: '',
                      price: '',
                      oldPrice: '',
                      status: 'Available',
                      description: '',
                      category: '',
                      subcategory: '',
                      brandId: '',
                      images: [],
                      imageFiles: [],
                      attributes: {}
                    });
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
                placeholder={t('adminPage.products.enterBrandName')}
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
                  onClick={handleAddBrand}
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
                  {t('common.save')}
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
                  {t('common.cancel')}
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
                      {p.categoryName || p.category}
                    </td>
                    <td style={{ padding: '12px', fontSize: '14px' }}>
                      {p.subcategoryName || p.subcategory}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '25px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => handleEditProductClick(p)}
                          style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', transition: 'color 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteProduct(p.id)}
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
                          onClick={async () => {
                            const newName = prompt('Введите новое название бренда:', b.name);
                            if (newName && newName.trim()) {
                              try {
                                await api.put(`/Brands/${b.id}`, { name: newName.trim() });
                                setBrands(brands.map(item => item.id === b.id ? { ...item, name: newName.trim() } : item));
                              } catch (err) {
                                alert("Ошибка изменения бренда: " + err);
                              }
                            }
                          }}
                          style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', transition: 'color 0.2s' }}
                          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteBrand(b.id, b.name)}
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
                maxWidth: '650px', 
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
                    {editingProduct ? t('adminPage.products.editProduct') : t('adminPage.products.addProduct')}
                  </h3>
                  <button 
                    onClick={() => {
                      setIsProductModalOpen(false);
                      setEditingProduct(null);
                      setProductForm({ title: '', price: '', oldPrice: '', status: 'Available', description: '', category: '', subcategory: '', brandId: '', images: [], imageFiles: [], attributes: {} });
                    }}
                    style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div style={{ padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>{t('adminPage.products.titleLabel')}</label>
                    <input 
                      type="text" 
                      placeholder={t('adminPage.products.titlePlaceholder')}
                      value={productForm.title}
                      onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                      style={{ width: '100%', padding: '12px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>{t('adminPage.products.priceLabel')}</label>
                      <input 
                        type="number"
                        placeholder="0"
                        value={productForm.price}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '' || Number(val) >= 0) {
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
                          appearance: 'none'
                        }}
                      />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>Старая цена</label>
                      <input 
                        type="number"
                        placeholder="0"
                        value={productForm.oldPrice}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '' || Number(val) >= 0) {
                            setProductForm({...productForm, oldPrice: val});
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
                          appearance: 'none'
                        }}
                      />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>{t('adminPage.products.categoryLabel')}</label>
                      <select 
                        value={productForm.category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          backgroundColor: '#111', 
                          border: '1px solid #333', 
                          borderRadius: '8px', 
                          color: '#fff', 
                          outline: 'none', 
                          cursor: 'pointer',
                          height: '45px'
                        }}
                      >
                        <option value="">Выберите...</option>
                        {topLevelCategories.map((c) => (
                          <option key={c.id} value={c.id.toString()}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '15px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>{t('adminPage.products.subcategoryLabel')}</label>
                      <select 
                        disabled={!productForm.category}
                        value={productForm.subcategory}
                        onChange={(e) => handleSubcategoryChange(e.target.value)}
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
                        {subcategories.map((sub: string) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>Бренд</label>
                      <select 
                        value={productForm.brandId}
                        onChange={(e) => setProductForm({...productForm, brandId: e.target.value})}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          backgroundColor: '#111', 
                          border: '1px solid #333', 
                          borderRadius: '8px', 
                          color: '#fff', 
                          outline: 'none', 
                          cursor: 'pointer',
                          height: '45px'
                        }}
                      >
                        <option value="">Выберите бренд (опционально)...</option>
                        {filteredBrandsForSelect.map((b) => (
                          <option key={b.id} value={b.id.toString()}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>Наличие</label>
                      <select 
                        value={productForm.status}
                        onChange={(e) => setProductForm({...productForm, status: e.target.value})}
                        style={{ 
                          width: '100%', 
                          padding: '12px', 
                          backgroundColor: '#111', 
                          border: '1px solid #333', 
                          borderRadius: '8px', 
                          color: '#fff', 
                          outline: 'none', 
                          cursor: 'pointer',
                          height: '45px'
                        }}
                      >
                        <option value="Available">В наличии</option>
                        <option value="Out of stock">Нет в наличии</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>Описание</label>
                    <textarea 
                      placeholder="Введите описание товара..."
                      value={productForm.description}
                      onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                      style={{ width: '100%', height: '80px', padding: '12px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  {/* Dynamic Characteristics */}
                  {attributes.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <label style={{ display: 'block', color: '#888', fontSize: '14px', fontWeight: 600, borderBottom: '1px solid #333', paddingBottom: '6px' }}>
                        Характеристики категории
                      </label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        {attributes.map(attr => (
                          <div key={attr.id} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <label style={{ display: 'block', color: '#aaa', fontSize: '13px' }}>{attr.name}</label>
                            <input 
                              type="text" 
                              placeholder="Значение"
                              list={`attr-options-${attr.id}`}
                              value={productForm.attributes[attr.id] || ''}
                              onChange={(e) => setProductForm({
                                ...productForm,
                                attributes: {
                                  ...productForm.attributes,
                                  [attr.id]: e.target.value
                                }
                              })}
                              style={{ width: '100%', padding: '10px 12px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', fontSize: '14px' }}
                            />
                            <datalist id={`attr-options-${attr.id}`}>
                              {(attr.options || attr.Options || []).map((opt: string) => (
                                <option key={opt} value={opt} />
                              ))}
                            </datalist>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>{t('adminPage.products.imagesLabel')}</label>
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
                              const newImageFiles = [...productForm.imageFiles];
                              newImages.splice(i, 1);
                              newImageFiles.splice(i, 1);
                              setProductForm({...productForm, images: newImages, imageFiles: newImageFiles});
                            }}
                          >
                            <Trash2 size={20} color="#fff" />
                          </div>
                        </div>
                      ))}

                      {/* Add Button */}
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
                                    images: [...prev.images, reader.result as string].slice(0, 5),
                                    imageFiles: [...prev.imageFiles, file].slice(0, 5)
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
                    onClick={() => {
                      setIsProductModalOpen(false);
                      setEditingProduct(null);
                      setProductForm({ title: '', price: '', oldPrice: '', status: 'Available', description: '', category: '', subcategory: '', brandId: '', images: [], imageFiles: [], attributes: {} });
                    }}
                    style={{ padding: '10px 25px', backgroundColor: 'transparent', border: '1px solid #333', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
                  >
                    {t('common.cancel')}
                  </button>
                  <button 
                    onClick={handleSaveProduct}
                    style={{ padding: '10px 25px', backgroundColor: 'var(--primary-color)', border: 'none', borderRadius: '8px', color: '#000', cursor: 'pointer', fontWeight: 600 }}
                  >
                    {t('common.save') || 'Сохранить'}
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
  const [orders, setOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusModal, setStatusModal] = useState<{ orderId: string, currentStatus: string } | null>(null);
  const [userDetailsModal, setUserDetailsModal] = useState<any | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res: any = await api.get('/Orders');
      setOrders(res);
    } catch (err) {
      console.error("Failed to load admin orders", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await api.put(`/Orders/${orderId}/status`, { status: newStatus });
      setOrders(prev => prev.map(o => o.id.toString() === orderId.toString() ? { ...o, status: newStatus } : o));
      setStatusModal(null);
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Не удалось обновить статус");
    }
  };

  const handleUserClick = async (userId: string) => {
    try {
      const res = await api.get(`/Users/${userId}`);
      setUserDetailsModal(res);
    } catch (err) {
      console.error("Failed to load user data", err);
      alert("Не удалось загрузить данные клиента");
    }
  };

  const filteredOrders = orders.filter(order => 
    order.id.toString().includes(searchQuery.toLowerCase()) ||
    (order.username && order.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    switch (s) {
      case 'pending': return '#eab308';
      case 'shipped': return '#3b82f6';
      case 'delivered': return '#A6CE39';
      case 'returned': return '#ff4d4d';
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
            placeholder={t('adminPage.orders.searchPlaceholder')} 
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
                <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888', fontWeight: 500 }}>{t('adminPage.orders.idOrder')}</th>
                <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888', fontWeight: 500 }}>{t('adminPage.orders.date')}</th>
                <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888', fontWeight: 500 }}>{t('adminPage.orders.idClient')}</th>
                <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888', fontWeight: 500 }}>{t('adminPage.orders.items')}</th>
                <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888', fontWeight: 500 }}>{t('adminPage.orders.total')}</th>
                <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888', fontWeight: 500 }}>{t('adminPage.orders.status')}</th>
                <th style={{ padding: '15px 20px', fontSize: '14px', color: '#888', fontWeight: 500 }}>{t('adminPage.orders.management')}</th>
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
                    {new Date(order.orderDate || order.date).toLocaleDateString('ru-RU')}
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: '14px' }}>
                    <button 
                      onClick={() => handleUserClick(order.userId)}
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
                      {order.username}
                    </button>
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: '14px', color: '#fff', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {order.items.map((i: any) => i.name || i.title).join(', ')}
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
                      {order.status}
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
                      {t('adminPage.orders.changeStatus')}
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
            <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: 700, color: '#fff' }}>{t('adminPage.orders.changeStatusTitle')}</h3>
            <p style={{ margin: '0 0 25px 0', fontSize: '14px', color: '#888' }}>
              {t('adminPage.orders.changeStatusDesc')} <span style={{ color: 'var(--primary-color)' }}>{statusModal.orderId}</span>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
              {[
                { id: 'Pending', label: 'В обработке (Pending)' },
                { id: 'Shipped', label: 'Отправлен (Shipped)' },
                { id: 'Delivered', label: 'Доставлен (Delivered)' },
                { id: 'Returned', label: 'Возврат (Returned)' }
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
                {t('common.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}

      {userDetailsModal && (
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
            <button 
              onClick={() => setUserDetailsModal(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <h3 style={{ margin: '0 0 5px 0', fontSize: '20px', fontWeight: 700, color: '#fff' }}>Данные клиента</h3>
            <p style={{ margin: '0 0 25px 0', fontSize: '14px', color: '#888' }}>ID: {userDetailsModal.id}</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ color: '#888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</span>
                <span style={{ color: '#fff', fontSize: '15px' }}>{userDetailsModal.email || 'Не указано'}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ color: '#888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Имя и Фамилия</span>
                <span style={{ color: '#fff', fontSize: '15px' }}>
                  {userDetailsModal.username} {userDetailsModal.lastName || ''}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ color: '#888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Телефон</span>
                <span style={{ color: '#fff', fontSize: '15px' }}>{userDetailsModal.phone || 'Не указано'}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ color: '#888', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Адрес доставки</span>
                <span style={{ color: '#fff', fontSize: '15px' }}>
                  {userDetailsModal.city || userDetailsModal.street 
                    ? `${userDetailsModal.city || ''}, ${userDetailsModal.street || ''}`
                    : 'Не указан'}
                </span>
              </div>
            </div>

            <button 
              onClick={() => setUserDetailsModal(null)}
              style={{ 
                width: '100%', 
                padding: '12px', 
                borderRadius: '100px', 
                border: 'none', 
                backgroundColor: 'var(--primary-color)', 
                color: '#000', 
                fontSize: '14px', 
                fontWeight: 600, 
                cursor: 'pointer'
              }}
            >
              Закрыть
            </button>
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
      case 'pending': return t('adminPage.tradeIn.statusPending');
      case 'evaluated': return t('adminPage.tradeIn.statusEvaluated');
      case 'accepted': return t('adminPage.tradeIn.statusAccepted');
      case 'rejected': return t('adminPage.tradeIn.statusRejected');
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
          {t('admin.actions.tradeInRequests')}
        </h2>
        
        <div style={{ position: 'absolute', right: 0, width: '300px' }}>
          <input 
            type="text" 
            placeholder={t('adminPage.tradeIn.searchPlaceholder')} 
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
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500, width: '160px' }}>{t('adminPage.tradeIn.idRequest')}</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>{t('adminPage.tradeIn.date')}</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>{t('adminPage.tradeIn.idClient')}</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>{t('adminPage.tradeIn.category')}</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>{t('adminPage.tradeIn.status')}</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>{t('adminPage.tradeIn.appraisal')}</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500, width: '150px' }}>{t('adminPage.tradeIn.condition')}</th>
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
                      <span style={{ color: '#ff4d4d', fontSize: '13px', fontWeight: 600 }}>{t('adminPage.tradeIn.rejected')}</span>
                    ) : req.status === 'accepted' ? (
                      <span style={{ color: '#A6CE39', fontSize: '13px', fontWeight: 600 }}>{t('adminPage.tradeIn.accepted')}</span>
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
                        {req.status === 'pending' ? t('adminPage.tradeIn.evaluate') : t('adminPage.tradeIn.changeAppraisal')}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '40px 20px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
                    {t('common.noData')}
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
            <h3 style={{ margin: '0 0 10px 0', fontSize: '20px', fontWeight: 700, color: '#fff' }}>{t('adminPage.tradeIn.evalTitle')}</h3>
            <p style={{ margin: '0 0 25px 0', fontSize: '14px', color: '#888' }}>
              {t('adminPage.tradeIn.evalDesc')} <span style={{ color: 'var(--primary-color)' }}>{evalModal.id}</span>
            </p>

            <div style={{ marginBottom: '30px' }}>
              <input 
                type="text"
                value={evalModal.amount}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setEvalModal({ ...evalModal, amount: val });
                }}
                placeholder={t('adminPage.tradeIn.evalPlaceholder')}
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
                    alert(t('adminPage.tradeIn.evalInvalid'));
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
                {t('adminPage.tradeIn.evaluate')}
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
                <h3 style={{ margin: '0 0 5px 0', fontSize: '20px', fontWeight: 700, color: '#fff' }}>{t('adminPage.tradeIn.detailsTitle')}</h3>
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
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{t('adminPage.tradeIn.category')}</div>
                  <div style={{ fontSize: '14px', color: '#fff', fontWeight: 500 }}>{t(`tradeIn.form.categories.${detailsModal.category}`)}</div>
                </div>

                <div style={{ flex: 1, padding: '15px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>{t('adminPage.tradeIn.condition')}</div>
                  <div style={{ fontSize: '14px', color: '#fff', fontWeight: 500 }}>
                    {detailsModal.condition === 'new' ? t('adminPage.tradeIn.conditionNew') : t('adminPage.tradeIn.conditionUsed')}
                  </div>
                </div>
              </div>

              <div style={{ padding: '15px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{t('adminPage.tradeIn.descLabel')}</div>
                <div style={{ fontSize: '14px', color: '#fff', lineHeight: '1.5', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
                  {detailsModal.description || <span style={{ color: '#555', fontStyle: 'italic' }}>{t('adminPage.tradeIn.noDescription')}</span>}
                </div>
              </div>
            </div>

            {(detailsModal.photos && detailsModal.photos.length > 0) ? (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>{t('adminPage.tradeIn.photosLabel')} ({detailsModal.photos.length})</div>
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
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '10px' }}>{t('adminPage.tradeIn.photosLabel')}</div>
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
              {t('common.close')}
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
          <span style={{ color: '#fff', fontSize: '15px', fontWeight: 600 }}>{t('adminPage.blog.addArticle')}</span>
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
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#fff' }}>{t('adminPage.blog.newArticle')}</h3>
              <button 
                onClick={() => setIsAdding(false)}
                style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: '5px' }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: '12px', marginBottom: '5px' }}>{t('adminPage.blog.titleLabel')}</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder={t('adminPage.blog.titlePlaceholder')}
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #333', backgroundColor: 'rgba(255,255,255,0.02)', color: '#fff', fontSize: '14px', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', color: '#888', fontSize: '12px', marginBottom: '5px' }}>{t('adminPage.blog.imageLabel')}</label>
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
              {t('adminPage.blog.createArticle')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
// AdminUsers now imported from components


export const _AdminReviews = ({ onBack }: { onBack: () => void }) => {
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
          {t('admin.actions.reviewModeration')}
        </h2>
        
        <div style={{ position: 'absolute', right: 0, width: '300px' }}>
          <input 
            type="text" 
            placeholder={t('adminPage.reviews.searchPlaceholder')} 
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
  const [activeView, setActiveView] = useState<'dashboard' | 'products' | 'categories' | 'viewOrders' | 'tradeInRequests' | 'editBlog' | 'userDatabase' | 'editBanners'>(
    user?.role === 'manager' ? 'userDatabase' : 'dashboard'
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const view = params.get('view');
    if (view && ['products', 'categories', 'viewOrders', 'tradeInRequests', 'editBlog', 'userDatabase', 'editBanners'].includes(view)) {
      setActiveView(view as any);
    } else if (user?.role === 'admin') {
      // Since dashboard moved to profile, redirect admin to profile if no view is specified
      navigate('/profile');
    }
  }, [user, navigate]);
  const [dbCategories, setDbCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedDbCategory, setSelectedDbCategory] = useState<{ id: number; name: string } | null>(null);
  const [dbAttributes, setDbAttributes] = useState<{ id: number; name: string; categoryId: number | null; options?: string[]; Options?: string[] }[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);

  useEffect(() => {
    // subcategories are stored but not yet rendered in the admin panel
    if (subcategories.length > 0) {
      console.log("Subcategories stored in state:", subcategories);
    }
  }, [subcategories]);
  
  // UI editing states for attributes
  const [editingAttributeId, setEditingAttributeId] = useState<number | null>(null);
  const [editingAttributeName, setEditingAttributeName] = useState('');
  const [isAddingAttribute, setIsAddingAttribute] = useState(false);
  const [newAttributeName, setNewAttributeName] = useState('');
  const [newAttributeNameEn, setNewAttributeNameEn] = useState('');

  // UI states for attribute parameters
  const [attributeParams, setAttributeParams] = useState<Record<number, string[]>>({});
  const [addingParamAttributeId, setAddingParamAttributeId] = useState<number | null>(null);
  const [newParamName, setNewParamName] = useState('');
  const [newParamNameEn, setNewParamNameEn] = useState('');
  const [editingParamAttributeId, setEditingParamAttributeId] = useState<number | null>(null);
  const [editingParamIndex, setEditingParamIndex] = useState<number | null>(null);
  const [editingParamValue, setEditingParamValue] = useState('');

  // const [editingSubcategoryIndex, setEditingSubcategoryIndex] = useState<number | null>(null);
  // const [editingSubcategoryName, setEditingSubcategoryName] = useState('');
  // const [isAddingSubcategory, setIsAddingSubcategory] = useState(false);
  // const [newSubcategoryName, setNewSubcategoryName] = useState('');

  // const [categoryPriceFrom, setCategoryPriceFrom] = useState('');
  // const [categoryPriceTo, setCategoryPriceTo] = useState('');
  const [expandedFilterId, setExpandedFilterId] = useState<number | null>(null);

  useEffect(() => {
    setAddingParamAttributeId(null);
    setNewParamName('');
    setNewParamNameEn('');
    setEditingAttributeId(null);
    setEditingAttributeName('');
    setEditingParamAttributeId(null);
    setEditingParamIndex(null);
    setEditingParamValue('');
  }, [expandedFilterId]);

  const loadCategories = async () => {
    try {
      const data = await api.get('/Categories');
      setDbCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  useEffect(() => {
    if (activeView === 'categories') {
      loadCategories();
    }
  }, [activeView]);

  const handleSelectCategory = async (category: { id: number; name: string }) => {
    setSelectedDbCategory(category);
    setAddingParamAttributeId(null);
    setNewParamName('');
    setNewParamNameEn('');
    setIsAddingAttribute(false);
    setNewAttributeName('');
    setNewAttributeNameEn('');
    setEditingAttributeId(null);
    setEditingAttributeName('');
    setExpandedFilterId(null);
    setEditingParamAttributeId(null);
    setEditingParamIndex(null);
    setEditingParamValue('');
    
    // Load attributes from database
    try {
      const attrs = await api.get(`/Attributes?categoryId=${category.id}`);
      setDbAttributes(attrs);

      // Load parameters for each attribute from the backend options list
      const paramsMap: Record<number, string[]> = {};
      attrs.forEach((attr: any) => {
        paramsMap[attr.id] = attr.options || attr.Options || [];
      });
      setAttributeParams(paramsMap);
    } catch (err) {
      console.error("Failed to load attributes:", err);
    }

    // Load subcategories from localStorage or seed
    const localKey = `subcategories_${category.name}`;
    const stored = localStorage.getItem(localKey);
    if (stored) {
      setSubcategories(JSON.parse(stored));
    } else {
      const matched = Object.values(CATEGORIES_DATA).find(c => c.label === category.name);
      const initialSubcats = matched ? matched.subcategories : [];
      setSubcategories(initialSubcats);
      localStorage.setItem(localKey, JSON.stringify(initialSubcats));
    }
  };

  const handleAddAttribute = async () => {
    if (!selectedDbCategory || !newAttributeName.trim()) return;
    const combinedName = newAttributeNameEn.trim() ? `${newAttributeName.trim()} / ${newAttributeNameEn.trim()}` : newAttributeName.trim();
    try {
      const created = await api.post('/Attributes', {
        name: combinedName,
        categoryId: selectedDbCategory.id
      });
      setDbAttributes(prev => [...prev, created]);
      setAttributeParams(prev => ({ ...prev, [created.id]: [] }));
      setNewAttributeName('');
      setNewAttributeNameEn('');
      setIsAddingAttribute(false);
    } catch (err) {
      alert("Error adding characteristic: " + err);
    }
  };

  const handleUpdateAttribute = async (id: number) => {
    if (!selectedDbCategory || !editingAttributeName.trim()) return;
    try {
      await api.put(`/Attributes/${id}`, {
        name: editingAttributeName.trim(),
        categoryId: selectedDbCategory.id
      });
      setDbAttributes(prev => prev.map(a => a.id === id ? { ...a, name: editingAttributeName.trim() } : a));
      setEditingAttributeId(null);
    } catch (err) {
      alert("Error updating characteristic: " + err);
    }
  };

  const handleDeleteAttribute = async (id: number) => {
    if (!window.confirm("Удалить эту характеристику?")) return;
    try {
      await api.delete(`/Attributes/${id}`);
      setDbAttributes(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      alert("Error deleting characteristic: " + err);
    }
  };

  const handleAddParam = async (attributeId: number) => {
    const trimmedRu = newParamName.trim();
    const trimmedEn = newParamNameEn.trim();
    if (!trimmedRu) return;
    const combinedParam = trimmedEn ? `${trimmedRu} / ${trimmedEn}` : trimmedRu;

    const attribute = dbAttributes.find(a => a.id === attributeId);
    if (!attribute) return;

    const currentParams = attributeParams[attributeId] || [];
    if (currentParams.includes(combinedParam)) {
      alert("Этот параметр уже добавлен");
      return;
    }

    const updated = [...currentParams, combinedParam];
    try {
      await api.put(`/Attributes/${attributeId}`, {
        name: attribute.name,
        categoryId: attribute.categoryId,
        options: updated
      });
      setAttributeParams(prev => ({ ...prev, [attributeId]: updated }));
      setNewParamName('');
      setNewParamNameEn('');
      setAddingParamAttributeId(null);
    } catch (err) {
      alert("Ошибка добавления параметра: " + err);
    }
  };

  const handleDeleteParam = async (attributeId: number, indexToDelete: number) => {
    if (!window.confirm("Удалить этот параметр?")) return;
    
    const attribute = dbAttributes.find(a => a.id === attributeId);
    if (!attribute) return;

    const currentParams = attributeParams[attributeId] || [];
    const updated = currentParams.filter((_, idx) => idx !== indexToDelete);
    try {
      await api.put(`/Attributes/${attributeId}`, {
        name: attribute.name,
        categoryId: attribute.categoryId,
        options: updated
      });
      setAttributeParams(prev => ({ ...prev, [attributeId]: updated }));
    } catch (err) {
      alert("Ошибка удаления параметра: " + err);
    }
  };

  const handleUpdateParam = async (attributeId: number, indexToUpdate: number) => {
    const trimmed = editingParamValue.trim();
    if (!trimmed) return;

    const attribute = dbAttributes.find(a => a.id === attributeId);
    if (!attribute) return;

    const currentParams = attributeParams[attributeId] || [];
    if (currentParams.some((p, idx) => p.toLowerCase() === trimmed.toLowerCase() && idx !== indexToUpdate)) {
      alert("Этот параметр уже существует");
      return;
    }

    const updated = currentParams.map((p, idx) => idx === indexToUpdate ? trimmed : p);
    try {
      await api.put(`/Attributes/${attributeId}`, {
        name: attribute.name,
        categoryId: attribute.categoryId,
        options: updated
      });
      setAttributeParams(prev => ({ ...prev, [attributeId]: updated }));
      setEditingParamAttributeId(null);
      setEditingParamIndex(null);
      setEditingParamValue('');
    } catch (err) {
      alert("Ошибка изменения параметра: " + err);
    }
  };

  const handleMoveParam = async (attributeId: number, index: number, direction: 'up' | 'down') => {
    const attribute = dbAttributes.find(a => a.id === attributeId);
    if (!attribute) return;

    const currentParams = [...(attributeParams[attributeId] || [])];
    if (direction === 'up' && index > 0) {
      const temp = currentParams[index - 1];
      currentParams[index - 1] = currentParams[index];
      currentParams[index] = temp;
    } else if (direction === 'down' && index < currentParams.length - 1) {
      const temp = currentParams[index + 1];
      currentParams[index + 1] = currentParams[index];
      currentParams[index] = temp;
    } else {
      return;
    }

    const updated = currentParams;
    try {
      await api.put(`/Attributes/${attributeId}`, {
        name: attribute.name,
        categoryId: attribute.categoryId,
        options: updated
      });
      setAttributeParams(prev => ({ ...prev, [attributeId]: updated }));
    } catch (err) {
      alert("Ошибка изменения порядка параметра: " + err);
    }
  };

  const handleMoveAttribute = async (index: number, direction: 'up' | 'down') => {
    const current = [...dbAttributes];
    if (direction === 'up' && index > 0) {
      const temp = current[index - 1];
      current[index - 1] = current[index];
      current[index] = temp;
    } else if (direction === 'down' && index < current.length - 1) {
      const temp = current[index + 1];
      current[index + 1] = current[index];
      current[index] = temp;
    } else {
      return;
    }
    
    setDbAttributes(current);

    try {
      await Promise.all(current.map((attr, idx) => 
        api.put(`/Attributes/${attr.id}`, { 
          name: attr.name, 
          categoryId: attr.categoryId, 
          order: idx 
        })
      ));
    } catch (err) {
      console.error(err);
      alert("Ошибка изменения порядка характеристик");
    }
  };

  const sections = [
    {
      id: 'catalog',
      title: t('admin.sections.catalog'),
      icon: <Package size={24} color="#A6CE39" />,
      actions: [
        { id: 'products', label: t('admin.actions.addEditDelete'), icon: <Plus size={16} /> },
        { id: 'categories', label: t('admin.actions.categoriesSubcategoriesSpecs'), icon: <Layers size={16} /> },
      ]
    },
    {
      id: 'orders',
      title: t('admin.sections.orders'),
      icon: <ShoppingBag size={24} color="#A6CE39" />,
      actions: [
        { id: 'viewOrders', label: t('admin.actions.viewOrders'), icon: <List size={16} /> },
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
        { id: 'editBanners', label: t('admin.actions.editBanners'), icon: <Layers size={16} /> },
      ]
    }
  ];

  const handleActionClick = (actionId: string) => {
    if (['products', 'categories', 'viewOrders', 'tradeInRequests', 'editBlog', 'userDatabase', 'editBanners'].includes(actionId)) {
      setActiveView(actionId as any);
      setSelectedDbCategory(null); // Reset category when switching views
      setDbAttributes([]);
      setSubcategories([]);
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
          ) : activeView === 'editBanners' ? (
            <AdminBanners />
          ) : (
            <div style={{ animation: 'fadeIn 0.3s ease', color: '#fff' }}>
              {/* Header */}
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
                  {t('admin.actions.categoriesSubcategoriesSpecs')}
                </h2>
              </div>

              {/* Main Panel Grid */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                
                {/* Categories Left Panel — 1:1 visual match with Filters sidebar */}
                <div style={{ 
                  backgroundColor: '#0c0d0d',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '20px',
                  color: 'var(--text-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '280px',
                  flexShrink: 0
                }}>
                  {/* Category rows */}
                  {HARDCODED_CATEGORIES.map((cat, idx) => {
                    const isSelected = selectedDbCategory?.name === cat.label;
                    const isLast = idx === HARDCODED_CATEGORIES.length - 1;
                    return (
                      <div key={cat.key} style={{
                        borderBottom: isLast ? 'none' : '1px solid var(--border-color)',
                        paddingTop: idx === 0 ? '0' : '20px',
                        paddingBottom: isLast ? '0' : '20px'
                      }}>
                        <button 
                          onClick={async () => {
                            // Toggle: if already selected — collapse/hide right panel
                            if (isSelected) {
                              setSelectedDbCategory(null);
                              setDbAttributes([]);
                              setSubcategories([]);
                              setAddingParamAttributeId(null);
                              setNewParamName('');
                              setIsAddingAttribute(false);
                              setNewAttributeName('');
                              setEditingAttributeId(null);
                              setEditingAttributeName('');
                              setExpandedFilterId(null);
                              setEditingParamAttributeId(null);
                              setEditingParamIndex(null);
                              setEditingParamValue('');
                              return;
                            }
                            const dbCat = dbCategories.find(c => c.name === cat.label);
                            if (dbCat) {
                              handleSelectCategory(dbCat);
                            } else {
                              setSelectedDbCategory({ id: -1, name: cat.label });
                              setDbAttributes([]);
                              setSubcategories([]);
                              setAddingParamAttributeId(null);
                              setNewParamName('');
                              setIsAddingAttribute(false);
                              setNewAttributeName('');
                              setEditingAttributeId(null);
                              setEditingAttributeName('');
                              setExpandedFilterId(null);
                              setEditingParamAttributeId(null);
                              setEditingParamIndex(null);
                              setEditingParamValue('');
                            }
                          }}
                          style={{ 
                            width: '100%', 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center',
                            background: 'none',
                            border: 'none',
                            color: isSelected ? 'var(--primary-color)' : 'var(--text-color)',
                            fontSize: '16px',
                            fontWeight: 600,
                            lineHeight: 1.4,
                            cursor: 'pointer',
                            padding: 0,
                            textAlign: 'left'
                          }}
                        >
                          {cat.label}
                          <div style={{
                            display: 'flex',
                            color: isSelected ? 'var(--primary-color)' : 'inherit'
                          }}>
                            {isSelected ? <ChevronRight size={18} /> : <ChevronDown size={18} />}
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Right Panel Details (Subcategories & Characteristics) */}
                <div style={{ flex: 1 }}>
                  {!selectedDbCategory ? (
                    <div style={{ 
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '80px 20px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '15px',
                      textAlign: 'center',
                      minHeight: '400px'
                    }}>
                      <Layers size={48} color="#666" />
                      <div style={{ color: '#888', fontSize: '16px' }}>
                        Выберите категорию в меню слева для управления её характеристиками и подкатегориями
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      backgroundColor: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '20px',
                      minHeight: '400px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px'
                    }}>

                      {/* Filters section */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

                        {/* Filters list — above the add button */}
                        {dbAttributes.map((attr, attrIdx) => {
                          const isExpanded = expandedFilterId === attr.id;
                          const isEditing = editingAttributeId === attr.id;
                          return (
                            <div key={attr.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                              {/* Filter row */}
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingTop: attrIdx === 0 ? '0' : '20px',
                                paddingBottom: isExpanded ? '10px' : '20px'
                              }}>
                                {isEditing ? (
                                  <div style={{ display: 'flex', gap: '6px', flex: 1, alignItems: 'center' }}>
                                    <input
                                      autoFocus
                                      type="text"
                                      value={editingAttributeName}
                                      onChange={(e) => setEditingAttributeName(e.target.value)}
                                      onKeyDown={(e) => { if (e.key === 'Enter') handleUpdateAttribute(attr.id); if (e.key === 'Escape') setEditingAttributeId(null); }}
                                      style={{
                                        flex: 1,
                                        backgroundColor: 'rgba(0,0,0,0.3)',
                                        border: '1px solid var(--primary-color)',
                                        borderRadius: '6px',
                                        color: '#fff',
                                        padding: '6px 10px',
                                        fontSize: '20px',
                                        outline: 'none'
                                      }}
                                    />
                                    <button onClick={() => handleUpdateAttribute(attr.id)} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', display: 'flex' }}>
                                      <Check size={16} />
                                    </button>
                                    <button onClick={() => setEditingAttributeId(null)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', display: 'flex' }}>
                                      <X size={16} />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setExpandedFilterId(isExpanded ? null : attr.id)}
                                    style={{
                                      flex: 1,
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      background: 'none',
                                      border: 'none',
                                      color: isExpanded ? 'var(--primary-color)' : 'var(--text-color)',
                                      fontSize: '20px',
                                      fontWeight: 600,
                                      cursor: 'pointer',
                                      padding: 0,
                                      textAlign: 'left'
                                    }}
                                  >
                                    {attr.name}
                                    {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                  </button>
                                )}
                                {!isEditing && (
                                  <div style={{ display: 'flex', gap: '4px', marginLeft: '8px' }}>
                                    <button
                                      onClick={() => handleMoveAttribute(attrIdx, 'up')}
                                      disabled={attrIdx === 0}
                                      style={{ 
                                        background: 'none', 
                                        border: 'none', 
                                        color: attrIdx === 0 ? '#333' : '#555', 
                                        cursor: attrIdx === 0 ? 'default' : 'pointer', 
                                        padding: '4px', 
                                        display: 'flex',
                                        transition: 'color 0.2s'
                                      }}
                                      onMouseEnter={(e) => { if (attrIdx !== 0) e.currentTarget.style.color = '#fff' }}
                                      onMouseLeave={(e) => { if (attrIdx !== 0) e.currentTarget.style.color = '#555' }}
                                      title="Поднять выше"
                                    >
                                      <ArrowUp size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleMoveAttribute(attrIdx, 'down')}
                                      disabled={attrIdx === dbAttributes.length - 1}
                                      style={{ 
                                        background: 'none', 
                                        border: 'none', 
                                        color: attrIdx === dbAttributes.length - 1 ? '#333' : '#555', 
                                        cursor: attrIdx === dbAttributes.length - 1 ? 'default' : 'pointer', 
                                        padding: '4px', 
                                        display: 'flex',
                                        transition: 'color 0.2s'
                                      }}
                                      onMouseEnter={(e) => { if (attrIdx !== dbAttributes.length - 1) e.currentTarget.style.color = '#fff' }}
                                      onMouseLeave={(e) => { if (attrIdx !== dbAttributes.length - 1) e.currentTarget.style.color = '#555' }}
                                      title="Опустить ниже"
                                    >
                                      <ArrowDown size={14} />
                                    </button>
                                    <button
                                      onClick={() => { setEditingAttributeId(attr.id); setEditingAttributeName(attr.name); }}
                                      style={{ 
                                        background: 'none', 
                                        border: 'none', 
                                        color: '#555', 
                                        cursor: 'pointer', 
                                        padding: '4px', 
                                        display: 'flex',
                                        transition: 'color 0.2s'
                                      }}
                                      onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                                      onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                                      title="Редактировать"
                                    >
                                      <Edit2 size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteAttribute(attr.id)}
                                      style={{ 
                                        background: 'none', 
                                        border: 'none', 
                                        color: '#555', 
                                        cursor: 'pointer', 
                                        padding: '4px', 
                                        display: 'flex',
                                        transition: 'color 0.2s'
                                      }}
                                      onMouseEnter={(e) => e.currentTarget.style.color = '#ff4d4d'}
                                      onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                                      title="Удалить"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                )}
                              </div>

                              {/* Expanded block */}
                              {isExpanded && (
                                <div style={{ 
                                  paddingBottom: '20px', 
                                  paddingLeft: '20px', 
                                  display: 'flex', 
                                  flexDirection: 'column', 
                                  gap: '10px' 
                                }}>
                                  {/* Parameters List */}
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {(attributeParams[attr.id] || []).map((param, paramIdx) => {
                                      const isEditingParam = editingParamAttributeId === attr.id && editingParamIndex === paramIdx;
                                      return isEditingParam ? (
                                        <div 
                                          key={paramIdx} 
                                          style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}
                                        >
                                          <input
                                            autoFocus
                                            type="text"
                                            value={editingParamValue}
                                            onChange={(e) => setEditingParamValue(e.target.value)}
                                            onKeyDown={(e) => { 
                                              if (e.key === 'Enter') handleUpdateParam(attr.id, paramIdx); 
                                              if (e.key === 'Escape') {
                                                setEditingParamAttributeId(null);
                                                setEditingParamIndex(null);
                                                setEditingParamValue('');
                                              } 
                                            }}
                                            style={{
                                              width: '50%',
                                              backgroundColor: 'rgba(0,0,0,0.3)',
                                              border: '1px solid var(--primary-color)',
                                              borderRadius: '8px',
                                              padding: '12px 16px',
                                              color: '#fff',
                                              fontSize: '14px',
                                              outline: 'none',
                                              boxSizing: 'border-box',
                                              height: '46px'
                                            }}
                                          />
                                          <button 
                                            onClick={() => handleUpdateParam(attr.id, paramIdx)} 
                                            style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', display: 'flex', padding: '4px' }} 
                                            title="Подтвердить"
                                          >
                                            <Check size={18} />
                                          </button>
                                          <button 
                                            onClick={() => {
                                              setEditingParamAttributeId(null);
                                              setEditingParamIndex(null);
                                              setEditingParamValue('');
                                            }} 
                                            style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', display: 'flex', padding: '4px' }} 
                                            title="Отмена"
                                          >
                                            <X size={18} />
                                          </button>
                                        </div>
                                      ) : (
                                        <div 
                                          key={paramIdx} 
                                          style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center', 
                                            padding: '12px 16px', 
                                            backgroundColor: 'rgba(255,255,255,0.02)', 
                                            border: '1px solid var(--border-color)', 
                                            borderRadius: '8px',
                                            width: '50%',
                                            boxSizing: 'border-box',
                                            height: '46px'
                                          }}
                                        >
                                          <span style={{ color: '#fff', fontSize: '14px', fontWeight: 500 }}>{param}</span>
                                          <div style={{ display: 'flex', gap: '4px' }}>
                                            <button
                                              onClick={() => handleMoveParam(attr.id, paramIdx, 'up')}
                                              disabled={paramIdx === 0}
                                              style={{ 
                                                background: 'none', 
                                                border: 'none', 
                                                color: paramIdx === 0 ? '#333' : '#666', 
                                                cursor: paramIdx === 0 ? 'default' : 'pointer', 
                                                display: 'flex', 
                                                padding: '4px',
                                                transition: 'color 0.2s'
                                              }}
                                              onMouseEnter={(e) => { if (paramIdx !== 0) e.currentTarget.style.color = '#fff' }}
                                              onMouseLeave={(e) => { if (paramIdx !== 0) e.currentTarget.style.color = '#666' }}
                                              title="Поднять выше"
                                            >
                                              <ArrowUp size={14} />
                                            </button>
                                            <button
                                              onClick={() => handleMoveParam(attr.id, paramIdx, 'down')}
                                              disabled={paramIdx === (attributeParams[attr.id] || []).length - 1}
                                              style={{ 
                                                background: 'none', 
                                                border: 'none', 
                                                color: paramIdx === (attributeParams[attr.id] || []).length - 1 ? '#333' : '#666', 
                                                cursor: paramIdx === (attributeParams[attr.id] || []).length - 1 ? 'default' : 'pointer', 
                                                display: 'flex', 
                                                padding: '4px',
                                                transition: 'color 0.2s'
                                              }}
                                              onMouseEnter={(e) => { if (paramIdx !== (attributeParams[attr.id] || []).length - 1) e.currentTarget.style.color = '#fff' }}
                                              onMouseLeave={(e) => { if (paramIdx !== (attributeParams[attr.id] || []).length - 1) e.currentTarget.style.color = '#666' }}
                                              title="Опустить ниже"
                                            >
                                              <ArrowDown size={14} />
                                            </button>
                                            <button
                                              onClick={() => {
                                                setEditingParamAttributeId(attr.id);
                                                setEditingParamIndex(paramIdx);
                                                setEditingParamValue(param);
                                              }}
                                              style={{ 
                                                background: 'none', 
                                                border: 'none', 
                                                color: '#666', 
                                                cursor: 'pointer', 
                                                display: 'flex', 
                                                padding: '4px',
                                                transition: 'color 0.2s'
                                              }}
                                              onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                                              onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                                              title="Редактировать параметр"
                                            >
                                              <Edit2 size={14} />
                                            </button>
                                            <button 
                                              onClick={() => handleDeleteParam(attr.id, paramIdx)} 
                                              style={{ 
                                                background: 'none', 
                                                border: 'none', 
                                                color: '#666', 
                                                cursor: 'pointer', 
                                                display: 'flex', 
                                                padding: '4px',
                                                transition: 'color 0.2s'
                                              }}
                                              onMouseEnter={(e) => e.currentTarget.style.color = '#ff4d4d'}
                                              onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                                              title="Удалить параметр"
                                            >
                                              <Trash2 size={14} />
                                            </button>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>

                                  {/* Add Parameter Button / Inline Form */}
                                  {addingParamAttributeId !== attr.id ? (
                                    <button
                                      onClick={() => { setAddingParamAttributeId(attr.id); setNewParamName(''); setNewParamNameEn(''); }}
                                      style={{
                                        width: '50%',
                                        backgroundColor: 'transparent',
                                        border: '1px dashed var(--border-color)',
                                        borderRadius: '8px',
                                        color: '#888',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        padding: '12px 16px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        textAlign: 'left',
                                        boxSizing: 'border-box',
                                        height: '46px',
                                        display: 'flex',
                                        alignItems: 'center'
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--primary-color)';
                                        e.currentTarget.style.color = 'var(--primary-color)';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border-color)';
                                        e.currentTarget.style.color = '#888';
                                      }}
                                    >
                                      + Добавить параметр
                                    </button>
                                  ) : (
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
                                      <div style={{
                                        display: 'flex',
                                        width: '50%',
                                        backgroundColor: 'rgba(0,0,0,0.3)',
                                        border: '1px solid var(--primary-color)',
                                        borderRadius: '8px',
                                        padding: '0 16px',
                                        alignItems: 'center',
                                        boxSizing: 'border-box',
                                        height: '46px'
                                      }}>
                                        <input
                                          autoFocus
                                          type="text"
                                          placeholder="RU"
                                          value={newParamName}
                                          onChange={(e) => setNewParamName(e.target.value)}
                                          onKeyDown={(e) => { 
                                            if (e.key === 'Enter') {
                                              e.preventDefault();
                                              document.getElementById(`newParamNameEn-${attr.id}`)?.focus();
                                            }
                                            if (e.key === 'Escape') setAddingParamAttributeId(null); 
                                          }}
                                          style={{
                                            flex: 1,
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            color: '#fff',
                                            fontSize: '14px',
                                            outline: 'none',
                                            padding: '12px 0'
                                          }}
                                        />
                                        <span style={{ color: '#888', margin: '0 8px' }}>/</span>
                                        <input
                                          id={`newParamNameEn-${attr.id}`}
                                          type="text"
                                          placeholder="EN"
                                          value={newParamNameEn}
                                          onChange={(e) => setNewParamNameEn(e.target.value)}
                                          onKeyDown={(e) => { 
                                            if (e.key === 'Enter') handleAddParam(attr.id); 
                                            if (e.key === 'Escape') setAddingParamAttributeId(null); 
                                          }}
                                          style={{
                                            flex: 1,
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            color: '#fff',
                                            fontSize: '14px',
                                            outline: 'none',
                                            padding: '12px 0'
                                          }}
                                        />
                                      </div>
                                      <button 
                                        onClick={() => handleAddParam(attr.id)} 
                                        style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', display: 'flex', padding: '4px' }} 
                                        title="Подтвердить"
                                      >
                                        <Check size={18} />
                                      </button>
                                      <button 
                                        onClick={() => setAddingParamAttributeId(null)} 
                                        style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', display: 'flex', padding: '4px' }} 
                                        title="Отмена"
                                      >
                                        <X size={18} />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Add filter button / inline form — always at the bottom */}
                        <div style={{ paddingTop: dbAttributes.length > 0 ? '20px' : '0px' }}>
                          {!isAddingAttribute ? (
                            <button
                              onClick={() => { setIsAddingAttribute(true); setNewAttributeName(''); setNewAttributeNameEn(''); }}
                              style={{
                                width: '100%',
                                backgroundColor: 'transparent',
                                border: '1px dashed var(--border-color)',
                                borderRadius: '8px',
                                color: '#888',
                                fontSize: '14px',
                                fontWeight: 500,
                                padding: '12px 16px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textAlign: 'left'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--primary-color)';
                                e.currentTarget.style.color = 'var(--primary-color)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-color)';
                                e.currentTarget.style.color = '#888';
                              }}
                            >
                              + Добавить фильтр
                            </button>
                          ) : (
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <div style={{
                                flex: 1,
                                display: 'flex',
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--primary-color)',
                                borderRadius: '6px',
                                alignItems: 'center',
                                padding: '0 12px'
                              }}>
                                <input
                                  autoFocus
                                  type="text"
                                  placeholder="RU"
                                  value={newAttributeName}
                                  onChange={(e) => setNewAttributeName(e.target.value)}
                                  onKeyDown={(e) => { 
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      document.getElementById('newAttributeNameEn')?.focus();
                                    }
                                    if (e.key === 'Escape') setIsAddingAttribute(false); 
                                  }}
                                  style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    fontSize: '20px',
                                    outline: 'none',
                                    padding: '8px 0'
                                  }}
                                />
                                <span style={{ color: '#888', margin: '0 8px' }}>/</span>
                                <input
                                  id="newAttributeNameEn"
                                  type="text"
                                  placeholder="EN"
                                  value={newAttributeNameEn}
                                  onChange={(e) => setNewAttributeNameEn(e.target.value)}
                                  onKeyDown={(e) => { 
                                    if (e.key === 'Enter') handleAddAttribute(); 
                                    if (e.key === 'Escape') setIsAddingAttribute(false); 
                                  }}
                                  style={{
                                    flex: 1,
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    fontSize: '20px',
                                    outline: 'none',
                                    padding: '8px 0'
                                  }}
                                />
                              </div>
                              <button onClick={handleAddAttribute} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', display: 'flex', padding: '4px' }} title="Подтвердить">
                                <Check size={18} />
                              </button>
                              <button onClick={() => setIsAddingAttribute(false)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', display: 'flex', padding: '4px' }} title="Отмена">
                                <X size={18} />
                              </button>
                            </div>
                          )}
                        </div>

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
