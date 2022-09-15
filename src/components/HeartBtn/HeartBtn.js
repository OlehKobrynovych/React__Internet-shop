import './HeartBtn.css';

import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import heart from '../../assets/images/heart.svg';

// import Helocation from '../Helocation/Helocation';

function HeartBtn() {
    // const [isOpenMenu, setIsOpenMenu] = useState(false);

    // const searchInputRef = useRef(null);

    // const navigate = useNavigate();

    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    return (
        <div className="heart-btn">
            <img className="heart-btn__img" src={heart} alt='img'/>
            <p className="heart-btn__text">обрані</p>
        </div>
    );
}

export default HeartBtn;