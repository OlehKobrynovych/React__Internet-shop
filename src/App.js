import './App.css';
import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import Preloader from './components/Preloader/Preloader';
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const Header = React.lazy(() => import('./components/Header/Header'));
const HomeView = React.lazy(() => import('./views/HomeView/HomeView'));
const ProductFilterView = React.lazy(() => import('./views/ProductFilterView/ProductFilterView'));
const AboutUsView = React.lazy(() => import('./views/AboutUsView/AboutUsView'));
const PageNotFoundView = React.lazy(() => import('./views/PageNotFoundView/PageNotFoundView'));
const ProductInformationView = React.lazy(() => import('./views/ProductInformationView/ProductInformationView'));
const WishListView = React.lazy(() => import('./views/WishListView/WishListView'));
const ShoppingCartView = React.lazy(() => import('./views/ShoppingCartView/ShoppingCartView'));

function App() {
    return (
        <div className="app">
            <Suspense fallback={<Preloader />}>
                <Header />
                <Suspense fallback={<Preloader />}>
                    <Routes>
                        <Route path="/" element={<HomeView />} />
                        <Route path="/category/:id" element={<ProductFilterView />} />
                        <Route path="/product/:id" element={<ProductInformationView />} />
                        <Route path="/wishlist" element={<WishListView />} />
                        <Route path="/cart" element={<ShoppingCartView />} />
                        <Route path="/about" element={<AboutUsView />} />
                        <Route path="*" element={<PageNotFoundView />} />
                    </Routes>
                </Suspense>
                <Footer />
            </Suspense>
        </div>
  );
}

export default App;
