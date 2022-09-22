import { NavLink, useLocation, useParams } from 'react-router-dom';
import './ProductInformation.css';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SwiperCards from '../SwiperCards/SwiperCards';
import PageNotFound from '../PageNotFound/PageNotFound';
import LastProduct from '../LastProduct/LastProduct';


function ProductInformation() {
    // let location = useLocation();
    const datas = useSelector(state => state.homeSlice.datas);
    let { id } = useParams();
    const [product, setProduct] = useState({});
    const [selectedCategories, setSelectedCategories] = useState(null);
    const [selectedSubCategories, setSelectedSubCategories] = useState(null);
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

    // const searchInputRef = useRef(null);

    // const navigate = useNavigate();

    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    return (
        <>
            {
                product ? (
                    <div className="product-information">
                        {
                           product && (
                                <div className="product-information__path container">
                                    <NavLink className="product-information__path-link" to='/'>Головна сторінка</NavLink>
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
                                    <span className={`product-information__price ${product.new_price ? "product-information__price-old" : ""}`}>{product?.price}₴</span>
                                    {
                                        product?.new_price ? (<span className="product-information__new-price">{product.new_price}₴</span>) : ""
                                    }
                                </div>
                                
                                {
                                    product?.size &&  (<p className="product-information__size"><b>Доступні розміра: </b>(&nbsp;{product.size}&nbsp;)</p>)
                                }
                                
                                {
                                    product?.description && (<div className="product-information__description"><p><b>Опис</b></p><p>{product.description}</p></div>)
                                }

                                <button className="product-information__btn-cart">Добавити в кошик</button>

                                {
                                    datas?.shopInfo?.guarantee && (<div className="product-information__guarantee"><p><b>Гарантія</b></p><p>{datas.shopInfo.guarantee}</p></div>)
                                }

                                {
                                    datas?.shopInfo?.deliveryMthods && (<div className="product-information__delivery-mthods"><p><b>Способи доставки:</b></p><p>{datas.shopInfo.deliveryMthods}</p></div>)
                                }

                                {
                                    datas?.shopInfo?.paymentMethods && (<div className="product-information__payment-methods"><p><b>Способи оплати:</b></p><p>{datas.shopInfo.paymentMethods}</p></div>)
                                }

                            </div>
                        </div>

                        <SwiperCards title={'Подібні продукти'} priceNew={false} />

                        <LastProduct />
                        
                    </div>) : (<PageNotFound />)
            }
        </>
    );
}

export default ProductInformation;