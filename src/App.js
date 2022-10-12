import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import React, { Suspense } from 'react';
import Preloader from './components/Preloader/Preloader';
import SignInView from './views/SignInView/SignInView';
import Layout from './Layout/Layout';
import SignUpView from './views/SignUpView/SignUpView';
import LandingView from './views/LandingView/LandingView';
import UserCategories from './components/UserCategories/UserCategories';
import UserShop from './components/UserShop/UserShop';
import UserHome from './components/UserHome/UserHome';
import LayoutUser from './Layout/LayoutUser';
import UserProduct from './components/UserProduct/UserProduct';
import CreationProduct from './components/CreationProduct/CreationProduct';
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
    const location = useLocation();
    return (
        <div className="app">
            
           <Suspense fallback={<Preloader />}>
                <Routes>
                    <Route path="/" element={<LandingView />}/>
                    <Route path="/auth/:userId" element={<LayoutUser />}>
                        <Route index element={<UserHome />}/>
                        <Route path="shop" element={<UserShop />}/>
                        <Route path="categories" element={<UserCategories />}/>
                        <Route path="product" element={<UserProduct />}/>
                        <Route path="product/create" element={<CreationProduct />}/>

                    </Route>
                    <Route path="/auth/login" element={<SignInView />}/>
                    <Route path="/auth/register" element={<SignUpView />}/>

                    <Route path="/:shopName/" element={<Layout />}>
                        <Route index element={<HomeView />}/>
                        <Route path="category/:id" element={<ProductFilterView />} />
                        <Route path="product/:id" element={<ProductInformationView />} />
                        <Route path="wishlist" element={<WishListView />} />
                        <Route path="cart" element={<ShoppingCartView />} />
                        <Route path="about" element={<AboutUsView />} />
                        <Route path="*" element={<PageNotFoundView />} />
                    </Route>
                </Routes>
            </Suspense>
        </div>
  );
}

export default App;
