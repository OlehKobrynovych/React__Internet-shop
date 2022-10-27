import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserMessages.css';
import editIcon from './../../assets/images/editIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNeedCreateShop, setIsNeedUpdateShop, setShop } from '../../store/userSlice';
import CreationShop from '../CreationShop/CreationShop';
import Preloader from '../Preloader/Preloader';


function UserMessages() {
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const isNeedCreateShop = useSelector(state => state.userSlice.isNeedCreateShop);
    const isNeedUpdateShop = useSelector(state => state.userSlice.isNeedUpdateShop);
    const [notFilledText, setNotFilledText] = useState('дані не вказано');
    const dispatch = useDispatch();
    // console.log('asdasdxfxxxxddd: ',shop)

    // const handleUpdate = () => {
    //     dispatch(setIsNeedUpdateShop(!isNeedUpdateShop)) 
    // }

    return (
        <div className="user-messages">
            Повідомлення
        </div>
    );
}

export default UserMessages;