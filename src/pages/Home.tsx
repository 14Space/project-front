import Hero from '../components/home/Hero';
import QuickActions from '../components/home/QuickActions';
// import PopularCategories from '../components/home/PopularCategories';
import Advantages from '../components/home/Advantages';
import Promotions from '../components/home/Promotions';
import Blog from '../components/home/Blog';


export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <QuickActions />
      {/* <PopularCategories /> */}
      <Promotions />
      {/* Блог должен быть вторым после акций */}
      <Blog />
      <Advantages />

    </div>
  );
}