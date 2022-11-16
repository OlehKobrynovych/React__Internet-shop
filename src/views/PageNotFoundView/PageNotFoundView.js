import { NavLink } from 'react-router-dom';
import './PageNotFoundView.css';
import { useSelector } from 'react-redux';

function PageNotFoundView() {
    const shop = useSelector(state => state.homeSlice.shop);
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    return (
        <div className="page-not-found">
            <span className="page-not-found__number">404</span>
            <h2 className="page-not-found__title">{selectedLanguage?.notFoundPage?.notFoundTitle}</h2>
            <div className="page-not-found__btn-wrap">
                <span>{selectedLanguage?.notFoundPage?.notFoundGetBackTitle}</span>
                <NavLink className={`app__custom-btn app__btn-${shop?.colorSettings?.selectBtn?.length ? shop?.colorSettings.selectBtn : '5'}`} to={`/${shop.name}`}><span className="app__custom-btn-span">{selectedLanguage?.homePage?.homeName}</span></NavLink>
            </div>
        </div>
    );
}

export default PageNotFoundView;