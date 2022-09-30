import './WishListView.css';

import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import { NavLink } from 'react-router-dom';


function WishListView() {
    const shop = useSelector(state => state.homeSlice.shop);
    const favoriteProduct = useSelector(state => state.homeSlice.favoriteProduct);
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);

// debugger
    return (
     <div className="wish-list">
        <div className="wish-list--wrap container">

            <div className="wish-list__path">
                <NavLink className="wish-list__path-link" to={`/${shop.name}`}>{selectedLanguage?.homePage?.homeName}</NavLink>
                <span>&nbsp; / &nbsp;</span>
                <span>{selectedLanguage?.wishlistPage?.wishlistName}</span>
                <span>&nbsp; /</span>
            </div>

            <h2 className="wish-list__title">{selectedLanguage?.wishlistPage?.wishlistName}</h2>

            <div className="wish-list__product-wrap">
                {
                    favoriteProduct.length ? (favoriteProduct.map(el => (<ProductCard product={el} key={el._id}/>))) 
                    : (<p className="wish-list__product-error">{selectedLanguage?.wishlistPage?.wishlistError}</p>)
                }
            </div>
        </div>
     </div>
    );
}

export default WishListView;