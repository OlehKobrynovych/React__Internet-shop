import './Layout.css';
import React, { useEffect, useRef, useState } from "react";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Preloader from '../components/Preloader/Preloader';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, setCategories, setSelectedLanguage, setShop } from '../store/homeSlice';
import { datasLanguage } from '../datasLanguage';


function Layout() {
 
    const shop = useSelector(state => state.homeSlice.shop);
    const products = useSelector(state => state.homeSlice.products);
    let { shopName } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
// console.log(shopName)
    // const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);

    useEffect(() => {
        
         fetch('http://localhost:3000/api/shops/all')
         .then(res => res.json())
         .then(res => {
             if (res.success && res.data.length) {
                 let res1 = res.data.find(el => el.name == shopName)
                if (res1?.name) {
                    fetch(`http://localhost:3000/api/shops/${res1._id}`)
                    .then(res2 => res2.json())
                    .then(res2 => {
                        if (res2.success && res2.data._id) {
                            dispatch(setShop(res2.data));
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
                } else {
                    navigate('/')
                }
             }
         })
         .catch((error) => {
             console.error('Error:', error);
         })
        
        // fetch('http://localhost:3000/api/categories/', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        //   }).then(res => res.json()).then(res => console.log(res))
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
                !!products?.length ? (
                    <div className="layout">
                        <Header />
                        <Outlet />
                        <Footer />
                    </div>
                ) : <Preloader />
            }
        </>
    );
}

export default Layout;