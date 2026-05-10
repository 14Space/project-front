import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Package, 
  ShoppingBag, 
  RefreshCw, 
  Users, 
  Plus,
  Settings,
  Layers,
  List,
  AlertCircle,
  FileText,
  ChevronLeft,
  Search,
  Edit2,
  Trash2
} from 'lucide-react';

import AdminProductFilters from '../components/admin/AdminProductFilters';
import AdminSpecFilters from '../components/admin/AdminSpecFilters';

// Sub-components for Admin views
const AdminProducts = ({ onBack }: { onBack: () => void }) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Example data (in a real app this would come from an API or store)
  const allProducts = [
    { id: '100101', name: 'Product Name Example 1', price: 26000, category: 'PCs', subcategory: 'Gaming' },
    { id: '100102', name: 'Product Name Example 2', price: 27000, category: 'PCs', subcategory: 'Gaming' },
    { id: '100103', name: 'Product Name Example 3', price: 28000, category: 'PCs', subcategory: 'Gaming' },
    { id: '100104', name: 'Product Name Example 4', price: 29000, category: 'PCs', subcategory: 'Gaming' },
    { id: '100105', name: 'Product Name Example 5', price: 30000, category: 'PCs', subcategory: 'Gaming' },
  ];

  const filteredProducts = allProducts.filter(p => 
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
          padding: '20px 20px 0 20px',
          border: '1px solid var(--border-color)',
          flex: 1,
          height: 'fit-content'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', gap: '15px' }}>
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
            <button style={{ 
              backgroundColor: 'var(--primary-color)', 
              color: '#000', 
              border: 'none', 
              padding: '0 20px', 
              borderRadius: '8px', 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}>
              <Plus size={18} />
              {t('common.add')}
            </button>
          </div>

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
                      <button style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}><Edit2 size={16} /></button>
                      <button style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}><Trash2 size={16} /></button>
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
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<'dashboard' | 'products' | 'specs' | 'categories' | 'subcategories'>('dashboard');
  const [selectedSpecCategory, setSelectedSpecCategory] = useState<string | null>(null);
  const [categorySpecs, setCategorySpecs] = useState<Record<string, string[]>>({});
  const [isAddingParam, setIsAddingParam] = useState(false);
  const [newParamName, setNewParamName] = useState('');
  const [isEditingSpecs, setIsEditingSpecs] = useState(false);

  const handleAddParam = () => {
    if (!selectedSpecCategory || !newParamName.trim()) return;
    setCategorySpecs(prev => ({
      ...prev,
      [selectedSpecCategory]: [...(prev[selectedSpecCategory] || []), newParamName.trim()]
    }));
    setNewParamName('');
    setIsAddingParam(false);
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
        { id: 'blockUser', label: t('admin.actions.blockUser'), icon: <AlertCircle size={16} /> },
        { id: 'editBlog', label: t('admin.actions.editBlog'), icon: <FileText size={16} /> },
      ]
    }
  ];

  const handleActionClick = (actionId: string) => {
    if (['products', 'specs', 'categories', 'subcategories'].includes(actionId)) {
      setActiveView(actionId as any);
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
            <AdminProducts onBack={() => setActiveView('dashboard')} />
          ) : (
            <div style={{ animation: 'fadeIn 0.3s ease', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', position: 'relative' }}>
                <button 
                  onClick={() => setActiveView('dashboard')}
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
                   activeView === 'categories' ? t('admin.actions.categories') : 
                   t('admin.actions.subcategories')}
                </h2>
              </div>

              <div style={{ display: 'flex', gap: '25px' }}>
                <div style={{ width: '280px', flexShrink: 0 }}>
                  <AdminSpecFilters 
                    selectedCategory={selectedSpecCategory}
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
                  padding: '15px 20px 20px 20px',
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
                      {isEditingSpecs && (
                        <div style={{ marginBottom: '20px' }}>
                          <button 
                            onClick={() => setIsAddingParam(true)}
                            style={{ 
                              backgroundColor: 'transparent', 
                              border: '1px dashed var(--primary-color)', 
                              color: 'var(--primary-color)',
                              padding: '10px 20px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              fontSize: '14px',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'rgba(166, 206, 57, 0.05)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            <Plus size={16} />
                            {t('common.add')} параметр
                          </button>
                        </div>
                      )}

                      {isAddingParam && (
                        <div style={{ 
                          marginBottom: '25px', 
                          backgroundColor: 'rgba(255,255,255,0.02)', 
                          padding: '15px', 
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          display: 'flex',
                          gap: '10px'
                        }}>
                          <input 
                            autoFocus
                            type="text" 
                            placeholder="Название параметра (напр. Процессор)" 
                            value={newParamName}
                            onChange={(e) => setNewParamName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddParam()}
                            style={{ 
                              flex: 1, 
                              backgroundColor: '#1a1a1a', 
                              border: '1px solid var(--border-color)', 
                              borderRadius: '6px', 
                              padding: '8px 12px', 
                              color: '#fff',
                              fontSize: '14px'
                            }} 
                          />
                          <button 
                            onClick={handleAddParam}
                            style={{ 
                              backgroundColor: 'var(--primary-color)', 
                              border: 'none', 
                              color: '#000', 
                              padding: '8px 16px', 
                              borderRadius: '6px', 
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            OK
                          </button>
                          <button 
                            onClick={() => setIsAddingParam(false)}
                            style={{ 
                              backgroundColor: 'transparent', 
                              border: '1px solid #444', 
                              color: '#888', 
                              padding: '8px 16px', 
                              borderRadius: '6px', 
                              cursor: 'pointer'
                            }}
                          >
                            Отмена
                          </button>
                        </div>
                      )}

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {(categorySpecs[selectedSpecCategory] || []).map((spec, idx) => (
                          <div 
                            key={idx}
                            style={{ 
                              padding: '12px 16px', 
                              backgroundColor: 'rgba(255,255,255,0.03)', 
                              borderRadius: '8px',
                              border: '1px solid var(--border-color)',
                              fontSize: '14px',
                              color: '#fff',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            {spec}
                          </div>
                        ))}
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
