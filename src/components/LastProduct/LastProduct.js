import './LastProduct.css';

import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';


function LastProduct() {
   
    const lastViewProduct = useSelector(state => state.homeSlice.lastViewProduct);

    return (
        lastViewProduct && (
            <div className="last-product container">
                <h2 className="last-product__title">Переглянуті продукти</h2>
                <div className="last-product__wrap-cart">
                    {
                        lastViewProduct.map(el => (<ProductCard products={el}/>))
                    }
                </div>
            </div>
        ) 
    );
}

export default LastProduct;