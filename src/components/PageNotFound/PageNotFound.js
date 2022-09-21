import { NavLink } from 'react-router-dom';
import './PageNotFound.css';

import woman from '../../assets/images/woman.webp';


// import { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import cart from '../../assets/images/cart.svg';

// import Helocation from '../Helocation/Helocation';

function PageNotFound() {
    // const [isOpenMenu, setIsOpenMenu] = useState(false);

    // const searchInputRef = useRef(null);

    // const navigate = useNavigate();

    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    return (
        <div className="page-not-found">
            <span className="page-not-found__number">404</span>
            <h2 className="page-not-found__title">Сторінка не знайдена</h2>
            <div>
                <span>Повернутись на головну сторінку:</span>
                <NavLink className="page-not-found__btn" to="/">Голоана</NavLink>
            </div>
        </div>
    );
}

export default PageNotFound;