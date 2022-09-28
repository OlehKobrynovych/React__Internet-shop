import './Header.css';

import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {setCategories, getProducts, setSelectedSubCategories, setSelectedLanguage, setShop} from '../../store/homeSlice';

import search from '../../assets/images/search.svg';
import logo from '../../assets/images/logo.svg';

import HeartBtn from '../HeartBtn/HeartBtn';
import CartBtn from '../CartBtn/CartBtn';
import LoginBtn from '../LoginBtn/LoginBtn';
import MobileMenu from '../MobileMenu/MobileMenu';

// import {datas} from '../../data.js'
import {datasLanguage} from '../../datasLanguage.js'
import DropDownMenu from '../DropDownMenu/DropDownMenu';


function Header() {
    // const datas = useSelector(state => state.homeSlice.datas);
    // const shop = useSelector(state => state.homeSlice.shop);
    const categories = useSelector(state => state.homeSlice.categories);
    const dispatch = useDispatch();
    const searchInputRef = useRef(null);
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    // console.log(shops)

    const handleClick = () => {
        searchInputRef.current.focus()
    };
    
    useEffect(() => {

        // fetch('http://localhost:3000/api/products/all').then(res => console.log(res.json())).then(res => console.log(res))
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
                    dispatch(setShop(res.data[0]));
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })


        // let data = {
        //     shop_id: '1',
        //     category_id: '1',
        //     name: 'Штани',
        //     price: 100,
        //     new_price: 80,
        //     images: [
        //         '/images/photo1.webp'
        //     ],
        //     details: 'Худі чоловічий на замку, з капюшоном та з кишенею кенгуру.',
        //     colors: ['red', 'yellow'],
        //     sizes: ['XL', 'L', 'XXL']
        // };

        // let data = {
        //     name: 'Штани',
        //     image_url: 'url/asdasdasd',
        //     parent_id: '1',
        //     shop_id: '6333055e19047777b333e42e'
        // };


        // fetch('http://localhost:3000/api/categories/', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        //   }).then(res => res.json()).then(res => console.log(res))


        
        // вибір мови
        dispatch(setSelectedLanguage(datasLanguage['UA']));
        // dispatch(setSelectedLanguage(datasLanguage[datas.shopInfo.language]));
    }, [])

    return (
        <div className="header">
            <div className="header--wrap container">
                <MobileMenu />

                <NavLink to='/'><img className='header__logo' src={logo} alt='img'/></NavLink>

                <div className="header__menu-wrap">
                    <ul className="header__menu">
                        {
                          categories.length &&  categories?.map(category => (
                                <li className="header__menu-link-wrap"  key={category._id}>
                                    <NavLink 
                                        className="header__menu-link" 
                                        to={`category/${category._id}`}
                                    >
                                        {category.name}
                                    </NavLink>
                                    <div className="header__menu-link-dropdown">
                                        <ul className="header__menu-link-dropdown-wrap">
                                            {/* {
                                                categories.subCategories.map(subCategories => (<li key={subCategories.id}><NavLink to={subCategories.href}>{subCategories.name}</NavLink></li>))
                                            } */}
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