import { useEffect, useState } from 'react';
import './UserNotifications.css';


import { useNavigate, useParams } from 'react-router-dom';
import stars from './../../assets/images/stars.svg';
import envelope from './../../assets/images/envelope.svg';
import envelopeOpen from './../../assets/images/envelopeOpen.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchases, setFavoritePurchases, getNotifications, setFavoriteNotifications } from '../../store/userSlice';
import SelectStatus from '../SelectStatus/SelectStatus';
import PaginationItems from '../PaginationItems/PaginationItems';


function UserNotifications() {
    const selectedLanguage = useSelector(state => state.userSlice.selectedLanguage);
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    // const purchases = useSelector(state => state.userSlice.purchases);
    const notifications = useSelector(state => state.userSlice.notifications);
    const [filterNotifications, setFilterNotifications] = useState([]);
    const [sortNotifications, setSortNotifications] = useState('');
    const [currentPaginationItems, setCurrentPaginationItems] = useState([]);
    const [sortStatus, setSortStatus] = useState('all');
    const [selectedPaget, setSelectedPaget] = useState('0');
    const [quantityAllProducts, setQuantityAllProducts] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log('asdasd: ',notifications)

    
    useEffect(() => {
        if (shop?._id) {
            fetch(`${process.env.REACT_APP_BASE_URL}/notifications/${shop._id}/number/all?token=${user.token}`)
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        console.log(res)
                        setQuantityAllProducts(res.data)
                    } else {
                        console.log('GET UserProduct:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })

            fetch(`${process.env.REACT_APP_BASE_URL}/notifications/${shop._id}/all?token=${user.token}`)
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data?.length) {
                        dispatch(getNotifications(res.data));
                    } else {
                        console.log('GET UserNotifications:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }, [shop])

    useEffect(() => {
        if (notifications?.length) {
            setFilterNotifications([...notifications])  
        }
    }, [notifications])

    const handleSortStatus = (status) => {     
        setSortStatus(status) 
        setSortNotifications('')
        if (status == 'all') {
            setFilterNotifications([...notifications])
        } else {
            setFilterNotifications([...notifications.filter(el => el.status == status)])
        }
    }
    
    const handlesortNotifications = (str) => { 
        if (sortNotifications == '') {
            if (str == 'isNotSeen') {
                setFilterNotifications([...filterNotifications.filter(el => el.isSeen == false)])
            } else if (str == 'isSeen') {
                setFilterNotifications([...filterNotifications.filter(el => el.isSeen == true)])
            } else if (str == 'favorite') {
                setFilterNotifications([...filterNotifications.filter(el => el.favorite == true)])
            }
            setSortNotifications(str)   
        } else if (sortNotifications == str) {
            if (sortStatus == 'all') {
                setFilterNotifications([...notifications])
            } else {
                setFilterNotifications([...notifications.filter(el => el.status == sortStatus)])
            }
            setSortNotifications('') 
        } else {
            if (sortStatus == 'all') {
                if (str == 'isNotSeen') {
                    setFilterNotifications([...notifications.filter(el => el.isSeen == false)])
                } else if (str == 'isSeen') {
                    setFilterNotifications([...notifications.filter(el => el.isSeen == true)])
                } else if (str == 'favorite') {
                    setFilterNotifications([...notifications.filter(el => el.favorite == true)])
                }
            } else {
                let res = notifications.filter(el => el.status == sortStatus)
                if (str == 'isNotSeen') {
                    setFilterNotifications([...res.filter(el => el.isSeen == false)])
                } else if (str == 'isSeen') {
                    setFilterNotifications([...res.filter(el => el.isSeen == true)])
                } else if (str == 'favorite') {
                    setFilterNotifications([...res.filter(el => el.favorite == true)])
                }
            }
            setSortNotifications(str)   
        }
    }
   
    const handleReadNotifications = (id) => {
        navigate(`/auth/${user._id}/notifications/${id}`)
    }

    const handleFavorite = (e, notifications) => {
        e.stopPropagation()
        let data = {
            ...notifications,
            token: user.token,
            favorite: !notifications.favorite,
        }

        fetch(`${process.env.REACT_APP_BASE_URL}/notifications/${notifications._id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    console.log('PUT CardSelect:', res)
                    dispatch(setFavoriteNotifications({...notifications, favorite: !notifications.favorite}));
                } else {
                    console.log('PUT UserNotifications:', res)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    return (
        <div className="user-notifications">
            <div className="user-notifications--wrap container">
                <div>
                    <h4 className="user-notifications__title">Мої повідомлення</h4>
                    
                    <div className="user-notifications__filter">
                        
                        <div className="user-notifications__sort-status-wrap">
                            <span className="user-notifications__sort-status-title">Статус:</span>
                            <select onChange={(e) => handleSortStatus(e.target.value)} value={sortStatus}>
                                <option value='all'>Всі</option>
                                <option value='callBack'>Передзвонити</option>
                                <option value='subscription'>Підписки</option>
                            </select>
                        </div>

                        <div className="user-notifications__filter-sort-wrap">
                            <div className="user-notifications__filter-sort-title">Вибрати всі:</div>
                            <div className={`user-notifications__filter-sort-btn-wrap ${sortNotifications === 'isNotSeen' ? 'user-notifications__filter-sort-btn-wrap--active' : ''}`}>
                                <img className="user-notifications__filter-sort-btn" onClick={() => handlesortNotifications('isNotSeen')} src={envelope} alt='img'/>
                            </div>
                            <div className={`user-notifications__filter-sort-btn-wrap ${sortNotifications === 'isSeen' ? 'user-notifications__filter-sort-btn-wrap--active' : ''}`}>
                                <img className="user-notifications__filter-sort-btn" onClick={() => handlesortNotifications('isSeen')} src={envelopeOpen} alt='img'/>
                            </div>
                            <div className={`user-notifications__filter-sort-btn-wrap ${sortNotifications === 'favorite' ? 'user-notifications__filter-sort-btn-wrap--active' : ''}`}>
                                <img className="user-notifications__filter-sort-btn" onClick={() => handlesortNotifications('favorite')} src={stars} alt='img'/>
                            </div>
                        </div>
                    </div>

                    <div className="user-notifications__items">
                        {
                            !!filterNotifications?.length ? filterNotifications.map(el => (
                                <div className={`user-notifications__item user-notifications__item-status--${el.status}`} key={el._id} onClick={() => handleReadNotifications(el._id)}>
                                    <svg className={`user-notifications__item-stars ${el.favorite ? 'user-notifications__item-stars-is-favorite' : ''}`} onClick={(e) => handleFavorite(e, el)} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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

                                    <div className="user-notifications__item-name-wrap" onClick={() => handleReadNotifications(el._id)}><div className="user-notifications__item-name">{el.status == 'callBack' ? 'Передзвонити' : 'Підписка' }</div></div>
                                    <div className="user-notifications__item-text-wrap" onClick={() => handleReadNotifications(el._id)}><div className="user-notifications__item-text">{el.comment}</div></div>

                                    <img className="user-notifications__item-seen" src={el.isSeen ? envelopeOpen : envelope} alt='img'/>
                                </div>
                            )) : <div className="user-notifications__error-text">{selectedLanguage?.userPurchases?.userPurchasesErrorText}</div>
                        }
                    </div>
                </div>

                <PaginationItems selectedPaget={selectedPaget} setSelectedPaget={setSelectedPaget} pageRangeDisplayed={5} itemsPerPage={10} quantityAllProducts={quantityAllProducts}/>

            </div>
        </div>
    );
}

export default UserNotifications;