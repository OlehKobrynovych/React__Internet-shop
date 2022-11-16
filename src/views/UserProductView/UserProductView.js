import { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import './UserProductView.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getProducts, setEditProduct, setRemoveProduct, setShop } from '../../store/userSlice';
import deleteImg from '../../assets/images/deleteImg.svg';
import editIcon from './../../assets/images/editIcon.svg';
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
    const [selectedSortPrice, setSelectedSortPrice] = useState({});
    const [selectedCategorySort, setSelectedCategorySort] = useState({});
    const [selectedPaget, setSelectedPaget] = useState('0');
    const [quantityAllProducts, setQuantityAllProducts] = useState('');
    const [countProducts, setCountProducts] = useState('');
    const [isOpenSelectCategory, setIsOpenSelectCategory] = useState(false);
    const [isOpenSelectSort, setIsOpenSelectSort] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentPaginationItems, setCurrentPaginationItems] = useState([]);
    // let { productPage } = useParams();
    // const location = useLocation();
    // let numberPage = new URLSearchParams(location.search).get('page') || 0;
    
    // console.log("selectedSort",selectedSort)
    // console.log('shop',selectedCategorySort)
    console.log(user)
    // console.log(shop)
    
    useEffect(() => {
        if (selectedLanguage?.userProduct) {
            setSelectedSort(selectedLanguage.userProduct.userProductSortOptionAll)
            setSelectedSortPrice({title: 'Всі товари', value: 'all'})
        }
    }, [selectedLanguage]);

    useEffect(() => {
        setFilterProducts([...products])
    }, [products]);

    useEffect(() => {
        if (shop?._id) {
            if (selectedSort == selectedLanguage.userProduct.userProductSortOptionAll) {
                // переробити коли запрацює запит на кількість товару
                fetch(`${process.env.REACT_APP_BASE_URL}/products/${shop._id}/number/all?token=${user.token}`)
                    .then(res => res.json())
                    .then(res => {
                        if (res.success && res.data) {
                            console.log(res)
                            setQuantityAllProducts(res.data)
                            if (!countProducts?.length) {
                                setCountProducts(res.data)
                            }
                        } else {
                            console.log('GET UserProduct:', res)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })

                fetch(`${process.env.REACT_APP_BASE_URL}/products/${shop._id}/all?page=${selectedPaget}&price_filter=${selectedSortPrice.value == 'all' ? "" : selectedSortPrice.value}`)
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
                
            } else if ( selectedSort == "Без категорії") {
                fetch(`${process.env.REACT_APP_BASE_URL}/products/${shop._id}/number/all?category_id=none&token=${user.token}`)
                    .then(res => res.json())
                    .then(res => {
                        console.log(res)
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
                  
                fetch(`${process.env.REACT_APP_BASE_URL}/products/${shop._id}/shop/non-category`)
                    .then(res => res.json())
                    .then(res => {
                        if (res.success && res.data) {
                            // setFilterProducts(res.data)
                            dispatch(getProducts(res.data));
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
            } else {
                fetch(`${process.env.REACT_APP_BASE_URL}/products/${shop._id}/number/all?category_id=${selectedCategorySort._id}&token=${user.token}`)
                    .then(res => res.json())
                    .then(res => {
                        console.log(res)
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

                fetch(`${process.env.REACT_APP_BASE_URL}/products/${selectedCategorySort._id}/category?page=${selectedPaget}&price_filter=${selectedSortPrice.value == 'all' ? "" : selectedSortPrice.value}`)
                    .then(res => res.json())
                    .then(res => {
                        if (res.success && res.data) {
                            console.log(res)
                            dispatch(getProducts(res.data));
                            // setFilterProducts([...res.data])
                        } else {
                            console.log('GET UserProduct:', res)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
            }
        }
    }, [shop, selectedPaget, selectedSort, selectedSortPrice, ])
    
    // фільтрація щоб працювала тільки після натиску на ентер
    // доробити ендпоінт на отримання 10 товарів і загальної кількості
    const handleSearchProduct = (e) => {
        if(e.key === 'Enter' || e.type == "click"){
            fetch(`${process.env.REACT_APP_BASE_URL}/products/${shop._id}/shop?name=${seachName}&price_filter=${selectedSortPrice.value == 'all' ? "" : selectedSortPrice.value}`)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    if (res.success && res.data) {
                        console.log(res)
                        setFilterProducts([...res.data])
                        setQuantityAllProducts(res.data?.length)
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
    
    const handleChangeSort = (e, category) => {
        e.stopPropagation()
        setIsOpenSelectCategory(false)
        setSelectedPaget('0')
        if (category == "all") {
            setSelectedCategorySort({})
            setSelectedSort(selectedLanguage?.userProduct?.userProductSortOptionAll)
        } else if (category == 'withOutCategory') {
            setSelectedCategorySort({})
            setSelectedSort('Без категорії')
        } else {
            setSelectedCategorySort(category)
            setSelectedSort(category.name)
        }
    };
   
    const handleChangeSortPrice = (e, obj) => {
        e.stopPropagation()
        setIsOpenSelectSort(false)
        setSelectedPaget('0')
        setSelectedSortPrice(obj)
    };

    const handleEditProduct = (obj) => {
        dispatch(setEditProduct(obj))
        localStorage.setItem('editProduct', JSON.stringify(obj));
        navigate(`/auth/${user._id}/product/create`)
    }

    const handleDeleteProduct = (id) => {
        setIsModalDelProduct(true)
        setDeleteId(id)
    }
   
    const handleClose = () => {
        if (isOpenSelectSort || isOpenSelectCategory) {
            setIsOpenSelectSort(false)
            setIsOpenSelectCategory(false)
        }
    }
    
    const handleOpenSelectCategory = (e) => {
        e.stopPropagation()
        setIsOpenSelectCategory(true)
    }
   
    const handleOpenSelectSort = (e) => {
        e.stopPropagation()
        setIsOpenSelectSort(true)
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

    return (
        <div className='user-product' onClick={handleClose}>
            {
                isModalDelProduct && <ModalWindow title={selectedLanguage?.userProduct?.userProductModalDelTitle}  text={selectedLanguage?.userProduct?.userProductModalDelText} handleClick={handleIsDeleteProduct} leftBtn={selectedLanguage?.userProduct?.userProductModalDelLeftBtn} rightBtn={selectedLanguage?.userProduct?.userProductModalDelRightBtn}/>
            }

            <div className='user-product--wrap container'>
                <div className='user-product__title'><b>{selectedLanguage?.userProduct?.userProductTitle}</b></div>
                <div className='user-product__sub-title-wrap'>
                    <div className='user-product__sub-title'>{selectedLanguage?.userProduct?.userProductSubTitle}&nbsp;{countProducts}</div>
                    <button className='user-product__sub-title-btn'><NavLink to='create'>{selectedLanguage?.userProduct?.userProductCreateBtn}</NavLink></button>
                </div>

                <div className='user-product__filter-wrap'>
                    <div className='user-product__filter'>
                        <label className='user-product__filter-search-input-label' htmlFor="userProductSeachName">
                            <b>{selectedLanguage?.userProduct?.userProductSearchLabel}</b>
                        </label>
                        <div className='user-product__filter-search-input-wrap'>
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
                            <button className='user-product__filter-search-btn' onClick={(e) => handleSearchProduct(e)}>Пошук</button>
                        </div>
                    </div>

                    <div className='user-product__price-wrap'>
                        <span className='user-product__price-label'>Сортувати:</span>
                        <div className="user-product__price-select-wrap">
                            <div className="user-product__price-select" onClick={(e) => handleOpenSelectSort(e)}>
                            {/* <div className="user-product__price-select" onClick={() => setIsOpenSelectSort(!isOpenSelectSort)}> */}
                                {selectedSortPrice?.title}
                                <div className='user-product__price-select-btn-wrap'>
                                    <div className={`user-product__price-select-btn ${isOpenSelectSort ? 'user-product__price-select-btn--active' : ''}`}></div>
                                </div>
                            </div>
                        </div>
                        <div className={`user-product__price-option-wrap ${isOpenSelectSort ? 'user-product__price-option-wrap--active' : ''}`}>
                            <div className="user-product__price-option" onClick={(e) => handleChangeSortPrice(e, {title: 'Всі товари', value: 'all'})}>Всі товари</div>
                            <div className="user-product__price-option" onClick={(e) => handleChangeSortPrice(e, {title: 'По зростанню ціни', value: '1'})}>По зростанню ціни</div>
                            <div className="user-product__price-option" onClick={(e) => handleChangeSortPrice(e, {title: 'По спадання ціни', value: '-1'})}>По спадання ціни</div>
                        </div >
                    </div>

                    <div className="user-product__category-wrap">
                        <span className="user-product__category-label">{selectedLanguage?.userProduct?.userProductSortLabel}</span>
                        <div className="user-product__category-select-wrap">
                            {/* <div className="user-product__category-select" onClick={() => setIsOpenSelectCategory(!isOpenSelectCategory)}> */}
                            <div className="user-product__category-select" onClick={(e) => handleOpenSelectCategory(e)}>
                                {selectedSort}
                                <div className='user-product__category-select-btn-wrap'>
                                    <div className={`user-product__category-select-btn ${isOpenSelectCategory ? 'user-product__category-select-btn--active' : ''}`}></div>
                                </div>
                            </div>
                        </div>
                        <div className={`user-product__category-option-wrap ${isOpenSelectCategory ? 'user-product__category-option-wrap--active' : ''}`}>
                            <div className="user-product__category-option-category" onClick={(e) => handleChangeSort(e, 'all')}>{selectedLanguage?.userProduct?.userProductSortOptionAll}</div>
                            <div className="user-product__category-option-category" onClick={(e) => handleChangeSort(e, 'withOutCategory')}>Без категорій</div>
                            {
                                !!categories?.length && categories.map(category => (
                                    <div className="user-product__category-option" key={category._id}>
                                        <div className="user-product__category-option-category" onClick={(e) => handleChangeSort(e, category)}>{category?.name}</div>
                                        {
                                            !!category?.sub_categories?.length  && category.sub_categories.map(el => (
                                                    <div className="user-product__category-option-sub-category" onClick={(e) => handleChangeSort(e, el)} key={el._id}>{el?.name}</div>
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
                        !!filterProducts?.length ? filterProducts.map(el => (
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
            
            {/* <PaginationItems items={filterProducts} setCurrentPaginationItems={setCurrentPaginationItems} pageRangeDisplayed={5} itemsPerPage={10}/> */}
            <PaginationItems selectedPaget={selectedPaget} setSelectedPaget={setSelectedPaget} pageRangeDisplayed={5} itemsPerPage={10} quantityAllProducts={quantityAllProducts}/>
        </div>
    );
}

export default UserProductView;