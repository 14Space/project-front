import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { LogOut, Edit2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AdminUsers from '../../components/admin/AdminUsers';

const ManagerProfile: React.FC = () => {
  const { user, updateUser, cycleUser } = useAppContext();
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  if (!user) return null;

  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      // Basic validation
      return;
    }
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
    });
    setIsEditing(false);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          {/* Main profile frame: Single block with no dividers */}
          <div style={{ 
            backgroundColor: 'var(--card-bg)', 
            borderRadius: '12px', 
            border: '1px solid var(--border-color)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            marginBottom: '40px'
          }}>
            {/* Header section with Title and Edit button */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#fff' }}>
                  {t('profile.personalData')}: {user.name}
                </h1>
                <div style={{ 
                  padding: '2px 8px', 
                  backgroundColor: 'rgba(166, 206, 57, 0.1)', 
                  color: '#A6CE39', 
                  borderRadius: '12px', 
                  fontSize: '10px', 
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}>
                  {t('common.managerBadge')}
                </div>
              </div>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} style={{ color: '#A6CE39', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                  <Edit2 size={16} />
                  {t('common.edit')}
                </button>
              )}
            </div>
            
            {/* Main content grid: Name, Email, and Logout button on the same level */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 200px', gap: '20px', alignItems: 'flex-end' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '8px' }}>{t('auth.firstName')}</label>
                {isEditing ? (
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value.replace(/\d/g, '') })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #A6CE39', backgroundColor: 'transparent', color: '#fff', outline: 'none' }}
                  />
                ) : (
                  <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', color: '#fff', height: '48px', display: 'flex', alignItems: 'center' }}>{user.name}</div>
                )}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '8px' }}>{t('auth.email')}</label>
                <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', color: '#888', height: '48px', display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}>{user.email}</div>
              </div>
              <div>
                <button 
                  onClick={cycleUser}
                  style={{
                    width: '100%',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '0 16px',
                    borderRadius: '8px',
                    border: '1px solid #ff4d4d',
                    backgroundColor: 'transparent',
                    color: '#ff4d4d',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 77, 77, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <LogOut size={18} />
                  {t('profile.logout')}
                </button>
              </div>
            </div>

            {isEditing && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handleSave} style={{ backgroundColor: '#A6CE39', color: '#000', padding: '10px 25px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>{t('common.save')}</button>
                <button onClick={handleCancel} style={{ color: '#888', border: '1px solid #444', padding: '10px 25px', borderRadius: '8px', backgroundColor: 'transparent', cursor: 'pointer' }}>{t('common.cancel')}</button>
              </div>
            )}
          </div>

          {/* User Database Section below */}
          <AdminUsers hideHeader={true} />
        </div>
      </section>
    </div>
  );
};

export default ManagerProfile;
