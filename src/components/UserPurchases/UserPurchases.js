import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserPurchases.css';
import stars from './../../assets/images/stars.svg';
import deleteImg from './../../assets/images/deleteImg.svg';
import envelope from './../../assets/images/envelope.svg';
import envelopeOpen from './../../assets/images/envelopeOpen.svg';
import { useDispatch, useSelector } from 'react-redux';
import PaginationItems from '../PaginationItems/PaginationItems';
import { getPurchases, setFavoritePurchases } from '../../store/userSlice';
import ModalWindow from '../ModalWindow/ModalWindow';
import { toast } from 'react-toastify';
import CardSelect from '../SelectStatus/SelectStatus';
import SelectStatus from '../SelectStatus/SelectStatus';


function UserPurchases() {
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const purchases = useSelector(state => state.userSlice.purchases);
    const [filterPurchases, setFilterPurchases] = useState([]);
    const [sortPurchases, setSortPurchases] = useState('');
    const [currentPaginationItems, setCurrentPaginationItems] = useState([]);
    const [sortStatus, setSortStatus] = useState('all');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log('asdasd: ',sortStatus)

    useEffect(() => {
        if (purchases?.length) {
            setFilterPurchases([...purchases])  
        }
    }, [purchases])

    useEffect(() => {
        if (shop?._id) {
            fetch(`http://localhost:3000/api/purchases/${shop._id}/all?token=${user.token}`)
                .then(res => res.json())
                .then(res => {
                    console.log('GET UserPurchases:', res)
                    if (res.success && res.data?.length) {
                        dispatch(getPurchases(res.data));
                    } else {
                        console.log('GET UserPurchases:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }, [shop])

    const handleSortStatus = (status) => {       /// доробити сортування
        setSortStatus(status) 
        setSortPurchases('')
        if (status == 'all') {
            setFilterPurchases([...purchases])
        } else {
            setFilterPurchases([...purchases.filter(el => el.status == status)])
        }
    }
    
    const handleSortPurchases = (str) => {  
        if (sortPurchases == '' || sortPurchases !== str) {
            setSortPurchases(str)   
            if (str == 'isNotSeen') {
                setFilterPurchases([...filterPurchases.filter(el => el.isSeen == false)])
            } else if (str == 'isSeen') {
                setFilterPurchases([...filterPurchases.filter(el => el.isSeen == true)])
            } else if (str == 'favorite') {
                setFilterPurchases([...filterPurchases.filter(el => el.favorite == true)])
            }
        } else {
            setSortPurchases('')   
            if (sortStatus == 'InProcess') {
                setFilterPurchases([...purchases.filter(el => el.status == 'InProcess')])
            } else if (sortStatus == 'notDone') {
                setFilterPurchases([...purchases.filter(el => el.status == 'notDone')])
            } else if (sortStatus == 'done') {
                setFilterPurchases([...purchases.filter(el => el.status == 'done')])
            } else {
                setFilterPurchases([...purchases])
            }
        }
    }
   
    const handleReadPurchases = (id) => {
        navigate(`/auth/${user._id}/purchases/${id}`)
    }
    
    const handleFavorite = (purchases) => {
        let data = {
            ...purchases,
            token: user.token,
            favorite: !purchases.favorite,
        }

        fetch(`http://localhost:3000/api/purchases/${purchases._id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    // console.log('PUT CardSelect:', res)
                    dispatch(setFavoritePurchases({...purchases, favorite: !purchases.favorite}));
                } else {
                    console.log('PUT UserPurchases:', res)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    return (
        <div className="user-purchases">
            <div className="user-purchases--wrap container">
                <div>
                    <h4 className="user-purchases__title">Мої повідомлення</h4>
                    
                    <div className="user-purchases__filter">
                        
                        <div className="user-purchases__sort-status-wrap">
                            <span className="user-purchases__sort-status-title">Статус:</span>
                            <select onChange={(e) => handleSortStatus(e.target.value)} value={sortStatus}>
                                <option value='all'>Всі</option>
                                <option value='InProcess'>В процесі</option>
                                <option value='done'>Виконано</option>
                                <option value='notDone'>Відхилено</option>
                            </select>
                        </div>

                        <div className="user-purchases__filter-sort-wrap">
                            <div className="user-purchases__filter-sort-title">Вибрати всі:</div>
                            <div className={`user-purchases__filter-sort-btn-wrap ${sortPurchases === 'isNotSeen' ? 'user-purchases__filter-sort-btn-wrap--active' : ''}`}>
                                <img className="user-purchases__filter-sort-btn" onClick={() => handleSortPurchases('isNotSeen')} src={envelope} alt='img'/>
                            </div>
                            <div className={`user-purchases__filter-sort-btn-wrap ${sortPurchases === 'isSeen' ? 'user-purchases__filter-sort-btn-wrap--active' : ''}`}>
                                <img className="user-purchases__filter-sort-btn" onClick={() => handleSortPurchases('isSeen')} src={envelopeOpen} alt='img'/>
                            </div>
                            <div className={`user-purchases__filter-sort-btn-wrap ${sortPurchases === 'favorite' ? 'user-purchases__filter-sort-btn-wrap--active' : ''}`}>
                                <img className="user-purchases__filter-sort-btn" onClick={() => handleSortPurchases('favorite')} src={stars} alt='img'/>
                            </div>
                        </div>
                    </div>

                    <div className="user-purchases__items">
                        {
                            !!currentPaginationItems?.length ? currentPaginationItems.map(el => (
                                <div className={`user-purchases__item user-purchases__item-status--${el.status}`} key={el._id}>
                                    <svg className={`user-purchases__item-stars ${el.favorite ? 'user-purchases__item-stars-is-favorite' : ''}`} onClick={() => handleFavorite(el)} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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

                                    <div className="user-purchases__item-name-wrap" onClick={() => handleReadPurchases(el._id)}><div className="user-purchases__item-name">{el.full_name}</div></div>
                                    <div className="user-purchases__item-text-wrap" onClick={() => handleReadPurchases(el._id)}><div className="user-purchases__item-text">{el.comment}</div></div>

                                    <span>Статус</span>
                                    <SelectStatus purchases={el} status={el.status}/>

                                    <img className="user-purchases__item-seen" src={el.isSeen ? envelopeOpen : envelope} alt='img'/>
                                </div>
                            )) : <div className="user-purchases__error-text">Список повідомлень пустий</div>
                        }
                    </div>
                </div>

                <PaginationItems items={filterPurchases} setCurrentPaginationItems={setCurrentPaginationItems} pageRangeDisplayed={5} itemsPerPage={9}/>

            </div>
        </div>
    );
}

export default UserPurchases;