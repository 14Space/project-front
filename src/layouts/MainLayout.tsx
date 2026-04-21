import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CatalogModal from '../components/catalog/CatalogModal'

export default function MainLayout() {
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="content-wrapper" style={{ position: 'relative' }}>
                <div style={{ 
                    position: 'sticky', 
                    top: 0, 
                    zIndex: 100, // Higher z-index for header
                    backgroundColor: 'var(--header-bg)',
                    borderBottom: '1px solid var(--border-color)'
                }}>
                    <Header onCatalogClick={() => setIsCatalogOpen(true)} />
                </div>

                <main className="flex-1" style={{ position: 'relative' }}>
                    <Outlet />
                </main>
            </div>

            <Footer />

            <CatalogModal 
                isOpen={isCatalogOpen} 
                onClose={() => setIsCatalogOpen(false)} 
            />
        </div>
    )
}