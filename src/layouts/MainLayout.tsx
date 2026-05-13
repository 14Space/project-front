import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useAppContext } from '../context/AppContext'

export default function MainLayout() {
    const { user } = useAppContext();
    const location = useLocation();
    
    // Hide footer for Admin/Manager on their profile and in admin panel
    const isProfilePage = location.pathname === '/profile';
    const isAdminPage = location.pathname === '/admin';
    const isStaff = user?.role === 'admin' || user?.role === 'manager';
    
    const showFooter = !(isAdminPage || (isProfilePage && isStaff));

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-color)' }}>
            {/* 
                Wrap Header and Main into a single container.
                Sticky elements are limited to their parent's height.
                When this container ends (at the footer), the header will scroll away.
            */}
            <div className="content-wrapper" style={{ position: 'relative', flex: 1 }}>
                <div style={{ 
                    position: 'sticky', 
                    top: 0, 
                    zIndex: 50,
                    backgroundColor: 'var(--header-bg)',
                    borderBottom: '1px solid var(--border-color)'
                }}>
                    <Header />
                </div>

                <main style={{ position: 'relative' }}>
                    <Outlet />
                </main>
            </div>

            {/* Footer is outside the sticky container, so it will "push" the content-wrapper up */}
            {showFooter && <Footer />}
        </div>
    )
}