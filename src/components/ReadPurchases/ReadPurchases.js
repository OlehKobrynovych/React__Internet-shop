import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ReadPurchases.css';
import noPhotos from './../../assets/images/noPhotos.svg';
import editIcon from './../../assets/images/editIcon.svg';
import deleteImg from './../../assets/images/deleteImg.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setSeenPurchases, setStatusPurchases } from '../../store/userSlice';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper';
import { toast } from 'react-toastify';
import ModalWindow from '../ModalWindow/ModalWindow';
import CardInput from '../CardInput/CardInput';
import PurchasesEditeArr from '../PurchasesEditeArr/PurchasesEditeArr';




function ReadPurchases () {
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
    const [deleteId, setDeleteId] = useState('');
    const dispatch = useDispatch();
    console.log('purchases: ', purchaseContent)
    
    useEffect(() => {
        if (user?._id) {
            fetch(`http://localhost:3000/api/purchases/${idPurchases}?token=${user.token}`)
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    setPurchaseContent(res.data)
                    setIsSeen(res.data)
                    // dispatch(getPurchases(res.data));
                } else {
                    console.log('GET ReadPurchases:', res)
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

        fetch(`http://localhost:3000/api/purchases/${purchaseContent2._id}`, {
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
                    dispatch(setSeenPurchases({...purchaseContent2, isSeen: true}));
                } else {
                    console.log('PUT ReadPurchases:', res)
                }
            })
            .catch((error) => {
            })
    }

    useEffect(() => {
        if (purchaseContent._id) {
            if (!status?.length) {
                setStatus(purchaseContent.status)
            }
            
            // let data = {
            //     ...purchaseContent,
            //     token: user.token,
            //     isSeen: true,
            // }
    
            // fetch(`http://localhost:3000/api/purchases/${purchaseContent._id}`, {
            //     method: 'PUT',
            //     headers: {
            //     'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data),
            // })
            //     .then(res => res.json())
            //     .then(res => {
            //         if (res.success && res.data) {
            //             console.log('PUT CardSelect:', res)
            //             dispatch(setSeenPurchases({...purchaseContent, isSeen: true}));
            //         } else {
            //             console.log('PUT ReadPurchases:', res)
            //         }
            //     })
            //     .catch((error) => {
            //     })
        }

        if (purchaseContent.product_id?.length) {
            setOrderedProducts([])
            purchaseContent.product_id.map(el => {
                fetch(`http://localhost:3000/api/products/${el._id}`)
                    .then(res => res.json())
                    .then(res => {
                        if (res.success && res.data?._id) {
                            console.log('1111111111111')
                            setOrderedProducts((orderedProducts) => [...orderedProducts, {...res.data, count: el.count}])
                            // setOrderedProducts((prewValue) => [...prewValue, {...res.data, count: el.count}])
                            // dispatch(getProducts(res.data));
                        } else {
                            console.log('GET LayoutUser:', res)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
            })
        }
    }, [purchaseContent])

    useEffect(() => {
        if (orderedProducts?.length) {
            let res = orderedProducts.reduce((acc, el) => {
               acc += (el.new_price == '0' ? el.price * el.count : el.new_price * el.count)
               return acc
            }, 0)
            setTotalPrice(res)
        }
    }, [orderedProducts])


     // useEffect(() => {
    //     if (shop?._id) {
    //         fetch(`http://localhost:3000/api/purchases/${shop._id}/all?token=${user.token}`)
    //             .then(res => res.json())
    //             .then(res => {
    //                 console.log('GET UserPurchases:', res)
    //                 if (res.success && res.data?.length) {
    //                     dispatch(getPurchases(res.data));
    //                 } else {
    //                     console.log('GET UserPurchases:', res)
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //             })
    //     }
    // }, [shop])
   
    const handleChangeStatus = (str) => {
        setStatus(str)

        let data = {
            ...purchaseContent,
            token: user.token,
            status: str,
        }

        fetch(`http://localhost:3000/api/purchases/${purchaseContent._id}`, {
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
                    toast.success('Дані оновлено', {
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
                    console.log('PUT CardSelect:', res)
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
   
    const handleIsEditProductColors = (boolean) => {
        if (boolean) {
            const data = {
                ...purchaseContent,
                // colors: newColors,
                product_id: purchaseContent.product_id.map(el => {
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
                // sizes: newSize,
                product_id: purchaseContent.product_id.map(el => {
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
                product_id: purchaseContent.product_id.map(el => {
                    if (el._id == editProduct._id) {
                        el.count = newCount
                    }
                    return el
                }),
                token: user.token,
            }
            
            sendEdite(data)
        } 

        setIsModalEditProductCount(false)
        setEditProduct({})
    }
    





    const sendEdite = (data) => {
        fetch(`http://localhost:3000/api/purchases/${purchaseContent._id}`, {
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
                    // dispatch(setStatusPurchases({...purchaseContent, status: str}));
                    setPurchaseContent({...data})
                    toast.success('Дані оновлено', {
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
                    console.log('PUT CardSelect:', res)
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

    const handleDeleteProduct = (id) => {
        setIsModalDelProduct(true)
        setDeleteId(id)
    } 

    const handleIsDeleteSubProduct = (boolean) => {
        if (boolean) {
            const data = {
                token: user.token,
            }

            fetch(`http://localhost:3000/api/products/${deleteId}`, {
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
                        setOrderedProducts([...orderedProducts.filter(el => el._id !== deleteId)])
                        toast.success('Товар видалено', {
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
                        console.log('DELETE ReadPurchases', res)
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
        
        setIsModalDelProduct(false)
        setDeleteId('')
    }

    const selectedOrders = (id) => {
        console.log( purchaseContent?.product_id?.filter(ell => ell._id == id)[0])
      return purchaseContent?.product_id?.filter(ell => ell._id == id)[0]
    }

    return (
        <div className={`read-purchases read-purchases__item-status--${status}`}>

            {
                isModalDelProduct && <ModalWindow title={'Ви впевнені?'}  text={'Видалити даний товар'} handleClick={handleIsDeleteSubProduct}/>
            }

            {
                isModalEditProductCount && <ModalWindow title={'Редагувати'}  text={'Введіть нове значення'} handleClick={handleIsEditProductCount} leftBtn={"Відмінити"} rightBtn={"Підтвердити"}>
                                            <CardInput handleChange={setNewCount}/>
                                          </ ModalWindow>
            }
           
            {
                isModalEditProductSize && <ModalWindow title={'Редагувати'}  text={'Введіть нове значення'} handleClick={handleIsEditProductSize} leftBtn={"Відмінити"} rightBtn={"Підтвердити"}>
                                            {/* <PurchasesEditeArr handleChange={setNewSize} purchaseArr={editProduct?.sizes}/> */}
                                            <PurchasesEditeArr handleChange={setNewSize} purchaseArr={selectedOrders(editProduct._id)?.selectSizes}/>
                                          </ ModalWindow>
            }
           
            {
                isModalEditProductColors && <ModalWindow title={'Редагувати'}  text={'Введіть нове значення'} handleClick={handleIsEditProductColors} leftBtn={"Відмінити"} rightBtn={"Підтвердити"}>
                                            <PurchasesEditeArr handleChange={setNewColors} purchaseArr={selectedOrders(editProduct._id)?.selectColors}/>
                                          </ ModalWindow>
            }

            <div className="read-purchases--wrap container">
                <div className="read-purchases__status-wrap">
                    <div className="read-purchases__status-number">
                        <b>Замовлення:</b>&nbsp;{purchaseContent?._id}
                    </div>
                    <div className="read-purchases__status">
                        <span className="read-purchases__status-title">Статус:</span>
                        <select onChange={(e) => handleChangeStatus(e.target.value)} value={status}>
                            <option value='InProcess'>В процесі</option>
                            <option value='done'>Виконано</option>
                            <option value='notDone'>Відхилено</option>
                        </select>
                    </div>
                </div>
                <div className="read-purchases__info"><b>Замовник:</b>&nbsp;{purchaseContent?.full_name}</div>
                <div className="read-purchases__info"><b>Телефон:</b>&nbsp;{purchaseContent?.phone}</div>
                <div className="read-purchases__info"><b>Емейл:</b>&nbsp;{purchaseContent?.email}</div>
                <div className="read-purchases__info"><b>Адреса:</b>&nbsp;{purchaseContent?.delivery_address}</div>
                <div className="read-purchases__info"><b>Спосіб доставки:</b>&nbsp;{purchaseContent?.delivery_method}</div>
                <div className="read-purchases__info"><b>Коментар:</b>&nbsp;{purchaseContent?.comment}</div>

                <h3 className="read-purchases__products-title">Замовлений товар</h3>
                <div className="read-purchases__products-count"><b>Кількість товару:</b>&nbsp;{orderedProducts?.length}</div>
                <div className="read-purchases__products-all-price"><b>Сума замовлення:</b>&nbsp;{totalPrice}{shop?.currency}</div>
                
                <div className='read-purchases__cards'>
                    {
                        !!orderedProducts?.length &&  orderedProducts.map(el => (
                                <div className='read-purchases__card' key={el._id}>
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
                                                <span className='read-purchases__card-info-title'>Назва товару:</span>
                                                <span className='read-purchases__card-info-text'>&nbsp;{el.name}</span>
                                            </div>
                                            <div className='read-purchases__card-info-title-wrap'>
                                                <span className='read-purchases__card-info-title'>Категорія:</span>
                                                <span className='read-purchases__card-info-text'>&nbsp;{el.category_name}</span>
                                            </div>
                                            <div className='read-purchases__card-info-title-wrap'>
                                                <span className='read-purchases__card-info-title'>Ціна товару:</span>
                                                <span className='read-purchases__card-info-text'>&nbsp;{el.price}{shop?.currency}</span>
                                            </div>
                                            <div className='read-purchases__card-info-title-wrap'>
                                                <span className='read-purchases__card-info-title'>Ціна зі знижкою:</span>
                                                <span className='read-purchases__card-info-text read-purchases__card-info-text-red'>&nbsp;{el.new_price}{shop?.currency}</span>
                                            </div>
                                            <div className='read-purchases__card-info-title-wrap'>
                                                <div>
                                                    <span className='read-purchases__card-info-title'>Замовлені кольори:</span>
                                                    <span className='read-purchases__card-info-text'>&nbsp;{selectedOrders(el._id).selectColors.join(', ')}</span>
                                                </div>
                                                <img className='read-purchases__btn-edite' onClick={() => handleEditProductColors(el)} src={editIcon} alt='img'/>
                                            </div>
                                            <div className='read-purchases__card-info-title-wrap'>
                                                <div>
                                                    <span className='read-purchases__card-info-title'>Замовлені розміра:</span>
                                                    <span className='read-purchases__card-info-text'>&nbsp;{selectedOrders(el._id).selectSizes.join(', ')}</span>
                                                </div>
                                                <img className='read-purchases__btn-edite' onClick={() => handleEditProductSize(el)} src={editIcon} alt='img'/>
                                            </div>
                                            <span className='read-purchases__card-info-title'>Опис:</span>
                                            <div className='read-purchases__card-info-details'>{el.details}</div>
                                        </div>
                                    </div>
    
                                    <div className='read-purchases__count-wrap'>
                                        <div className='read-purchases__count'>
                                            <span className='read-purchases__count-title'><b>Кількість:</b></span>
                                            {el.count}
                                            <img className='read-purchases__btn-edite' onClick={() => handleEditProductCount(el)} src={editIcon} alt='img'/>
                                        </div>
                                        <div className='read-purchases__count-price'>
                                            <span className='read-purchases__count-price-title'><b>Сума:</b></span>
                                            {el.new_price == '0' ? el.price * el.count : el.new_price * el.count}
                                            {shop?.currency}
                                        </div>
                                    
                                        <div className='read-purchases__card-btn-delete-wrap'>
                                            <img className='read-purchases__card-btn-delete' onClick={() => handleDeleteProduct(el._id)} src={deleteImg} alt='img'/>
                                        </div>
                                    </div>

                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    );
}

export default ReadPurchases;