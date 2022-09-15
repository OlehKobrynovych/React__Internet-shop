import './Header.css';

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import search from '../../assets/images/search.svg';

import HeartBtn from '../HeartBtn/HeartBtn';
import CartBtn from '../CartBtn/CartBtn';

function Header() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const searchInputRef = useRef(null);

    // const navigate = useNavigate();

    const handleClick = () => {
        searchInputRef.current.focus()
    };

    // ref.current.focus()
   
    return (
        <div className="header">
            <div className="header--wrap container">
                <ul className="header__menu">
                    <li className="header__menu-link-wrap">
                        <a className="header__menu-link" href='#'>Унісекс</a>
                        <div className="header__menu-link-dropdown">
                            <div className="header__menu-link-dropdown-wrap">
                                <a href="#">Унісекс</a>
                            </div>
                        </div>
                    </li>
                    <li className="header__menu-link-wrap">
                        <a className="header__menu-link" href='#'>Чоловікам</a>
                        <div className="header__menu-link-dropdown">
                            <div className="header__menu-link-dropdown-wrap">
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                            </div>
                        </div>
                    </li>
                    <li className="header__menu-link-wrap">
                        <a className="header__menu-link" href='#'>Жінкам</a>
                        <div className="header__menu-link-dropdown">
                            <div className="header__menu-link-dropdown-wrap">
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a className='header__menu-link-small' href="#">Одяг</a>
                                <a className='header__menu-link-small' href="#">Одяг</a>
                                <a className='header__menu-link-small' href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a className='header__menu-link-small' href="#">Одяг</a>
                                <a className='header__menu-link-small' href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a className='header__menu-link-small' href="#">Одяг</a>
                                <a className='header__menu-link-small' href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                            </div>
                        </div>
                    </li>
                    <li className="header__menu-link-wrap">
                        <a className="header__menu-link" href='#'>Дітям</a>
                        <div className="header__menu-link-dropdown">
                            <div className="header__menu-link-dropdown-wrap">
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a className='header__menu-link-small' href="#">Одяг</a>
                                <a className='header__menu-link-small' href="#">Одяг</a>
                                <a className='header__menu-link-small' href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a className='header__menu-link-small' href="#">Одяг</a>
                                <a className='header__menu-link-small' href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a className='header__menu-link-small' href="#">Одяг</a>
                                <a className='header__menu-link-small' href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                            </div>
                        </div>
                    </li>
                    <li className="header__menu-link-wrap">
                        <a className="header__menu-link" href='#'>GOLDI HOME</a>
                        <div className="header__menu-link-dropdown">
                            <div className="header__menu-link-dropdown-wrap">
                                <a href="#">Одяг</a>
                                <a href="#">Одяг</a>
                            </div>
                        </div>
                    </li>
                    <li className="header__menu-link-wrap">
                        <a className="header__menu-link" href='#'>Колекції</a>
                        {/* <div className="header__menu-link-dropdown">
                            <div className="header__menu-link-dropdown-wrap">
                                <a href="#">Одяг</a>
                            </div>
                        </div> */}
                    </li>
                    <li className="header__menu-link-wrap">
                        <a className="header__menu-link" href='#'>Sale</a>
                        {/* <div className="header__menu-link-dropdown">
                            <div className="header__menu-link-dropdown-wrap">
                                <a href="#">Одяг</a> 
                            </div>
                        </div> */}
                    </li>
                </ul>
                
                <div className="header__search-wrap">
                    <input className="header__search" ref={searchInputRef} type="text" name="search" placeholder="Пошук" />
                    <img className="header__search-img" src={search} alt='img' onClick={() => handleClick()} />
                </div>
                
                <HeartBtn />
                <CartBtn />

            </div>
        </div>
    );
}

export default Header;