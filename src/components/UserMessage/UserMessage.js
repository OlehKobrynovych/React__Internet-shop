import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserMessage.css';
import editIcon from './../../assets/images/editIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNeedUpdateShop, setShop } from '../../store/userSlice';
import CreationShop from '../CreationShop/CreationShop';
import Preloader from '../Preloader/Preloader';


function UserMessage() {
    // const user = useSelector(state => state.userSlice.user);
    // const shop = useSelector(state => state.userSlice.shop);
    // const isNeedCreateShop = useSelector(state => state.userSlice.isNeedCreateShop);
    // const isNeedUpdateShop = useSelector(state => state.userSlice.isNeedUpdateShop);
    // const dispatch = useDispatch();
    // console.log('asdasd: ',shop)

    const handleUpdate = () => {
    }

    return (
        <div className="user-message">
            <div className="user-message--wrap container">
                Повідомлення
            
                {/* <button className='user-message__btn' onClick={() => handleUpdate()}>Редагувати</button> */}
            </div>
        </div>
    );
}

export default UserMessage;