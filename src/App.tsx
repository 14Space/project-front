import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.tsx'
import Home from './pages/Home.tsx'
import Profile from './pages/Profile.tsx'
import Favorites from './pages/Favorites.tsx'
import Compare from './pages/Compare.tsx'
import Cart from './pages/Cart.tsx'
import Delivery from './pages/Delivery.tsx'
import Payment from './pages/Payment.tsx'
import Warranty from './pages/Warranty.tsx'
import Return from './pages/Return.tsx'
import About from './pages/About.tsx'
import Contacts from './pages/Contacts.tsx'
import Vacancies from './pages/Vacancies.tsx'
import Reviews from './pages/Reviews.tsx'
import PCBuild from './pages/PCBuild.tsx'
import OrderStatus from './pages/OrderStatus.tsx'
import TradeIn from './pages/TradeIn.tsx'
import Support from './pages/Support.tsx'
import Blog from './pages/Blog.tsx'
import BlogPost from './pages/BlogPost.tsx'
import Computers from './pages/Computers.tsx'
import Laptops from './pages/Laptops.tsx'
import GPUs from './pages/GPUs.tsx'
import CPUs from './pages/CPUs.tsx'
import CatalogPage from './pages/CatalogPage.tsx'
import Components from './pages/Components.tsx'
import Monitors from './pages/Monitors.tsx'
import Peripherals from './pages/Peripherals.tsx'
import ConsoleGaming from './pages/ConsoleGaming.tsx'
import Networking from './pages/Networking.tsx'
import Furniture from './pages/Furniture.tsx'
import Merch from './pages/Merch.tsx'
import Services from './pages/Services.tsx'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext.tsx'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/warranty" element={<Warranty />} />
            <Route path="/return" element={<Return />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/pc-build" element={<PCBuild />} />
            <Route path="/order-status" element={<OrderStatus />} />
            <Route path="/trade-in" element={<TradeIn />} />
            <Route path="/support" element={<Support />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/computers" element={<Computers />} />
            <Route path="/laptops" element={<Laptops />} />
            <Route path="/gpus" element={<GPUs />} />
            <Route path="/cpus" element={<CPUs />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/components" element={<Components />} />
            <Route path="/monitors" element={<Monitors />} />
            <Route path="/peripherals" element={<Peripherals />} />
            <Route path="/console-gaming" element={<ConsoleGaming />} />
            <Route path="/networking" element={<Networking />} />
            <Route path="/furniture" element={<Furniture />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/services" element={<Services />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}