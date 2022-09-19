import './ProductFilter.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PaginationProduct from '../PaginationProduct/PaginationProduct';
import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useLocation } from 'react-router-dom';

// import { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import cart from '../../assets/images/cart.svg';


function ProductFilter() {
   
    // const dispatch = useDispatch();
    const datas = useSelector(state => state.homeSlice.datas);
    const lastViewProduct = useSelector(state => state.homeSlice.lastViewProduct);
    let location = useLocation();

    const [selectedPath, setSelectedPath] = useState(null);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(20);
    // const indexOfLastProducts = currentPage * productsPerPage;
    // const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
    // const currentProducts = products.slice(indexOfFirstProducts, indexOfLastProducts);
  
    useEffect(() => {
        if (datas && datas.categories) {
            setSelectedPath(datas.categories.find(el => el.href == location.pathname))
        }
    }, [location])

    useEffect(() => {
        if (datas && datas.products) {
            setProducts(datas.products);
            setSelectedPath(datas.categories.find(el => el.href == location.pathname))
        }
    }, [datas]);
    
   

    return (
        <div className="product-filter">
             <div className="product-filter--wrap container">
                <p className="product-filter__path">
                    <NavLink to='/'>Головна сторінка &nbsp; / &nbsp;</NavLink>
                    <span>{selectedPath?.name} &nbsp; /</span>
                </p>
             
                <h2 className="product-filter__title">{selectedPath?.name}</h2>

                <ul className='product-filter__item--wrap categories-product--wrap'>
                    {
                        products.map(products => (
                            <li key={products.id} className='product-filter__item'>
                                <ProductCard products={products}/>
                            </li>
                        ))
                    }
                </ul>

                <PaginationProduct
                    productsPerPage={productsPerPage}
                    totalProducts={products.length}
                    // paginate={paginate} 
                    setCurrentPage={setCurrentPage} 
                    currentPage={currentPage}
                />

                {
                    lastViewProduct && (
                        <div className="product-filter__last-product">
                            <h2 className="product-filter__last-product-title">Переглянуті продукти</h2>
                            <ProductCard products={lastViewProduct}/>
                        </div>
                    ) 
                }
            </div>
        </div>
    );
}

export default ProductFilter;