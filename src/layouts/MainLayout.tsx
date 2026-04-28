import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-color)' }}>
            {/* 
                Wrap Header and Main into a single container.
                Sticky elements are limited to their parent's height.
                When this container ends (at the footer), the header will scroll away.
            */}
            <div className="content-wrapper" style={{ position: 'relative' }}>
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
            <Footer />
        </div>
    )
}