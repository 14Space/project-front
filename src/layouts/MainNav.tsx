import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import AuthRequiredModal from '../components/layout/AuthRequiredModal';

export default function MainNav() {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleTradeInClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      navigate('/trade-in');
    }
  };

  return (
    <>
      <nav style={{ backgroundColor: '#A6CE39', color: '#111', fontWeight: 600, fontSize: '14px' }}>
        <div className="container" style={{ display: 'flex', gap: '24px', alignItems: 'center', height: '48px', overflowX: 'auto' }}>
          <a href="#" style={{ whiteSpace: 'nowrap' }}>Акции</a>
          <a href="#" style={{ whiteSpace: 'nowrap' }}>Сборка ПК</a>
          <a href="#" onClick={handleTradeInClick} style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>Trade-In</a>
          <a href="#" style={{ whiteSpace: 'nowrap' }}>Б/У Железо</a>
          <a href="#" style={{ whiteSpace: 'nowrap' }}>Новости</a>
          <a href="#" style={{ whiteSpace: 'nowrap' }}>FRAME Premium</a>
        </div>
      </nav>

      <AuthRequiredModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
}
