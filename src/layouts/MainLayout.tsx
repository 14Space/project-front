import { Outlet } from 'react-router-dom'

import Header from './Header'

import Footer from './Footer'

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">

            <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
                <Header />
            </div>
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}