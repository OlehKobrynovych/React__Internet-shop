import './Layout.css';
import React, { useEffect, useRef, useState } from "react";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProducts, setCategories, setShop } from '../store/homeSlice';


function Layout() {
 
    let { shopName } = useParams();
    const dispatch = useDispatch();
// console.log(shopName)
    // const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);

    useEffect(() => {

        fetch('http://localhost:3000/api/products/all')
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data.length) {
                    dispatch(getProducts(res.data));
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        
        fetch('http://localhost:3000/api/categories/all')
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data.length) {
                    dispatch(setCategories(res.data));
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })

        
         fetch('http://localhost:3000/api/shops/all')
         .then(res => res.json())
         .then(res => {
             if (res.success && res.data.length) {
                 let res1 = res.data.find(el => el.name == shopName)
                //  console.log(res1)
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

            
       
        // вибір мови
        // dispatch(setSelectedLanguage(datasLanguage[datas.shopInfo.language]));
    }, [])

// debugger
    return (
        <div className="layout">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;