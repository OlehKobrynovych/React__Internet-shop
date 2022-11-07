import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './UserSettingsView.css';
import { languageUser } from '../../languageUser';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedLanguage, setShop } from '../../store/userSlice';



function UserSettingsView() {
    const shop = useSelector(state => state.userSlice.shop);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isOpenSelect, setIsOpenSelect] = useState(false);
    const [language, setLanguage] = useState('');


    useEffect(() => {
        let res = (JSON.parse(localStorage.getItem('userLanguage')));
        if (res?.length) {
            setLanguage(res)
        } else {
            setLanguage('ENG')
        }
    }, [])
    
    const handleClick = (str) => {
        setLanguage(str)
        dispatch(setSelectedLanguage(languageUser[str]));
        dispatch(setShop({...shop, language: str}));
        localStorage.setItem('userLanguage', JSON.stringify(str));
        setIsOpenSelect(false)
    }

    return (
        <div className='user-settings'>
            <div className='user-settings--wrap container'>
                <h3 className='user-settings__title'>Налаштування</h3>

                <div className='user-settings__language'>
                    <span className='user-settings__language-title'>Змінити мову</span>
                    <div className="user-settings__select-wrap">
                        <div className="user-settings__select" onClick={() => setIsOpenSelect(!isOpenSelect)}>
                            {language} 
                            <div className='user-settings__select-btn-wrap'>
                                <div className={`user-settings__select-btn ${isOpenSelect ? 'user-settings__select-btn--active' : ''}`}></div>
                            </div>
                        </div>
                        <div className={`user-settings__option-wrap ${isOpenSelect ? 'user-settings__option-wrap--active' : ''}`}>
                            <div className="user-settings__option" onClick={() => handleClick('UA')}>UA</div>
                            <div className="user-settings__option" onClick={() => handleClick('ENG')}>ENG</div>
                        </div >
                    </div>
                </div>

                <div>
                    Змінити імя
                </div>
                <div>
                    Змінити прізвище
                </div>
                <div>
                    Змінити пароль
                </div>

            </div>
        </div>
    );
}

export default UserSettingsView;