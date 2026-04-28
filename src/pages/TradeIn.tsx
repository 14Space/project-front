import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Camera, Repeat, Plus, X } from 'lucide-react';

export default function TradeIn() {
  const { t, i18n } = useTranslation();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    category: '',
    condition: 'used',
    description: '',
  });

  const [requests, setRequests] = useState<any[]>([]);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('tradeInRequests');
    if (saved) {
      setRequests(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (requests.length > 0) {
      localStorage.setItem('tradeInRequests', JSON.stringify(requests));
    }
  }, [requests]);

  const categories = [
    'computers', 'laptops', 'components', 'monitors', 'peripherals', 'consoles', 'networking'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category) {
      setIsCategoryOpen(true);
      return;
    }
    
    if (selectedFiles.length === 0) {
      fileInputRef.current?.click();
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      const newRequest = {
        id: Date.now().toString(),
        ...formData,
        photo: base64,
        status: 'pending'
      };

      setRequests(prev => [...prev, newRequest]);
      setIsModalOpen(false);
      
      // Reset form
      setFormData({ category: '', condition: 'used', description: '' });
      setSelectedFiles([]);
    };
    reader.readAsDataURL(selectedFiles[0]);
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

  const handleDeleteRequest = () => {
    if (requestToDelete) {
      const updatedRequests = requests.filter(req => req.id !== requestToDelete);
      setRequests(updatedRequests);
      localStorage.setItem('tradeInRequests', JSON.stringify(updatedRequests));
      setRequestToDelete(null);
    }
  };



  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <section className="section" style={{ padding: '20px 0 40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Repeat size={28} color="#A6CE39" />
            <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 700, margin: 0 }}>
              {t('tradeIn.title')}
            </h1>
          </div>


          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {requests.map(request => (
              <div 
                key={request.id}
                style={{ 
                  width: 'calc((100% - 80px) / 5)', 
                  height: '335px', 
                  minWidth: '220px', 
                  backgroundColor: '#111212', 
                  borderRadius: '16px', 
                  border: '1px solid #222', 
                  display: 'flex', 
                  flexDirection: 'column',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
              >
                <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                  <img src={request.photo} alt="request" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '5px 10px 10px 10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ color: '#fff', fontSize: '18px', fontWeight: 700, marginBottom: '5px' }}>
                    {t(`tradeIn.form.categories.${request.category}`)}
                  </div>
                  <div style={{ 
                    color: '#888', 
                    fontSize: '14px', 
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '100%'
                  }}>
                    {request.description}
                  </div>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '15px'
                  }}>
                    <div style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      height: '32px',
                      padding: '0 16px',
                      borderRadius: '30px',
                      backgroundColor: 'rgba(255, 171, 0, 0.1)',
                      color: '#FFAB00',
                      fontSize: '13px',
                      fontWeight: 700,
                      width: 'fit-content'
                    }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFAB00' }} />
                      {i18n.language.startsWith('ru') ? 'На рассмотрении' : 'Under review'}
                    </div>
                    
                    <button 
                      onClick={() => setRequestToDelete(request.id)}
                      style={{ 
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 77, 77, 0.1)',
                        color: '#ff4d4d',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        border: '1px solid rgba(255, 77, 77, 0.2)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#ff4d4d';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 77, 77, 0.1)';
                        e.currentTarget.style.color = '#ff4d4d';
                      }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {/* Карточка "Добавить товар" */}
            <div 
              onClick={() => setIsModalOpen(true)}
              style={{ 
                width: 'calc((100% - 80px) / 5)', 
                height: '335px', 
                minWidth: '220px', 
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
                          <input 
                            tabIndex={-1}
                            autoComplete="off"
                            style={{ opacity: 0, height: 0, width: 0, position: 'absolute', pointerEvents: 'none' }}
                            value={formData.category}
                            onChange={() => {}}
                            required
                          />
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
                      border: '2px dashed',
                      borderColor: selectedFiles.length === 0 ? '#333' : 'transparent',
                      borderRadius: '16px', 
                      padding: '0', 
                      textAlign: 'center', 
                      cursor: selectedFiles.length === 0 ? 'pointer' : 'default',
                      backgroundColor: selectedFiles.length === 0 ? '#151617' : 'transparent',
                      transition: 'all 0.3s ease',
                      height: 'auto',
                      minHeight: '114px',
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
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(5, 1fr)', 
                          gap: '12px',
                          width: '100%',
                          position: 'relative'
                        }}>
                          {/* Hidden spacer to force height to match one square photo */}
                          <div style={{ aspectRatio: '1/1', visibility: 'hidden' }} />
                          
                          {/* Centered content overlay */}
                          <div style={{ 
                            position: 'absolute',
                            inset: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <div style={{ 
                              width: '56px', 
                              height: '56px', 
                              backgroundColor: 'rgba(166, 206, 57, 0.1)', 
                              borderRadius: '50%', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              margin: '0 auto 8px',
                              flexShrink: 0
                            }}>
                              <Camera size={28} color="#A6CE39" />
                            </div>
                            <div style={{ color: '#666', fontSize: '14px' }}>
                              {t('tradeIn.form.photosDesc')}
                            </div>
                          </div>
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
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#A6CE39';
                    }}
                  >
                    {t('tradeIn.form.submit')}
                  </button>
                </form>
              </div>
            </div>
          )}
          {/* Confirmation Modal */}
          {requestToDelete && (
            <div style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              backdropFilter: 'blur(8px)'
            }}>
              <div style={{ 
                backgroundColor: '#111212',
                border: '1px solid #333',
                borderRadius: '24px',
                padding: '40px',
                maxWidth: '450px',
                width: '100%',
                textAlign: 'center',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
              }}>
                <div style={{ 
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 77, 77, 0.1)',
                  color: '#ff4d4d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px'
                }}>
                  <X size={32} />
                </div>
                <h3 style={{ color: '#fff', fontSize: '20px', fontWeight: 700, marginBottom: '32px', lineHeight: 1.4 }}>
                  {i18n.language.startsWith('ru') ? 'Вы точно хотите удалить вашу заявку на Трейд Ин?' : 'Are you sure you want to delete your Trade-In request?'}
                </h3>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button 
                    onClick={handleDeleteRequest}
                    style={{ 
                      flex: 1,
                      height: '52px',
                      backgroundColor: '#ff4d4d',
                      color: '#fff',
                      borderRadius: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e64545'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff4d4d'}
                  >
                    {i18n.language.startsWith('ru') ? 'Да, удалить' : 'Yes, delete'}
                  </button>
                  <button 
                    onClick={() => setRequestToDelete(null)}
                    style={{ 
                      flex: 1,
                      height: '52px',
                      backgroundColor: '#1a1b1c',
                      color: '#fff',
                      border: '1px solid #333',
                      borderRadius: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#666'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333'}
                  >
                    {i18n.language.startsWith('ru') ? 'Нет, отмена' : 'No, cancel'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
