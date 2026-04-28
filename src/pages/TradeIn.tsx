import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Camera, Repeat, Plus, X } from 'lucide-react';

export default function TradeIn() {
  const { t, i18n } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    category: '',
    condition: 'used',
    description: '',
  });

  const categories = [
    'computers', 'laptops', 'components', 'monitors', 'peripherals', 'consoles', 'networking'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки formData и selectedFiles на сервер
    setSubmitted(true);
    setIsModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => {
        const combined = [...prev, ...filesArray];
        return combined.slice(0, 5);
      });
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (submitted) {
    return (
      <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ 
          textAlign: 'center', 
          padding: '48px 32px', 
          backgroundColor: '#111212', 
          borderRadius: '24px', 
          border: '1px solid var(--border-color)', 
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
        }}>
          <div style={{ 
            backgroundColor: '#A6CE39', 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 32px',
            boxShadow: '0 0 20px rgba(166, 206, 57, 0.3)'
          }}>
            <Check size={40} color="#000" />
          </div>
          <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>
            {t('tradeIn.form.success')}
          </h2>
          <button 
            onClick={() => setSubmitted(false)}
            style={{ 
              marginTop: '24px',
              backgroundColor: 'transparent',
              border: '1px solid #333',
              color: '#fff',
              padding: '12px 32px',
              borderRadius: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#A6CE39'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333'}
          >
            {i18n.language.startsWith('ru') ? 'Вернуться назад' : 'Go back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '80vh' }}>
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <Repeat size={28} color="#A6CE39" />
            <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, margin: 0 }}>
              {t('tradeIn.title')}
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginBottom: '32px', maxWidth: '550px', lineHeight: 1.5 }}>
            {t('tradeIn.subtitle')}
          </p>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {/* Карточка "Добавить товар" */}
            <div 
              onClick={() => setIsModalOpen(true)}
              style={{ 
                width: '280px', 
                height: '445px', 
                backgroundColor: '#111212', 
                borderRadius: '16px', 
                border: '1px dashed #333', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                gap: '16px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#A6CE39';
                e.currentTarget.style.backgroundColor = '#151617';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#333';
                e.currentTarget.style.backgroundColor = '#111212';
              }}
            >
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                backgroundColor: 'rgba(166, 206, 57, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#A6CE39'
              }}>
                <Plus size={32} />
              </div>
              <span style={{ color: '#888', fontWeight: 600, fontSize: '15px' }}>
                {i18n.language.startsWith('ru') ? 'Добавить товар' : 'Add Item'}
              </span>
            </div>
          </div>

          {/* Модальное окно с формой */}
          {isModalOpen && (
            <div style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}>
              <div style={{ maxWidth: '700px', width: '100%', position: 'relative' }}>
                <form onSubmit={handleSubmit} style={{ 
                  backgroundColor: '#111212', 
                  borderRadius: '24px', 
                  border: '1px solid var(--border-color)', 
                  padding: '40px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  position: 'relative'
                }}>
                  {/* Кнопка закрытия модалки (Крестик) */}
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    style={{ 
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      border: '2px solid #ff4d4d',
                      backgroundColor: 'transparent', 
                      color: '#ff4d4d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: 10,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 77, 77, 0.1)';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <X size={20} />
                  </button>

                  <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px', marginBottom: '24px' }}>
                    {/* Category */}
                    <div>
                      <label style={{ display: 'block', color: '#fff', marginBottom: '10px', fontSize: '14px', fontWeight: 600 }}>
                        {t('tradeIn.form.category')}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <div 
                          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                          style={{ 
                            width: '100%', 
                            height: '52px', 
                            backgroundColor: '#1a1b1c', 
                            border: '1px solid',
                            borderColor: isCategoryOpen ? '#A6CE39' : 'var(--border-color)', 
                            borderRadius: '12px', 
                            color: formData.category ? '#fff' : '#666', 
                            padding: '0 16px', 
                            fontSize: '15px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'border-color 0.2s'
                          }}
                        >
                          {formData.category ? t(`tradeIn.form.categories.${formData.category}`) : t('tradeIn.form.category')}
                          <ChevronDown 
                            size={18} 
                            color={isCategoryOpen ? '#A6CE39' : '#666'} 
                            style={{ 
                              transition: 'transform 0.2s',
                              transform: isCategoryOpen ? 'rotate(180deg)' : 'rotate(0)'
                            }} 
                          />
                        </div>
                        
                        {isCategoryOpen && (
                          <div style={{ 
                            position: 'absolute',
                            top: 'calc(100% + 8px)',
                            left: 0,
                            width: '100%',
                            backgroundColor: '#1a1b1c',
                            border: '1px solid #333',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                            zIndex: 100,
                            overflow: 'hidden'
                          }}>
                            {categories.map(cat => (
                              <div 
                                key={cat}
                                onClick={() => {
                                  setFormData({ ...formData, category: cat });
                                  setIsCategoryOpen(false);
                                }}
                                style={{ 
                                  padding: '12px 16px', 
                                  cursor: 'pointer', 
                                  color: formData.category === cat ? '#A6CE39' : '#ccc',
                                  backgroundColor: 'transparent',
                                  transition: 'all 0.2s',
                                  fontSize: '14px',
                                  fontWeight: formData.category === cat ? 600 : 400
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = '#A6CE39';
                                  e.currentTarget.style.color = '#000';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                  e.currentTarget.style.color = formData.category === cat ? '#A6CE39' : '#ccc';
                                }}
                              >
                                {t(`tradeIn.form.categories.${cat}`)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Condition */}
                    <div>
                      <label style={{ display: 'block', color: '#fff', marginBottom: '10px', fontSize: '14px', fontWeight: 600 }}>
                        {t('tradeIn.form.condition')}
                      </label>
                      <div style={{ display: 'flex', gap: '10px', height: '52px' }}>
                        {['new', 'openBox', 'used'].map(cond => (
                          <button
                            key={cond}
                            type="button"
                            onClick={() => setFormData({...formData, condition: cond})}
                            style={{ 
                              flex: 1, 
                              backgroundColor: formData.condition === cond ? '#A6CE39' : '#1a1b1c', 
                              color: formData.condition === cond ? '#000' : '#fff', 
                              border: '1px solid', 
                              borderColor: formData.condition === cond ? '#A6CE39' : 'var(--border-color)', 
                              borderRadius: '12px', 
                              fontWeight: 700, 
                              fontSize: '14px',
                              cursor: 'pointer',
                              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                              padding: '0 4px'
                            }}
                          >
                            {cond === 'new' ? t('tradeIn.form.conditionNew') : 
                             cond === 'openBox' ? t('tradeIn.form.conditionOpenBox') : 
                             t('tradeIn.form.conditionUsed')}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '10px', fontSize: '14px', fontWeight: 600 }}>
                      {t('tradeIn.form.description')}
                    </label>
                    <textarea 
                      required
                      placeholder={t('tradeIn.form.descriptionPlaceholder')}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      style={{ 
                        width: '100%', 
                        minHeight: '120px', 
                        backgroundColor: '#1a1b1c', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: '12px', 
                        color: '#fff', 
                        padding: '16px', 
                        outline: 'none',
                        resize: 'vertical',
                        fontSize: '15px',
                        lineHeight: 1.5,
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#A6CE39'}
                      onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
                    />
                  </div>

                  {/* Photo Upload */}
                  <div style={{ marginBottom: '32px' }}>
                    <label style={{ display: 'block', color: '#fff', marginBottom: '10px', fontSize: '14px', fontWeight: 600 }}>
                      {t('tradeIn.form.photos')}
                    </label>
                    <div style={{ 
                      border: selectedFiles.length === 0 ? '2px dashed #333' : 'none',
                      borderRadius: '16px', 
                      padding: '20px 0', 
                      textAlign: 'center', 
                      cursor: selectedFiles.length === 0 ? 'pointer' : 'default',
                      backgroundColor: selectedFiles.length === 0 ? '#151617' : 'transparent',
                      transition: 'all 0.3s ease',
                      height: selectedFiles.length === 0 ? '114px' : 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      boxSizing: 'border-box'
                    }}
                    onClick={() => {
                      if (selectedFiles.length === 0) {
                        fileInputRef.current?.click();
                      }
                    }}
                    onMouseEnter={(e) => {
                      if (selectedFiles.length === 0) {
                        e.currentTarget.style.backgroundColor = 'rgba(166, 206, 57, 0.02)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedFiles.length === 0) {
                        e.currentTarget.style.backgroundColor = '#151617';
                        e.currentTarget.style.borderColor = '#333';
                      } else {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                      }
                    }}
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        multiple 
                        accept=".jpg,.jpeg,.png,.img" 
                        style={{ display: 'none' }} 
                        onChange={handleFileChange}
                      />
                      
                      {selectedFiles.length === 0 ? (
                        <>
                          <div style={{ 
                            width: '56px', 
                            height: '56px', 
                            backgroundColor: 'rgba(166, 206, 57, 0.1)', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            margin: '0 auto',
                            flexShrink: 0
                          }}>
                            <Camera size={28} color="#A6CE39" />
                          </div>

                        </>
                      ) : (
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(5, 1fr)', 
                          gap: '12px',
                          width: '100%'
                        }}>
                          {selectedFiles.map((file, index) => (
                            <div key={index} style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
                              <div style={{ 
                                width: '100%', 
                                height: '100%', 
                                borderRadius: '12px', 
                                overflow: 'hidden',
                                border: '1px solid #333'
                              }}>
                                <img 
                                  src={URL.createObjectURL(file)} 
                                  alt="preview" 
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                />
                              </div>
                              <button 
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFile(index);
                                }}
                                style={{ 
                                  position: 'absolute', 
                                  top: '-6px', 
                                  right: '-6px', 
                                  backgroundColor: '#ff4d4d', 
                                  color: '#fff', 
                                  border: 'none', 
                                  borderRadius: '50%', 
                                  width: '22px', 
                                  height: '22px', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center', 
                                  cursor: 'pointer',
                                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                                  zIndex: 2
                                }}
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ))}
                          
                          {selectedFiles.length < 5 && (
                            <div 
                              onClick={() => fileInputRef.current?.click()}
                              style={{ 
                                width: '100%', 
                                aspectRatio: '1/1', 
                                borderRadius: '12px', 
                                border: '1px dashed #444',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#666',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = '#A6CE39';
                                e.currentTarget.style.color = '#A6CE39';
                                e.currentTarget.style.backgroundColor = 'rgba(166, 206, 57, 0.05)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#444';
                                e.currentTarget.style.color = '#666';
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              <Plus size={24} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    style={{ 
                      width: '100%', 
                      height: '56px', 
                      backgroundColor: '#A6CE39', 
                      color: '#fff',
                      borderRadius: '12px',
                      fontSize: '17px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 8px 20px rgba(166, 206, 57, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#95ba33';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#A6CE39';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {t('tradeIn.form.submit')}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
