import './SwiperCards.css';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";

import {datas} from '../../data.js'

import { useState, useRef, useEffect } from 'react';

import circle from '../../assets/images/circle.svg';
import ProductCard from '../ProductCard/ProductCard';

function SwiperCards({title, products}) {
    
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
                    <img className="swiper-cards__circle-left" src={circle} alt='img'/>
                    <img className="swiper-cards__circle-right" src={circle} alt='img'/>
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
                    className="mySwiper swiper-cards__visible"
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