import './CartBtn.css';

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import cart from '../../assets/images/cart.svg';

// import Helocation from '../Helocation/Helocation';

function CartBtn() {
    // const [isOpenMenu, setIsOpenMenu] = useState(false);

    // const searchInputRef = useRef(null);

    // const navigate = useNavigate();

    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    return (
        <div className="cart-btn">
            <svg className="cart-btn__img" fill='#fff' width="512px" height="512px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-d</title><circle cx="176" cy="416" r="16"/><circle cx="400" cy="416" r="16" /><polyline points="48 80 112 80 160 352 416 352"/><path d="M160,288H409.44a8,8,0,0,0,7.85-6.43l28.8-144a8,8,0,0,0-7.85-9.57H128" /></svg>
            <p className="cart-btn__text">Кошик</p>
        </div>
    );
}

export default CartBtn;