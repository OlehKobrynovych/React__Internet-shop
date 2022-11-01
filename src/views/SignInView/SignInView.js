import './SignInView.css';

import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import singInSwiper1 from '../../assets/images/singInSwiper1.svg';
import singInSwiper2 from '../../assets/images/singInSwiper2.svg';
import singInSwiper3 from '../../assets/images/singInSwiper3.svg';
import { setUser } from '../../store/userSlice';

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { setSelectedLanguage } from '../../store/userSlice';
import { languageUser } from '../../languageUser';



function SignInView() {
    const selectedLanguage = useSelector(state => state.userSlice.selectedLanguage);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(user)

    useEffect(() => {
        let res = (JSON.parse(localStorage.getItem('userLanguage')));
        if (res?.length) {
            dispatch(setSelectedLanguage(languageUser[res]));
        } else {
            dispatch(setSelectedLanguage(languageUser['ENG']));
        }
    }, [])
    // const [isValid, setIsValid] = useState(false);
    // const isValidEmail = (value) => {
    //   return  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(value);
    // }

    const handleChange = () => {
        let data = {
            email: email,
            password: password
        }

         fetch(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
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
    }

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
                        <SwiperSlide><div className="sign-in__slider-wrap"><img className="sign-in__slider-img" src={singInSwiper1} alt='img'/><div className="sign-in__slider-title">{selectedLanguage?.SignInView?.signInSliderTitle1}</div><div className="sign-in__slider-text">{selectedLanguage?.SignInView?.signInSliderSubTitle1}</div></div></SwiperSlide>
                        <SwiperSlide><div className="sign-in__slider-wrap"><img className="sign-in__slider-img" src={singInSwiper2} alt='img'/><div className="sign-in__slider-title">{selectedLanguage?.SignInView?.signInSliderTitle2}</div><div className="sign-in__slider-text">{selectedLanguage?.SignInView?.signInSliderSubTitle2}</div></div></SwiperSlide>
                        <SwiperSlide><div className="sign-in__slider-wrap"><img className="sign-in__slider-img" src={singInSwiper3} alt='img'/><div className="sign-in__slider-title">{selectedLanguage?.SignInView?.signInSliderTitle3}</div><div className="sign-in__slider-text">{selectedLanguage?.SignInView?.signInSliderSubTitle3}</div></div></SwiperSlide>
                    </Swiper>
                </div>

                <div className="sign-in__form-wrap">
                    <div className="sign-in__form">
                        <h2 className="sign-in__company-name">{selectedLanguage?.SignInView?.signInCompanyName}</h2>
                        <h3 className="sign-in__form-title">{selectedLanguage?.SignInView?.signInTitle}</h3>
                        <p className="sign-in__form-sub-title"><span>{selectedLanguage?.SignInView?.signInSubTitle}&nbsp;</span><NavLink className="sign-in__form-sub-title-link" to='/auth/register'>Sign up now</NavLink></p>

                        <label className='sign-in__label' htmlFor="email">
                            <span>{selectedLanguage?.SignInView?.signInEmailTitle}</span>
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className='sign-in__input'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder={selectedLanguage?.SignInView?.signInEmailPlaceholder}
                        />
                        <label className='sign-in__label' htmlFor="password">
                            <span>{selectedLanguage?.SignInView?.signInPasswordTitle}</span>
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className='sign-in__input'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder={selectedLanguage?.SignInView?.signInPasswordPlaceholder}
                        />

                        <p className='sign-in__leave-password'><NavLink to='#'>{selectedLanguage?.SignInView?.signInLeavePassword}</NavLink></p>

                        {
                            !!loginError.length && <p className='sign-in__login-error'>{loginError}</p>
                        }

                        <button className='sign-in__btn' type="submit" onClick={handleChange}>{selectedLanguage?.SignInView?.signInLogiBtn}</button>
                        
                        <p><span>{selectedLanguage?.SignInView?.signInReturnToTitle}&nbsp;</span><NavLink className='sign-in__link-to-main' to='/'>{selectedLanguage?.SignInView?.signInMainPage}</NavLink></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInView;