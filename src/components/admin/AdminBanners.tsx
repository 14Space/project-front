import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../../api';
import { Trash2, Plus, Edit2, ChevronLeft } from 'lucide-react';

interface Banner {
  id: number;
  imageUrl: string;
  link: string;
  order: number;
}

export default function AdminBanners({ onBack }: { onBack?: () => void }) {
  const { t } = useTranslation();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newLink, setNewLink] = useState('');
  const [newOrder, setNewOrder] = useState(1);
  const [fileName, setFileName] = useState('');

  const [editingBannerId, setEditingBannerId] = useState<number | null>(null);
  const [editLink, setEditLink] = useState('');
  const [editOrder, setEditOrder] = useState(0);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await api.get('/Banners');
      const list = Array.isArray(res) ? res : [];
      setBanners(list);
      setNewOrder(list.length > 0 ? Math.max(...list.map((b: Banner) => b.order)) + 1 : 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const validateUrl = (url: string): string | null => {
    if (!url.trim()) return null;
    try { new URL(url); return null; } catch { return t('validation.bannerUrlInvalid'); }
  };

  const handleCreate = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return alert(t('validation.bannerImageRequired'));
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) return alert(t('validation.bannerFileSize'));
    if (!['image/jpeg','image/png','image/webp','image/gif'].includes(file.type)) return alert(t('validation.bannerFileType'));
    if (newOrder < 1) return alert(t('validation.bannerOrderMin'));
    if (banners.some(b => b.order === newOrder)) return alert(t('validation.bannerOrderExists'));
    const urlErr = validateUrl(newLink);
    if (urlErr) return alert(urlErr);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('link', newLink);
    formData.append('order', newOrder.toString());

    try {
      await api.upload('/Banners', formData);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setNewLink('');
      setFileName('');
      const updated: Banner[] = await api.get('/Banners');
      setBanners(Array.isArray(updated) ? updated : []);
      setNewOrder(updated.length > 0 ? Math.max(...updated.map((b: Banner) => b.order)) + 1 : 1);
    } catch (err) {
      console.error(err);
      alert('Ошибка при сохранении баннера: ' + ((err as Error)?.message || String(err)));
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Удалить этот баннер?')) return;
    try {
      await api.delete(`/Banners/${id}`);
      fetchBanners();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (b: Banner) => {
    setEditingBannerId(b.id);
    setEditLink(b.link || '');
    setEditOrder(b.order);
  };

  const handleUpdate = async (id: number) => {
    try {
      await api.put(`/Banners/${id}`, { link: editLink, order: editOrder });
      setEditingBannerId(null);
      fetchBanners();
    } catch (err) {
      console.error(err);
      alert('Ошибка при обновлении баннера');
    }
  };

  return (
    <div style={{ color: '#fff', animation: 'fadeIn 0.3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px', position: 'relative' }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '14px', padding: 0, position: 'absolute', left: 0 }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
          >
            <ChevronLeft size={18} />
            {t('common.back')}
          </button>
        )}
        <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{t('admin.actions.reviewModeration')}</h2>
      </div>
      
      {/* Форма добавления */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: 700, color: '#fff' }}>Добавить новый баннер</h3>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>Изображение</label>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{ width: '100%', padding: '12px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: fileName ? '#fff' : '#888', textAlign: 'left', cursor: 'pointer', fontSize: '14px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {fileName || 'Выберите файл...'}
            </button>
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>Ссылка (по клику)</label>
            <input
              type="text"
              placeholder="https://..."
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              style={{ width: '100%', padding: '12px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
            />
          </div>
          <div style={{ width: '100px' }}>
            <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>Порядок</label>
            <input
              type="text"
              inputMode="numeric"
              value={newOrder}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                const num = parseInt(val) || 1;
                setNewOrder(num < 1 ? 1 : num);
              }}
              style={{ width: '100%', padding: '12px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none', MozAppearance: 'textfield', WebkitAppearance: 'none' } as any}
            />
          </div>
          <button 
            onClick={handleCreate}
            style={{ padding: '12px 20px', backgroundColor: 'var(--primary-color)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', height: '45px' }}
          >
            <Plus size={18} /> Добавить
          </button>
        </div>
      </div>

      {/* Список баннеров */}
      <div>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: 700, color: '#fff' }}>Текущие баннеры</h3>
        {loading ? (
          <p>Загрузка...</p>
        ) : banners.length === 0 ? (
          <p style={{ color: '#888' }}>Нет загруженных баннеров.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {banners.map((b) => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1a1a1a', padding: '15px', borderRadius: '12px', border: '1px solid #333', gap: '20px' }}>
                <div style={{ width: '150px', height: '70px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#000' }}>
                  <img src={b.imageUrl.startsWith('http') ? b.imageUrl : `http://localhost:5036${b.imageUrl}`} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  {editingBannerId === b.id ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label style={{ color: '#888', fontSize: '14px', width: '70px' }}>Порядок:</label>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={editOrder}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            const num = parseInt(val) || 1;
                            setEditOrder(num < 1 ? 1 : num);
                          }}
                          style={{ width: '80px', padding: '8px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '6px', color: '#fff', outline: 'none' }}
                        />
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label style={{ color: '#888', fontSize: '14px', width: '70px' }}>Ссылка:</label>
                        <input 
                          type="text" 
                          value={editLink}
                          onChange={(e) => setEditLink(e.target.value)}
                          style={{ flex: 1, padding: '8px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '6px', color: '#fff', outline: 'none' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                        <button 
                          onClick={() => handleUpdate(b.id)}
                          style={{ padding: '6px 12px', backgroundColor: 'var(--primary-color)', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontSize: '14px' }}
                        >
                          Сохранить
                        </button>
                        <button 
                          onClick={() => setEditingBannerId(null)}
                          style={{ padding: '6px 12px', backgroundColor: '#333', border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer', fontSize: '14px' }}
                        >
                          Отмена
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ fontSize: '14px', color: '#888', marginBottom: '5px' }}>Порядок: {b.order}</div>
                      <div style={{ fontSize: '14px' }}>Ссылка: {b.link || 'Нет ссылки'}</div>
                    </>
                  )}
                </div>
                {editingBannerId !== b.id && (
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <button 
                      onClick={() => startEdit(b)}
                      style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: '5px', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary-color)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                      title="Редактировать"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(b.id)}
                      style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: '5px', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ff4d4d'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#888'}
                      title="Удалить"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
