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


function SearchProduct() {
    const searchProductsName = useSelector(state => state.homeSlice.searchProductsName);
    const [searchProducts, setSearchProducts] = useState([]);
    const [searchCategory, setSearchCategory] = useState('');
    console.log(searchProductsName)

    useEffect(() => {
        if (searchProductsName?.length) {
            // fetch(`http://localhost:3000/api/products/${shop._id}/all`)
            //     .then(res => res.json())
            //     .then(res => {
            //         if (res.success && res.data.length) {
                    //    setSearchProducts(res.data)
            //             dispatch(getProducts(res.data));
            //         }
            //     })
            //     .catch((error) => {
            //         console.error('Error:', error);
            //     })
        }
    }, [searchProductsName])
   

    return (
        <div className='search-product'>
            <div className='search-product--wrap container'>
                <div className='search-product__cards'>
                    {
                        !!searchProducts?.length && searchProducts.map(el => (
                                <ProductCard product={el} key={el._id}/>
                                )) 
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchProduct;