import './ProductFilter.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PaginationProduct from '../PaginationProduct/PaginationProduct';
import { useEffect, useState } from 'react';
// import LastProduct from '../LastProduct/LastProduct';
import ProductCard from '../ProductCard/ProductCard';

// import { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import cart from '../../assets/images/cart.svg';

// import Helocation from '../Helocation/Helocation';



function ProductFilter() {
   
    // const dispatch = useDispatch();
    const selectedCategory = useSelector(state => state.homeSlice.selectedCategory);
    const datas = useSelector(state => state.homeSlice.datas);
    const lastViewProduct = useSelector(state => state.homeSlice.lastViewProduct);
// debugger

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(20);

    const indexOfLastProducts = currentPage * productsPerPage;
    const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
    // const currentProducts = products.slice(indexOfFirstProducts, indexOfLastProducts);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
    //   const fetchProducts = async () => {
    //     setLoading(true);
    //     const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    //     setProducts(res.data);
    //     setLoading(false);
    //   };
    //   fetchProducts();
    
        if (datas && datas.products) {
            setProducts(datas.products);
        }
    }, [datas]);
    
   

    return (
        <div className="product-filter">
             <div className="product-filter--wrap container">
                <p className="product-filter__path">
                    <NavLink to='/'>Головна сторінка &nbsp; / &nbsp;</NavLink>
                    <span>{selectedCategory} &nbsp; /</span>
                </p>

                <h2 className="product-filter__title">{selectedCategory}</h2>

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
                    paginate={paginate} 
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