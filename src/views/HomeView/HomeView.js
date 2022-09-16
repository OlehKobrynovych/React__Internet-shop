import SwiperCards from '../../components/SwiperCards/SwiperCards';
import './HomeView.css';

// import phoneFill from '../../assets/images/phoneFill.svg';
// import ProductCard from '../../components/ProductCard/ProductCard';

function HomeView() {
   
    return (
        <div className="home-view">
            <SwiperCards title={'Новинки'} priceNew={false}/>
            <SwiperCards title={'Знижки'} priceNew={true}/>
        </div> 
    );
}

export default HomeView;