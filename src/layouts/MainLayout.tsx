import { Outlet } from 'react-router-dom'

import Header from './Header'
import MainNav from './MainNav'
import Footer from './Footer'

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">

            <Header />
            <MainNav />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}