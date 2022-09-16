import './MobileMenu.css';

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import login from '../../assets/images/login.svg';

// import Helocation from '../Helocation/Helocation';

function MobileMenu() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    // const searchInputRef = useRef(null);

    // const navigate = useNavigate();

    const handleClick = () => {
        setIsOpenMenu(!isOpenMenu)
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