import './ProductCard.css';

import photo1 from '../../assets/images/photo1.webp';
import heart from '../../assets/images/heart.svg';
import cart from '../../assets/images/cart.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteProduct, setLastViewProduct } from '../../store/homeSlice';
import { useNavigate } from 'react-router-dom';
// import { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import Helocation from '../Helocation/Helocation';

function ProductCard({products}) {

    const dispatch = useDispatch();
    const favoriteProduct = useSelector(state => state.homeSlice.favoriteProduct);
    const navigate = useNavigate();


    const handleClick = (products) => {
        navigate(`/product/${products.id}`);
        dispatch(setLastViewProduct(products))
    };
   
    const handleClickFavorite = (products) => {
        if(favoriteProduct.some(el => el.id === products.id)) {
            let res = favoriteProduct.filter(el => el.id !== products.id)
            dispatch(setFavoriteProduct(res))
        } else {
            let res = [...favoriteProduct, products]
            dispatch(setFavoriteProduct(res))
        }
    };

    return (
        <div className="product-card">
            <img className="product-card__img" src={products.image} alt='img' onClick={() => handleClick(products)}/>
            <div className="product-card__text-wrap">
                <div className="product-card__title" onClick={() => handleClick(products)}>{products.name}</div>
                <div className="product-card__bottom-wrap">
                    {
                        products.new_price !== null ? (
                            <div className="product-card__price-wrap">
                                <div className="product-card__price--discount">{products.price} ₴</div>
                                <div className="product-card__price-new">{products.new_price} ₴</div> 
                            </div> 
                        ) : (
                            <div className="product-card__price-wrap">
                                <div className="product-card__price">{products.price} ₴</div>
                            </div> 
                        )
                    }
                    <div className="product-card__btn-wrap">
                        <button className="product-card__btn" onClick={() => handleClickFavorite(products)}><img className="product-card__btn-img" src={heart} alt='img'/></button>
                        <button className="product-card__btn"><img className="product-card__btn-img" src={cart} alt='img'/></button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductCard;