import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './AdvertisementShopView.css';
import { languageUser } from '../../languageUser';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedLanguage } from '../../store/userSlice';



function AdvertisementShopView() {
    const shop = useSelector(state => state.homeSlice.shop);
    // console.log(shop)

    // useEffect(() => {
    // }, [])
    
    // const handleChange = (str) => {
    //     setLanguag(str)
    //     dispatch(setSelectedLanguage(languageUser[str]));
    //     localStorage.setItem('userLanguage', JSON.stringify(str));
    // }

    return (
        <div className='advertisement-shop'>
            {
                !!shop?.informationBlock?.length && !!shop?.informationBlock[0]?.description?.length && <div>{shop.informationBlock[0].description}</div>
            }
        </div>
    );
}

export default AdvertisementShopView;