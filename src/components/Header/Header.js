import './Header.css';

import { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import search from '../../assets/images/search.svg';
import logo from '../../assets/images/logo.svg';

import HeartBtn from '../HeartBtn/HeartBtn';
import CartBtn from '../CartBtn/CartBtn';
import LoginBtn from '../LoginBtn/LoginBtn';
import MobileMenu from '../MobileMenu/MobileMenu';

import {datas} from '../../data.js'


function Header() {
    // const [isOpenMenu, setIsOpenMenu] = useState(false);
    // const navigate = useNavigate();

    const searchInputRef = useRef(null);

    const handleClick = () => {
        searchInputRef.current.focus()
    };

    return (
        <div className="header">
            <div className="header--wrap container">
                <MobileMenu />

                <NavLink to='#'><img className='header__logo' src={logo} alt='img'/></NavLink>

                <div className="header__menu-wrap">
                    <ul className="header__menu">
                        {
                            datas.categories.map(categories => (
                                <li className="header__menu-link-wrap" key={categories.id}>
                                    <NavLink className="header__menu-link" to={categories.href}>{categories.name}</NavLink>
                                    <div className="header__menu-link-dropdown">
                                        <ul className="header__menu-link-dropdown-wrap">
                                            {
                                                categories.subCategories.map(subCategories => (<li key={subCategories.id}><NavLink to="#">{subCategories.name}</NavLink></li>))
                                            }
                                        </ul>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                
                <div className="header__wrap-btn">
                    <div className="header__search-wrap">
                        <input className="header__search" ref={searchInputRef} type="text" name="search" placeholder="Пошук" />
                        <img className="header__search-img" src={search} alt='img' onClick={() => handleClick()} />
                    </div>
                    <HeartBtn />
                    <CartBtn />
                    <LoginBtn />
                </div>

            </div>
        </div>
    );
}

export default Header;