import React, { useState } from 'react';
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
  Trash2,
  LayoutGrid
} from 'lucide-react';

import AdminProductFilters from '../components/admin/AdminProductFilters';

// Sub-components for Admin views
const AdminProducts = ({ onBack }: { onBack: () => void }) => {
  const { t } = useTranslation();
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
          padding: '20px',
          border: '1px solid var(--border-color)',
          flex: 1
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', gap: '15px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} color="#666" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder={t('catalog.search')} 
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
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px', fontSize: '14px' }}>10010{i}</td>
                  <td style={{ padding: '12px', fontSize: '14px', fontWeight: 500 }}>
                    Product Name Example {i}
                  </td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>{25000 + i * 1000} MDL</td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>
                    PCs
                  </td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>
                    Gaming
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}><Edit2 size={16} /></button>
                      <button style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}><Trash2 size={16} /></button>
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
  const [activeView, setActiveView] = useState<'dashboard' | 'products' | 'specs' | 'categories' | 'subcategories'>('dashboard');

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
               <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
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
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255,255,255,0.05)'
                  }}
                >
                  <ChevronLeft size={18} />
                  {t('common.back')}
                </button>
                <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  {activeView === 'specs' ? t('admin.actions.specs') : 
                   activeView === 'categories' ? t('admin.actions.categories') : 
                   t('admin.actions.subcategories')}
                </h2>
              </div>
              <div style={{ 
                backgroundColor: 'var(--card-bg)', 
                borderRadius: '12px', 
                padding: '40px',
                border: '1px solid var(--border-color)',
                textAlign: 'center',
                color: '#888'
              }}>
                {t('common.noData')}
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
