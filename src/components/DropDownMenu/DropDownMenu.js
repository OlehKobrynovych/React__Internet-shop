import './DropDownMenu.css';
import { useState, useRef, useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {datas} from '../../data.js'

// import { useState, useRef } from 'react';
// import login from '../../assets/images/login.svg';

function DropDownMenu() {
    // const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    // const selectedCategory = useSelector(state => state.homeSlice.selectedCategory);
    // const selectedSubCategories = useSelector(state => state.homeSlice.selectedSubCategories);
    const datas = useSelector(state => state.homeSlice.datas);
    // debugger
    // const dispatch = useDispatch();

    // const navigate = useNavigate();

    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    // useEffect(() => {
    //     setSelectedSubCategories(datas.categories.filter(el => el.name == selectedCategory))
    // }, [])

    return (
        <div className="drop-down-menu">
            <div className="drop-down-menu__header">
                {/* <ul className="drop-down-menu__header--wrap container">
                    {
                        datas.categories.map(categories => (
                            <li className="drop-down-menu__header-link" key={categories.id}><NavLink to={categories.href}>{categories.name}</NavLink></li>
                        ))
                    }
                </ul> */}
            </div>

            <ul className="drop-down-menu__sub-categories">
                {
                    // datas?.categories.length ? datas.categories[0].subCategories.map(subCategories => (<li className="drop-down-menu__sub-categories-link" key={subCategories.id}><NavLink to='#'>{subCategories.name}</NavLink></li>)) : ''
                    datas?.categories && datas?.categories.length ?  datas.categories[0].subCategories.map(subCategories => (<li className="drop-down-menu__sub-categories-link" key={subCategories.id}><NavLink to='#'>{subCategories.name}</NavLink></li>)) : ''
                }
            </ul>
        </div>
    );
}

export default DropDownMenu;