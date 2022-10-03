import './Header.css';

import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {setCategories, getProducts, setSelectedSubCategories, setSelectedLanguage, setShop, setIsOpenMenu} from '../../store/homeSlice';

import search from '../../assets/images/search.svg';

import HeartBtn from '../HeartBtn/HeartBtn';
import CartBtn from '../CartBtn/CartBtn';
import LoginBtn from '../LoginBtn/LoginBtn';
import MobileMenu from '../MobileMenu/MobileMenu';

// import {datas} from '../../data.js'
import {datasLanguage} from '../../datasLanguage.js'
import DropDownMenu from '../DropDownMenu/DropDownMenu';


function Header() {
    const shop = useSelector(state => state.homeSlice.shop);
    const categories = useSelector(state => state.homeSlice.categories);
    const [shopCategories, setShopCategories] = useState([]);
    const dispatch = useDispatch();
    const searchInputRef = useRef(null);
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    // console.log(shops)

    const handleClick = () => {
        searchInputRef.current.focus()
    };
    
    useEffect(() => {

    }, [])
    
   

    useEffect(() => {
        setShopCategories(categories.filter(el => el.parent_id == 'null'))
    }, [categories])


    return (
        <div className="header">
            <div className="header--wrap container">
                <MobileMenu />

                {
                    shop?.logo && <NavLink to={`/${shop.name}`}><img className='header__logo' src={shop.logo} alt='img'/></NavLink>
                }

                <div className="header__menu-wrap">
                    <ul className="header__menu">
                        {
                          !!shopCategories.length &&  shopCategories?.map(category => (
                                <li className="header__menu-link-wrap"  key={category._id}>
                                    <NavLink 
                                        className="header__menu-link" 
                                        to={`/${shop.name}/category/${category._id}`}
                                    >
                                        {category.name}
                                    </NavLink>
                                    <div className="header__menu-link-dropdown">
                                        <ul className="header__menu-link-dropdown-wrap">
                                            {
                                                categories.map(subCategories => subCategories.parent_id == category._id && (<li key={subCategories._id}><NavLink className="header__menu-sublink-dropdown" to={`/${shop.name}/category/${subCategories._id}`}>{subCategories.name}</NavLink></li>))
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
                        <input className="header__search" ref={searchInputRef} type="text" name="search" placeholder={selectedLanguage?.header?.placeholderSearch} />
                        <img className="header__search-img" src={search} alt='img' onClick={() => handleClick()} />
                    </div>
                    <HeartBtn />
                    <CartBtn />
                    <LoginBtn />
                </div>
            </div>
            
            <DropDownMenu />
                    
        </div>
    );
}

export default Header;