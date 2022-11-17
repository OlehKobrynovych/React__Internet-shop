import './Header.css';
import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HeartBtn from '../HeartBtn/HeartBtn';
import CartBtn from '../CartBtn/CartBtn';
// import LoginBtn from '../LoginBtn/LoginBtn';
import MobileMenu from '../MobileMenu/MobileMenu';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import { setSearchProducts, setSearchProductsName } from '../../store/homeSlice';


function Header() {
    const shop = useSelector(state => state.homeSlice.shop);
    const categories = useSelector(state => state.homeSlice.categories);
    const searchInputRef = useRef(null);
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(shop)

    const handleClick = () => {
        searchInputRef.current.focus()
        if (searchValue?.length) {
            dispatch(setSearchProductsName(searchValue));
            navigate(`/${shop.name}/search`)
        } else {
            navigate(`/${shop?.name}`)
        }
    };
    
    const handleKeyDown = (e) => {
        if(e.key == 'Enter') {
            if (searchValue?.length) {
                dispatch(setSearchProductsName(searchValue));
                navigate(`/${shop.name}/search`)
            } else {
                navigate(`/${shop?.name}`)
            }
        }
    };
    
    
    return (
        <div 
            className="header"
        >
            <div className="header--wrap container">
                <MobileMenu />

                {
                    shop?.logo && <NavLink to={`/${shop.name}`}><img className='header__logo' src={shop.logo} alt='img'/></NavLink>
                }

                <div className="header__menu-wrap">
                    <ul className="header__menu">
                        {
                          !!categories.length &&  categories?.map(category => (
                                <li className="header__menu-link-wrap" key={category._id}>
                                    <NavLink 
                                        className="header__menu-link" 
                                        to={`/${shop.name}/category/${category._id}`}
                                    >
                                        {category.name}
                                    </NavLink>
                                    {
                                        !!category?.sub_categories?.length &&
                                            <div className="header__menu-link-dropdown">
                                                <ul className="header__menu-link-dropdown-wrap">
                                                    {
                                                    category?.sub_categories.map(subCategories => (<li key={subCategories._id}><NavLink className="header__menu-sublink-dropdown" to={`/${shop.name}/category/${subCategories._id}`}>{subCategories.name}</NavLink></li>))
                                                    }
                                                </ul>
                                            </div>
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
                
                <div className="header__wrap-btn">
                    <div className="header__search-wrap">
                        <input className="header__search" 
                            onChange={(e) => setSearchValue(e.target.value)} 
                            onKeyDown={(e) => handleKeyDown(e)} value={searchValue} 
                            ref={searchInputRef} 
                            type="text" 
                            name="search" 
                            placeholder={selectedLanguage?.header?.placeholderSearch} 
                            autoComplete='off' 
                        />
                        <svg className="header__search-img" onClick={() => handleClick()} fill={shop?.colorSettings?.colorHeaderText ? shop?.colorSettings?.colorHeaderText : '#ffffff'} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 487.95 487.95" xmlSpace="preserve">
                            <g>
                                <g>
                                    <path d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
                                        c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
                                        c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <HeartBtn />
                    <CartBtn />
                    {/* <LoginBtn /> */}
                </div>
            </div>
            
            <DropDownMenu />
                    
        </div>
    );
}

export default Header;