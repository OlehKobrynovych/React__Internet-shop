import './DropDownMenu.css';

import { NavLink} from 'react-router-dom';
import {datas} from '../../data.js'

// import { useState, useRef } from 'react';
// import login from '../../assets/images/login.svg';
// import Helocation from '../Helocation/Helocation';

function DropDownMenu() {
    // const [isOpenMenu, setIsOpenMenu] = useState(false);

    // const navigate = useNavigate();

    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    return (
        <div className="drop-down-menu">
            <div className="drop-down-menu__header">
                <ul className="drop-down-menu__header--wrap container">
                    {
                        datas.categories.map(categories => (
                            <li className="drop-down-menu__header-link" key={categories.id}><NavLink to={categories.href}>{categories.name}</NavLink></li>
                        ))
                    }
                </ul>
            </div>

            <ul className="drop-down-menu__sub-categories">
                {
                    datas.categories.map(el => el.subCategories.map(subCategories => (<li className="drop-down-menu__sub-categories-link" key={subCategories.id}><NavLink to='#'>{subCategories.name}</NavLink></li>)))
                }
            </ul>
        </div>
    );
}

export default DropDownMenu;