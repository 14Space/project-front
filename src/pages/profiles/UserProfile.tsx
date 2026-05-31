import React, { useEffect } from 'react';

const formatOrderId = (id: string | number) => {
  const num = String(id).replace(/^ORD-/i, '');
  return `ORD-${num.slice(-6).padStart(6, '0')}`;
};
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, LogOut, Edit2, Plus, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { api } from '../../api';

const UserProfile: React.FC = () => {
  const { user, logout, updateUser } = useAppContext();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = React.useState(false);
  const [isCityOpen, setIsCityOpen] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [orders, setOrders] = React.useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = React.useState(true);

  const [formData, setFormData] = React.useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    street: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        city: user.city || t('profile.cities.chisinau'),
        street: user.street || ''
      });
      
      setIsLoadingOrders(true);
      api.get('/Orders/my')
        .then((res: any) => setOrders(res))
        .catch(err => console.error("Failed to load orders", err))
        .finally(() => setIsLoadingOrders(false));
    }
  }, [user, t]);

  if (!user) return null;

  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      city: user.city || t('profile.cities.chisinau'),
      street: user.street || ''
    });
    setIsEditing(false);
    setEmailError(false);
  };

  const cities = [
    t('profile.cities.chisinau'), t('profile.cities.balti'), t('profile.cities.tiraspol'), 
    t('profile.cities.bender'), t('profile.cities.ribnita'), t('profile.cities.cahul'), 
    t('profile.cities.ungheni'), t('profile.cities.soroca'), t('profile.cities.orhei'), 
    t('profile.cities.comrat')
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '20px', flexDirection: 'row-reverse' }}>
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
                padding: '10px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '15px'
              }}>
                <button 
                  onClick={() => { logout(); navigate('/'); }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ff4d4d',
                    backgroundColor: 'transparent',
                    color: '#ff4d4d',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                >
                  <LogOut size={18} />
                  {t('profile.logout')}
                </button>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => {
                    const userInput = window.prompt(t('profile.confirmDeletePrompt'));
                    if (userInput !== null) {
                      if (userInput.trim().toUpperCase() === t('profile.confirmKeyword').toUpperCase()) {
                        logout();
                        navigate('/');
                      } else {
                        alert(t('profile.deleteFailed'));
                      }
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#666',
                    fontSize: '13px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  {t('profile.deleteAccount')}
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
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#fff' }}>
                    {t('profile.personalData')}
                  </h1>
                  {!isEditing && (
                    <button onClick={() => setIsEditing(true)} style={{ color: '#A6CE39', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                        onChange={(e) => setFormData({ ...formData, name: e.target.value.replace(/\d/g, '') })}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #A6CE39', backgroundColor: 'transparent', color: '#fff', outline: 'none' }}
                      />
                    ) : (
                      <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', color: '#fff' }}>{user.name}</div>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '8px' }}>{t('auth.lastName')}</label>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value.replace(/\d/g, '') })}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #A6CE39', backgroundColor: 'transparent', color: '#fff', outline: 'none' }}
                      />
                    ) : (
                      <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', color: '#fff' }}>{user.lastName || '—'}</div>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '8px' }}>{t('auth.email')}</label>
                    {isEditing ? (
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${emailError ? '#ff4d4d' : '#A6CE39'}`, backgroundColor: 'transparent', color: '#fff', outline: 'none' }}
                      />
                    ) : (
                      <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', color: '#fff' }}>{user.email}</div>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '8px' }}>{t('auth.phone')}</label>
                    {isEditing ? (
                      <input 
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^\d+]/g, '') })}
                        style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #A6CE39', backgroundColor: 'transparent', color: '#fff', outline: 'none' }}
                      />
                    ) : (
                      <div 
                        onClick={() => setIsEditing(true)}
                        style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
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
                        <div style={{ position: 'relative', width: '160px' }}>
                          <div 
                            onClick={() => setIsCityOpen(!isCityOpen)}
                            style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #A6CE39', backgroundColor: '#1a1a1a', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                          >
                            {formData.city}
                            <ChevronDown size={16} />
                          </div>
                          {isCityOpen && (
                            <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', zIndex: 100 }}>
                              {cities.map(city => (
                                <div key={city} onClick={() => { setFormData({ ...formData, city }); setIsCityOpen(false); }} style={{ padding: '10px 16px', color: '#fff', cursor: 'pointer' }}>{city}</div>
                              ))}
                            </div>
                          )}
                        </div>
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
                        onClick={() => setIsEditing(true)}
                        style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        {!user.street && <Plus size={14} />}
                        {!user.street ? t('profile.addAddress') : `${user.city}${user.street ? `, ${user.street}` : ''}`}
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <button onClick={handleSave} style={{ backgroundColor: '#A6CE39', color: '#000', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600 }}>{t('common.save')}</button>
                    <button onClick={handleCancel} style={{ color: '#888', border: '1px solid #444', padding: '10px 20px', borderRadius: '8px', backgroundColor: 'transparent', cursor: 'pointer' }}>{t('common.cancel')}</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '12px', padding: '20px', border: '1px solid var(--border-color)', marginTop: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>{t('profile.orders')}</h2>
            
            {isLoadingOrders ? (
              <div style={{ color: '#888', textAlign: 'center', padding: '40px 0' }}>{t('common.loading', 'Loading...')}</div>
            ) : orders.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {orders.map(order => (
                  <div key={order.id} style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '15px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                      <div>
                        <span style={{ color: '#fff', fontWeight: 600, fontSize: '16px' }}>{formatOrderId(order.id)}</span>
                        <div style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>
                          {new Date(order.orderDate).toLocaleString()}
                        </div>
                      </div>
                      <div style={{ 
                        padding: '6px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: 600,
                        backgroundColor: order.status === 'Pending' ? 'rgba(255, 165, 0, 0.1)' : 
                                         order.status === 'Returned' ? 'rgba(255, 77, 77, 0.1)' : 'rgba(166, 206, 57, 0.1)',
                        color: order.status === 'Pending' ? '#ffa500' : 
                               order.status === 'Returned' ? '#ff4d4d' : '#A6CE39'
                      }}>
                        {order.status}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                      {order.items.map((item: any, idx: number) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#ccc' }}>
                          <span style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', paddingRight: '10px' }}>
                            {item.name} <span style={{ color: '#888' }}>x{item.quantity}</span>
                          </span>
                          <span style={{ flexShrink: 0 }}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} MDL</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ textAlign: 'right', fontWeight: 700, color: '#fff', fontSize: '18px' }}>
                      {t('profile.total', 'Итого')}: {order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} MDL
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ color: '#888', textAlign: 'center', padding: '40px 0', border: '1px dashed var(--border-color)', borderRadius: '8px' }}>
                {t('profile.noOrders')}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
