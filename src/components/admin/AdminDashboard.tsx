import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  Plus,
  Layers,
  List,
  FileText,
  MessageSquare
} from 'lucide-react';

interface AdminDashboardProps {
  onAction: (actionId: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onAction }) => {
  const { t } = useTranslation();

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
        { id: 'editBlog', label: t('admin.actions.editBlog'), icon: <FileText size={16} /> },
        { id: 'reviewModeration', label: t('admin.actions.reviewModeration'), icon: <MessageSquare size={16} /> },
      ]
    }
  ];

  return (
    <div style={{ marginTop: '30px' }}>
      <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>
        {t('profile.adminTitle')}
      </h2>
      
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
              <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#fff' }}>
                {section.title}
              </h3>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {section.actions.map((action, idx) => (
                <button 
                  key={idx}
                  onClick={() => onAction(action.id)}
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
                  <span style={{ color: 'var(--primary-color)', display: 'flex' }}>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
