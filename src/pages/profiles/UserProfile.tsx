import React, { useEffect, useRef } from 'react';

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

  const nameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);

  const showErr = (ref: React.RefObject<HTMLInputElement | null>, msg: string) => {
    if (!ref.current) return;
    ref.current.setCustomValidity(msg);
    ref.current.reportValidity();
  };
  const clearRef = (ref: React.RefObject<HTMLInputElement | null>) => ref.current?.setCustomValidity('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val.startsWith('+373')) return;
    const digits = val.slice(4).replace(/\D/g, '').slice(0, 8);
    setFormData(prev => ({ ...prev, phone: '+373' + digits }));
  };

  const handleStartEditing = () => {
    setFormData(prev => ({ ...prev, phone: prev.phone || '+373' }));
    setIsEditing(true);
  };
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
    const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    [nameRef, lastNameRef, emailRef, phoneRef, streetRef].forEach(clearRef);

    if (!formData.name.trim()) { showErr(nameRef, t('validation.firstNameRequired')); return; }
    if (formData.name.trim().length < 2) { showErr(nameRef, t('validation.firstNameMin')); return; }
    if (!formData.lastName.trim()) { showErr(lastNameRef, t('validation.lastNameRequired')); return; }
    if (formData.lastName.trim().length < 2) { showErr(lastNameRef, t('validation.lastNameMin')); return; }
    if (!formData.email.trim()) { showErr(emailRef, t('validation.profileEmailRequired')); setEmailError(true); return; }
    if (/[^\x00-\x7F]/.test(formData.email)) { showErr(emailRef, t('validation.profileEmailLatin')); setEmailError(true); return; }
    if (!emailRegex.test(formData.email)) { showErr(emailRef, t('validation.profileEmailFormat')); setEmailError(true); return; }
    const phone = formData.phone;
    if (phone && phone !== '+373' && !/^\+373\d{8}$/.test(phone)) { showErr(phoneRef, t('validation.phoneFormat')); return; }
    if (formData.street && formData.street.length > 100) { showErr(streetRef, t('validation.streetMax')); return; }

    setEmailError(false);
    const phoneToSave = phone === '+373' ? '' : phone;
    updateUser({ ...formData, phone: phoneToSave });
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
                        api.delete(`/Auth/me`).then(() => {
                          logout();
                          navigate('/');
                        }).catch(err => {
                          console.error(err);
                          alert('Ошибка при удалении аккаунта');
                        });
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
                    <button onClick={handleStartEditing} style={{ color: '#A6CE39', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Edit2 size={16} />
                      {t('common.edit')}
                    </button>
                  )}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '8px' }}>{t('auth.firstName')}</label>
                    {isEditing ? (
                      <>
                        <input ref={nameRef} type="text" value={formData.name} onChange={(e) => { setFormData({ ...formData, name: e.target.value.replace(/\d/g, '') }); clearRef(nameRef); }} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #A6CE39', backgroundColor: 'transparent', color: '#fff', outline: 'none' }} />
                      </>
                    ) : (
                      <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', color: '#fff' }}>{user.name}</div>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '8px' }}>{t('auth.lastName')}</label>
                    {isEditing ? (
                      <>
                        <input ref={lastNameRef} type="text" value={formData.lastName} onChange={(e) => { setFormData({ ...formData, lastName: e.target.value.replace(/\d/g, '') }); clearRef(lastNameRef); }} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #A6CE39', backgroundColor: 'transparent', color: '#fff', outline: 'none' }} />
                      </>
                    ) : (
                      <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', color: '#fff' }}>{user.lastName || '—'}</div>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '8px' }}>{t('auth.email')}</label>
                    {isEditing ? (
                      <>
                        <input ref={emailRef} type="email" value={formData.email} onChange={(e) => { setFormData({ ...formData, email: e.target.value }); clearRef(emailRef); setEmailError(false); }} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${emailError ? '#ff4d4d' : '#A6CE39'}`, backgroundColor: 'transparent', color: '#fff', outline: 'none' }} />
                      </>
                    ) : (
                      <div style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', color: '#fff' }}>{user.email}</div>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', color: '#888', marginBottom: '8px' }}>{t('auth.phone')}</label>
                    {isEditing ? (
                      <>
                        <input ref={phoneRef} type="text" value={formData.phone} onChange={(e) => { handlePhoneChange(e); clearRef(phoneRef); }} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #A6CE39', backgroundColor: 'transparent', color: '#fff', outline: 'none' }} />
                      </>
                    ) : (
                      <div 
                        onClick={handleStartEditing}
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
                            style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #A6CE39', backgroundColor: 'var(--card-bg)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                          >
                            {formData.city}
                            <ChevronDown size={16} />
                          </div>
                          {isCityOpen && (
                            <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: 'var(--card-bg)', border: '1px solid #333', borderRadius: '8px', zIndex: 100 }}>
                              {cities.map(city => (
                                <div key={city} onClick={() => { setFormData({ ...formData, city }); setIsCityOpen(false); }} style={{ padding: '10px 16px', color: '#fff', cursor: 'pointer' }}>{city}</div>
                              ))}
                            </div>
                          )}
                        </div>
                        <input
                          ref={streetRef}
                          type="text"
                          value={formData.street}
                          onChange={(e) => { setFormData({ ...formData, street: e.target.value }); clearRef(streetRef); }}
                          placeholder={t('auth.street')}
                          style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #A6CE39', backgroundColor: 'transparent', color: '#fff', outline: 'none' }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}
                      >
                        {!user.street && <Plus size={14} color="#888" />}
                        {!user.street ? <span style={{ color: '#888' }}>{t('profile.addAddress')}</span> : `${user.city}${user.street ? `, ${user.street}` : ''}`}
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
                          {new Date(order.orderDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      {(() => {
                        const s = order.status?.toLowerCase();
                        const color = s === 'pending' ? '#eab308' : s === 'shipped' ? '#3b82f6' : s === 'delivered' ? '#A6CE39' : s === 'returned' ? '#ff4d4d' : '#888';
                        const label = s === 'pending' ? 'В обработке' : s === 'shipped' ? 'Отправлен' : s === 'delivered' ? 'Доставлен' : s === 'returned' ? 'Возврат' : order.status;
                        return (
                          <div style={{ padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}>
                            {label}
                          </div>
                        );
                      })()}
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
