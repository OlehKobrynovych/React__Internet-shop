import './HomeView.css';

// import phoneFill from '../../assets/images/phoneFill.svg';
// import mapPin from '../../assets/images/mapPin.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Helocation from '../../components/Helocation/Helocation';

function HomeView() {
    const [isOpen, setIsOpen] = useState(false);
    // const navigate = useNavigate();

    const handleClick = () => {
        // setIsOpen(!isOpen)
    };
   
    return (
        <div className="home-view">

        </div> 
    );
}

export default HomeView;