import './Preloader.css';


function Preloader() {
    // const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);

    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    return (
        <div className="preloader--wrap">
           <div className="preloader__loader-circle-4 preloader__spinner_top">
                <div className="preloader__loader-circle-4 preloader__spinner_mid">
                    <div className="preloader__loader-circle-4 preloader__spinner_bot"></div>
                </div>
            </div>
        </div>
    );
}

export default Preloader;