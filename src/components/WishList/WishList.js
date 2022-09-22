import './WishList.css';

import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';


function WishList() {
   
    const favoriteProduct = useSelector(state => state.homeSlice.favoriteProduct);

    return (
     <div className="wish-list">
        <div className="wish-list--wrap container">
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