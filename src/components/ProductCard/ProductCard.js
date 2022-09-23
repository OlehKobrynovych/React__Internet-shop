import './ProductCard.css';

import photo1 from '../../assets/images/photo1.webp';
import heart from '../../assets/images/heart.svg';
import cart from '../../assets/images/cart.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteProduct, setLastViewProduct } from '../../store/homeSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import Helocation from '../Helocation/Helocation';

function ProductCard({products}) {

    const dispatch = useDispatch();
    const favoriteProduct = useSelector(state => state.homeSlice.favoriteProduct);
    const navigate = useNavigate();
    const [isFavoriteProduct, setIsFavoriteProduct] = useState(false);

    const handleClick = (products) => {
        navigate(`/product/${products.id}`);
        dispatch(setLastViewProduct(products))
    };

    useEffect(() => {
        setIsFavoriteProduct(favoriteProduct.some(el => el.id == products.id))
    }, [favoriteProduct])
   
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
                        {/* <button className="product-card__btn" onClick={() => handleClickFavorite(products)}><img className="product-card__btn-img" src={heart} alt='img'/></button> */}
                        <button className="product-card__btn" onClick={() => handleClickFavorite(products)}>
                            <svg className={`product-card__btn-img ${isFavoriteProduct ? "product-card__btn-img--active" : ""}`} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 471.701 471.701" xmlSpace="preserve">
                                <g>
                                    <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1
                                        c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3
                                        l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4
                                        C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3
                                        s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4
                                        c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3
                                        C444.801,187.101,434.001,213.101,414.401,232.701z"/>
                                </g>
                            </svg>
                        </button>
                        <button className="product-card__btn"><img className="product-card__btn-img" src={cart} alt='img'/></button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductCard;