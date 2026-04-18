export default function MainNav() {
  return (
    <nav style={{ backgroundColor: '#A6CE39', color: '#111', fontWeight: 600, fontSize: '14px' }}>
      <div className="container" style={{ display: 'flex', gap: '24px', alignItems: 'center', height: '48px', overflowX: 'auto' }}>
        <a href="#" style={{ whiteSpace: 'nowrap' }}>Акции</a>
        <a href="#" style={{ whiteSpace: 'nowrap' }}>Сборка ПК</a>
        <a href="#" style={{ whiteSpace: 'nowrap' }}>Trade-In</a>
        <a href="#" style={{ whiteSpace: 'nowrap' }}>Б/У Железо</a>
        <a href="#" style={{ whiteSpace: 'nowrap' }}>Новости</a>
        <a href="#" style={{ whiteSpace: 'nowrap' }}>FRAME Premium</a>
      </div>
    </nav>
  );
}
