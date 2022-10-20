import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ReadPurchases.css';
import stars from './../../assets/images/stars.svg';
import envelopeOpen from './../../assets/images/envelopeOpen.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setSeenPurchases } from '../../store/userSlice';



function ReadPurchases() {
    const user = useSelector(state => state.userSlice.user);
    // const shop = useSelector(state => state.userSlice.shop);
    let { idPurchases } = useParams();
    const [purchases, setPurchases] = useState({});
    const [orderedProducts, setOrderedProducts] = useState([]);
    const dispatch = useDispatch();
    // const isNeedCreateShop = useSelector(state => state.userSlice.isNeedCreateShop);
    // const isNeedUpdateShop = useSelector(state => state.userSlice.isNeedUpdateShop);
    // const navigate = useNavigate();
    // console.log('purchases: ',purchases)

    useEffect(() => {
        if (user._id) {
            fetch(`http://localhost:3000/api/purchases/${idPurchases}?token=${user.token}`)
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    setPurchases(res.data)
                    // dispatch(getPurchases(res.data));
                } else {
                    console.log('GET ReadPurchases:', res)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        }
    }, [idPurchases])

    useEffect(() => {
        if (purchases._id) {
            let data = {
                ...purchases,
                token: user.token,
                isSeen: true,
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
                        dispatch(setSeenPurchases({...purchases, isSeen: true}));
                    } else {
                        console.log('PUT ReadPurchases:', res)
                    }
                })
                .catch((error) => {
                })
        }
    }, [purchases])

   
   
    // useEffect(() => {
    //     if (purchases.product_id?.length) {
    //         purchases.product_id.map(el => {
    //             fetch(`http://localhost:3000/api/products/${el}`)
    //                 .then(res => res.json())
    //                 .then(res => {
    //                     if (res.success && res.data) {
    //                         // console.log(res)
    //                         setOrderedProducts(res.data)
    //                         // dispatch(getProducts(res.data));
    //                     } else {
    //                         console.log('GET LayoutUser:', res)
    //                     }
    //                 })
    //                 .catch((error) => {
    //                     console.error('Error:', error);
    //                 })
    //         })
    //     }
    // }, [purchases])


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
   
    const handleSort = () => {
        
    }

    return (
        <div className="read-purchases">
            <div className="read-purchases--wrap container">
                <div className="read-purchases__title"><b>Замовлення:</b>&nbsp;{purchases?._id}</div>
                <div className="read-purchases__title"><b>Замовник:</b>&nbsp;{purchases?.full_name}</div>
                <div className="read-purchases__title"><b>Телефон:</b>&nbsp;{purchases?.phone}</div>
                <div className="read-purchases__title"><b>Емейл:</b>&nbsp;{purchases?.email}</div>
                <div className="read-purchases__title"><b>Адреса:</b>&nbsp;{purchases?.delivery_address}</div>
                <div className="read-purchases__title"><b>Спосіб доставки:</b>&nbsp;{purchases?.delivery_method}</div>
                <div className="read-purchases__title"><b>Коментар:</b>&nbsp;{purchases?.comment}</div>

                <div>
                    {/* {
                        orderedProducts._id &&  orderedProducts.map(el => (
                            <div className='user-product__card' key={el._id}>
                                <div className='user-product__card-wrap'>
                                    <div className="user-product__card-swiper-wrap">
                                        <Swiper
                                            pagination={{
                                                type: "fraction",
                                            }}
                                            navigation={true}
                                            modules={[ Navigation]}
                                            className="mySwiper"
                                            >
                                            {
                                                !!el?.images?.length ? el?.images.map(image => <SwiperSlide key={image}><img className="user-product__card-swiper-img" src={image} alt='img'/></SwiperSlide>)
                                                 : <img className="user-product__card-swiper-img-none" src={noPhotos} alt='img'/> 
                                            }
                                        </Swiper>
                                    </div>
                                    <div className='user-product__card-info'>
                                        <div className='user-product__card-info-title-wrap'>
                                            <span className='user-product__card-info-title'>Назва товару:</span>
                                            <span className='user-product__card-info-text'>&nbsp;{el.name}</span>
                                        </div>
                                        <div className='user-product__card-info-title-wrap'>
                                            <span className='user-product__card-info-title'>Категорія:</span>
                                            <span className='user-product__card-info-text'>&nbsp;{el.category_id}</span>
                                        </div>
                                        <div className='user-product__card-info-title-wrap'>
                                            <span className='user-product__card-info-title'>Ціна товару:</span>
                                            <span className='user-product__card-info-text'>&nbsp;{el.price}{shop?.currency}</span>
                                        </div>
                                        <div className='user-product__card-info-title-wrap'>
                                            <span className='user-product__card-info-title'>Ціна зі знижкою:</span>
                                            <span className='user-product__card-info-text user-product__card-info-text-red'>&nbsp;{el.new_price}{shop?.currency}</span>
                                        </div>
                                        <div className='user-product__card-info-title-wrap'>
                                            <span className='user-product__card-info-title'>Доступні кольори:</span>
                                            <span className='user-product__card-info-text'>&nbsp;{el.colors.join(', ')}</span>
                                        </div>
                                        <div className='user-product__card-info-title-wrap'>
                                            <span className='user-product__card-info-title'>Доступні розміра:</span>
                                            <span className='user-product__card-info-text'>&nbsp;{el.sizes.join(', ')}</span>
                                        </div>
                                        <span className='user-product__card-info-title'>Опис:</span>
                                        <div className='user-product__card-info-details'>{el.details}</div>
                                    </div>
                                </div>

                                <div className='user-product__card-btn-wrap'>
                                    <img className='user-product__card-btn' onClick={() => handleEditProduct(el)} src={editIcon} alt='img'/>
                                    <img className='user-product__card-btn' onClick={() => handleDeleteProduct(el._id)} src={deleteImg} alt='img'/>
                                </div>
                            </div>
                        ))
                    } */}
                </div>
            </div>
        </div>
    );
}

export default ReadPurchases;