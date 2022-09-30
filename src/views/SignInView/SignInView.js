import './SignInView.css';

import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import { NavLink, Outlet } from 'react-router-dom';
import singInSwiper1 from '../../assets/images/singInSwiper1.svg';
import singInSwiper2 from '../../assets/images/singInSwiper2.svg';
import singInSwiper3 from '../../assets/images/singInSwiper3.svg';


import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";


function SignInView() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);

    const isValidEmail = (value) => {
      return  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(value);
    }

    const handleChange = () => {

        // fetch('http://localhost:3000/api/categories/all')
        //     .then(res => res.json())
        //     .then(res => {
        //         if (res.success && res.data.length) {
        //             dispatch(setCategories(res.data));
        //         }
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     })

        // if (isValidEmail(email)) {
        //     if (password) {

        //     }
        // }
    }
   
    // const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);

// debugger
    return (
        <div className="sign-in">
            <div className="sign-in-wrap">
                <div className="sign-in__swiper">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                        delay: 4500,
                        disableOnInteraction: false,
                        }}
                        pagination={{
                        clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper sign-in__mySwiper"
                    >
                        <SwiperSlide><div className="sign-in__slider-wrap"><img className="sign-in__slider-img" src={singInSwiper1} alt='img'/><div className="sign-in__slider-title">Створення інтернет магазину</div><div className="sign-in__slider-text">Створення інтернет магазину Створення інтернет магазину</div></div></SwiperSlide>
                        <SwiperSlide><div className="sign-in__slider-wrap"><img className="sign-in__slider-img" src={singInSwiper2} alt='img'/><div className="sign-in__slider-title">Розвиток вашого бізнесу</div><div className="sign-in__slider-text">Створення інтернет магазину Створення інтернет магазину</div></div></SwiperSlide>
                        <SwiperSlide><div className="sign-in__slider-wrap"><img className="sign-in__slider-img" src={singInSwiper3} alt='img'/><div className="sign-in__slider-title">Допомого в досягненні мрії</div><div className="sign-in__slider-text">Створення інтернет магазину Створення інтернет магазину</div></div></SwiperSlide>
                    </Swiper>
                </div>

                <div className="sign-in__form-wrap">
                    <form className="sign-in__form">
                        <h2 className="sign-in__company-name">Назва фірми</h2>
                        <h3 className="sign-in__form-title">Sign in</h3>
                        <p className="sign-in__form-sub-title"><span>Не маєте облікового запису? </span><NavLink className="sign-in__form-sub-title-link" to='#'>Sign up now</NavLink></p>

                        <label className='sign-in__label' htmlFor="email">
                            <span>Емейл</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className='sign-in__input'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <label className='sign-in__label' htmlFor="password">
                            <span>Пароль</span>
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className='sign-in__input'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />

                        <p className=''><NavLink to='#'>Забули пароль?</NavLink></p>

                        <button className='sign-in__btn' type="submit" onClick={handleChange}>Авторизуватися</button>
                        
                        <p><span>Повернутись на </span><NavLink className='sign-in__link-to-main' to='#'>Головну</NavLink></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignInView;