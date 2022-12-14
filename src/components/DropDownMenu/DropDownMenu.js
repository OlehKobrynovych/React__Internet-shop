import './DropDownMenu.css';
import React, { useState, useRef, useEffect, memo } from 'react';
import { NavLink, useLocation, useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsOpenMenu } from '../../store/homeSlice';

import cart from '../../assets/images/cart.svg';
import heart from '../../assets/images/heart.svg';
import facebook from '../../assets/images/facebook.svg';
import instagram from '../../assets/images/instagram.svg';

function DropDownMenu() {
    const categories = useSelector(state => state.homeSlice.categories);
    const shop = useSelector(state => state.homeSlice.shop);
    const [shopSubCategories, setShopSubCategories] = useState([]);
    const isOpenMenu = useSelector(state => state.homeSlice.isOpenMenu);
    let location = useLocation();
    const dispatch = useDispatch();
// console.log(shopSubCategories)

    useEffect(() => {
        if (!!categories.length) {
            if (location.pathname.includes('category')) {
                let arr = location.pathname.split('/')
                let res = categories.filter(el => el._id == arr[arr.length - 1])
                res.length ? setShopSubCategories(res[0].sub_categories) : setShopSubCategories(categories[0].sub_categories)
            } else {
                setShopSubCategories(categories[0].sub_categories)
            }
        }
    }, [location, categories]);

    const handleClick = () => {
        dispatch(setIsOpenMenu())
        if (!isOpenMenu) {
            document.body.style.overflow = "hidden" 
        } else {
            document.body.style.overflow = "unset"
        }
    };

    return (
        <div className={`${isOpenMenu ? "drop-down-menu--active" : "drop-down-menu"}`}>
            <div className="drop-down-menu__header">
                <ul className="drop-down-menu__header--wrap container">
                    {
                            categories?.length && categories.map(category => (
                            <li key={category._id}><NavLink to={`/${shop.name}/category/${category._id}`} className="drop-down-menu__header-link">{category.name}</NavLink></li> 
                        ))
                    }
                </ul>
            </div>
                
            <div className="drop-down-menu__sub-categories--wrap container">

                <ul className="drop-down-menu__sub-categories-link-wrap">
                    {
                        !!shopSubCategories.length && shopSubCategories.map(subCategories => (
                            <li key={subCategories._id}><NavLink className="drop-down-menu__sub-categories-link" to={`/${shop.name}/category/${subCategories._id}`} onClick={handleClick}>{subCategories.name}</NavLink></li>
                        )) 
                    }
                </ul>

                <NavLink className="drop-down-menu__btn-wrap" to={`/${shop.name}/cart`} onClick={handleClick}>
                    <img className="drop-down-menu__btn-img" src={cart} alt='img'/>
                    <span className="drop-down-menu__btn-text">??????????</span>
                </NavLink>
                <NavLink className="drop-down-menu__btn-wrap" to={`/${shop.name}/wishlist`} onClick={handleClick}>
                    <img className="drop-down-menu__btn-img" src={heart} alt='img'/>
                    <span className="drop-down-menu__btn-text">????????????</span>
                </NavLink>

                <ul className="drop-down-menu__info">
                    <li className="drop-down-menu__info-link-wrap"><NavLink className="drop-down-menu__info-link" to={`/${shop.name}/about`} onClick={handleClick}>?????? ????????????????</NavLink></li>
                </ul>

                <div className="drop-down-menu__contact">
                    <div className="drop-down-menu__contact-tel-wrap">
                        <a className='drop-down-menu__contact-tel' href="tel:+380673804111">{shop?.contact_number}</a>
                        <a className='drop-down-menu__contact-tel' href="tel:+380673804111">{shop?.contact_number_two}</a>
                    </div>
                    <div className="drop-down-menu__contact-social-wrap">
                        <a className="drop-down-menu__contact-social" href={shop?.facebook_url} target='_blank'><img src={facebook} alt='img' /></a>
                        <a className="drop-down-menu__contact-social" href={shop?.instagram_url} target='_blank'><img src={instagram} alt='img' /></a>
                    </div>
                </div>

                {
                    shop?.logo && <NavLink to={`/${shop.name}`}><img className='drop-down-menu__logo' src={shop.logo} alt='img'/></NavLink>
                }
            </div>
        </div>
    );
}

export default memo(DropDownMenu);