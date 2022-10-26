import './Header.css';

import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import search from '../../assets/images/search.svg';

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
    // console.log(categories)

    useEffect(() => {
        if (!searchValue?.length) {
            navigate(`/${shop.name}`)
        }
    }, [searchValue])

    const handleClick = () => {
        searchInputRef.current.focus()
        if (searchValue?.length) {
            dispatch(setSearchProductsName(searchValue));
            navigate(`/${shop.name}/search`)
        } 
    };
    
    const handleKeyDown = (e) => {
        if(e.key == 'Enter') {
            if (searchValue?.length) {
                dispatch(setSearchProductsName(searchValue));
                navigate(`/${shop.name}/search`)
            } 
        }
    };
    
    
    return (
        <div className="header">
            <div className="header--wrap container">
                <MobileMenu />

                {
                    shop?.logo && <NavLink to={`/${shop.name}`}><img className='header__logo' src={shop.logo} alt='img'/></NavLink>
                }

                <div className="header__menu-wrap">
                    <ul className="header__menu">
                        {
                          !!categories.length &&  categories?.map(category => (
                                <li className="header__menu-link-wrap"  key={category._id}>
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
                        <img className="header__search-img" src={search} alt='img' onClick={() => handleClick()} />
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