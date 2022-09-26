import './LastProduct.css';

import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';


function LastProduct() {
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const lastViewProduct = useSelector(state => state.homeSlice.lastViewProduct);

    return (
        lastViewProduct && (
            <div className="last-product container">
                <h2 className="last-product__title">{selectedLanguage?.productPage?.productLastTitle}</h2>
                <div className="last-product__wrap-cart">
                    {
                        lastViewProduct.map(el => (<ProductCard key={el.id} products={el}/>))
                    }
                </div>
            </div>
        ) 
    );
}

export default LastProduct;