import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './LandingView.css';
import { languageUser } from '../../languageUser';
import { useDispatch } from 'react-redux';
import { setSelectedLanguage } from '../../store/userSlice';



function LandingView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch(setSelectedLanguage(languageUser[shop.language]));
        dispatch(setSelectedLanguage(languageUser['ENG']));
        localStorage.setItem('userLanguage', JSON.stringify('ENG'));
    }, [])


    return (
        <div className='landing-view'>

            <h2 className='landing-view__title container'>Landing сторінка</h2>
            <button className='landing-view__btn' onClick={() => navigate('/auth/login')}>Увійти</button>
            <button className='landing-view__btn' onClick={() => navigate('/auth/register')}>Зареєструватись</button>
            <select className='landing-view__btn'>
                <option>UA</option>
                <option>ENG</option>
            </select>
        </div>
    );
}

export default LandingView;