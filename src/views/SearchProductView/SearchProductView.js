import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SearchProductView.css';
import { useDispatch, useSelector } from 'react-redux';
import { setEditProduct, setIsCleanInput, setProduct, setUpdataProduct } from '../../store/userSlice';
import deleteImg from '../../assets/images/deleteImg.svg';
import InputText from '../../components/InputText/InputText';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import PaginationItems from '../../components/PaginationItems/PaginationItems';


function SearchProductView() {
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const searchProductsName = useSelector(state => state.homeSlice.searchProductsName);
    const shop = useSelector(state => state.homeSlice.shop);
    const [searchProducts, setSearchProducts] = useState([]);
    const [paginationProducts, setPaginationProducts] = useState([]);
    const [searchNoResults, setSearchNoResults] = useState(false);
    // console.log(searchProductsName)

    useEffect(() => {
        if (searchProductsName?.length) {
            fetch(`${process.env.REACT_APP_BASE_URL}/products/${shop._id}/shop?name=${searchProductsName}`)
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
                                        {selectedLanguage?.searchPage?.searchErrorText}
                                     </h3>
                    }
                </div>

                <PaginationItems items={searchProducts} setCurrentPaginationItems={setPaginationProducts} pageRangeDisplayed={5} itemsPerPage={5}/>
            </div>
        </div>
    );
}

export default SearchProductView;