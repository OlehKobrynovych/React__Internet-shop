import './SwiperCards.css';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { useState, useRef, useEffect } from 'react';
import circle from '../../assets/images/circle.svg';
import ProductCard from '../ProductCard/ProductCard';
import { useSelector } from 'react-redux';

function SwiperCards({title, products}) {
    const shop = useSelector(state => state.homeSlice.shop);
    const [vw, setVw] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function handleResize() {
        setVw(window.innerWidth)
    }

    return (
        <div className="swiper-cards">
            <div className="swiper-cards--wrap container">
                <div className="swiper-cards__title-wrap">
                    <h2 className="swiper-cards__title">{title}</h2>
                    <svg className="swiper-cards__circle-left" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill={shop?.colorSettings?.colorMainText ? shop?.colorSettings?.colorMainText : '#000'}>
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    </svg>
                    <svg className="swiper-cards__circle-right" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill={shop?.colorSettings?.colorMainText ? shop?.colorSettings?.colorMainText : '#000'}>
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    </svg>
                </div>

                <Swiper
                    slidesPerView={vw > 500 ? vw > 768 ? 3 : 2 : 1}
                    spaceBetween={30}
                    slidesPerGroup={vw > 500 ? vw > 768 ? 3 : 2 : 1}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    pagination={{
                    clickable: true,
                    }}
                    navigation={true}
                    initialSlide='1'
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {
                        products.map(product => (
                            <SwiperSlide key={product._id}><ProductCard product={product}/></SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
}

export default SwiperCards;