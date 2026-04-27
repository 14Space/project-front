import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Package, Settings, LogOut, ChevronRight, Edit2, Save, X, Plus, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Profile: React.FC = () => {
  const { user, logout, updateUser } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = React.useState(false);
  const [isCityOpen, setIsCityOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    street: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      setFormData({
        name: user.name || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        city: user.city || 'Кишинёв',
        street: user.street || ''
      });
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      city: user.city || 'Кишинёв',
      street: user.street || ''
    });
    setIsEditing(false);
  };

  const cities = ['Кишинёв', 'Бельцы', 'Тирасполь', 'Бендеры', 'Рыбница', 'Кагул', 'Унгены', 'Сороки', 'Орхей', 'Комрат'];

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh' }}>
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* Sidebar */}
            <div style={{ width: '300px', flexShrink: 0 }}>
              <div style={{ 
                backgroundColor: 'var(--card-bg)', 
                borderRadius: '12px', 
                padding: '20px',
                border: '1px solid var(--border-color)',
                textAlign: 'center',
                marginBottom: '20px'
              }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  backgroundColor: '#A6CE39', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 15px',
                  color: '#000'
                }}>
                  <UserIcon size={30} />
                </div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '5px', color: '#fff' }}>{user.name}</h2>
                <p style={{ fontSize: '14px', color: '#888', marginBottom: '0' }}>{user.email}</p>
              </div>

              <div style={{ 
                backgroundColor: 'var(--card-bg)', 
                borderRadius: '12px', 
                padding: '5px 0',
                border: '1px solid var(--border-color)',
                overflow: 'hidden'
              }}>
                {[
                  { icon: <UserIcon size={18} />, label: t('profile.personalData'), active: true },
                  { icon: <Package size={18} />, label: t('profile.orders') },
                  { icon: <Settings size={18} />, label: t('profile.settings') },
                ].map((item, idx) => (
                  <button 
                    key={idx}
                    style={{
                      margin: '5px 10px',
                      width: 'calc(100% - 20px)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 15px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: item.active ? 'rgba(166, 206, 57, 0.1)' : 'transparent',
                      color: item.active ? '#A6CE39' : '#fff',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    {item.icon}
                    {item.label}
                    <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                  </button>
                ))}
                
                <div style={{ margin: '5px 15px', borderTop: '1px solid var(--border-color)' }} />
                
                <button 
                  onClick={() => { logout(); navigate('/'); }}
                  style={{
                    margin: '5px 10px',
                    width: 'calc(100% - 20px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 15px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#FF1717',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  <LogOut size={18} />
                  {t('profile.logout')}
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ 
                backgroundColor: 'var(--card-bg)', 
                borderRadius: '12px', 
                padding: '20px',
                border: '1px solid var(--border-color)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#fff', lineHeight: 1 }}>
                    {t('profile.personalData')}
                  </h1>
                  {!isEditing && (
                    <button 
                      onClick={() => setIsEditing(true)}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        background: 'none', 
                        border: 'none', 
                        color: '#A6CE39', 
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 500
                      }}
                    >
                      <Edit2 size={16} />
                      {t('common.edit')}
                    </button>
                  )}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '8px' }}>{t('auth.firstName')}</label>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\d/g, '');
                          setFormData({ ...formData, name: val });
                        }}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #A6CE39', backgroundColor: 'transparent', color: '#fff', outline: 'none' }}
                      />
                    ) : (
                      <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', color: '#fff', fontSize: '15px' }}>
                        {user.name}
                      </div>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '8px' }}>{t('auth.lastName')}</label>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\d/g, '');
                          setFormData({ ...formData, lastName: val });
                        }}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #A6CE39', backgroundColor: 'transparent', color: '#fff', outline: 'none' }}
                      />
                    ) : (
                      <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', color: '#fff', fontSize: '15px' }}>
                        {user.lastName || '—'}
                      </div>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '8px' }}>{t('auth.email')}</label>
                    {isEditing ? (
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #A6CE39', backgroundColor: 'transparent', color: '#fff', outline: 'none' }}
                      />
                    ) : (
                      <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', color: '#fff', fontSize: '15px' }}>
                        {user.email}
                      </div>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '8px' }}>{t('auth.phone')}</label>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={formData.phone}
                        onChange={(e) => {
                          let val = e.target.value;
                          // Remove anything that is not a digit or a plus sign
                          val = val.replace(/[^\d+]/g, '');
                          
                          if (val.startsWith('+373')) {
                            setFormData({ ...formData, phone: val });
                          } else if (val.length < 4) {
                            setFormData({ ...formData, phone: '+373' });
                          }
                        }}
                        maxLength={12}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #A6CE39', backgroundColor: 'transparent', color: '#fff', outline: 'none' }}
                      />
                    ) : (
                      <div 
                        onClick={() => {
                          if (!user.phone || user.phone === '+373') {
                            setFormData(prev => ({ ...prev, phone: '+373' }));
                          }
                          setIsEditing(true);
                        }}
                        style={{ 
                          padding: '12px 16px', 
                          borderRadius: '8px', 
                          border: '1px solid var(--border-color)', 
                          color: '#fff', 
                          fontSize: '15px',
                          cursor: (!user.phone || user.phone === '+373') ? 'pointer' : 'default',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.2s'
                        }}
                        className={(!user.phone || user.phone === '+373') ? 'add-phone-link' : ''}
                      >
                        {(!user.phone || user.phone === '+373') && <Plus size={14} />}
                        {(!user.phone || user.phone === '+373') ? t('profile.addPhone') : user.phone}
                      </div>
                    )}
                  </div>

                  {/* Address Block */}
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '8px' }}>{t('auth.address')}</label>
                    {isEditing ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {/* Custom City Dropdown */}
                        <div style={{ position: 'relative', width: '160px' }}>
                          <div 
                            onClick={() => setIsCityOpen(!isCityOpen)}
                            style={{ 
                              padding: '12px 16px', 
                              borderRadius: '8px', 
                              border: '1px solid #A6CE39', 
                              backgroundColor: '#1a1a1a', 
                              color: '#fff', 
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              fontSize: '15px'
                            }}
                          >
                            {formData.city}
                            <ChevronDown 
                              size={16} 
                              style={{ 
                                transition: 'transform 0.2s',
                                transform: isCityOpen ? 'rotate(180deg)' : 'rotate(0)'
                              }} 
                            />
                          </div>
                          
                          {isCityOpen && (
                            <div style={{ 
                              position: 'absolute',
                              top: 'calc(100% + 5px)',
                              left: 0,
                              width: '100%',
                              backgroundColor: '#1a1a1a',
                              border: '1px solid #333',
                              borderRadius: '8px',
                              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                              zIndex: 100,
                              maxHeight: '200px',
                              overflowY: 'auto'
                            }}>
                              {cities.map(city => (
                                <div 
                                  key={city}
                                  onClick={() => {
                                    setFormData({ ...formData, city });
                                    setIsCityOpen(false);
                                  }}
                                  style={{ 
                                    padding: '10px 16px', 
                                    color: '#fff', 
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    backgroundColor: formData.city === city ? 'rgba(166, 206, 57, 0.1)' : 'transparent',
                                    transition: 'background-color 0.2s'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = formData.city === city ? 'rgba(166, 206, 57, 0.1)' : 'transparent'}
                                >
                                  {city}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <span style={{ color: '#fff', fontSize: '18px' }}>,</span>
                        <input 
                          type="text"
                          value={formData.street}
                          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                          placeholder={t('auth.street')}
                          style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #A6CE39', backgroundColor: 'transparent', color: '#fff', outline: 'none' }}
                        />
                      </div>
                    ) : (
                      <div 
                        onClick={() => {
                          if (!user.street) {
                            setFormData(prev => ({ ...prev, city: user.city || 'Кишинёв', street: '' }));
                          }
                          setIsEditing(true);
                        }}
                        style={{ 
                          padding: '12px 16px', 
                          borderRadius: '8px', 
                          border: '1px solid var(--border-color)', 
                          color: '#fff', 
                          fontSize: '15px',
                          cursor: !user.street ? 'pointer' : 'default',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all 0.2s'
                        }}
                        className={!user.street ? 'add-phone-link' : ''}
                      >
                        {!user.street && <Plus size={14} />}
                        {!user.street ? t('profile.addAddress') : `${user.city}${user.street ? `, ${user.street}` : ''}`}
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '20px' }}>
                    <button 
                      onClick={handleSave}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        backgroundColor: '#A6CE39', 
                        color: '#000', 
                        border: 'none', 
                        padding: '10px 20px', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      <Save size={18} />
                      {t('common.save')}
                    </button>
                    <button 
                      onClick={handleCancel}
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        backgroundColor: 'transparent', 
                        color: '#888', 
                        border: '1px solid #444', 
                        padding: '10px 20px', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      <X size={18} />
                      {t('common.cancel')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
