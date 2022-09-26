import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShoppingProduct, setTotalPrice } from '../../store/homeSlice';
import './QuantityProduct.css';

function QuantityProduct({price, new_price, id, count}) {
    const datas = useSelector(state => state.homeSlice.datas);
    const shoppingProduct = useSelector(state => state.homeSlice.shoppingProduct);
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const [quantity, setQuantity] = useState(count);
    const [pdoductTotalPrice, setPdoductTotalPrice] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        let res = new_price ? (quantity * new_price) : (quantity * price)
        setPdoductTotalPrice(res)

        dispatch(setShoppingProduct(shoppingProduct.map(el => el.id == id ? {...el, count: quantity} : el)));
    }, [quantity])

    // const handleChange = (num) => {
    //     setQuantity(num)
    // };

    return (
        <div className="quantity-product">
            <form className="quantity-product__pdoduct-count-form" action="">
                <span>{selectedLanguage?.cartPage?.cartQuantityTitle}</span>
                <input className="quantity-product__pdoduct-count" onChange={(e) => setQuantity(e.target.value)} value={quantity} type="number" id="" name="quantity" min="1" />
            </form>

            <div className="quantity-product__pdoduct-total-price">
                <p>{selectedLanguage?.cartPage?.cartTotalPriceTitle}</p>
                {pdoductTotalPrice}{datas?.shopInfo?.selectedCurrency}
            </div>
        </div>
    );
}

export default QuantityProduct;