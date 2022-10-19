import { NavLink, useLocation, useParams } from 'react-router-dom';
import './ProductInformationView.css';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwiperCards from '../../components/SwiperCards/SwiperCards';
import PageNotFoundView from '../PageNotFoundView/PageNotFoundView';
import LastProduct from '../../components/LastProduct/LastProduct';
import { setFavoriteProduct, setShoppingProduct } from '../../store/homeSlice';
import Preloader from '../../components/Preloader/Preloader';


function ProductInformationView() {
    let { id } = useParams();
    const products = useSelector(state => state.homeSlice.products);
    const categories = useSelector(state => state.homeSlice.categories);
    const shop = useSelector(state => state.homeSlice.shop);
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategories, setSelectedCategories] = useState({});
    const [parentCategories, setParentCategories] = useState({});
    const [similarProducts, setSimilarProducts] = useState([]);
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const shoppingProduct = useSelector(state => state.homeSlice.shoppingProduct);
    const favoriteProduct = useSelector(state => state.homeSlice.favoriteProduct);
    const lastViewProduct = useSelector(state => state.homeSlice.lastViewProduct);
    const [isShoppingProduct, setIsShoppingProduct] = useState(false);
    const [isFavoriteProduct, setIsFavoriteProduct] = useState(false);
    const dispatch = useDispatch();
// console.log(product)
    // const datas = useSelector(state => state.homeSlice.datas);
    // const [selectedSubCategories, setSelectedSubCategories] = useState(null);
// debugger

    useEffect(() => {
        setIsLoading(true);

        fetch(`http://localhost:3000/api/products/${id}`)
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    setProduct(res.data)
                } else {
                    setProduct(null)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });

        setIsShoppingProduct(shoppingProduct.some(el => el._id === id))
        setIsFavoriteProduct(favoriteProduct.some(el => el._id === id))
    }, [])

    useEffect(() => {
        setIsLoading(true);

        fetch(`http://localhost:3000/api/products/${id}`)
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    setProduct(res.data)
                } else {
                    setProduct(null)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id])

    useEffect(() => {
        if ( products?.length && product?.category_id) {
            let selectedCategory = categories?.find(el => el._id === product.category_id)
            // console.log(categories)
            if (selectedCategory?.name) {
                setSelectedCategories(selectedCategory)
            } else {
                let res = {}
                categories.map(el => {
                    let res1 = el.sub_categories.find(ell => ell._id === product.category_id) 
                    if (res1?.name) {
                        res = res1
                    }
                })
                setSelectedCategories(res)
            }
        }
    }, [product])
   
    useEffect(() => {

        if (selectedCategories?.parent_id !== 'null') {
            setParentCategories(categories?.find(el => el._id === selectedCategories.parent_id))
        }
        
        if (selectedCategories?._id) {
            setSimilarProducts(products?.filter(el => el.category_id == selectedCategories._id))
        }
    }, [selectedCategories])
   
    const handleAddShoppingProduct = () => {
        if(shoppingProduct.some(el => el._id === product._id)) {
            let res = shoppingProduct.filter(el => el._id !== product._id)
            dispatch(setShoppingProduct(res))
        } else {
            let res = [...shoppingProduct, product]
            dispatch(setShoppingProduct(res.map(el => el._id == product._id ? {...el, count: 1} : el)))
        }

        setIsShoppingProduct(!isShoppingProduct)
    };
    
    const handleAddFavoriteProduct = () => {
        if(favoriteProduct.some(el => el._id === product._id)) {
            let res = favoriteProduct.filter(el => el._id !== product._id)
            dispatch(setFavoriteProduct(res))
        } else {
            let res = [...favoriteProduct, product]
            dispatch(setFavoriteProduct(res.map(el => el._id == product._id ? {...el, count: 1} : el)))
        }

        setIsFavoriteProduct(!isFavoriteProduct)
    };

    return (
        <>
            {
                isLoading ? (<Preloader/>) : !!product.name ? (
                    <div className="product-information">
                        {
                           selectedCategories?.name && (
                                <div className="product-information__path container">
                                    <NavLink className="product-information__path-link" to={`/${shop.name}`}>{selectedLanguage?.homePage?.homeName}</NavLink>
                                    <span>&nbsp; / &nbsp;</span>
                                    {
                                        selectedCategories?.parent_id == 'null' ? (
                                            <NavLink className="product-information__path-link" to={`/${shop.name}/category/${selectedCategories?._id}`}>{selectedCategories?.name}</NavLink>
                                        ) : (
                                            <>
                                                <NavLink className="product-information__path-link" to={`/${shop.name}/category/${parentCategories?._id}`}>{parentCategories?.name}</NavLink>
                                                <span>&nbsp; / &nbsp;</span>
                                                <NavLink className="product-information__path-link" to={`/${shop.name}/category/${selectedCategories?._id}`}>{selectedCategories?.name}</NavLink>
                                            </>
                                        )
                                    }
                                    <span>&nbsp; / &nbsp;</span>
                                    <span>{product?.name}</span>
                                </div>) 
                        }

                        <div className="product-information--wrap container">
                            <div className="product-information__swiper-wrap">
                                <Swiper
                                    pagination={{
                                        type: "fraction",
                                    }}
                                    navigation={true}
                                    modules={[ Navigation]}
                                    className="mySwiper"
                                    >
                                    {
                                        product?.images?.map(image => <SwiperSlide key={image}><img className="product-information__swiper-img" src={image} alt='img'/></SwiperSlide>)
                                    }
                                </Swiper>
                            </div>
                            
                            <div className="product-information__wrap-info">
                                <h2 className="product-information__title">Назва:&nbsp;{product?.name}</h2>

                                <div className="product-information__price-wrap">
                                    <span className={`product-information__price ${product.new_price ? "product-information__price-old" : ""}`}>Ціна:&nbsp;{product?.price}{shop.currency}</span>
                                    {
                                        product?.new_price !== 0 ? (<span className="product-information__new-price">{product.new_price}{shop.currency}</span>) : ""
                                    }
                                </div>
                                
                                {
                                    !!product?.sizes.length &&  (<p className="product-information__size"><b>{selectedLanguage?.productPage?.productSizeTitle}</b>(&nbsp;{product.sizes.join(' ')}&nbsp;)</p>)
                                }
                                
                                {
                                    !!product?.colors.length &&  (<p className="product-information__size"><b>{selectedLanguage?.productPage?.productColorsTitle}</b>(&nbsp;{product.colors.join(' ')}&nbsp;)</p>)
                                }
                                
                                {
                                    !!product?.details.length && (<div className="product-information__description"><p><b>{selectedLanguage?.productPage?.productDescriptionTitle}</b></p><p>{product.details}</p></div>)
                                }

                                <button className="product-information__btn-cart" onClick={handleAddFavoriteProduct}>
                                    {
                                        !isFavoriteProduct ? selectedLanguage?.productPage?.productBtnWishListAdd : selectedLanguage?.productPage?.productBtnWishListNotAdd
                                    }
                                </button>
                                
                                <button className="product-information__btn-cart" onClick={handleAddShoppingProduct}>
                                    {
                                        !isShoppingProduct ? selectedLanguage?.productPage?.productBtnCartAdd : selectedLanguage?.productPage?.productBtnCartNotAdd
                                    }
                                </button>
{/* 
                                {
                                    datas?.shopInfo?.guarantee && (<div className="product-information__guarantee"><p><b>{selectedLanguage?.productPage?.productGuaranteeTitle}</b></p><p>{datas.shopInfo.guarantee}</p></div>)
                                } */}

                                {
                                    !!shop?.deliveryMethods && (<div className="product-information__delivery-mthods"><p><b>{selectedLanguage?.productPage?.productDeliveryTitle}</b></p><p>{shop.deliveryMethods}</p></div>)
                                }

                                {
                                    !!shop?.paymentMethods && (<div className="product-information__payment-methods"><p><b>{selectedLanguage?.productPage?.productPaymentTitle}</b></p><p>{shop.paymentMethods}</p></div>)
                                }

                            </div>
                        </div>

                        {
                            !!similarProducts.length && <SwiperCards title={selectedLanguage?.productPage?.productSwiperTitle} products={similarProducts} />
                        }
                        
                        {
                            !!lastViewProduct.length && (<LastProduct />)
                        }
                        
                    </div>) : (<PageNotFoundView />)
            }
        </>
    );
}

export default ProductInformationView;