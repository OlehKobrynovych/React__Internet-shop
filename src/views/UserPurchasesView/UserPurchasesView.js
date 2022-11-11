import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserPurchasesView.css';
import stars from './../../assets/images/stars.svg';
import envelope from './../../assets/images/envelope.svg';
import envelopeOpen from './../../assets/images/envelopeOpen.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchases, setFavoritePurchases } from '../../store/userSlice';
import SelectStatus from '../../components/SelectStatus/SelectStatus';
import PaginationItems from '../../components/PaginationItems/PaginationItems';

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 


function UserPurchasesView() {
    const selectedLanguage = useSelector(state => state.userSlice.selectedLanguage);
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const purchases = useSelector(state => state.userSlice.purchases);
    const [filterPurchases, setFilterPurchases] = useState([]);
    const [sortPurchases, setSortPurchases] = useState('');
    const [currentPaginationItems, setCurrentPaginationItems] = useState([]);
    const [sortStatus, setSortStatus] = useState('all');
    const [selectedPaget, setSelectedPaget] = useState('0');
    const [quantityAllProducts, setQuantityAllProducts] = useState('');
    const [startDate, setStartDate] = useState('');
    // const [endDate, setEndDate] = useState('');
    const [isSelectDate, setIsSelectDate] = useState(false);
    const [isSortByDate, setIsSortByDate] = useState(false);
    const [stateDate, setStateDate] = useState([
        {
          startDate: null,
        //   endDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]);

    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // console.log('asdasd: ',purchases)
    // console.log('asdasd: ',new Date(stateDate[0].startDate))
    // console.log('asdasd: ',new Date(stateDate[0].startDate).getTime())


    useEffect(() => {
        setFilterPurchases([...purchases])  
    }, [purchases])

    useEffect(() => {
        if (shop?._id) {
            // fetch(`${process.env.REACT_APP_BASE_URL}/purchases/${shop._id}/number/all?token=${user.token}&min_date=${stateDate[0].startDate ? new Date(stateDate[0].startDate).getTime() : ''}&max_date=${stateDate[0].endDate ? new Date(stateDate[0].endDate).getTime() : ''}`)
            fetch(`${process.env.REACT_APP_BASE_URL}/purchases/${shop._id}/number/all?token=${user.token}&min_date=${stateDate[0].startDate ? stateDate[0].startDate : ''}&max_date=${stateDate[0].endDate ? stateDate[0].endDate : ''}`)
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        setQuantityAllProducts(res.data)
                    } else {
                        console.log('GET UserProduct:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })

            // fetch(`${process.env.REACT_APP_BASE_URL}/purchases/${shop._id}/all?page=${selectedPaget}&token=${user.token}&min_date=${stateDate[0].startDate ? new Date(stateDate[0].startDate).getTime() : ''}&max_date=${stateDate[0].endDate ? new Date(stateDate[0].endDate).getTime() : ''}`)
            fetch(`${process.env.REACT_APP_BASE_URL}/purchases/${shop._id}/all?page=${selectedPaget}&token=${user.token}&min_date=${stateDate[0].startDate ? stateDate[0].startDate : ''}&max_date=${stateDate[0].endDate ? stateDate[0].endDate : ''}`)
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        dispatch(getPurchases(res.data));
                    } else {
                        console.log('GET UserPurchases:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }, [shop, selectedPaget, isSortByDate])

    const handleSortStatus = (status) => {     
        setSortStatus(status) 
        setSortPurchases('')
        if (status == 'all') {
            setFilterPurchases([...purchases])
        } else {
            setFilterPurchases([...purchases.filter(el => el.status == status)])
        }
    }
    
    const handleSortPurchases = (str) => { 
        if (sortPurchases == '') {
            if (str == 'isNotSeen') {
                setFilterPurchases([...filterPurchases.filter(el => el.isSeen == false)])
            } else if (str == 'isSeen') {
                setFilterPurchases([...filterPurchases.filter(el => el.isSeen == true)])
            } else if (str == 'favorite') {
                setFilterPurchases([...filterPurchases.filter(el => el.favorite == true)])
            }
            setSortPurchases(str)   
        } else if (sortPurchases == str) {
            if (sortStatus == 'all') {
                setFilterPurchases([...purchases])
            } else {
                setFilterPurchases([...purchases.filter(el => el.status == sortStatus)])
            }
            setSortPurchases('') 
        } else {
            if (sortStatus == 'all') {
                if (str == 'isNotSeen') {
                    setFilterPurchases([...purchases.filter(el => el.isSeen == false)])
                } else if (str == 'isSeen') {
                    setFilterPurchases([...purchases.filter(el => el.isSeen == true)])
                } else if (str == 'favorite') {
                    setFilterPurchases([...purchases.filter(el => el.favorite == true)])
                }
            } else {
                let res = purchases.filter(el => el.status == sortStatus)
                if (str == 'isNotSeen') {
                    setFilterPurchases([...res.filter(el => el.isSeen == false)])
                } else if (str == 'isSeen') {
                    setFilterPurchases([...res.filter(el => el.isSeen == true)])
                } else if (str == 'favorite') {
                    setFilterPurchases([...res.filter(el => el.favorite == true)])
                }
            }
            setSortPurchases(str)   
        }
    }
   
    const handleReadPurchases = (id) => {
        navigate(`/auth/${user._id}/purchases/${id}`)
    }
   
    const handleClick = (e) => {
        e.stopPropagation()
    }

    const handleFavorite = (e, purchases) => {
        e.stopPropagation()
        let data = {
            ...purchases,
            token: user.token,
            favorite: !purchases.favorite,
        }

        fetch(`${process.env.REACT_APP_BASE_URL}/purchases/${purchases._id}`, {
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

    const handleSortDate = () => {
        if (stateDate[0].startDate) {
            setIsSelectDate(false)
            setIsSortByDate(!isSortByDate)
        }
    }
   
    const handleSortCleanDate = () => {
        setIsSelectDate(false)
        if (stateDate[0].startDate !== null) {
            setIsSortByDate(!isSortByDate)
            setStateDate([{
                startDate: null,
                endDate: null,
                key: 'selection'
              }])
        }
    }

    return (
        <div className="user-purchases">
            <div className="user-purchases--wrap container">
                <div>
                    <h4 className="user-purchases__title">{selectedLanguage?.userPurchases?.userPurchasesTitle}</h4>
                    
                    <div className="user-purchases__filter">
                        
                        <div className="user-purchases__sort-status-wrap">
                            <span className="user-purchases__sort-status-title">{selectedLanguage?.userPurchases?.userPurchasesSortTitle}</span>
                            <select onChange={(e) => handleSortStatus(e.target.value)} value={sortStatus}>
                                <option value='all'>{selectedLanguage?.userPurchases?.userPurchasesSortOption1}</option>
                                <option value='InProcess'>{selectedLanguage?.userPurchases?.userPurchasesSortOption2}</option>
                                <option value='done'>{selectedLanguage?.userPurchases?.userPurchasesSortOption3}</option>
                                <option value='notDone'>{selectedLanguage?.userPurchases?.userPurchasesSortOption4}</option>
                            </select>
                        </div>

                        <div className="user-purchases__filter-sort-wrap">
                            <div className="user-purchases__filter-sort-title">{selectedLanguage?.userPurchases?.userPurchasesFilterTitle}</div>
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

                        <div className="user-purchases__filter-date-wrap">
                            <div className='user-purchases__filter-date-btn-wrap'>
                                <button className='user-purchases__filter-date-btn' onClick={handleSortCleanDate}>Очистити</button>
                                <button className='user-purchases__filter-date-btn' onClick={handleSortDate}>Сортувати</button>
                            </div>
                            <div className='user-purchases__filter-date' onClick={() => setIsSelectDate(!isSelectDate)}>
                                <div className='user-purchases__filter-date-title'>Вибрати дні:&nbsp;</div>
                                <div className='user-purchases__filter-date-select'>
                                    <div>{stateDate[0]?.startDate ? new Date(stateDate[0]?.startDate).toLocaleString().split(',')[0] : 'дд.мм.рррр'}</div>
                                    <div>{stateDate[0]?.endDate ? new Date(stateDate[0]?.endDate).toLocaleString().split(',')[0] : 'дд.мм.рррр'}</div>
                                </div>
                            </div>
                            <DateRange
                                className={`user-purchases__filter-date-drop ${isSelectDate ? 'user-purchases__filter-date-drop-active' : ''}`}
                                editableDateInputs={true}
                                onChange={item => setStateDate([item.selection])}
                                moveRangeOnFirstSelection={false}
                                ranges={stateDate}
                            />
                        </div>
                    </div>

                    <div className="user-purchases__items">
                        {
                            !!filterPurchases?.length ? filterPurchases.map(el => (
                                <div className={`user-purchases__item user-purchases__item-status--${el.status}`} key={el._id} onClick={() => handleReadPurchases(el._id)}>
                                    <svg className={`user-purchases__item-stars ${el.favorite ? 'user-purchases__item-stars-is-favorite' : ''}`} onClick={(e) => handleFavorite(e, el)} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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

                                    <div onClick={(e) => handleClick(e)} className="user-purchases__item-status-wrap">
                                        <span>{selectedLanguage?.userPurchases?.userPurchasesStatusTitle}</span>
                                        <SelectStatus purchases={el} status={el.status}/>
                                    </div>

                                    <img className="user-purchases__item-seen" src={el.isSeen ? envelopeOpen : envelope} alt='img'/>
                                </div>
                            )) : <div className="user-purchases__error-text">{selectedLanguage?.userPurchases?.userPurchasesErrorText}</div>
                        }
                    </div>
                </div>

                <PaginationItems selectedPaget={selectedPaget} setSelectedPaget={setSelectedPaget} pageRangeDisplayed={5} itemsPerPage={10} quantityAllProducts={quantityAllProducts}/>

            </div>
        </div>
    );
}

export default UserPurchasesView;