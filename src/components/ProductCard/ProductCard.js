import './ProductCard.css';

// import { useState, useRef, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import photo1 from '../../assets/images/photo1.webp';
import heart from '../../assets/images/heart.svg';
import cart from '../../assets/images/cart.svg';


// import Helocation from '../Helocation/Helocation';

function ProductCard({products}) {

    return (
        <div className="product-card">
            <img className="product-card__img" src={photo1} alt='img'/>
            <div className="product-card__text-wrap">
                <div className="product-card__title">{products.name}</div>
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
                        <button className="product-card__btn"><img className="product-card__btn-img" src={heart} alt='img'/></button>
                        <button className="product-card__btn"><img className="product-card__btn-img" src={cart} alt='img'/></button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductCard;