import './WishList.css';

import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import { NavLink } from 'react-router-dom';


function WishList() {
   
    const favoriteProduct = useSelector(state => state.homeSlice.favoriteProduct);
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);

// debugger
    return (
     <div className="wish-list">
        <div className="wish-list--wrap container">

            <div className="wish-list__path">
                <NavLink className="wish-list__path-link" to='/'>{selectedLanguage?.homePage?.homeName}</NavLink>
                <span>&nbsp; / &nbsp;</span>
                <span>{selectedLanguage?.wishlistPage?.wishlistName}</span>
                <span>&nbsp; /</span>
            </div>

            <h2 className="wish-list__title">{selectedLanguage?.wishlistPage?.wishlistName}</h2>

            <div className="wish-list__product-wrap">
                {
                    favoriteProduct.length ? (favoriteProduct.map(el => (<ProductCard products={el} key={el.id}/>))) 
                    : (<p className="wish-list__product-error">{selectedLanguage?.wishlistPage?.wishlistError}</p>)
                }
            </div>
        </div>
     </div>
    );
}

export default WishList;