import './CategoriesProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PaginationProduct from '../PaginationProduct/PaginationProduct';
import ProductCard from '../ProductCard/ProductCard';

// import { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import cart from '../../assets/images/cart.svg';

// import Helocation from '../Helocation/Helocation';

// function CategoriesProduct({ posts, loading }) {
function CategoriesProduct({ products}) {

    return (
        <div className="categories-product">
             <ul className='categories-product--wrap'>
                {products.map(products => (
                    <li key={products.id} className='categories-product__card'>
                        <ProductCard products={products}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoriesProduct;