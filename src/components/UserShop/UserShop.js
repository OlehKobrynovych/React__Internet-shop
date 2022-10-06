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
    console.log(isNeedUpdate)

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
                                                    <h3  className='user-shop__title'>Магазин {shop.name}</h3>
                                                    <h3  className='user-shop__title'>Телефон {shop.contact_number}</h3>
                                                    <h3  className='user-shop__title'>Адрес {shop.location}</h3>
                                                    <button className='user-shop__btn' onClick={() => handleUpdate()}>Оновити</button>
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