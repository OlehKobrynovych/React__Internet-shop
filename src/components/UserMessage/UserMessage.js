import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserMessage.css';
import stars from './../../assets/images/stars.svg';
import deleteImg from './../../assets/images/deleteImg.svg';
import envelope from './../../assets/images/envelope.svg';
import envelopeOpen from './../../assets/images/envelopeOpen.svg';
import { useDispatch, useSelector } from 'react-redux';
import PaginationItems from '../PaginationItems/PaginationItems';


function UserMessage() {
    const user = useSelector(state => state.userSlice.user);
    // const shop = useSelector(state => state.userSlice.shop);
    // const isNeedCreateShop = useSelector(state => state.userSlice.isNeedCreateShop);
    // const isNeedUpdateShop = useSelector(state => state.userSlice.isNeedUpdateShop);
    const [messages, setMessages] = useState([1,2,3,4,5,6,7]);
    const [isSelectMessage, setIsSelectMessage] = useState([]);
    const [isFavoriteMessage, setIsFavoriteMessage] = useState([]);
    // const [sortBy, setSortBy] = useState('');
    const [currentPaginationItems, setCurrentPaginationItems] = useState([]);
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    // console.log('asdasd: ',shop)

    const handleSelect = (e, num) => {
        e.stopPropagation()
        if (isSelectMessage.includes(num)) {
            setIsSelectMessage([...isSelectMessage.filter(el => el !== num)])
        } else {
            setIsSelectMessage([...isSelectMessage, num])
        }
    }
   
    const handleSort = () => {
        
    }
    
    const handleDeleteMessage = (e, el) => {
        e.stopPropagation()
    }
   
    const handleReadMessage = (el) => {
        navigate(`/auth/${user._id}/message/${el}`)
    }
    
    const handleFavorite = (e, num) => {
        console.log(e)
        e.stopPropagation()
        if (isFavoriteMessage.includes(num)) {
            setIsFavoriteMessage([...isFavoriteMessage.filter(el => el !== num)])
        } else {
            setIsFavoriteMessage([...isFavoriteMessage, num])
        }
    }

    return (
        <div className="user-message">
            <div className="user-message--wrap container">
                <div>
                    <h4 className="user-message__title">Мої повідомлення</h4>
                    
                    <div className="user-message__filter">
                        <div className="user-message__filter-select-wrap">
                            <div className="user-message__filter-select-all-btn" onClick={() => handleSelect('asd')}>
                                {
                                    !!isSelectMessage.length && isSelectMessage.includes('asd') && <div className="user-message__filter-select-all-btn-check"></div>
                                }
                            </div>
                            <img className="user-message__item-btn user-message__item-delete-btn" src={deleteImg} alt='img'/>
                        </div>

                        <div className="user-message__filter-sort-wrap">
                            <div className="user-message__filter-sort-title">Вибрати всі:</div>
                            <div className="user-message__filter-sort-btn-wrap">
                                <img className="user-message__filter-sort-btn" onClick={() => handleSort()} src={envelope} alt='img'/>
                            </div>
                            <div className="user-message__filter-sort-btn-wrap">
                                <img className="user-message__filter-sort-btn" src={envelopeOpen} alt='img'/>
                            </div>
                            <div className="user-message__filter-sort-btn-wrap">
                                <img className="user-message__filter-sort-btn" src={stars} alt='img'/>
                            </div>
                        </div>
                    </div>

                    <div className="user-message__items">
                        {
                            !!currentPaginationItems?.length && currentPaginationItems.map(el => (
                                <div className="user-message__item" key={el} onClick={() => handleReadMessage(el)}>
                                    <div className="user-message__item-select-btn" onClick={(e) => handleSelect(e, el)}>
                                        {
                                            !!isSelectMessage.length && isSelectMessage.includes(el) && <div className="user-message__item-select-btn-check"></div>
                                        }
                                    </div>

                                    <svg className={`user-message__item-stars ${isFavoriteMessage?.includes(el) ? 'user-message__item-stars-is-favorite' : ''}`} onClick={(e) => handleFavorite(e, el)} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 404.204 404.204" xmlSpace="preserve">
                                        <g>
                                            <g>
                                                <path d="M316.953,395.112c-3.35,0-6.706-1.033-9.567-3.106l-105.279-76.5L96.829,392.001
                                                    c-5.706,4.15-13.429,4.15-19.14,0c-5.706-4.145-8.088-11.487-5.912-18.199l40.211-123.771L6.709,173.546
                                                    c-5.706-4.15-8.088-11.493-5.912-18.199s8.425-11.243,15.48-11.243h130.135l40.211-123.771c2.176-6.706,8.431-11.243,15.48-11.243
                                                    c7.049,0,13.304,4.536,15.48,11.243l40.211,123.771h130.135c7.054,0,13.304,4.536,15.48,11.243s-0.207,14.049-5.912,18.199
                                                    l-105.268,76.49l40.211,123.771c2.176,6.706-0.207,14.049-5.912,18.199C323.676,394.078,320.314,395.112,316.953,395.112z
                                                    M202.107,279.118c3.356,0,6.717,1.033,9.567,3.106l74.33,53.999l-28.397-87.373c-2.176-6.706,0.207-14.049,5.912-18.199
                                                    l74.33-53.999h-91.877c-7.044,0-13.293-4.536-15.48-11.243l-28.386-87.384l-28.386,87.384c-2.187,6.706-8.441,11.243-15.48,11.243
                                                    H66.364l74.33,53.999c5.706,4.15,8.088,11.493,5.912,18.199l-28.392,87.373l74.33-53.999
                                                    C195.39,280.152,198.757,279.118,202.107,279.118z"/>
                                            </g>
                                        </g>
                                    </svg>

                                    <div className="user-message__item-name-wrap"><div className="user-message__item-name">Oleh Kobrynovych</div></div>
                                    <div className="user-message__item-text-wrap"><div className="user-message__item-text">Dnipro - мультикультурне об'єднання молодих людей, які змінюють світ кожного дня. Ми вивчаємо модні тенденції та аналізуємо маркет для того, щоб популяризувати культуру різних напрямів та стилів серед звичайних людей. Адже, мода не тільки на дахах дорогих ресторанів мегаполісів, але й в кожному передмісті.</div></div>
                                    <img className="user-message__item-btn" src={el == 2 ? envelope : envelopeOpen} alt='img'/>
                                    <img className="user-message__item-btn user-message__item-delete-btn" onClick={(e) => handleDeleteMessage(e, el)} src={deleteImg} alt='img'/>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <PaginationItems items={messages} setCurrentPaginationItems={setCurrentPaginationItems} pageRangeDisplayed={5} itemsPerPage={5}/>

            </div>
        </div>
    );
}

export default UserMessage;