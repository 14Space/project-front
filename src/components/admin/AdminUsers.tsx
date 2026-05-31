import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Search, UserPlus } from 'lucide-react';
import { api } from '../../api';

const formatUserId = (id: string | number) => {
  const str = String(id);
  if (/^\d+$/.test(str)) return `USER-${str.padStart(6, '0')}`;
  return str;
};

interface AdminUsersProps {
  onBack?: () => void;
  hideHeader?: boolean;
}

const AdminUsers: React.FC<AdminUsersProps> = ({ onBack, hideHeader = false }) => {
  const { t } = useTranslation();
  const { user } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [dbUsers, setDbUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/Users')
      .then((data: any[]) => setDbUsers(data))
      .catch(() => setDbUsers([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = dbUsers
    .filter(u =>
      formatUserId(u.id).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.username || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const roleOrder: Record<string, number> = { Admin: 1, Manager: 2, User: 3 };
      return (roleOrder[a.role] || 3) - (roleOrder[b.role] || 3);
    });

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'Admin': return t('adminPage.users.roleAdmin');
      case 'Manager': return t('adminPage.users.roleManager');
      default: return t('adminPage.users.roleUser');
    }
  };

  const getRoleStyle = (role: string) => ({
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 600,
    backgroundColor: (role === 'Admin' || role === 'Manager') ? 'rgba(166, 206, 57, 0.1)' : 'rgba(255,255,255,0.05)',
    color: (role === 'Admin' || role === 'Manager') ? 'var(--primary-color)' : '#aaa'
  });

  return (
    <div style={{ animation: 'fadeIn 0.3s ease', color: '#fff' }}>
      {!hideHeader && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', position: 'relative' }}>
          {onBack && (
            <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', position: 'absolute', left: 0 }}>
              <ChevronLeft size={18} /> {t('common.back')}
            </button>
          )}
          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{user?.role === 'admin' ? t('adminPage.users.title') : t('adminPage.users.clientList')}</h2>
          <div style={{ position: 'absolute', right: 0, width: '300px' }}>
            <input type="text" placeholder={t('adminPage.users.searchPlaceholder')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '10px 15px 10px 40px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: '#111', color: '#fff', fontSize: '14px', outline: 'none' }} />
            <Search size={16} color="#888" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>
      )}

      {hideHeader && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0 }}>{t('adminPage.users.title')}</h2>
            <div style={{ position: 'relative', width: '250px' }}>
              <input type="text" placeholder={t('adminPage.users.searchPlaceholder')} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', height: '40px', padding: '0 12px 0 35px', borderRadius: '6px', border: '1px solid var(--border-color)', backgroundColor: '#111', color: '#fff', fontSize: '13px', outline: 'none' }} />
              <Search size={14} color="#888" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>
        </div>
      )}

      <div style={{ backgroundColor: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '15%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '17%' }} />
              <col style={{ width: '17%' }} />
            </colgroup>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>{t('adminPage.users.idClient')}</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>{t('adminPage.users.firstName')}</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>{t('adminPage.users.lastName')}</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>{t('adminPage.users.email')}</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>{t('adminPage.users.phone')}</th>
                <th style={{ padding: '15px 20px', fontSize: '13px', color: '#888', fontWeight: 500 }}>{t('adminPage.users.role')}</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} style={{ padding: '40px 20px', textAlign: 'center', color: '#888', fontSize: '14px' }}>Загрузка...</td></tr>
              )}
              {!loading && filteredUsers.length === 0 && (
                <tr><td colSpan={6} style={{ padding: '40px 20px', textAlign: 'center', color: '#888', fontSize: '14px' }}>{t('common.noData')}</td></tr>
              )}
              {filteredUsers.map((u, idx) => (
                <tr key={u.id} style={{ borderBottom: idx === filteredUsers.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                  <td style={{ padding: '15px 20px', fontSize: '14px', color: 'var(--primary-color)' }}>{formatUserId(u.id)}</td>
                  <td style={{ padding: '15px 20px', fontSize: '14px' }}>{u.username || '--'}</td>
                  <td style={{ padding: '15px 20px', fontSize: '14px' }}>{u.lastName || '--'}</td>
                  <td style={{ padding: '15px 20px', fontSize: '14px', color: '#aaa' }}>{u.email}</td>
                  <td style={{ padding: '15px 20px', fontSize: '14px', color: '#aaa' }}>{u.phone || '--'}</td>
                  <td style={{ padding: '15px 20px', fontSize: '14px' }}>
                    <span style={getRoleStyle(u.role)}>{getRoleLabel(u.role)}</span>
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
