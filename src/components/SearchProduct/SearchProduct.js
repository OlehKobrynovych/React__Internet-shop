import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SearchProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { setEditProduct, setIsCleanInput, setProduct, setUpdataProduct } from '../../store/userSlice';
import deleteImg from '../../assets/images/deleteImg.svg';
import CardInput from '../CardInput/CardInput';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SearchProduct() {
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const categories = useSelector(state => state.userSlice.categories);
    const editProduct = useSelector(state => state.userSlice.editProduct);
    const isCleanInput = useSelector(state => state.userSlice.isCleanInput);
    const [isOpenInfo, setIsOpenInfo] = useState([]);
    const [searchCategory, setSearchCategory] = useState('');
   

    return (
        <div className='search-product'>
            <div className='search-product--wrap container'>
               
            </div>
        </div>
    );
}

export default SearchProduct;