import SwiperCards from '../../components/SwiperCards/SwiperCards';
import './HomeView.css';

import man from '../../assets/images/man.webp';
import woman from '../../assets/images/woman.webp';
import kids from '../../assets/images/kids.webp';
// import ProductCard from '../../components/ProductCard/ProductCard';

function HomeView() {
   
    return (
        <div className="home-view">

            {/* <div className="home-view__images container">
                <div className="home-view__images--wrap">
                    <a href='#'><img src={man} alt='img'/></a>
                    <a href='#'><img src={kids} alt='img'/></a>
                </div>
                <a href='#'><img src={woman} alt='img'/></a>
            </div> */}

            <SwiperCards title={'Новинки'} priceNew={false}/>
            <SwiperCards title={'Знижки'} priceNew={true}/>
        </div> 
    );
}

export default HomeView;