import './SwiperCards.css';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";

import {datas} from '../../data.js'

import { useState, useRef, useEffect } from 'react';

// import cart from '../../assets/images/cart.svg';
import ProductCard from '../ProductCard/ProductCard';

function SwiperCards({title, priceNew}) {
    
    const [filterDatas, setFilterDatas] = useState([]);
    const [vw, setVw] = useState(window.innerWidth);

    useEffect(() => {
        if(priceNew) {
            setFilterDatas(datas.products.filter(el => el.new_price !== null))
        } else {
            setFilterDatas(datas.products.filter(el => el.new_price == null))
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function handleResize() {
        setVw(window.innerWidth)
    }

    return (
        <div className="swiper-cards">
            <div className="swiper-cards--wrap container">
                <h2 className="swiper-cards__title">{title}</h2>

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
                    modules={[Navigation]}
                    className="mySwiper"
                >

                    {
                        filterDatas.map(products => (
                            <SwiperSlide key={products.id}><ProductCard products={products}/></SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
}

export default SwiperCards;