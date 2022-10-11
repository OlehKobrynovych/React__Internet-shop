import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserShop.css';
import editIcon from './../../assets/images/editIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNeedUpdateShop, setShop } from '../../store/userSlice';
import CreationShop from '../CreationShop/CreationShop';
import Preloader from '../Preloader/Preloader';


function UserShop() {
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const isNeedCreateShop = useSelector(state => state.userSlice.isNeedCreateShop);
    const isNeedUpdateShop = useSelector(state => state.userSlice.isNeedUpdateShop);
    const [notFilledText, setNotFilledText] = useState('не вказано');
    const dispatch = useDispatch();
    // console.log('asdasd: ',shop)

    const handleUpdate = () => {
        dispatch(setIsNeedUpdateShop(!isNeedUpdateShop)) 
    }

    return (
        <>
            {
               
                isNeedUpdateShop || isNeedCreateShop ? <CreationShop /> : (
                    <>
                        {
                            shop?.name && (
                                <div className="user-shop">
                                    <div className="user-shop--wrap container">
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Назва магазин:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.name}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Facebook:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.facebook_url ? shop.facebook_url : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Instagram:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.instagram_url ? shop.instagram_url : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Контакний номер телефону:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.contact_number ? shop.contact_number : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Додатковий контакний номер телефону:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.contact_number_two ? shop.contact_number_two : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Адреса:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.location ? shop.location : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Валюта:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.currency ? shop.currency : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Мова сайту:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.language ? shop.language : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Способи доставки:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.deliveryMethods ? shop.deliveryMethods : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Способи оплати:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.paymentMethods ? shop.paymentMethods : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Опис магазину:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.descriptionShop ? shop.descriptionShop : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Логотип:&nbsp;</span>
                                            {shop.logo ? <img className='user-shop__info-logo' src={shop.logo} alt='img'/> : notFilledText}
                                        </div>
                                        
                                        <button className='user-shop__btn' onClick={() => handleUpdate()}>Редагувати</button>
                                    </div>
                                </div>
                            )
                        }
                    </>
                )
                   
            }
        </>
    );
}

export default UserShop;