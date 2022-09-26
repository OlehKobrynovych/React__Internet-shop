import { NavLink, useLocation, useParams } from 'react-router-dom';
import './ProductInformation.css';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwiperCards from '../SwiperCards/SwiperCards';
import PageNotFound from '../PageNotFound/PageNotFound';
import LastProduct from '../LastProduct/LastProduct';
import { setShoppingProduct } from '../../store/homeSlice';


function ProductInformation() {
    const datas = useSelector(state => state.homeSlice.datas);
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const shoppingProduct = useSelector(state => state.homeSlice.shoppingProduct);
    const lastViewProduct = useSelector(state => state.homeSlice.lastViewProduct);
    let { id } = useParams();
    const [product, setProduct] = useState({});
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [selectedSubCategories, setSelectedSubCategories] = useState(null);
    const [isShoppingProduct, setIsShoppingProduct] = useState(false);
    const dispatch = useDispatch();

// debugger
    useEffect(() => {
        let selectedProduct = datas?.products?.find(el => el.id == id )
        setProduct(selectedProduct)
        if (datas?.categories) {
            let obj = datas?.categories.find(el => el.name === selectedProduct.category)
            if (obj.name) {
                setSelectedCategories(obj)
                setSelectedSubCategories(obj.subCategories.find(el => el.name === selectedProduct.subCategory))
            }
        }
    }, [datas, id])

    useEffect(() => {
        setIsShoppingProduct(shoppingProduct.some(el => el.id === id))
    }, [])

    const handleAddProduct = () => {
        if(shoppingProduct.some(el => el.id === product.id)) {
            let res = shoppingProduct.filter(el => el.id !== product.id)
            dispatch(setShoppingProduct(res))
        } else {
            let res = [...shoppingProduct, product]
            dispatch(setShoppingProduct(res.map(el => el.id == product.id ? {...el, count: 1} : el)))
        }

        setIsShoppingProduct(!isShoppingProduct)
    };

    // const handleAddProduct = () => {
    //     dispatch(setShoppingProducts())
    // };

    return (
        <>
            {
                product ? (
                    <div className="product-information">
                        {
                           product && (
                                <div className="product-information__path container">
                                    <NavLink className="product-information__path-link" to='/'>{selectedLanguage?.homePage?.homeName}</NavLink>
                                    <span>&nbsp; / &nbsp;</span>
                                    {
                                        selectedCategories?.href && ( <NavLink className="product-information__path-link" to={selectedCategories?.href}>{selectedCategories?.name}</NavLink>)
                                    }
                                    <span>&nbsp; / &nbsp;</span>
                                    {
                                        selectedSubCategories?.href && ( <NavLink className="product-information__path-link" to={selectedSubCategories?.href}>{selectedSubCategories?.name}</NavLink>)
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
                                        product?.imageArr?.map(image => <SwiperSlide key={image}><img className="product-information__swiper-img" src={image} alt='img'/></SwiperSlide>)
                                    }
                                </Swiper>
                            </div>
                            
                            <div className="product-information__wrap-info">
                                <h2 className="product-information__title">{product?.name}</h2>

                                <div className="product-information__price-wrap">
                                    <span className={`product-information__price ${product.new_price ? "product-information__price-old" : ""}`}>{product?.price}{datas?.shopInfo?.selectedCurrency}</span>
                                    {
                                        product?.new_price ? (<span className="product-information__new-price">{product.new_price}{datas?.shopInfo?.selectedCurrency}</span>) : ""
                                    }
                                </div>
                                
                                {
                                    product?.size &&  (<p className="product-information__size"><b>{selectedLanguage?.productPage?.productSizeTitle}</b>(&nbsp;{product.size}&nbsp;)</p>)
                                }
                                
                                {
                                    product?.description && (<div className="product-information__description"><p><b>{selectedLanguage?.productPage?.productDescriptionTitle}</b></p><p>{product.description}</p></div>)
                                }

                                <button className="product-information__btn-cart" onClick={handleAddProduct}>
                                    {
                                        !isShoppingProduct ? selectedLanguage?.productPage?.productBtnCartAdd : selectedLanguage?.productPage?.productBtnCartNotAdd
                                    }
                                </button>

                                {
                                    datas?.shopInfo?.guarantee && (<div className="product-information__guarantee"><p><b>{selectedLanguage?.productPage?.productGuaranteeTitle}</b></p><p>{datas.shopInfo.guarantee}</p></div>)
                                }

                                {
                                    datas?.shopInfo?.deliveryMthods && (<div className="product-information__delivery-mthods"><p><b>{selectedLanguage?.productPage?.productDeliveryTitle}</b></p><p>{datas.shopInfo.deliveryMthods}</p></div>)
                                }

                                {
                                    datas?.shopInfo?.paymentMethods && (<div className="product-information__payment-methods"><p><b>{selectedLanguage?.productPage?.productPaymentTitle}</b></p><p>{datas.shopInfo.paymentMethods}</p></div>)
                                }

                            </div>
                        </div>

                        <SwiperCards title={selectedLanguage?.productPage?.productSwiperTitle} priceNew={false} />

                        {
                            lastViewProduct.length && (<LastProduct />)
                        }
                        
                    </div>) : (<PageNotFound />)
            }
        </>
    );
}

export default ProductInformation;