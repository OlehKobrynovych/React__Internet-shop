import './SignUpView.css';

import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import singInSwiper1 from '../../assets/images/singInSwiper1.svg';
import singInSwiper2 from '../../assets/images/singInSwiper2.svg';
import singInSwiper3 from '../../assets/images/singInSwiper3.svg';


import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { setUser } from '../../store/userSlice';


function SignUpView() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [user, setUser] = useState({});
    // console.log(user)
    // console.log(loginError)


    // const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    // const [isValid, setIsValid] = useState(false);
    // const isValidEmail = (value) => {
    //   return  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(value);
    // }

    const handleChange = () => {

        if (password1 == password2) {

            let data = {
                email: email,
                password: password2,
                firstName: firstName,
                lastName: lastName
            }
    
             fetch(`${process.env.REACT_APP_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        dispatch(setUser(res.data))
                        localStorage.setItem('auth', JSON.stringify(res.data));
                        navigate(`/auth/${res.data._id}`)
                    } else {
                        setLoginError(res.message)
                    }
                })
        } else {
            setLoginError('Не правельно введений повторний пароль')
        }
    }

    return (
        <div className="sign-up">
            <div className="sign-up-wrap">
                <div className="sign-up__swiper">
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
                        className="mySwiper sign-up__mySwiper"
                    >
                        <SwiperSlide><div className="sign-up__slider-wrap"><img className="sign-up__slider-img" src={singInSwiper1} alt='img'/><div className="sign-up__slider-title">Створення інтернет магазину</div><div className="sign-up__slider-text">Створення інтернет магазину Створення інтернет магазину</div></div></SwiperSlide>
                        <SwiperSlide><div className="sign-up__slider-wrap"><img className="sign-up__slider-img" src={singInSwiper2} alt='img'/><div className="sign-up__slider-title">Розвиток вашого бізнесу</div><div className="sign-up__slider-text">Створення інтернет магазину Створення інтернет магазину</div></div></SwiperSlide>
                        <SwiperSlide><div className="sign-up__slider-wrap"><img className="sign-up__slider-img" src={singInSwiper3} alt='img'/><div className="sign-up__slider-title">Допомого в досягненні мрії</div><div className="sign-up__slider-text">Створення інтернет магазину Створення інтернет магазину</div></div></SwiperSlide>
                    </Swiper>
                </div>

                <div className="sign-up__form-wrap">
                    <div className="sign-up__form">
                        <h2 className="sign-up__company-name">Назва фірми</h2>
                        <h3 className="sign-up__form-title">Create account</h3>
                        <p className="sign-up__form-sub-title"><span>Перейти на сторінку </span><NavLink className="sign-up__form-sub-title-link" to='/auth/login'>Login page</NavLink></p>

                        <label className='sign-up__label' htmlFor="firstName">
                            <span>Ім'я</span>
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            className='sign-up__input'
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            placeholder="Введіть ім'я..."
                        />
                        <label className='sign-up__label' htmlFor="lastName">
                            <span>Прізвище</span>
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            className='sign-up__input'
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            placeholder="Введіть  прізвище..."
                        />
                        <label className='sign-up__label' htmlFor="email">
                            <span>Емейл</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className='sign-up__input'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder='Введіть емейл...'
                        />
                        <label className='sign-up__label' htmlFor="password1">
                            <span>Пароль</span>
                        </label>
                        <input
                            id="password1"
                            name="password1"
                            type="password"
                            required
                            className='sign-up__input'
                            onChange={(e) => setPassword1(e.target.value)}
                            value={password1}
                            placeholder='Введіть пароль...'
                        />
                        <label className='sign-up__label' htmlFor="password2">
                            <span>Повторіть пароль</span>
                        </label>
                        <input
                            id="password2"
                            name="password2"
                            type="password"
                            required
                            className='sign-up__input'
                            onChange={(e) => setPassword2(e.target.value)}
                            value={password2}
                            placeholder='Введіть пароль...'
                        />

                        {
                            !!loginError.length && <p className='sign-up__login-error'>{loginError}</p>
                        }

                        <button className='sign-up__btn' type="submit" onClick={handleChange}>Створити</button>
                        
                        <p><span>Повернутись на </span><NavLink className='sign-up__link-to-main' to='/'>Головну</NavLink></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpView;