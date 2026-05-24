import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../../api';
import { Trash2, Plus, GripVertical, Edit2 } from 'lucide-react';

interface Banner {
  id: number;
  imageUrl: string;
  link: string;
  order: number;
}

export default function AdminBanners() {
  const { t } = useTranslation();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newLink, setNewLink] = useState('');
  const [newOrder, setNewOrder] = useState(0);

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
      setBanners(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return alert('Выберите изображение для баннера');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('link', newLink);
    formData.append('order', newOrder.toString());

    try {
      await api.upload('/Banners', formData);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setNewLink('');
      setNewOrder(banners.length > 0 ? Math.max(...banners.map(b => b.order)) + 1 : 0);
      fetchBanners();
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
    <div style={{ color: '#fff' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px' }}>Управление баннерами</h2>
      
      {/* Форма добавления */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px', border: '1px solid #333', marginBottom: '30px' }}>
        <h3 style={{ margin: '0 0 15px 0', fontSize: '18px' }}>Добавить новый баннер</h3>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>Изображение</label>
            <input 
              type="file" 
              accept="image/*"
              ref={fileInputRef}
              style={{ width: '100%', padding: '10px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>Ссылка (по клику)</label>
            <input 
              type="text" 
              placeholder="/category/1 или https://..."
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              style={{ width: '100%', padding: '12px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
            />
          </div>
          <div style={{ width: '100px' }}>
            <label style={{ display: 'block', color: '#888', marginBottom: '8px', fontSize: '14px' }}>Порядок</label>
            <input 
              type="number" 
              value={newOrder}
              onChange={(e) => setNewOrder(Number(e.target.value))}
              style={{ width: '100%', padding: '12px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#fff', outline: 'none' }}
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
        <h3 style={{ margin: '0 0 15px 0', fontSize: '18px' }}>Текущие баннеры</h3>
        {loading ? (
          <p>Загрузка...</p>
        ) : banners.length === 0 ? (
          <p style={{ color: '#888' }}>Нет загруженных баннеров.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {banners.map((b) => (
              <div key={b.id} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1a1a1a', padding: '15px', borderRadius: '12px', border: '1px solid #333', gap: '20px' }}>
                <GripVertical size={20} color="#555" style={{ cursor: 'grab' }} />
                <div style={{ width: '150px', height: '70px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#000' }}>
                  <img src={b.imageUrl.startsWith('http') ? b.imageUrl : `http://localhost:5036${b.imageUrl}`} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  {editingBannerId === b.id ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <label style={{ color: '#888', fontSize: '14px', width: '70px' }}>Порядок:</label>
                        <input 
                          type="number" 
                          value={editOrder}
                          onChange={(e) => setEditOrder(Number(e.target.value))}
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
