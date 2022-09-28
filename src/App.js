import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import Preloader from './components/Preloader/Preloader';
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const Header = React.lazy(() => import('./components/Header/Header'));
const HomeView = React.lazy(() => import('./views/HomeView/HomeView'));
const ProductFilter = React.lazy(() => import('./components/ProductFilter/ProductFilter'));
const AboutUs = React.lazy(() => import('./components/AboutUs/AboutUs'));
const PageNotFound = React.lazy(() => import('./components/PageNotFound/PageNotFound'));
const ProductInformation = React.lazy(() => import('./components/ProductInformation/ProductInformation'));
const WishList = React.lazy(() => import('./components/WishList/WishList'));
const ShoppingCart = React.lazy(() => import('./components/ShoppingCart/ShoppingCart'));

function App() {
    return (
        <div className="app">
            <Suspense fallback={<Preloader />}>
                <Header />
                <Suspense fallback={<Preloader />}>
                    <Routes>
                        <Route path="/" element={<HomeView />} />
                        <Route path="/category/:id" element={<ProductFilter />} />
                        <Route path="/product/:id" element={<ProductInformation />} />
                        <Route path="/wishlist" element={<WishList />} />
                        <Route path="/cart" element={<ShoppingCart />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Suspense>
                <Footer />
            </Suspense>
        </div>
  );
}

export default App;
