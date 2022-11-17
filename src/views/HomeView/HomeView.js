import { useEffect, useState } from 'react';
import SwiperCards from '../../components/SwiperCards/SwiperCards';
import './HomeView.css';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay} from "swiper";
import AdvertisingBlock from '../../components/AdvertisingBlock/AdvertisingBlock';


function HomeView() {
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const shop = useSelector(state => state.homeSlice.shop);
    const products = useSelector(state => state.homeSlice.products);
    const categories = useSelector(state => state.homeSlice.categories);
    const [productsNew, setProductsNew] = useState([]);
    const [productsOld, setProductsOld] = useState([]);
    // const dispatch = useDispatch();
    // debugger
    // console.log(shop)
    // console.log(productsOld)
    
    useEffect(() => {
        if (products.length) {
            setProductsNew(products.filter(el => el.new_price))
            setProductsOld(products.filter(el => !el.new_price))
        }
    }, [products])
   
    return (
        // <>
        //     {
                // productsOld?.length ?
                    <div className="home-view hidden">
                        {
                            !!categories?.length && (
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
                                       categories.map(el => el.image_url ? (<SwiperSlide key={el._id}><img className="home-view__swiper-img" src={el.image_url} alt='img'/></SwiperSlide>) : "" )
                                    }
                                </Swiper>
                            )
                        }

                        {
                            !!productsOld.length && <SwiperCards title={selectedLanguage?.homePage?.titleSwiperNew} products={productsOld}/>
                        }   

                        <div className="home-view__images-wrap container">
                            {
                                categories[0]?.image_url &&  <NavLink className="home-view__image-link" to={`/${shop.name}/category/${categories[0]._id}`}><img className="home-view__image" src={categories[0]?.image_url} alt='img'/></NavLink>
                            }
                            {
                                categories[1]?.image_url &&  <NavLink className="home-view__image-link" to={`/${shop.name}/category/${categories[1]._id}`}><img className="home-view__image" src={categories[1]?.image_url} alt='img'/></NavLink>
                            }
                            {
                                categories[2]?.image_url &&  <NavLink className="home-view__image-link" to={`/${shop.name}/category/${categories[2]._id}`}><img className="home-view__image" src={categories[2]?.image_url} alt='img'/></NavLink>
                            }
                            {
                                categories[3]?.image_url &&  <NavLink className="home-view__image-link" to={`/${shop.name}/category/${categories[3]._id}`}><img className="home-view__image" src={categories[3]?.image_url} alt='img'/></NavLink>
                            }
                        </div>

                        {
                            shop?.name && (
                                <div className="home-view__info container">

                                    {
                                        !!shop?.informationBlock?.length && shop?.informationBlock.map(el => (
                                            <NavLink
                                                to={el.description?.length ? `/${shop.name}/advertisement` : ''}
                                                className={`home-view__information-block ${shop?.informationBlock[0]?.description?.length ? '' : 'home-view__information-block-not-active'}`} 
                                                style={{background: `${el.colorBackground}`}}
                                            >
                                                <div 
                                                    className='home-view__information-block-title' 
                                                    style={{color: `${el.colorTitle}`, fontSize: `${el.sizeTitle}px`, fontWeight: `${el.fontWeightTitle}`, textShadow: `${el.shadowTitleX}px ${el.shadowTitleY}px ${el.shadowTitleZ}px rgb(0 0 0 / ${el.shadowTitleTransparency}%)`}}
                                                >
                                                    {el.title}
                                                </div>
                                                <div 
                                                    className='home-view__information-block-text' 
                                                    style={{color: `${el.colorText}`, fontSize: `${el.sizeText}px`, textAlign: `${el.textAlign}`, fontWeight: `${el.fontWeightText}`, textShadow: `${el.shadowTextX}px ${el.shadowTextY}px ${el.shadowTextZ}px rgb(0 0 0 / ${el.shadowTextTransparency}%)`}}
                                                >
                                                    {el.text}
                                                </div>
                                            </NavLink>
                                        ))
                                    }

                                    <h2 className="home-view__info-title">{selectedLanguage?.homePage?.homeInfoTitle} {shop.name}</h2>
                                    <p className="home-view__info-text">{shop.descriptionShop}</p>
                                </div>
                            )
                        }
                        
                        {
                            !!productsNew.length && (<SwiperCards title={selectedLanguage?.homePage?.titleSwiperDiscounts} products={productsNew}/>)
                        }

                        {
                            shop?.typeStore?.length && <AdvertisingBlock />
                        }
                        
                    </div>
                    // : (<Preloader/>) 
        //     }
        // </>
    );
}

export default HomeView;