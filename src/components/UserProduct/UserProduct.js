import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './UserProduct.css';
import editIcon from './../../assets/images/editIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setEditProduct, setIsCleanInput, setIsNeedUpdateProducts, setIsNeedUpdateShop, setShop } from '../../store/userSlice';
import deleteImg from '../../assets/images/deleteImg.svg';
import noPhotos from '../../assets/images/noPhotos.svg';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import ModalWindow from '../ModalWindow/ModalWindow';
import { toast } from 'react-toastify';


function UserProduct() {
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const categories = useSelector(state => state.userSlice.categories);
    const products = useSelector(state => state.userSlice.products);
    const isNeedUpdateProducts = useSelector(state => state.userSlice.isNeedUpdateProducts);
    const [isModalDelProduct, setIsModalDelProduct] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    // const isNeedCreateShop = useSelector(state => state.userSlice.isNeedCreateShop);
    // const isNeedUpdateShop = useSelector(state => state.userSlice.isNeedUpdateShop);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log(categories)

   

    const handleCreateCategory = () => {
    }
    
    const handleEditProduct = (obj) => {
        dispatch(setEditProduct(obj))
        navigate(`/auth/${user._id}/product/create`)
    }

    const handleDeleteProduct = (id) => {
        setIsModalDelProduct(true)
        setDeleteId(id)
    }
    
    const handleIsDeleteProduct = (boolean) => {
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
                        dispatch(setIsNeedUpdateProducts(!isNeedUpdateProducts))
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
                        console.log('DELETE UserCategories', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }

        setIsModalDelProduct(false)
        setDeleteId('')
    }

    return (
        <div className='user-product'>

            {
                isModalDelProduct && <ModalWindow title={'Ви впевнені?'}  text={'Видалити даний товар'} handleClick={handleIsDeleteProduct}/>
            }

            <div className='user-product--wrap container'>
                <div className='user-product__title'><b>Мої товари</b></div>
                <div className='user-product__sub-title-wrap'>
                    <div className='user-product__sub-title'>Загальна кількість: {products?.length}</div>
                    <button className='user-product__sub-title-btn'><NavLink to='create'>Створити товар</NavLink></button>
                </div>

                <div className='user-product__cards'>
                    {
                        !!products.length && products.map(el => (
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
                    }
                </div>
            </div>
        </div>
    );
}

export default UserProduct;