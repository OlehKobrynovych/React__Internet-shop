import './MobileMenu.css';

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpenMenu } from '../../store/homeSlice';

function MobileMenu() {
    const isOpenMenu = useSelector(state => state.homeSlice.isOpenMenu);

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setIsOpenMenu())
        if (!isOpenMenu) {
            document.body.style.overflow = "hidden" 
        } else {
            document.body.style.overflow = "unset"
        }
    };

    return (
        <div className={`mobile-menu ${isOpenMenu ? 'change': ''}`} onClick={handleClick}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
    );
}

export default MobileMenu;