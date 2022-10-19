import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UserMessage.css';
import stars from './../../assets/images/stars.svg';
import deleteImg from './../../assets/images/deleteImg.svg';
import envelope from './../../assets/images/envelope.svg';
import envelopeOpen from './../../assets/images/envelopeOpen.svg';
import { useDispatch, useSelector } from 'react-redux';
import PaginationItems from '../PaginationItems/PaginationItems';
import { getPurchases } from '../../store/userSlice';
import ModalWindow from '../ModalWindow/ModalWindow';
import { toast } from 'react-toastify';


function UserMessage() {
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    // const purchases = useSelector(state => state.userSlice.purchases);
    // const isNeedCreateShop = useSelector(state => state.userSlice.isNeedCreateShop);
    // const isNeedUpdateShop = useSelector(state => state.userSlice.isNeedUpdateShop);
    // const [messages, setMessages] = useState([1,2,3,4,5,6,7]);
    const [isModalDelMessage, setIsModalDelMessage] = useState(false);
    const [isSelectMessageAll, setIsSelectMessageAll] = useState(false);
    const [isSelectMessage, setIsSelectMessage] = useState([]);
    const [isFavoriteMessage, setIsFavoriteMessage] = useState([]);
    const [currentPaginationItems, setCurrentPaginationItems] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [purchases, setPurchases] = useState([{
        _id: 1,
        full_name: 'Oleh Kobrynovych',
        email: 'asd@asd.asd',
        delivery_method: 'NP',
        delivery_address: 'asdsd ads afaffs s',
        phone: '123324545484',
        comment: '4dfsdf  55sd4f  dsf445df f ds',
        product_id: '123222222233',
        isSeen: false,
        status: 'В процесі',
        token: user.token,
    }]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log('asdasd: ',isSelectMessage)


    // useEffect(() => {
    //     let data = {
    //         full_name: 'Oleh Kobrynovych',
    //         email: 'asd@asd.asd',
    //         delivery_method: 'NP',
    //         delivery_address: 'asdsd ads afaffs s',
    //         phone: '123324545484',
    //         comment: '4dfsdf  55sd4f  dsf445df f ds',
    //         product_id: '123222222233',
    //         isSeen: false,
    //         status: 'В процесі',
    //         token: user.token,
    //     }

    //     fetch(`http://localhost:3000/api/purchases/`, {
    //         method: 'POST',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             console.log(res)
    //             if (res.success && res.data?.length) {
    //                 console.log('GET UserMessage:', res)
    //             } else {
    //                 console.log('GET UserMessage:', res)
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         })
    // }, [])

    useEffect(() => {
        if (user?.name) {
            fetch(`http://localhost:3000/api/purchases/${shop._id}/all?token=${user.token}`)
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data?.length) {
                        dispatch(getPurchases(res.data));
                    } else {
                        console.log('GET UserMessage:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }, [user])

    useEffect(() => {
        if (isSelectMessageAll) {
        setIsSelectMessage([...currentPaginationItems.map(el => el._id)])
        } else {
            setIsSelectMessage([])
        }
    }, [isSelectMessageAll])

    const handleSelect = (e, id) => {
        e.stopPropagation()
        if (isSelectMessage.includes(id)) {
            setIsSelectMessage([...isSelectMessage.filter(el => el !== id)])
        } else {
            setIsSelectMessage([...isSelectMessage, id])
        }
    }

    const handleSort = () => {
        
    }
    
    const handleDeleteMessage = (e, id) => {
        e.stopPropagation()
        setIsModalDelMessage(true)
        setDeleteId(id)
    }

    const handleIsDeleteMessage = (boolean) => {
        if (boolean) {
            const data = {
                token: user.token,
            }

            fetch(`http://localhost:3000/api/purchases/${deleteId}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        // console.log('del', res)
                        // dispatch(setRemoveSubCategory(deleteId))
                        toast.success('Повідомлення видалено', {
                            position: "bottom-right",
                            autoClose: 2500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        })
                    } else {
                        console.log('DELETE UserMessage', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    toast.error('Сталася помилка', {
                        position: "bottom-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                })
        } 
        
        setIsModalDelMessage(false)
        setDeleteId(null)
    }
   
    const handleReadMessage = (id) => {
        navigate(`/auth/${user._id}/message/${id}`)
    }
    
    const handleFavorite = (e, num) => {
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

                {
                    isModalDelMessage && <ModalWindow title={'Ви впевнені?'}  text={'Видалити дане повідомлення'} handleClick={handleIsDeleteMessage}/>
                }

                <div>
                    <h4 className="user-message__title">Мої повідомлення</h4>
                    
                    <div className="user-message__filter">
                        <div className="user-message__filter-select-wrap">
                            <div className="user-message__filter-select-all-btn" onClick={() => setIsSelectMessageAll(!isSelectMessageAll)}>
                                {
                                    isSelectMessageAll && <div className="user-message__filter-select-all-btn-check"></div>
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
                            !!currentPaginationItems?.length ? currentPaginationItems.map(el => (
                                <div className="user-message__item" key={el._id} onClick={() => handleReadMessage(el._id)}>
                                    <div className="user-message__item-select-btn" onClick={(e) => handleSelect(e, el._id)}>
                                        {
                                            !!isSelectMessage?.length && isSelectMessage.includes(el._id) && <div className="user-message__item-select-btn-check"></div>
                                        }
                                    </div>

                                    <svg className={`user-message__item-stars ${isFavoriteMessage?.includes(el._id) ? 'user-message__item-stars-is-favorite' : ''}`} onClick={(e) => handleFavorite(e, el._id)} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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

                                    <div className="user-message__item-name-wrap"><div className="user-message__item-name">{el.full_name}</div></div>
                                    <div className="user-message__item-text-wrap"><div className="user-message__item-text">{el.comment}</div></div>
                                    <img className="user-message__item-btn" src={el.isSeen ? envelopeOpen : envelope} alt='img'/>
                                    <img className="user-message__item-btn user-message__item-delete-btn" onClick={(e) => handleDeleteMessage(e, el._id)} src={deleteImg} alt='img'/>
                                </div>
                            )) : <div className="user-message__error-text">Список повідомлень пустий</div>
                        }
                    </div>
                </div>

                <PaginationItems items={purchases} setCurrentPaginationItems={setCurrentPaginationItems} pageRangeDisplayed={5} itemsPerPage={5}/>

            </div>
        </div>
    );
}

export default UserMessage;