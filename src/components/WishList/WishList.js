import './WishList.css';

import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import { NavLink } from 'react-router-dom';


function WishList() {
   
    const favoriteProduct = useSelector(state => state.homeSlice.favoriteProduct);

    return (
     <div className="wish-list">
        <div className="wish-list--wrap container">

            <div className="wish-list__path">
                <NavLink className="wish-list__path-link" to='/'>Головна сторінка</NavLink>
                <span>&nbsp; / &nbsp;</span>
                <span>Обрані</span>
                <span>&nbsp; /</span>
            </div>

            <h2 className="wish-list__title">Обрані</h2>

            <div className="wish-list__product-wrap">
                {
                    favoriteProduct.length ? (favoriteProduct.map(el => (<ProductCard products={el}/>))) 
                    : (<p className="wish-list__product-error">У Вас не має обраних товарів!!!</p>)
                }
            </div>
        </div>
     </div>
    );
}

export default WishList;