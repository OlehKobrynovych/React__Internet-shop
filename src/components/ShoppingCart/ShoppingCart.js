import './ShoppingCart.css';

import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import QuantityProduct from '../QuantityProduct/QuantityProduct';

import deleteImg from '../../assets/images/deleteImg.svg';
import { setShoppingProduct } from '../../store/homeSlice';



function ShoppingCart() {
    const datas = useSelector(state => state.homeSlice.datas);
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const shoppingProduct = useSelector(state => state.homeSlice.shoppingProduct);
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(null);

    useEffect(() => {
        setTotalPrice(shoppingProduct.reduce((acc, el) => el.new_price ? acc += (el.new_price * el.count) : acc += (el.price * el.count), 0))
    }, [])
    
    useEffect(() => {
        setTotalPrice(shoppingProduct.reduce((acc, el) => el.new_price ? acc += (el.new_price * el.count) : acc += (el.price * el.count), 0))
    }, [shoppingProduct])

    const handleClickDelete = (product) => {
       let res = shoppingProduct.filter(el => el.id !== product.id)
       dispatch(setShoppingProduct(res))
    };

    return (
     <div className="shopping-cart">
        <div className="shopping-cart--wrap container">

            <div className="shopping-cart__path">
                <NavLink className="shopping-cart__path-link" to='/'>{selectedLanguage?.homePage?.homeName}</NavLink>
                <span>&nbsp; / &nbsp;</span>
                <span>{selectedLanguage?.cartPage?.cartName}</span>
                <span>&nbsp; /</span>
            </div>

            <h2 className="shopping-cart__title">{selectedLanguage?.cartPage?.cartName}</h2>

            {
               shoppingProduct.length ? (
                   <div className="shopping-cart__pdoduct-wrap">
                       {
                           shoppingProduct.map(el => (
                                <div className="shopping-cart__pdoduct" key={el.id}>
                                    <div className="shopping-cart__pdoduct-info-wrap">
                                        <img className="shopping-cart__pdoduct-img" src={el.image} alt='img'/>
                                        <div className="shopping-cart__pdoduct-info">
                                            <div className="shopping-cart__pdoduct-info-title">{el.name}</div>
                                        </div>
                                        <div className="shopping-cart__pdoduct-price-wrap">
                                            <p>{selectedLanguage?.cartPage?.cartPriceTitle}</p>
                                            {
                                                el.new_price ? (<><p className="shopping-cart__pdoduct-price-old">{el.price}{datas?.shopInfo?.selectedCurrency}</p><p className="shopping-cart__pdoduct-price">{el.new_price}{datas?.shopInfo?.selectedCurrency}</p></>)
                                                : (<p className="shopping-cart__pdoduct-price">{el.price}{datas?.shopInfo?.selectedCurrency}</p>)
                                            }
                                        </div>
                                    </div>
                                    <div className="shopping-cart__pdoduct-count-wrap">
                                        <QuantityProduct price={el.price} new_price={el.new_price} id={el.id} count={el.count}/>
                                        <button onClick={() => handleClickDelete(el)}><img className="shopping-cart__delete-btn" src={deleteImg} alt='img'/></button>
                                    </div>
                                </div>
                           ))
                       }

                       <div className="shopping-cart__total-price-wrap">
                            <div className="shopping-cart__total-price">
                                <span className="shopping-cart__total-price-title">{selectedLanguage?.cartPage?.cartTotalTitle}</span>
                                <span className="shopping-cart__total-price-number">{totalPrice}{datas?.shopInfo?.selectedCurrency}</span>
                            </div>
                           <button className="shopping-cart__btn-buy">{selectedLanguage?.cartPage?.cartBtnBuy}</button>
                       </div>
                   </div>
               ) : (<p className="shopping-cart__pdoduct-error">{selectedLanguage?.cartPage?.cartError}</p>)
            }
        </div>
     </div>
    );
}

export default ShoppingCart;