import './LoginBtn.css';
import login from '../../assets/images/login.svg';

// import { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

// import Helocation from '../Helocation/Helocation';

function LoginBtn() {
    // const [isOpenMenu, setIsOpenMenu] = useState(false);

    // const searchInputRef = useRef(null);

    // const navigate = useNavigate();

    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    return (
        <div className="login-btn">
            <img className="login-btn__img" src={login} alt='img'/>
            <p className="login-btn__text">Вхід</p>
        </div>
    );
}

export default LoginBtn;