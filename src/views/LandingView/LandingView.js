import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingView.css';
import { languageUser } from '../../languageUser';
import { useDispatch } from 'react-redux';
import { setSelectedLanguage } from '../../store/userSlice';



function LandingView() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [languag, setLanguag] = useState('');

    useEffect(() => {
        let res = (JSON.parse(localStorage.getItem('userLanguage')));
        if (res?.length) {
            dispatch(setSelectedLanguage(languageUser[res]));
            setLanguag(res)
        } else {
            dispatch(setSelectedLanguage(languageUser['ENG']));
            localStorage.setItem('userLanguage', JSON.stringify('ENG'));
            setLanguag(res)
        }
        // dispatch(setSelectedLanguage(languageUser[shop.language]));
    }, [])
    
    const handleChange = (str) => {
        setLanguag(str)
        dispatch(setSelectedLanguage(languageUser[str]));
        localStorage.setItem('userLanguage', JSON.stringify(str));
    }

    return (
        <div className='landing-view'>

            <h2 className='landing-view__title container'>Landing сторінка</h2>
            <button className='landing-view__btn' onClick={() => navigate('/auth/login')}>Увійти</button>
            <button className='landing-view__btn' onClick={() => navigate('/auth/register')}>Зареєструватись</button>

            <select className='landing-view__btn' onChange={(e) => handleChange(e.target.value)} value={languag}>
                <option value={'UA'}>UA</option>
                <option value={'ENG'}>ENG</option>
            </select>
        </div>
    );
}

export default LandingView;