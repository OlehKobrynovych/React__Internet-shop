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
            <img className="cart-btn__img" src={cart} alt='img'/>
            <p className="cart-btn__text">Кошик</p>
        </div>
    );
}

export default CartBtn;