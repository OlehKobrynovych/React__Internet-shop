import SwiperCards from '../../components/SwiperCards/SwiperCards';
import './HomeView.css';

import man from '../../assets/images/man.webp';
import woman from '../../assets/images/woman.webp';
import kids from '../../assets/images/kids.webp';
import poshta from '../../assets/images/poshta.jpg';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay} from "swiper";

import { useEffect, useState } from 'react';
import Preloader from '../../components/Preloader/Preloader';


function HomeView() {
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const shop = useSelector(state => state.homeSlice.shop);
    const products = useSelector(state => state.homeSlice.products);
    const categories = useSelector(state => state.homeSlice.categories);
    const [productsNew, setProductsNew] = useState([]);
    const [productsOld, setProductsOld] = useState([]);
    const [mainSliderImages, setMainSliderImages] = useState([]);
    const dispatch = useDispatch();
    // debugger
    // console.log(mainSliderImages)
    
    useEffect(() => {
        if (products.length) {
            setProductsNew(products.filter(el => el.new_price))
            setProductsOld(products.filter(el => !el.new_price))
        }
    }, [products])
    
    useEffect(() => {
        if (categories?.length) {
            setMainSliderImages(categories.filter(el => el.parent_id == 'null'))
        }
    }, [categories])
   
    return (
        <>
            {
                productsOld.length ?
                    (<div className="home-view hidden">
                        {
                            !!mainSliderImages?.length && (
                                <Swiper
                                    spaceBetween={30}
                                    centeredSlides={true}
                                    autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                    }}
                                    modules={[Autoplay]}
                                    className="mySwiper"
                                >
                                    {
                                       mainSliderImages.map(el => (<SwiperSlide key={el._id}><img className="home-view__swiper-img" src={el.image_url} alt='img'/></SwiperSlide>))
                                    }
                                </Swiper>
                            )
                        }

                        <SwiperCards title={selectedLanguage?.homePage?.titleSwiperNew} products={productsOld}/>

                        <div className="home-view__images-wrap container">
                            {
                                mainSliderImages[0]?.image_url &&  <NavLink className="home-view__image-link" to={`/category/${mainSliderImages[0]._id}`}><img className="home-view__image" src={mainSliderImages[0]?.image_url} alt='img'/></NavLink>
                            }
                            {
                                mainSliderImages[1]?.image_url &&  <NavLink className="home-view__image-link" to={`/category/${mainSliderImages[1]._id}`}><img className="home-view__image" src={mainSliderImages[1]?.image_url} alt='img'/></NavLink>
                            }
                            {
                                mainSliderImages[2]?.image_url &&  <NavLink className="home-view__image-link" to={`/category/${mainSliderImages[2]._id}`}><img className="home-view__image" src={mainSliderImages[2]?.image_url} alt='img'/></NavLink>
                            }
                            {
                                mainSliderImages[3]?.image_url &&  <NavLink className="home-view__image-link" to={`/category/${mainSliderImages[3]._id}`}><img className="home-view__image" src={mainSliderImages[3]?.image_url} alt='img'/></NavLink>
                            }
                        </div>

                        <div className="home-view__info container">
                            <div className="home-view__info-delivery">
                                <img className="home-view__info-delivery-img" src={poshta} alt='img'/>
                                <p className="home-view__info-delivery-text">Безкоштовна доставка від 5 999 грн</p>
                            </div>

                            {
                                shop?.name && (
                                    <>
                                        <h2 className="home-view__info-title">{selectedLanguage?.homePage?.homeInfoTitle} {shop.name}</h2>
                                        <p className="home-view__info-text">{shop.descriptionShop}</p>
                                    </>
                                )
                            }
                        </div>
                        
                        {
                            productsNew.length && (<SwiperCards title={selectedLanguage?.homePage?.titleSwiperDiscounts} products={productsNew}/>)
                        }
                        
                    </div>) : (<Preloader/>) 
            }
        </>
    );
}

export default HomeView;