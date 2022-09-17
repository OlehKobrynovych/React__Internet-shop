import './ProductFilter.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PaginationProduct from '../PaginationProduct/PaginationProduct';
import CategoriesProduct from '../CategoriesProduct/CategoriesProduct';
import { useEffect, useState } from 'react';

// import { useState, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import cart from '../../assets/images/cart.svg';

// import Helocation from '../Helocation/Helocation';



function ProductFilter() {
   
    // const dispatch = useDispatch();
    const selectedCategory = useSelector(state => state.homeSlice.selectedCategory);
    const datas = useSelector(state => state.homeSlice.datas);

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(10);

    const indexOfLastProducts = currentPage * productsPerPage;
    const indexOfFirstProducts = indexOfLastProducts - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProducts, indexOfLastProducts);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
    //   const fetchProducts = async () => {
    //     setLoading(true);
    //     const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
    //     setProducts(res.data);
    //     setLoading(false);
    //   };
    //   fetchProducts();

        setProducts(datas.products);
    }, []);
    
   

    return (
        <div className="product-filter">
            {/* {datas?.products[1].id} */}

             <div className="product-filter--wrap container">
                <p className="product-filter__path">
                    <NavLink to='/'>Головна сторінка &nbsp; / &nbsp;</NavLink>
                    <span>{selectedCategory} &nbsp; /</span>
                </p>
                <h2 className="product-filter__title">{selectedCategory}</h2>

                <CategoriesProduct products={currentProducts} />
                <PaginationProduct
                    productsPerPage={productsPerPage}
                    totalProducts={products.length}
                    paginate={paginate} 
                    currentPage={currentPage}
                />
            </div>

        </div>
    );
}

export default ProductFilter;