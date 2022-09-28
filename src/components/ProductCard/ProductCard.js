import './ProductCard.css';

import { useDispatch, useSelector } from 'react-redux';
import { setFavoriteProduct, setLastViewProduct, setShoppingProduct } from '../../store/homeSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

function ProductCard({product}) {

    const shop = useSelector(state => state.homeSlice.shop);
    const favoriteProduct = useSelector(state => state.homeSlice.favoriteProduct);
    const shoppingProduct = useSelector(state => state.homeSlice.shoppingProduct);
    const [isFavoriteProduct, setIsFavoriteProduct] = useState([]);
    const [isShoppingProduct, setIsShoppingProduct] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const datas = useSelector(state => state.homeSlice.datas);

    const handleClick = (product) => {
        navigate(`/product/${product._id}`);
        dispatch(setLastViewProduct(product))
    };

    useEffect(() => {
        setIsFavoriteProduct(favoriteProduct.some(el => el._id == product._id))
    }, [favoriteProduct])
    
    useEffect(() => {
        setIsShoppingProduct(shoppingProduct.some(el => el._id == product._id))
    }, [shoppingProduct])
   
    const handleClickFavorite = (product) => {
        if(favoriteProduct.some(el => el._id === product._id)) {
            let res = favoriteProduct.filter(el => el._id !== product._id)
            dispatch(setFavoriteProduct(res))
        } else {
            let res = [...favoriteProduct, product]
            dispatch(setFavoriteProduct(res))
        }
    };
   
    const handleClickShopping = (product) => {
        if(shoppingProduct.some(el => el._id === product._id)) {
            let res = shoppingProduct.filter(el => el._id !== product._id)
            dispatch(setShoppingProduct(res))
        } else {
            let res = [...shoppingProduct, product]
            dispatch(setShoppingProduct(res.map(el => el._id == product._id ? {...el, count: 1} : el)))
        }
    };

    return (
        <div className="product-card">
            <img className="product-card__img" src={product.images[0]} alt='img' onClick={() => handleClick(product)}/>
            <div className="product-card__text-wrap">
                <div className="product-card__title" onClick={() => handleClick(product)}>{product.name}</div>
                <div className="product-card__bottom-wrap">
                    {
                        product.new_price !== 0 ? (
                            <div className="product-card__price-wrap">
                                <div className="product-card__price--discount">{product.price} {shop.currency}</div>
                                <div className="product-card__price-new">{product.new_price} {shop.currency}</div> 
                            </div> 
                        ) : (
                            <div className="product-card__price-wrap">
                                <div className="product-card__price">{product.price} {shop.currency}</div>
                            </div> 
                        )
                    }
                    <div className="product-card__btn-wrap">
                        <button className="product-card__btn" onClick={() => handleClickFavorite(product)}>
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
                        <button className="product-card__btn" onClick={() => handleClickShopping(product)}>
                            <svg className={`product-card__btn-img ${isShoppingProduct ? "product-card__btn-img--active" : ""}`} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                viewBox="0 0 60 60" xmlSpace="preserve">
                                <path d="M11.68,13l-0.833-5h-2.99C7.411,6.28,5.859,5,4,5C1.794,5,0,6.794,0,9s1.794,4,4,4c1.859,0,3.411-1.28,3.858-3h1.294l0.5,3
                                    H9.614l5.171,26.016c-2.465,0.188-4.518,2.086-4.76,4.474c-0.142,1.405,0.32,2.812,1.268,3.858C12.242,48.397,13.594,49,15,49h2
                                    c0,3.309,2.691,6,6,6s6-2.691,6-6h11c0,3.309,2.691,6,6,6s6-2.691,6-6h4c0.553,0,1-0.447,1-1s-0.447-1-1-1h-4.35
                                    c-0.826-2.327-3.043-4-5.65-4s-4.824,1.673-5.65,4h-11.7c-0.826-2.327-3.043-4-5.65-4s-4.824,1.673-5.65,4H15
                                    c-0.842,0-1.652-0.362-2.224-0.993c-0.577-0.639-0.848-1.461-0.761-2.316c0.152-1.509,1.546-2.69,3.173-2.69h0.791
                                    c0.014,0,0.025,0,0.039,0h38.994C57.763,41,60,38.763,60,36.013V13H11.68z M4,11c-1.103,0-2-0.897-2-2s0.897-2,2-2s2,0.897,2,2
                                    S5.103,11,4,11z"/>
                                <g>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductCard;