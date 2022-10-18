import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ReadMessage.css';
import stars from './../../assets/images/stars.svg';
import deleteImg from './../../assets/images/deleteImg.svg';
import envelope from './../../assets/images/envelope.svg';
import envelopeOpen from './../../assets/images/envelopeOpen.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNeedUpdateShop, setShop } from '../../store/userSlice';
import CreationShop from '../CreationShop/CreationShop';
import Preloader from '../Preloader/Preloader';
import PaginationItems from '../PaginationItems/PaginationItems';


function ReadMessage() {
    const user = useSelector(state => state.userSlice.user);
    let { idMessage } = useParams();
    // const shop = useSelector(state => state.userSlice.shop);
    // const isNeedCreateShop = useSelector(state => state.userSlice.isNeedCreateShop);
    // const isNeedUpdateShop = useSelector(state => state.userSlice.isNeedUpdateShop);
    // const [currentPaginationItems, setCurrentPaginationItems] = useState([]);
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // console.log('asdasd: ',shop)
   
    const handleSort = () => {
        
    }

    return (
        <div className="read-message">
            <div className="read-message--wrap container">
                Повідомлення {idMessage}
            </div>
        </div>
    );
}

export default ReadMessage;