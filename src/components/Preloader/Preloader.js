import './Preloader.css';
import login from '../../assets/images/login.svg';
import { useSelector } from 'react-redux';


function Preloader() {
    // const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);

    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    return (
        <div className="preloader--wrap">
           <div class="loader-circle-4 spinner_top">
                <div class="loader-circle-4 spinner_mid">
                    <div class="loader-circle-4 spinner_bot"></div>
                </div>
            </div>
        </div>
    );
}

export default Preloader;