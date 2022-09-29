import SwiperCards from '../../components/SwiperCards/SwiperCards';
import './HomeView.css';

import man from '../../assets/images/man.webp';
import woman from '../../assets/images/woman.webp';
import kids from '../../assets/images/kids.webp';
import poshta from '../../assets/images/poshta.jpg';
import DropDownMenu from '../../components/DropDownMenu/DropDownMenu';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay} from "swiper";

import {datas} from '../../data.js'
import { useEffect, useState } from 'react';
import Preloader from '../../components/Preloader/Preloader';


function HomeView() {
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const products = useSelector(state => state.homeSlice.products);
    const [productsNew, setProductsNew] = useState([]);
    const [productsOld, setProductsOld] = useState([]);
    const dispatch = useDispatch();
    // debugger
    
    useEffect(() => {
        setProductsNew(products.filter(el => el.new_price))
        setProductsOld(products.filter(el => !el.new_price))
    }, [products])
   
    return (
        <>
            {
                productsNew.length && productsOld.length ?
                    (<div className="home-view hidden">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        <SwiperSlide><img className="home-view__swiper-img" src={man} alt='img'/></SwiperSlide>
                        <SwiperSlide><img className="home-view__swiper-img" src={kids} alt='img'/></SwiperSlide>
                        <SwiperSlide><img className="home-view__swiper-img" src={man} alt='img'/></SwiperSlide>
                        <SwiperSlide><img className="home-view__swiper-img" src={kids} alt='img'/></SwiperSlide>
                    </Swiper>

                    <SwiperCards title={selectedLanguage?.homePage?.titleSwiperNew} products={productsOld}/>

                    <div className="home-view__images container">
                        <NavLink className="grid-area__b" to='#'><img src={man} alt='img'/></NavLink>
                        <NavLink className="grid-area__a" to='#'><img src={woman} alt='img'/></NavLink>
                        <NavLink className="grid-area__c" to='#'><img src={kids} alt='img'/></NavLink>
                    </div>

                    <div className="home-view__info container">
                        <div className="home-view__info-delivery">
                            <img className="home-view__info-delivery-img" src={poshta} alt='img'/>
                            <p className="home-view__info-delivery-text">Безкоштовна доставка від 5 999 грн</p>
                        </div>
                        <h2 className="home-view__info-title"> Інтернет-магазин одягу Goldi</h2>
                        <p className="home-view__info-text">
                            Goldi - мультикультурне об'єднання молодих людей, які змінюють світ кожного дня. Ми вивчаємо модні тенденції та аналізуємо маркет для того, щоб популяризувати культуру різних напрямів та стилів серед звичайних людей. Адже, мода не тільки на дахах дорогих ресторанів мегаполісів, але й в кожному передмісті.
                        </p>
                    </div>

                    <SwiperCards title={selectedLanguage?.homePage?.titleSwiperDiscounts} products={productsNew}/>
                </div>) : (<Preloader/>) 
            }
        </>
    );
}

export default HomeView;