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
  FileText
} from 'lucide-react';

export default function Admin() {
  const { t } = useTranslation();

  const sections = [
    {
      id: 'catalog',
      title: t('admin.sections.catalog'),
      icon: <Package size={24} color="#A6CE39" />,
      actions: [
        { label: t('admin.actions.addEditDelete'), icon: <Plus size={16} /> },
        { label: t('admin.actions.specs'), icon: <Settings size={16} /> },
        { label: t('admin.actions.categories'), icon: <Layers size={16} /> },
      ]
    },
    {
      id: 'orders',
      title: t('admin.sections.orders'),
      icon: <ShoppingBag size={24} color="#A6CE39" />,
      actions: [
        { label: t('admin.actions.viewOrders'), icon: <List size={16} /> },
        { label: t('admin.actions.returns'), icon: <RefreshCw size={16} /> },
        { label: t('admin.actions.tradeInRequests'), icon: <FileText size={16} /> },
      ]
    },
    {
      id: 'users',
      title: t('admin.sections.users'),
      icon: <Users size={24} color="#A6CE39" />,
      actions: [
        { label: t('admin.actions.userDatabase'), icon: <List size={16} /> },
        { label: t('admin.actions.blockUser'), icon: <AlertCircle size={16} /> },
        { label: t('admin.actions.editBlog'), icon: <FileText size={16} /> },
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
      <section className="section" style={{ padding: '20px 0 60px 0' }}>
        <div className="container">
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, marginBottom: '30px' }}>
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
                        e.currentTarget.style.backgroundColor = 'rgba(166, 206, 57, 0.1)';
                        e.currentTarget.style.borderColor = 'var(--primary-color)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
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
        </div>
      </section>
    </div>
  );
}
