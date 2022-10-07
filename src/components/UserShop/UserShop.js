import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserShop.css';
import editIcon from './../../assets/images/editIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNeedUpdate, setShop } from '../../store/userSlice';
import CreationShop from '../CreationShop/CreationShop';
import Preloader from '../Preloader/Preloader';


function UserShop() {
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const isNeedUpdate = useSelector(state => state.userSlice.isNeedUpdate);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    // console.log(isNeedUpdate)

    useEffect(() => {
        setIsLoading(true)

        fetch('http://localhost:3000/api/shops/all')
        .then(res => res.json())
        .then(res => {
            if (res.success && res.data) {
                let res1 = res.data.find(el => el.owner_id == user._id)
                if (res1?.name) {
                    dispatch(setShop(res1));
                }  
            } else {
                console.log(res)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [user, isNeedUpdate])

    const handleUpdate = () => {
        dispatch(setIsNeedUpdate(!isNeedUpdate)) 
    }
  

    return (
        <>
            {
                isLoading ? <Preloader /> : (
                    <>
                        {
                           isNeedUpdate ? <CreationShop /> : (
                               <>
                                    {
                                        shop?.name && (
                                            <div className="user-shop">
                                                <div className="user-shop--wrap container">
                                                    <div className='user-shop__info-wrap'>
                                                        <span  className='user-shop__info-title'>Назва магазин:</span>
                                                        <span  className='user-shop__info-text'>&nbsp;{shop.name}</span>
                                                    </div>
                                                    <div className='user-shop__info-wrap'>
                                                        <span  className='user-shop__info-title'>Facebook:</span>
                                                        <span  className='user-shop__info-text'>&nbsp;{shop.facebook_url}</span>
                                                    </div>
                                                    <div className='user-shop__info-wrap'>
                                                        <span  className='user-shop__info-title'>Instagram:</span>
                                                        <span  className='user-shop__info-text'>&nbsp;{shop.instagram_url}</span>
                                                    </div>
                                                    <div className='user-shop__info-wrap'>
                                                        <span  className='user-shop__info-title'>Контакний номер телефону:</span>
                                                        <span  className='user-shop__info-text'>&nbsp;{shop.contact_number}</span>
                                                    </div>
                                                    <div className='user-shop__info-wrap'>
                                                        <span  className='user-shop__info-title'>Додатковий контакний номер телефону:</span>
                                                        <span  className='user-shop__info-text'>&nbsp;{shop.contact_number_two}</span>
                                                    </div>
                                                    <div className='user-shop__info-wrap'>
                                                        <span  className='user-shop__info-title'>Адреса:</span>
                                                        <span  className='user-shop__info-text'>&nbsp;{shop.location}</span>
                                                    </div>
                                                    <div className='user-shop__info-wrap'>
                                                        <span  className='user-shop__info-title'>Валюта:</span>
                                                        <span  className='user-shop__info-text'>&nbsp;{shop.currency}</span>
                                                    </div>
                                                    <div className='user-shop__info-wrap'>
                                                        <span  className='user-shop__info-title'>Мова сайту:</span>
                                                        <span  className='user-shop__info-text'>&nbsp;{shop.language}</span>
                                                    </div>
                                                    <div className='user-shop__info-wrap'>
                                                        <span  className='user-shop__info-title'>Способи доставки:</span>
                                                        <span  className='user-shop__info-text'>&nbsp;{shop.deliveryMethods}</span>
                                                    </div>
                                                    <div className='user-shop__info-wrap'>
                                                        <span  className='user-shop__info-title'>Способи оплати:</span>
                                                        <span  className='user-shop__info-text'>&nbsp;{shop.paymentMethods}</span>
                                                    </div>
                                                    <div className='user-shop__info-wrap'>
                                                        <span  className='user-shop__info-title'>Опис магазину:</span>
                                                        <span  className='user-shop__info-text'>&nbsp;{shop.descriptionShop}</span>
                                                    </div>
                                                    <div className='user-shop__info-wrap'>
                                                        <span  className='user-shop__info-title'>Логотип:</span>
                                                        <img className='user-shop__info-logo' src={shop.logo} alt='img'/>
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
                )
            }
        </>
    );
}

export default UserShop;