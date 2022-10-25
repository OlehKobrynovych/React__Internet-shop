import './Layout.css';
import React, { useEffect, useRef, useState } from "react";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Preloader from '../components/Preloader/Preloader';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, setCategories, setFavoriteProduct, setSelectedLanguage, setShop, setShoppingProduct } from '../store/homeSlice';
import { datasLanguage } from '../datasLanguage';


function Layout() {
 
    const shop = useSelector(state => state.homeSlice.shop);
    const products = useSelector(state => state.homeSlice.products);
    const shoppingProduct = useSelector(state => state.homeSlice.shoppingProduct);
    let { shopName } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
// console.log(shop)
    // const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);

    useEffect(() => {
        fetch(`http://localhost:3000/api/shops/${shopName}/name`)
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
    }, [])

    useEffect(() => {
        if (shop.name) {
            fetch(`http://localhost:3000/api/products/${shop._id}/all`)
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data.length) {
                        dispatch(getProducts(res.data));
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
            
            fetch(`http://localhost:3000/api/categories/${shop._id}/all`)
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

        dispatch(setSelectedLanguage(datasLanguage[shop.language]));
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