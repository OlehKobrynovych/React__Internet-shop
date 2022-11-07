import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import './UserProductView.css';
import editIcon from './../../assets/images/editIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getProducts, setEditProduct, setRemoveProduct, setShop } from '../../store/userSlice';
import deleteImg from '../../assets/images/deleteImg.svg';
import noPhotos from '../../assets/images/noPhotos.svg';
import PaginationItems from '../../components/PaginationItems/PaginationItems';
import ModalWindow from '../../components/ModalWindow/ModalWindow';


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { toast } from 'react-toastify';


function UserProductView() {
    const selectedLanguage = useSelector(state => state.userSlice.selectedLanguage);
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const categories = useSelector(state => state.userSlice.categories);
    const products = useSelector(state => state.userSlice.products);
    const [isModalDelProduct, setIsModalDelProduct] = useState(false);
    const [deleteId, setDeleteId] = useState('');
    const [seachName, setSeachName] = useState('');
    const [filterProducts, setFilterProducts] = useState([]);
    const [selectedSort, setSelectedSort] = useState('');
    const [isWithoutCategory, setIsWithoutCategory] = useState(false);
    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentPaginationItems, setCurrentPaginationItems] = useState([]);
    // console.log(selectedLanguage)
    // console.log(selectedSort)
    
    
    useEffect(() => {
        if (selectedLanguage?.userProduct) {
            setSelectedSort(selectedLanguage.userProduct.userProductSortOptionAll)
        }
    }, [selectedLanguage]);

    useEffect(() => {
        if (products?.length) {
            setFilterProducts([...products])
        }
    }, [products]);

    useEffect(() => {
        if (shop?._id) {
            fetch(`${process.env.REACT_APP_BASE_URL}/products/${shop._id}/all`)
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        console.log(res)
                        dispatch(getProducts(res.data));
                    } else {
                        console.log('GET UserProduct:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }, [shop])
    
    // фільтрація щоб працювала тільки після натиску на ентер
    const handleSearchProduct = (e) => {
        if(e.key === 'Enter'){
            fetch(`${process.env.REACT_APP_BASE_URL}/products/${shop._id}/shop?name=${seachName}`)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.success && res.data) {
                        console.log(res)
                        setFilterProducts([...res.data])
                    } else {
                        console.log('GET UserProduct:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }

    useEffect(() => {
        if (!seachName.length) {
            setFilterProducts(products) 
        } 
    }, [seachName]);
    
    const handleChangeSort = (category) => {
        setIsOpenSelect(false)
        if (category == "all") {
            setFilterProducts([...products])
            setSelectedSort(selectedLanguage?.userProduct?.userProductSortOptionAll)
        } else {
            setSelectedSort(category.name)
            setIsWithoutCategory(false)

            fetch(`${process.env.REACT_APP_BASE_URL}/products/${category._id}/category`)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.success && res.data) {
                        console.log(res)
                        setFilterProducts([...res.data])
                    } else {
                        console.log('GET UserProduct:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    };

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
    
            fetch(`${process.env.REACT_APP_BASE_URL}/products/${deleteId}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        console.log('del', res)
                        dispatch(setRemoveProduct(deleteId))
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
                        console.log('DELETE UserProduct', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })

            let data2 = {
                ...shop,
                quantityProducts: shop?.quantityProducts - 1,
                token: user.token,
            }

            fetch(`${process.env.REACT_APP_BASE_URL}/shops/${shop._id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data2),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        dispatch(setShop(data2));
                    } else {
                        console.log('PUT UserProduct:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }

        setIsModalDelProduct(false)
        setDeleteId('')
    }

    const handleWithoutCategory = () => {

        // доробити
        setSelectedSort(selectedLanguage.userProduct.userProductSortOptionAll)
        setIsWithoutCategory(!isWithoutCategory)
        // :id/shop/non-category
        fetch(`${process.env.REACT_APP_BASE_URL}/products/${shop._id}/shop/non-category`)
        .then(res => res.json())
        // console.log('asdasd111 ')
        .then(res => {
            // console.log('asdasd111 ', res)
            if (res.success && res.data.length) {
                console.log('asdasd222 ', res)
                // setFilterProducts(res.data)
                // dispatch(getProducts(res.data));
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }

    return (
        <div className='user-product'>
            {
                isModalDelProduct && <ModalWindow title={selectedLanguage?.userProduct?.userProductModalDelTitle}  text={selectedLanguage?.userProduct?.userProductModalDelText} handleClick={handleIsDeleteProduct} leftBtn={selectedLanguage?.userProduct?.userProductModalDelLeftBtn} rightBtn={selectedLanguage?.userProduct?.userProductModalDelRightBtn}/>
            }

            <div className='user-product--wrap container'>
                <div className='user-product__title'><b>{selectedLanguage?.userProduct?.userProductTitle}</b></div>
                <div className='user-product__sub-title-wrap'>
                    <div className='user-product__sub-title'>{selectedLanguage?.userProduct?.userProductSubTitle}&nbsp;{products?.length}</div>
                    <button className='user-product__sub-title-btn'><NavLink to='create'>{selectedLanguage?.userProduct?.userProductCreateBtn}</NavLink></button>
                </div>

                <div className='user-product__filter-wrap'>
                    <div className='user-product__filter'>
                        <label className='user-product__filter-search-input-label' htmlFor="userProductSeachName">
                            <b>{selectedLanguage?.userProduct?.userProductSearchLabel}</b>
                        </label>
                        <input
                            id="userProductSeachName"
                            name="userProductSeachName"
                            type="search"
                            required
                            className='user-product__filter-search-input'
                            onChange={(e) => setSeachName(e.target.value)}
                            onKeyPress={(e) => handleSearchProduct(e)}
                            value={seachName}
                            placeholder={selectedLanguage?.userProduct?.userProductSearchPlaceholder}
                        />
                    </div>

                    <button className='user-product__sub-title-btn' onClick={handleWithoutCategory}>
                        {
                            isWithoutCategory ? 'Вибрати все товари' : 'Вибрати товар без категорії' 
                        }
                    </button>

                    <div className="user-product__sort-wrap">
                        <span className="user-product__sort-label">{selectedLanguage?.userProduct?.userProductSortLabel}</span>
                        <div className="user-product__sort-select-wrap">
                            <div className="user-product__sort-select" onClick={() => setIsOpenSelect(!isOpenSelect)}>
                                {selectedSort}
                                <div className='user-product__sort-select-btn-wrap'>
                                    <div className={`user-product__sort-select-btn ${isOpenSelect ? 'user-product__sort-select-btn--active' : ''}`}></div>
                                </div>
                            </div>
                        </div>
                        <div className={`user-product__sort-option-wrap ${isOpenSelect ? 'user-product__sort-option-wrap--active' : ''}`}>
                            <div className="user-product__sort-option-category" onClick={() => handleChangeSort('all')}>{selectedLanguage?.userProduct?.userProductSortOptionAll}</div>
                            {
                                !!categories?.length && categories.map(category => (
                                    <div className="user-product__sort-option" key={category._id}>
                                        <div className="user-product__sort-option-category" onClick={() => handleChangeSort(category)}>{category?.name}</div>
                                        {
                                            !!category?.sub_categories?.length  && category.sub_categories.map(el => (
                                                    <div className="user-product__sort-option-sub-category" onClick={() => handleChangeSort(el)} key={el._id}>{el?.name}</div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div >
                    </div>
                </div>                

                <div className='user-product__cards'>
                    {
                        !!currentPaginationItems?.length ? currentPaginationItems.map(el => (
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
                                            <span className='user-product__card-info-title'>{selectedLanguage?.userProduct?.userProductCardName}</span>
                                            <span className='user-product__card-info-text'>&nbsp;{el.name}</span>
                                        </div>
                                        <div className='user-product__card-info-title-wrap'>
                                            <span className='user-product__card-info-title'>{selectedLanguage?.userProduct?.userProductCardCategory}</span>
                                            <span className='user-product__card-info-text'>&nbsp;{el.category_name}</span>
                                        </div>
                                        <div className='user-product__card-info-title-wrap'>
                                            <span className='user-product__card-info-title'>{selectedLanguage?.userProduct?.userProductCardPrice}</span>
                                            <span className='user-product__card-info-text'>&nbsp;{el.price}{shop?.currency}</span>
                                        </div>
                                        <div className='user-product__card-info-title-wrap'>
                                            <span className='user-product__card-info-title'>{selectedLanguage?.userProduct?.userProductCardNewPrice}</span>
                                            <span className='user-product__card-info-text user-product__card-info-text-red'>&nbsp;{el.new_price}{shop?.currency}</span>
                                        </div>
                                        <div className='user-product__card-info-title-wrap'>
                                            <span className='user-product__card-info-title'>{selectedLanguage?.userProduct?.userProductCardColors}</span>
                                            <span className='user-product__card-info-text'>&nbsp;{el.colors.join(', ')}</span>
                                        </div>
                                        <div className='user-product__card-info-title-wrap'>
                                            <span className='user-product__card-info-title'>{selectedLanguage?.userProduct?.userProductCardSizes}</span>
                                            <span className='user-product__card-info-text'>&nbsp;{el.sizes.join(', ')}</span>
                                        </div>
                                        <span className='user-product__card-info-title'>{selectedLanguage?.userProduct?.userProductCardDescription}</span>
                                        <div className='user-product__card-info-details'>{el.details}</div>
                                    </div>
                                </div>

                                <div className='user-product__card-btn-wrap'>
                                    <img className='user-product__card-btn' onClick={() => handleEditProduct(el)} src={editIcon} alt='img'/>
                                    <img className='user-product__card-btn' onClick={() => handleDeleteProduct(el._id)} src={deleteImg} alt='img'/>
                                </div>
                            </div>
                        )) : <div>{selectedLanguage?.userProduct?.userProductProductMissing}</div>
                    }
                </div>
            </div>
            
            <PaginationItems items={filterProducts} setCurrentPaginationItems={setCurrentPaginationItems} pageRangeDisplayed={5} itemsPerPage={2}/>
        </div>
    );
}

export default UserProductView;