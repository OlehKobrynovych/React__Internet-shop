import { NavLink } from 'react-router-dom';
import './PageNotFound.css';
import { useSelector } from 'react-redux';

function PageNotFound() {

    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    // const handleClick = () => {
    //     searchInputRef.current.focus()
    // };

    return (
        <div className="page-not-found">
            <span className="page-not-found__number">404</span>
            <h2 className="page-not-found__title">{selectedLanguage?.notFoundPage?.notFoundTitle}</h2>
            <div>
                <span>{selectedLanguage?.notFoundPage?.notFoundGetBackTitle}</span>
                <NavLink className="page-not-found__btn" to="/">{selectedLanguage?.homePage?.homeName}</NavLink>
            </div>
        </div>
    );
}

export default PageNotFound;