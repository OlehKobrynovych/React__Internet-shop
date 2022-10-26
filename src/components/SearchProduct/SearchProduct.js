import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SearchProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { setEditProduct, setIsCleanInput, setProduct, setUpdataProduct } from '../../store/userSlice';
import deleteImg from '../../assets/images/deleteImg.svg';
import CardInput from '../CardInput/CardInput';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from '../ProductCard/ProductCard';
import PaginationItems from '../PaginationItems/PaginationItems';


function SearchProduct() {
    const searchProductsName = useSelector(state => state.homeSlice.searchProductsName);
    const shop = useSelector(state => state.homeSlice.shop);
    const [searchProducts, setSearchProducts] = useState([]);
    const [paginationProducts, setPaginationProducts] = useState([]);
    const [searchNoResults, setSearchNoResults] = useState(false);
    // console.log(searchProductsName)

    useEffect(() => {
        if (searchProductsName?.length) {
            fetch(`http://localhost:3000/api/products/${shop._id}/shop?name=${searchProductsName}`)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.success && res.data) {
                        console.log(res)
                        if (res.data?.length) {
                            setSearchProducts([...res.data])
                            setSearchNoResults(false)
                        } else {
                            setSearchNoResults(true)
                        }
                    } else {
                        console.log('GET SearchProduct:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }, [searchProductsName])
   

    return (
        <div className='search-product'>
            <div className='search-product--wrap container'>
                <div className='search-product__cards'>
                    {
                        !!paginationProducts?.length && !searchNoResults ? paginationProducts.map(el => (
                                <ProductCard product={el} key={el._id}/>    
                                )) : <h3  className='search-product__error-text'>
                                        Товару з такою назвою не знайдено
                                     </h3>
                    }
                </div>

                <PaginationItems items={searchProducts} setCurrentPaginationItems={setPaginationProducts} pageRangeDisplayed={5} itemsPerPage={5}/>
            </div>
        </div>
    );
}

export default SearchProduct;