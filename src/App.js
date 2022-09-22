import './App.css';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomeView from './views/HomeView/HomeView';
import ProductFilter from './components/ProductFilter/ProductFilter';
import AboutUs from './components/AboutUs/AboutUs';
import PageNotFound from './components/PageNotFound/PageNotFound';
import ProductInformation from './components/ProductInformation/ProductInformation';
import WishList from './components/WishList/WishList';

function App() {
  return (
      <div className="App">
        <div className="app--wrap">
            <Header />
            <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/unisex" element={<ProductFilter />} />
                <Route path="/unisex/:id" element={<ProductFilter />} />
                <Route path="/man" element={<ProductFilter />} />
                <Route path="/man/:id" element={<ProductFilter />} />
                <Route path="/woman" element={<ProductFilter />} />
                <Route path="/woman/:id" element={<ProductFilter />} />
                <Route path="/children" element={<ProductFilter />} />
                <Route path="/children/:id" element={<ProductFilter />} />
                <Route path="/collections" element={<ProductFilter />} />
                <Route path="/collections/:id" element={<ProductFilter />} />
                <Route path="/discounts" element={<ProductFilter />} />
                <Route path="/discounts/:id" element={<ProductFilter />} />

                <Route path="/wishlist" element={<WishList />} />
                <Route path="/product/:id" element={<ProductInformation />} />

                <Route path="/about" element={<AboutUs />} />
                
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </div>
      </div>
  );
}

export default App;
