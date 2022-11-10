import './Layout.css';
import React, { useEffect, useRef, useState } from "react";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Preloader from '../components/Preloader/Preloader';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, setCategories, setFavoriteProduct, setSelectedLanguage, setShop, setShoppingProduct } from '../store/homeSlice';
import { languageShop } from '../languageShop';


function Layout() {
 
    const shop = useSelector(state => state.homeSlice.shop);
    const products = useSelector(state => state.homeSlice.products);
    const shoppingProduct = useSelector(state => state.homeSlice.shoppingProduct);
    let { shopName } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

// console.log()
    // const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);

    useEffect(() => {
        if (shopName?.length) {
            fetch(`${process.env.REACT_APP_BASE_URL}/shops/${shopName}/name`)
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data._id) {
                        dispatch(setShop(res.data));
                    } else {
                        navigate('/')           // ?????? не працює
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
    
                let res = JSON.parse(localStorage.getItem('shoppingProducts'))
                if (res?.length) {
                    dispatch(setShoppingProduct(res));
                }
                
                let res2 = JSON.parse(localStorage.getItem('favoriteProduct'))
                if (res2?.length) {
                    dispatch(setFavoriteProduct(res2));
                }
        }

        let res = JSON.parse(localStorage.getItem('visit'))  // доробити лічильник відвідувачів
        if (res?.length) {
            let oldDay = res.split('.')
            let day = oldDay[0]
            let moon = oldDay[1]
            let year = oldDay[2]
            let date = new Date().toLocaleString().split('.')
            let nowDay = date[0]
            let nowMoon = date[1]
            let nowYear = date[2]
            if (nowYear - year > 0) { 
                localStorage.setItem('visit', JSON.stringify(new Date().toLocaleString().split(',')[0]));
                // +send +1 {shop_id: shop_id, day: nowDay}
            } else if (nowMoon - moon > 0) { 
                localStorage.setItem('visit', JSON.stringify(new Date().toLocaleString().split(',')[0]));
                // +send +1
            } else if (nowDay - day > 0) {
                localStorage.setItem('visit', JSON.stringify(new Date().toLocaleString().split(',')[0]));
                // +send +1
            }
        } else {
            localStorage.setItem('visit', JSON.stringify(new Date().toLocaleString().split(',')[0]));
            // +send +1
        }
    }, [])

    useEffect(() => {
        if (shop.name) {
            fetch(`${process.env.REACT_APP_BASE_URL}/products/${shop._id}/all`)
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data.length) {
                        dispatch(getProducts(res.data));
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
            
            fetch(`${process.env.REACT_APP_BASE_URL}/categories/${shop._id}/all`)
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data.length) {
                        // console.log(res)
                        dispatch(setCategories(res.data));
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }

        dispatch(setSelectedLanguage(languageShop[shop?.language]));
    }, [shop])

    return (
        <>
            {
                // !!products?.length ? (
                    <div className="layout">
                        <Header />
                        <Outlet />
                        <Footer />
                    </div>
                // ) : <Preloader />
            }
        </>
    );
}

export default Layout;