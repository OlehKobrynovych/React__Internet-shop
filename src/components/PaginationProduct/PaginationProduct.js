import './PaginationProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

// import { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import cart from '../../assets/images/cart.svg';

// import Helocation from '../Helocation/Helocation';

function PaginationProduct({ productsPerPage, totalProducts, setCurrentPage, currentPage }) {
    const [activeNum, setActiveNum] = useState(1);

    // const searchInputRef = useRef(null);

    // const navigate = useNavigate();

    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    // const dispatch = useDispatch();
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalProducts/productsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
        <div className="pagination-product">
            <ul className='pagination-product--wrap'>
                {pageNumbers.map((number, id) => (
                    <li key={number} className={`pagination-product__link-wrap ${currentPage == (id + 1) ? 'pagination-product__link--active' : ''}`}>
                        <button onClick={() => setCurrentPage(number)} className="pagination-product__link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PaginationProduct;