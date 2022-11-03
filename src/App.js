import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import React, { Suspense } from 'react';
import Preloader from './components/Preloader/Preloader';
import SignInView from './views/SignInView/SignInView';
import Layout from './Layout/Layout';
import SignUpView from './views/SignUpView/SignUpView';
import LandingView from './views/LandingView/LandingView';
import UserCategoriesView from './views/UserCategoriesView/UserCategoriesView';
import LayoutUser from './Layout/LayoutUser';
import UserProductView from './views/UserProductView/UserProductView';
import CreationProduct from './components/CreationProduct/CreationProduct';
import { ToastContainer } from 'react-toastify';
import UserPurchasesView from './views/UserPurchasesView/UserPurchasesView';
import ReadPurchasesView from './views/ReadPurchasesView/ReadPurchasesView';
import UserAnalytics from './components/UserAnalytics/UserAnalytics';
import SearchProductView from './views/SearchProductView/SearchProductView';
import UserMessages from './components/UserMessages/UserMessages';
import UserShopView from './views/UserShopView/UserShopView';
import UserSettingsView from './views/UserSettingsView/UserSettingsView';
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
            <ToastContainer 
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            
            <Suspense fallback={<Preloader />}>
                <Routes>
                    <Route path="/" element={<LandingView />}/>
                    <Route path="/auth/:userId" element={<LayoutUser />}>
                        <Route index element={<UserAnalytics />}/>
                        <Route path="shop" element={<UserShopView />}/>
                        <Route path="categories" element={<UserCategoriesView />}/>
                        <Route path="product" element={<UserProductView />}/>
                        <Route path="product/create" element={<CreationProduct />}/>
                        <Route path="purchases" element={<UserPurchasesView />}/>
                        <Route path="purchases/:idPurchases" element={<ReadPurchasesView />}/>
                        <Route path="messages" element={<UserMessages />}/>
                        <Route path="settings" element={<UserSettingsView />}/>

                    </Route>
                    <Route path="/auth/login" element={<SignInView />}/>
                    <Route path="/auth/register" element={<SignUpView />}/>

                    <Route path="/:shopName/" element={<Layout />}>
                        <Route index element={<HomeView />}/>
                        <Route path="category/:id" element={<ProductFilterView />} />
                        <Route path="product/:id" element={<ProductInformationView />} />
                        <Route path="search" element={<SearchProductView />} />
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
