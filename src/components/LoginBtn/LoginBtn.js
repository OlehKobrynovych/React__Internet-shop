import './LoginBtn.css';
import login from '../../assets/images/login.svg';
import { useSelector } from 'react-redux';


function LoginBtn() {
    // const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);

    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    return (
        <div className="login-btn">
            <svg className="login-btn__img" fill='#000' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 512 512" xmlSpace="preserve">
                <g>
                    <g>
                        <path d="M327.287,246.852l-74.931-76.595c-4.941-5.06-13.039-5.146-18.099-0.205c-5.06,4.941-5.146,13.056-0.205,18.099
                            l53.854,55.057H12.8C5.734,243.2,0,248.934,0,256c0,7.066,5.734,12.8,12.8,12.8h275.098l-53.845,55.057
                            c-4.941,5.043-4.855,13.158,0.205,18.099c5.06,4.941,13.158,4.855,18.099-0.205l75.128-76.8
                            C332.424,259.908,332.339,251.793,327.287,246.852z"/>
                    </g>
                </g>
                <g>
                    <g>
                        <path d="M499.2,0H166.4c-7.066,0-12.8,5.734-12.8,12.8V192h25.6V25.6h307.2v460.8H179.2V320h-25.6v179.2
                            c0,7.066,5.734,12.8,12.8,12.8h332.8c7.066,0,12.8-5.734,12.8-12.8V12.8C512,5.734,506.266,0,499.2,0z"/>
                    </g>
                </g>
            </svg>
            {/* <p className="login-btn__text">{selectedLanguage?.header?.loginBtn}</p> */}
            <p className="login-btn__text">Вихід</p>
        </div>
    );
}

export default LoginBtn;