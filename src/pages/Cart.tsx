import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { t } = useTranslation();

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: 'calc(100vh - 160px)', color: '#fff' }}>
      <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        {/* Title Only */}
        <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ShoppingCart size={32} style={{ color: 'var(--primary-color)' }} />
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            letterSpacing: '1px',
            color: '#fff'
          }}>
            {t('common.cart', 'Корзина')}
          </h1>
        </div>


        {/* Empty State */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '100px 20px',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '32px',
          border: '1px solid var(--border-color)',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
        }}>
          <div style={{ 
            width: '140px', 
            height: '140px', 
            backgroundColor: 'rgba(166, 206, 57, 0.05)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: '32px',
            border: '1px solid rgba(166, 206, 57, 0.1)'
          }}>
            <ShoppingCart size={60} style={{ color: 'var(--primary-color)' }} />
          </div>
          
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>Ваша корзина пуста</h2>
          
          <p style={{ 
            color: 'var(--text-secondary)', 
            marginBottom: '40px', 
            maxWidth: '450px',
            fontSize: '16px',
            lineHeight: '1.6'
          }}>
            Похоже, вы еще ничего не добавили в корзину. <br />
            Загляните в каталог, чтобы найти лучшие предложения!
          </p>
          
          <Link to="/" className="btn-primary" style={{ padding: '0 48px', height: '56px', borderRadius: '14px', fontSize: '16px', fontWeight: 600 }}>
            Вернуться на главную страничку
          </Link>
        </div>


      </div>
    </div>
  );
}
