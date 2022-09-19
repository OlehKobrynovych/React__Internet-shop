import './MobileMenu.css';

import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setIsOpenMenu } from '../../store/homeSlice';
// import { useNavigate } from 'react-router-dom';
// import login from '../../assets/images/login.svg';

// import Helocation from '../Helocation/Helocation';

function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    // const searchInputRef = useRef(null);

    // const navigate = useNavigate();

    const handleClick = () => {
        dispatch(setIsOpenMenu())
        setIsOpen(!isOpen)
    };

    return (
        <div className={`mobile-menu ${isOpen ? 'change': ''}`} onClick={handleClick}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
        </div>
    );
}

export default MobileMenu;