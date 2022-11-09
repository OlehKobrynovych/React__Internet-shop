import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ReadPurchasesView.css';
import noPhotos from './../../assets/images/noPhotos.svg';
import editIcon from './../../assets/images/editIcon.svg';
import deleteImg from './../../assets/images/deleteImg.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setSeenPurchases, setStatusPurchases } from '../../store/userSlice';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper';
import { toast } from 'react-toastify';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import InputText from '../../components/InputText/InputText';
import PurchasesEditeArr from '../../components/PurchasesEditeArr/PurchasesEditeArr';
import InputTextarea from '../../components/InputTextarea/InputTextarea';
import InputNumber from '../../components/InputNumber/InputNumber';


function ReadPurchasesView () {
    const selectedLanguage = useSelector(state => state.userSlice.selectedLanguage);
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const purchases = useSelector(state => state.userSlice.purchases);
    let { idPurchases } = useParams();
    const [status, setStatus] = useState('');
    const [purchaseContent, setPurchaseContent] = useState({});
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [editProduct, setEditProduct] = useState({});
    const [newSize, setNewSize] = useState([]);
    const [newColors, setNewColors] = useState([]);
    const [newCount, setNewCount] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [isModalDelProduct, setIsModalDelProduct] = useState(false);
    const [isModalEditProductCount, setIsModalEditProductCount] = useState(false);
    const [isModalEditProductSize, setIsModalEditProductSize] = useState(false);
    const [isModalEditProductColors, setIsModalEditProductColors] = useState(false);
    const [newNote, setNewNote] = useState('');
    const dispatch = useDispatch();
    console.log('purchases: ', purchaseContent)
    
    useEffect(() => {
        if (user?._id) {
            fetch(`${process.env.REACT_APP_BASE_URL}/purchases/${idPurchases}?token=${user.token}`)
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        setPurchaseContent(res.data)
                        setIsSeen(res.data)

                        if (!orderedProducts?.length) {
                            getOrderedProducts(res.data)
                        }

                        if (res.data?._id) {
                            if (!status?.length) {
                                setStatus(res.data.status)
                            }
                        }
                        // dispatch(getPurchases(res.data));
                    } else {
                        console.log('GET ReadPurchasesView:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }, [user])

    const setIsSeen = (purchaseContent2) => {
        let data = {
            ...purchaseContent2,
            token: user.token,
            isSeen: true,
        }

        fetch(`${process.env.REACT_APP_BASE_URL}/purchases/${purchaseContent2._id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    dispatch(setSeenPurchases({...purchaseContent2, isSeen: true}));
                } else {
                    console.log('PUT ReadPurchasesView:', res)
                }
            })
            .catch((error) => {
            })
    }

    const getOrderedProducts = (data) => {
        if (data.product_ids?.length) {
            // setOrderedProducts([])
            data?.product_ids?.map(el => {
                fetch(`${process.env.REACT_APP_BASE_URL}/products/${el._id}`)
                    .then(res => res.json())
                    .then(res => {
                        if (res.success && res.data?._id) {
                            setOrderedProducts((orderedProducts) => [...orderedProducts, {...res.data, count: el.count}])
                        } else {
                            console.log('GET ReadPurchasesView:', res)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
            })
        }
    }

    useEffect(() => {
        if (orderedProducts?.length) {
            let res = orderedProducts.reduce((acc, el) => {
               acc += (el.new_price == '0' ? el.price * el.count : el.new_price * el.count)
               return acc
            }, 0)
            setTotalPrice(res)
        }
    }, [orderedProducts])

    const handleChangeStatus = (str) => {
        setStatus(str)

        let data = {
            ...purchaseContent,
            token: user.token,
            status: str,
        }

        fetch(`${process.env.REACT_APP_BASE_URL}/purchases/${purchaseContent._id}`, {
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
                    dispatch(setStatusPurchases({...purchaseContent, status: str}));
                    setPurchaseContent({...purchaseContent, status: str})
                    showMessage('success', 'Дані оновлено')
                } else {
                    console.log('PUT CardSelect:', res)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                showMessage('error', 'Сталася помилка')
            })
    }

    const handleEditProductColors = (obj) => {
        setIsModalEditProductColors(true)
        setEditProduct(obj)
    } 

    const handleEditProductSize = (obj) => {
        setIsModalEditProductSize(true)
        setEditProduct(obj)
    } 

    const handleEditProductCount = (obj) => {
        setIsModalEditProductCount(true)
        setEditProduct(obj)
    } 

    const handleDeleteProduct = (id) => {
        setIsModalDelProduct(true)
        setEditProduct(id)
    } 
   
    const handleIsEditProductColors = (boolean) => {
        if (boolean) {
            const data = {
                ...purchaseContent,
                product_ids: purchaseContent.product_ids.map(el => {
                    if (el._id == editProduct._id) {
                        el.selectColors = [...newColors]
                    }
                    return el
                }),
                token: user.token,
            }
            sendEdite(data)
        } 
        setIsModalEditProductColors(false)
        setEditProduct({})
    }

    const handleIsEditProductSize = (boolean) => {
        if (boolean) {
            const data = {
                ...purchaseContent,
                product_ids: purchaseContent.product_ids.map(el => {
                    if (el._id == editProduct._id) {
                        el.selectSizes = [...newSize]
                    }
                    return el
                }),
                token: user.token,
            }
            sendEdite(data)
        } 
        setIsModalEditProductSize(false)
        setEditProduct({})
    }

    const handleIsEditProductCount = (boolean) => {
        if (boolean) {
            const data = {
                ...purchaseContent,
                product_ids: purchaseContent.product_ids.map(el => {
                    if (el._id == editProduct._id) {
                        el.count = newCount
                    }
                    return el
                }),
                token: user.token,
            }
            sendEdite(data)
            setOrderedProducts([...orderedProducts.map(el => {
                if (el._id == editProduct._id) {
                    el.count = newCount
                }
                return el
            })])
        } 
        setIsModalEditProductCount(false)
        setEditProduct({})
    }

    const handleIsDeleteProduct = (boolean) => {
        if (boolean) {
            const data = {
                ...purchaseContent,
                product_ids: purchaseContent.product_ids.map(el => {
                    if (el._id == editProduct._id) {
                        el.removed = !el.removed
                    }
                    return el
                }),
                token: user.token,
            }
            sendEdite(data)
        } 
        setIsModalDelProduct(false)
        setEditProduct({})
    }

    const sendEdite = (data) => {
        fetch(`${process.env.REACT_APP_BASE_URL}/purchases/${purchaseContent._id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    console.log('PUT ReadPurchasesView:', res)
                    // dispatch(setStatusPurchases({...purchaseContent, status: str}));
                    setPurchaseContent(data)
                    // getOrderedProducts(data)
                    showMessage('success', 'Дані оновлено')
                } else {
                    console.log('PUT ReadPurchasesView:', res)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                showMessage('error', 'Сталася помилка')
            })
    } 

    const selectedOrders = (id) => {
      return purchaseContent?.product_ids?.filter(ell => ell._id == id)[0]
    }
    
    const handleAddNone = () => {
        if (newNote?.length) {
            const data = {
                ...purchaseContent,
                notes: [...purchaseContent.notes, {_id: new Date().toString(), note: newNote}],
                token: user.token,
            }
            sendEdite(data)
        } 
        setNewNote('')
    }
 
    const handleDeleteNone = (id) => {
        const data = {
            ...purchaseContent,
            notes: [...purchaseContent.notes.filter(el => el._id !== id)],
            token: user.token,
        }
        sendEdite(data)
    }
    
    const showMessage = (event, message) => {
        if (event == "success") {
            toast.success(message, {
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
            toast.error(message, {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div className={`read-purchases read-purchases__item-status--${status}`}>

            {
                isModalDelProduct && <ModalWindow title={selectedLanguage?.readPurchasesView?.readPurchasesModDelTitle} text={purchaseContent?.product_ids.filter(ell => ell._id == editProduct._id)[0].removed ? selectedLanguage?.readPurchasesView?.readPurchasesModDelText1 : selectedLanguage?.readPurchasesView?.readPurchasesModDelText2} handleClick={handleIsDeleteProduct}/>
            }

            {
                isModalEditProductCount && <ModalWindow title={selectedLanguage?.readPurchasesView?.readPurchasesModEditTitle} text={selectedLanguage?.readPurchasesView?.readPurchasesModEditText} handleClick={handleIsEditProductCount} leftBtn={selectedLanguage?.readPurchasesView?.readPurchasesModEditLeftBtn} rightBtn={selectedLanguage?.readPurchasesView?.readPurchasesModEditRightBtn}>
                                            <InputNumber label={''} id={"readPurchasesnewCount"} name={"readPurchasesnewCount"} value={newCount} setValue={setNewCount} min={'1'}/>
                                          </ ModalWindow>
            }
           
            {
                isModalEditProductSize && <ModalWindow title={selectedLanguage?.readPurchasesView?.readPurchasesModEditTitle} text={selectedLanguage?.readPurchasesView?.readPurchasesModEditText} handleClick={handleIsEditProductSize} leftBtn={selectedLanguage?.readPurchasesView?.readPurchasesModEditLeftBtn} rightBtn={selectedLanguage?.readPurchasesView?.readPurchasesModEditRightBtn}>
                                            <PurchasesEditeArr handleChange={setNewSize} purchaseArr={selectedOrders(editProduct._id)?.selectSizes}/>
                                          </ ModalWindow>
            }
           
            {
                isModalEditProductColors && <ModalWindow title={selectedLanguage?.readPurchasesView?.readPurchasesModEditTitle} text={selectedLanguage?.readPurchasesView?.readPurchasesModEditText} handleClick={handleIsEditProductColors} leftBtn={selectedLanguage?.readPurchasesView?.readPurchasesModEditLeftBtn} rightBtn={selectedLanguage?.readPurchasesView?.readPurchasesModEditRightBtn}>
                                            <PurchasesEditeArr handleChange={setNewColors} purchaseArr={selectedOrders(editProduct._id)?.selectColors}/>
                                          </ ModalWindow>
            }

            <div className="read-purchases--wrap container">
                <div className="read-purchases__status-wrap">
                    <div className="read-purchases__status-number">
                        <b>{selectedLanguage?.readPurchasesView?.readPurchasesOrderTitle}</b>&nbsp;{purchaseContent?._id}
                    </div>
                    <div className="read-purchases__status">
                        <span className="read-purchases__status-title">{selectedLanguage?.readPurchasesView?.readPurchasesStatusTitle}</span>
                        <select onChange={(e) => handleChangeStatus(e.target.value)} value={status}>
                            <option value='InProcess'>{selectedLanguage?.readPurchasesView?.readPurchasesStatusOption1}</option>
                            <option value='done'>{selectedLanguage?.readPurchasesView?.readPurchasesStatusOption2}</option>
                            <option value='notDone'>{selectedLanguage?.readPurchasesView?.readPurchasesStatusOption3}</option>
                        </select>
                    </div>
                </div>
                <div className="read-purchases__info"><b>{selectedLanguage?.readPurchasesView?.readPurchasesInfoNameTitle}</b>&nbsp;{purchaseContent?.full_name}</div>
                <div className="read-purchases__info"><b>{selectedLanguage?.readPurchasesView?.readPurchasesInfoTelTitle}</b>&nbsp;{purchaseContent?.phone}</div>
                <div className="read-purchases__info"><b>{selectedLanguage?.readPurchasesView?.readPurchasesInfoEmailTitle}</b>&nbsp;{purchaseContent?.email}</div>
                <div className="read-purchases__info"><b>{selectedLanguage?.readPurchasesView?.readPurchasesInfoAddressTitle}</b>&nbsp;{purchaseContent?.delivery_address}</div>
                <div className="read-purchases__info"><b>{selectedLanguage?.readPurchasesView?.readPurchasesInfoDeliveryTitle}</b>&nbsp;{purchaseContent?.delivery_method}</div>
                <div className="read-purchases__info"><b>{selectedLanguage?.readPurchasesView?.readPurchasesInfoPaymentTitle}</b>&nbsp;{purchaseContent?.payment_method}</div>
                <div className="read-purchases__info"><b>{selectedLanguage?.readPurchasesView?.readPurchasesInfoCommentTitle}</b>&nbsp;{purchaseContent?.comment}</div>
                <div className="read-purchases__info">
                    <div className='read-purchases__info-btn-wrap'>
                        <InputTextarea setValue={setNewNote} value={newNote} id={'ReadPurchasesViewNewNote'} name={'ReadPurchasesViewNewNote'} label={selectedLanguage?.readPurchasesView?.readPurchasesTextareaLabel} placeholder={selectedLanguage?.readPurchasesView?.readPurchasesTextareaPlaceholder} rows={'5'} cols={'50'}/>
                        <button onClick={handleAddNone} className='read-purchases__info-btn'>+</button>
                    </div>

                    {
                       !!purchaseContent?.notes?.length && (
                            <ul>
                                <b>{selectedLanguage?.readPurchasesView?.readPurchasesListNotesTitle}</b>
                                {
                                    purchaseContent?.notes?.map((el, index) => (<div className='read-purchases__info-notes-li-wrap' key={el._id}>
                                            <img onClick={() => handleDeleteNone(el._id)} className='read-purchases__info-notes-btn-del' src={deleteImg} alt='img'/>
                                            <li className='read-purchases__info-notes-li'>{index + 1}.&nbsp;{el.note}</li>
                                        </div>))
                                }
                            </ul>
                       ) 
                    }
                </div>

                <h3 className="read-purchases__products-title">{selectedLanguage?.readPurchasesView?.readPurchasesProductsListTitle}</h3>
                <div className="read-purchases__products-count"><b>{selectedLanguage?.readPurchasesView?.readPurchasesProductsCountTitle}</b>&nbsp;{orderedProducts?.length}</div>
                <div className="read-purchases__products-all-price"><b>{selectedLanguage?.readPurchasesView?.readPurchasesProductsTotalTitle}</b>&nbsp;{totalPrice}{shop?.currency}</div>
                
                <div className='read-purchases__cards'>
                    {
                        !!orderedProducts?.length && orderedProducts?.length < purchaseContent.product_ids?.length && <div>
                            <div>{selectedLanguage?.readPurchasesView?.readPurchasesCardOrderProductTitle}&nbsp;{purchaseContent.product_ids?.length}</div>
                            <div>{selectedLanguage?.readPurchasesView?.readPurchasesCardDelProductTitle}&nbsp;{purchaseContent.product_ids?.length - orderedProducts?.length}</div>
                        </div>
                    }
                    {
                        !!orderedProducts?.length ? orderedProducts.map(el => (
                                <div className={`read-purchases__card ${purchaseContent?.product_ids.filter(ell => ell._id == el._id)[0].removed ? 'read-purchases__card--removed' : ''}`} key={el._id}>
                                    <div className='read-purchases__card-wrap'>
                                        <div className="read-purchases__card-swiper-wrap">
                                            <Swiper
                                                pagination={{
                                                    type: "fraction",
                                                }}
                                                navigation={true}
                                                modules={[ Navigation]}
                                                className="mySwiper"
                                                >
                                                {
                                                    !!el?.images?.length ? el?.images.map(image => <SwiperSlide key={image}><img className="read-purchases__card-swiper-img" src={image} alt='img'/></SwiperSlide>)
                                                     : <img className="read-purchases__card-swiper-img-none" src={noPhotos} alt='img'/> 
                                                }
                                            </Swiper>
                                        </div>
                                        <div className='read-purchases__card-info'>
                                            <div className='read-purchases__card-info-title-wrap'>
                                                <span className='read-purchases__card-info-title'>{selectedLanguage?.readPurchasesView?.readPurchasesCardNameTitle}</span>
                                                <span className='read-purchases__card-info-text'>&nbsp;{el.name}</span>
                                            </div>
                                            <div className='read-purchases__card-info-title-wrap'>
                                                <span className='read-purchases__card-info-title'>{selectedLanguage?.readPurchasesView?.readPurchasesCardCategoryTitle}</span>
                                                <span className='read-purchases__card-info-text'>&nbsp;{el.category_name}</span>
                                            </div>
                                            <div className='read-purchases__card-info-title-wrap'>
                                                <span className='read-purchases__card-info-title'>{selectedLanguage?.readPurchasesView?.readPurchasesCardPriceTitle}</span>
                                                <span className='read-purchases__card-info-text'>&nbsp;{el.price}{shop?.currency}</span>
                                            </div>
                                            <div className='read-purchases__card-info-title-wrap'>
                                                <span className='read-purchases__card-info-title'>{selectedLanguage?.readPurchasesView?.readPurchasesCardPrice2Title}</span>
                                                <span className='read-purchases__card-info-text read-purchases__card-info-text-red'>&nbsp;{el.new_price}{shop?.currency}</span>
                                            </div>
                                            <div className='read-purchases__card-info-title-wrap'>
                                                <div>
                                                    <span className='read-purchases__card-info-title'>{selectedLanguage?.readPurchasesView?.readPurchasesCardColorsTitle}</span>
                                                    <span className='read-purchases__card-info-text'>&nbsp;{selectedOrders(el._id).selectColors?.join(', ')}</span>
                                                </div>
                                                <img className='read-purchases__btn-edite' onClick={() => handleEditProductColors(el)} src={editIcon} alt='img'/>
                                            </div>
                                            <div className='read-purchases__card-info-title-wrap'>
                                                <div>
                                                    <span className='read-purchases__card-info-title'>{selectedLanguage?.readPurchasesView?.readPurchasesCardSizeTitle}</span>
                                                    <span className='read-purchases__card-info-text'>&nbsp;{selectedOrders(el._id).selectSizes?.join(', ')}</span>
                                                </div>
                                                <img className='read-purchases__btn-edite' onClick={() => handleEditProductSize(el)} src={editIcon} alt='img'/>
                                            </div>
                                            <span className='read-purchases__card-info-title'>{selectedLanguage?.readPurchasesView?.readPurchasesCardDescriptionTitle}</span>
                                            <div className='read-purchases__card-info-details'>{el.details}</div>
                                        </div>
                                    </div>
    
                                    <div className='read-purchases__count-wrap'>
                                        <div className='read-purchases__count'>
                                            <span className='read-purchases__count-title'><b>{selectedLanguage?.readPurchasesView?.readPurchasesCardCountTitle}</b></span>
                                            {el.count}
                                            <img className='read-purchases__btn-edite' onClick={() => handleEditProductCount(el)} src={editIcon} alt='img'/>
                                        </div>
                                        <div className='read-purchases__count-price'>
                                            <span className='read-purchases__count-price-title'><b>{selectedLanguage?.readPurchasesView?.readPurchasesCardSumTitle}</b></span>
                                            {el.new_price == '0' ? el.price * el.count : el.new_price * el.count}
                                            {shop?.currency}
                                        </div>
                                    
                                        <div className='read-purchases__card-btn-delete-wrap'>
                                            <img className='read-purchases__card-btn-delete' onClick={() => handleDeleteProduct(el)} src={deleteImg} alt='img'/>
                                        </div>
                                    </div>

                                </div>
                            )) : <div>{selectedLanguage?.readPurchasesView?.readPurchasesCardDelAllProductTitle}&nbsp;{purchaseContent.product_ids?.length}</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ReadPurchasesView;