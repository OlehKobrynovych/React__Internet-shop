import { NavLink } from 'react-router-dom';
import './AboutUs.css';

import woman from '../../assets/images/woman.webp';


// import { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import cart from '../../assets/images/cart.svg';

// import Helocation from '../Helocation/Helocation';

function AboutUs() {
    // const [isOpenMenu, setIsOpenMenu] = useState(false);

    // const searchInputRef = useRef(null);

    // const navigate = useNavigate();

    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    return (
        <div className="about-us">
            <div className="about-us-wrap container">
                <p className="about-us__path">
                    <NavLink to='/'>Головна сторінка &nbsp; / &nbsp;</NavLink>
                    <span>ПРО НАС &nbsp; /</span>
                </p>

                <h4 className="about-us__title">ПРО НАС</h4>

                <div className="about-us__info-wrap">
                    <div className="about-us__info">
                        <div className="about-us__info-img"><img src={woman} alt='img'/></div>
                        <div className="about-us__info-text-wrap">
                            <h2 className="about-us__info-title">БРЕНД</h2>
                            <p className="about-us__info-text">
                                Наша історія починається в далекому 1990 році. Тоді зароджується історія двох маленьких людей з баченням великого майбутнього української моди. Галина та Олег Червонюк надихаються духом змін кінця ХХ століття і починають справжню культурну революцію. В пострадянському просторі невеличкого міста зароджувалися цінності нашого бренду. Ми поєднуємо тенденції найфешенебільниших клубів Лондону та Парижу з street-style. В культурі сучасної української моди свобода думки та стилю доступні кожному. 
                            </p>
                        </div>
                    </div>

                    <div className="about-us__info">
                        <div className="about-us__info-img"><img src={woman} alt='img'/></div>
                        <div className="about-us__info-text-wrap">
                            <h2 className="about-us__info-title">КОНЦЕПТ</h2>
                            <p className="about-us__info-text">
                            За правилами нашої компанії товар в магазинах оновлюється двічі на тиждень. Завдяки цьому на наших полицях завжди мешкають тренди та новинки моди. З кожним роком ми розвиваємо рух зелених в Україні. Наша компанія повністю відмовилась від викорстання газу та перейшла на відновлювальні джерела енергії. Щороку ми збільшуємо частку використання еко сировини та матеріалів, які розкладаються природнім шляхом. Завдяки сучасній голанській системі очистки води від нашого виробництва не страждає жодна водойма України.  
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;