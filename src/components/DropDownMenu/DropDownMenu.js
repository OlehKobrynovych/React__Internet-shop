import './DropDownMenu.css';
import { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {datas} from '../../data.js'

import login from '../../assets/images/login.svg';
import cart from '../../assets/images/cart.svg';
import heart from '../../assets/images/heart.svg';
import facebook from '../../assets/images/facebook.svg';
import instagram from '../../assets/images/instagram.svg';


// import { useState, useRef } from 'react';
// import login from '../../assets/images/login.svg';

function DropDownMenu() {
    const [selectedCategories, setSelectedCategories] = useState(null);
    // const selectedCategory = useSelector(state => state.homeSlice.selectedCategory);
    // const selectedSubCategories = useSelector(state => state.homeSlice.selectedSubCategories);
    const datas = useSelector(state => state.homeSlice.datas);
    const isOpenMenu = useSelector(state => state.homeSlice.isOpenMenu);
    let location = useLocation();

    useEffect(() => {
        if (datas && datas.categories) {
            if (location.pathname === '/') {
                setSelectedCategories(datas.categories[0]);
            } else {
                setSelectedCategories(datas.categories.find(el => el.href == location.pathname))
            }
        }
    }, [location, datas]);
    
    // debugger
    // const dispatch = useDispatch();

    // const navigate = useNavigate();

    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    return (
        // <div className="drop-down-menu">
        <div className={`${isOpenMenu ? "drop-down-menu--active" : "drop-down-menu"}`}>
            <div className="drop-down-menu__header">
                <ul className="drop-down-menu__header--wrap container">
                    {
                        datas?.categories?.length && datas.categories.map(categories => (
                            <li key={categories.id}><NavLink to={categories.href} className="drop-down-menu__header-link">{categories.name}</NavLink></li> 
                        ))
                    }
                </ul>
            </div>
                
            <div className="drop-down-menu__sub-categories--wrap container">

                <ul className="drop-down-menu__sub-categories-link-wrap">
                    {
                        selectedCategories && selectedCategories?.subCategories.map(subCategories => (
                            <li key={subCategories.id}><NavLink className="drop-down-menu__sub-categories-link" to={subCategories.href}>{subCategories.name}</NavLink></li>
                        )) 
                    }
                </ul>

                <button className="drop-down-menu__btn-wrap">
                    <img className="drop-down-menu__btn-img" src={login} alt='img'/>
                    <span className="drop-down-menu__btn-text">Вхід</span>
                </button>
                <button className="drop-down-menu__btn-wrap">
                    <img className="drop-down-menu__btn-img" src={cart} alt='img'/>
                    <span className="drop-down-menu__btn-text">Кошик</span>
                </button>
                <button className="drop-down-menu__btn-wrap">
                    <img className="drop-down-menu__btn-img" src={heart} alt='img'/>
                    <span className="drop-down-menu__btn-text">Обрані</span>
                </button>

                <ul className="drop-down-menu__info">
                    <li className="drop-down-menu__info-link-wrap"><NavLink className="drop-down-menu__info-link" to='/about'>Про компанію</NavLink></li>
                    <li className="drop-down-menu__info-link-wrap"><NavLink className="drop-down-menu__info-link" to='#'>Публічна оферта</NavLink></li>
                    <li className="drop-down-menu__info-link-wrap"><NavLink className="drop-down-menu__info-link" to='#'>Доставка і оплата</NavLink></li>
                    <li className="drop-down-menu__info-link-wrap"><NavLink className="drop-down-menu__info-link" to='#'>Контакти</NavLink></li>
                    <li className="drop-down-menu__info-link-wrap"><NavLink className="drop-down-menu__info-link" to='#'>Допомога</NavLink></li>
                </ul>

                <div className="drop-down-menu__contact">
                    <div className="drop-down-menu__contact-tel-wrap">
                        <a className='drop-down-menu__contact-tel' href="tel:+380673804111">{datas.shopInfo ? datas.shopInfo.contact_number : ''}</a>
                        <a className='drop-down-menu__contact-tel' href="tel:+380673804111">{datas.shopInfo ? datas.shopInfo.contact_number_two : ''}</a>
                    </div>
                    <div className="drop-down-menu__contact-social-wrap">
                        <a className="drop-down-menu__contact-social" href={datas.shopInfo ? datas.shopInfo.facebook : ''} target='_blank'><img src={facebook} alt='img' /></a>
                        <a className="drop-down-menu__contact-social" href={datas.shopInfo ? datas.shopInfo.instagram : ''} target='_blank'><img src={instagram} alt='img' /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DropDownMenu;