import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Search, Check, Trash2, UserPlus } from 'lucide-react';

interface AdminUsersProps {
  onBack?: () => void;
  hideHeader?: boolean;
}

const AdminUsers: React.FC<AdminUsersProps> = ({ onBack, hideHeader = false }) => {
  const { t } = useTranslation();
  const { users, user, addUser } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '' });

  const filteredUsers = users
    .filter(u => 
      u.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const roleOrder = { admin: 1, manager: 2, user: 3 };
      const roleA = roleOrder[a.role || 'user'] || 3;
      const roleB = roleOrder[b.role || 'user'] || 3;
      return roleA - roleB;
    });

  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newAdmin.email)) {
      alert('Пожалуйста, введите корректный email');
      return;
    }

    const newUser = {
      id: `user-${Math.random().toString(36).substr(2, 9)}`,
      name: newAdmin.name,
      email: newAdmin.email,
      role: 'admin' as const
    };

    addUser(newUser);
    setIsAdding(false);
    setNewAdmin({ name: '', email: '' });
  };

  return (
    <div style={{ animation: 'fadeIn 0.3s ease', color: '#fff' }}>
      {/* Regular Header (used in Admin panel) */}
      {!hideHeader && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', position: 'relative' }}>
          {onBack && (
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', position: 'absolute', left: 0 }}>
              <ChevronLeft size={18} /> {t('common.back')}
            </button>
          )}
          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{user?.role === 'manager' ? 'База пользователей' : 'Список клиентов'}</h2>
          <div style={{ position: 'absolute', right: 0, width: '300px' }}>
            <input type="text" placeholder="Поиск..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '10px 15px 10px 40px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: '#111', color: '#fff', fontSize: '14px', outline: 'none' }} />
            <Search size={16} color="#888" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>
      )}

      {/* Profile Header (used in Manager/Admin Profile) */}
      {hideHeader && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>База пользователей</h2>
            
            <div style={{ position: 'relative', width: '250px' }}>
              <input 
                type="text" 
                placeholder="Поиск..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                style={{ 
                  width: '100%', 
                  height: '40px',
                  padding: '0 12px 0 35px', 
                  borderRadius: '6px', 
                  border: '1px solid var(--border-color)', 
                  backgroundColor: '#111', 
                  color: '#fff', 
                  fontSize: '13px', 
                  outline: 'none' 
                }} 
              />
              <Search size={14} color="#888" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          {isAdding ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', animation: 'slideInRight 0.3s ease' }}>
              <input 
                type="text" 
                placeholder="Введите имя" 
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                style={{ height: '40px', padding: '0 12px', borderRadius: '6px', border: '1px solid var(--primary-color)', backgroundColor: '#111', color: '#fff', fontSize: '13px', outline: 'none', width: '150px' }}
              />
              <input 
                type="email" 
                placeholder="Введите почту" 
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                style={{ height: '40px', padding: '0 12px', borderRadius: '6px', border: '1px solid var(--primary-color)', backgroundColor: '#111', color: '#fff', fontSize: '13px', outline: 'none', width: '180px' }}
              />
              <button 
                onClick={handleAddAdmin}
                style={{ backgroundColor: '#A6CE39', color: '#000', width: '40px', height: '40px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s', border: 'none', cursor: 'pointer' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#96bb33'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#A6CE39'}
              >
                <Check size={18} />
              </button>
              <button 
                onClick={() => { setIsAdding(false); setNewAdmin({ name: '', email: '' }); }}
                style={{ backgroundColor: 'transparent', color: '#ff4d4d', width: '40px', height: '40px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ff4d4d', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 77, 77, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAdding(true)}
              style={{ 
                backgroundColor: '#A6CE39', 
                color: '#000', 
                height: '40px',
                padding: '0 20px', 
                borderRadius: '8px', 
                fontWeight: 700, 
                fontSize: '14px', 
                transition: 'background-color 0.2s', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#96bb33'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#A6CE39'}
            >
              <UserPlus size={16} />
              Добавить администратора
            </button>
          )}
        </div>
      )}

      <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>ID Клиента</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>Имя</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>Фамилия</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>Email</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>Телефон</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>Роль</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, idx) => (
                <tr key={u.id} style={{ borderBottom: idx === filteredUsers.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                  <td style={{ padding: '15px 20px', fontSize: '14px', color: 'var(--primary-color)' }}>{u.id}</td>
                  <td style={{ padding: '15px 20px', fontSize: '14px' }}>{u.name}</td>
                  <td style={{ padding: '15px 20px', fontSize: '14px' }}>{u.lastName || '--'}</td>
                  <td style={{ padding: '15px 20px', fontSize: '14px', color: '#aaa' }}>{u.email}</td>
                  <td style={{ padding: '15px 20px', fontSize: '14px', color: '#aaa' }}>{u.phone && u.phone !== '+373' ? u.phone : '--'}</td>
                  <td style={{ padding: '15px 20px', fontSize: '14px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '4px', 
                      fontSize: '12px', 
                      fontWeight: 600,
                      backgroundColor: u.role === 'admin' ? 'rgba(166, 206, 57, 0.1)' : u.role === 'manager' ? 'rgba(166, 206, 57, 0.05)' : 'rgba(255,255,255,0.05)',
                      color: u.role === 'admin' ? 'var(--primary-color)' : u.role === 'manager' ? '#fff' : '#aaa'
                    }}>
                      {u.role === 'admin' ? 'Администратор' : u.role === 'manager' ? 'Менеджер' : 'Пользователь'}
                    </span>
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

export default AdminUsers;
