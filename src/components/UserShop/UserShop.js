import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserShop.css';
import editIcon from './../../assets/images/editIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNeedCreateShop, setIsNeedUpdateShop, setShop } from '../../store/userSlice';
import CreationShop from '../CreationShop/CreationShop';
import Preloader from '../Preloader/Preloader';
import { toast } from 'react-toastify';


function UserShop() {
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const isNeedCreateShop = useSelector(state => state.userSlice.isNeedCreateShop);
    const isNeedUpdateShop = useSelector(state => state.userSlice.isNeedUpdateShop);
    const [notFilledText, setNotFilledText] = useState('дані не вказано');
    const [informationBlockTitle, setInformationBlockTitle] = useState('');
    const [informationBlockText, setInformationBlockText] = useState('');
    const [colorTitle, setColorTitle] = useState('');
    const [colorText, setColorText] = useState('');
    const [colorBackground, setColorBackground] = useState('');
    const [sizeTitle, setSizeTitle] = useState('18');
    const [sizeText, setSizeText] = useState('16');
    const [fontWeightTitle, setFontWeightTitle] = useState('600');
    const [fontWeightText, setFontWeightText] = useState('500');
    const [arrIsOpenInfo, setArrIsOpenInfo] = useState([]);
    const [checkTextAlign, setCheckTextAlign] = useState('start');
    const [shadowTitleX, setShadowTitleX] = useState('');
    const [shadowTitleY, setShadowTitleY] = useState('');
    const [shadowTitleZ, setShadowTitleZ] = useState('');
    const [shadowTitleTransparency, setShadowTitleTransparency] = useState('100');
    const [shadowTextX, setShadowTextX] = useState('');
    const [shadowTextY, setShadowTextY] = useState('');
    const [shadowTextZ, setShadowTextZ] = useState('');
    const [shadowTextTransparency, setShadowTextTransparency] = useState('100');
    const dispatch = useDispatch();
    // console.log('asdasdxfxxxxddd: ',informationBlockTitle)

    const handleUpdate = () => {
        dispatch(setIsNeedUpdateShop(!isNeedUpdateShop)) 
    }
    
    const handleHelpOpen = (num) => {
        if (arrIsOpenInfo.includes(num)) {
            setArrIsOpenInfo(arrIsOpenInfo.filter(el => el !== num))
        } else {
            setArrIsOpenInfo([...arrIsOpenInfo, num])
        }
    }
    
    const handleCreateBlock = () => {
        let data = {
            ...shop,
            informationBlock: [{
               title: informationBlockTitle, 
               text: informationBlockText, 
               colorTitle: colorTitle, 
               colorText: colorText, 
               colorBackground: colorBackground, 
               sizeTitle: sizeTitle, 
               sizeText: sizeText, 
               fontWeightTitle: fontWeightTitle, 
               fontWeightText: fontWeightText, 
               shadowTitleX: shadowTitleX, 
               shadowTitleY: shadowTitleY, 
               shadowTitleZ: shadowTitleZ, 
               shadowTitleTransparency: shadowTitleTransparency, 
               shadowTextX: shadowTextX, 
               shadowTextY: shadowTextY, 
               shadowTextZ: shadowTextZ, 
               textAlign: checkTextAlign, 
               shadowTextTransparency: shadowTextTransparency, 
            }],
            token: user.token,
        }

        fetch(`${process.env.REACT_APP_BASE_URL}/shops/${shop._id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    // dispatch(setShop(data));
                    toast.success('Дані оновлено', {
                        position: "bottom-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                } else {
                    console.log('PUT UserShop:', res)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Сталася помилка', {
                    position: "bottom-right",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }

    const handleCleanBlock = () => {
        setInformationBlockTitle('')
        setInformationBlockText('')
    }

    return (
        <>
            {
                isNeedUpdateShop || isNeedCreateShop ? <CreationShop /> : (
                    <>
                        {
                            shop?.name && (
                                <div className="user-shop">
                                    <div className="user-shop--wrap container">
                                        <div className='user-shop__title'><b>Магазин</b>&nbsp;{shop.name}</div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Назва магазин:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.name}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Facebook:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.facebook_url ? shop.facebook_url : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Instagram:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.instagram_url ? shop.instagram_url : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Контакний номер телефону:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.contact_number ? shop.contact_number : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Додатковий контакний номер телефону:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.contact_number_two ? shop.contact_number_two : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Адреса:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.location ? shop.location : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Валюта:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.currency ? shop.currency : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Мова сайту:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.language ? shop.language : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Способи доставки:&nbsp;</span>
                                            <span  className='user-shop__info-text'>
                                                {
                                                    shop.deliveryMethods?.length ? shop.deliveryMethods.map((el, index) => (
                                                        <div>{index + 1}.&nbsp;{el}</div>
                                                    )) : notFilledText
                                                }
                                            </span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Способи оплати:&nbsp;</span>
                                            <span  className='user-shop__info-text'>
                                                {
                                                    shop.paymentMethods?.length ? shop.paymentMethods.map((el, index) => (
                                                        <div>{index + 1}.&nbsp;{el}</div>
                                                    )) : notFilledText
                                                }
                                            </span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Опис магазину:&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.descriptionShop ? shop.descriptionShop : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>Логотип:&nbsp;</span>
                                            {shop.logo ? <img className='user-shop__info-logo' src={shop.logo} alt='img'/> : notFilledText}
                                        </div>
                                        
                                        <button className='user-shop__btn' onClick={() => handleUpdate()}>Редагувати</button>


                                        <div>
                                            <div className="user-shop__section-title">Добавити блок інформації</div>
                                            
                                            <div className="user-shop__section">
                                                <div className="user-shop__section-input-wrap">
                                                    <label className='user-shop__section-input-label' htmlFor="informationBlockTitle">
                                                        <b>Введіть заголовок</b>
                                                    </label>
                                                    <input
                                                        id="informationBlockTitle"
                                                        name="informationBlockTitle"
                                                        type="text"
                                                        className='user-shop__section-input'
                                                        onChange={(e) => setInformationBlockTitle(e.target.value)}
                                                        value={informationBlockTitle}
                                                        placeholder="Заголовок..."
                                                    />

                                                    <label className='user-shop__section-input-label' htmlFor="informationBlockText">
                                                        <b>Введіть текст</b>
                                                    </label>
                                                    <textarea
                                                        id="informationBlockText"
                                                        name="informationBlockText"
                                                        type="text"
                                                        className='user-shop__section-textarea'
                                                        onChange={(e) => setInformationBlockText(e.target.value)}
                                                        value={informationBlockText}
                                                        placeholder="Інформація..."
                                                        rows="3" 
                                                        cols="50"
                                                    />
                                                    <div className='user-shop__section-color-wrap'>
                                                        <label htmlFor="colorTitle">
                                                            <input 
                                                                type="color" 
                                                                id="colorTitle" 
                                                                name="colorTitle"
                                                                value={colorTitle}
                                                                onChange={(e) => setColorTitle(e.target.value)}
                                                            />
                                                            <b>Колір заголовка</b>
                                                        </label>
                                                        
                                                        <label htmlFor="colorText">
                                                            <input 
                                                                type="color" 
                                                                id="colorText" 
                                                                name="colorText"
                                                                value={colorText}
                                                                onChange={(e) => setColorText(e.target.value)}
                                                            />
                                                            <b>Колір тексту</b>
                                                        </label>
                                                        
                                                        <label htmlFor="colorBackground">
                                                            <input 
                                                                type="color" 
                                                                id="colorBackground" 
                                                                name="colorBackground"
                                                                value={colorBackground}
                                                                onChange={(e) => setColorBackground(e.target.value)}
                                                            />
                                                            <b>Колір фону</b>
                                                        </label>
                                                    </div>

                                                    <div className='user-shop__section-number-wrap'>
                                                        <div className='user-shop__section-input-number-wrap'>
                                                            <label className='user-shop__section-input-label' htmlFor="sizeTitle">
                                                                <b>Розмір заголовку</b>
                                                            </label>
                                                            <input
                                                                id="sizeTitle"
                                                                name="sizeTitle"
                                                                type="number"
                                                                className='user-shop__section-input-number'
                                                                onChange={(e) => setSizeTitle(e.target.value)}
                                                                value={sizeTitle}
                                                                min='1'
                                                                placeholder="Введіть розмір"
                                                            />
                                                        </div>
                                                        <div className='user-shop__section-input-number-wrap'>
                                                            <label className='user-shop__section-input-label' htmlFor="fontWeightTitle">
                                                                <b>Товщина заголовку</b>
                                                            </label>
                                                            <input
                                                                id="fontWeightTitle"
                                                                name="fontWeightTitle"
                                                                type="number"
                                                                className='user-shop__section-input-number'
                                                                onChange={(e) => setFontWeightTitle(e.target.value)}
                                                                value={fontWeightTitle}
                                                                min='100'
                                                                max='900'
                                                                step="100"
                                                                placeholder="Введіть розмір"
                                                            />
                                                        </div>
                                                        <div className='user-shop__section-input-number-wrap'>
                                                            <label className='user-shop__section-input-label' htmlFor="sizeText">
                                                                <b>Розмір тексту</b>
                                                            </label>
                                                            <input
                                                                id="sizeText"
                                                                name="sizeText"
                                                                type="number"
                                                                className='user-shop__section-input-number'
                                                                onChange={(e) => setSizeText(e.target.value)}
                                                                value={sizeText}
                                                                min='1'
                                                                placeholder="Введіть розмір"
                                                            />
                                                        </div>
                                                        <div className='user-shop__section-input-number-wrap'>
                                                            <label className='user-shop__section-input-label' htmlFor="fontWeightText">
                                                                <b>Товщина тексту</b>
                                                            </label>
                                                            <input
                                                                id="fontWeightText"
                                                                name="fontWeightText"
                                                                type="number"
                                                                className='user-shop__section-input-number'
                                                                onChange={(e) => setFontWeightText(e.target.value)}
                                                                value={fontWeightText}
                                                                min='100'
                                                                max='900'
                                                                step="100"
                                                                placeholder="Введіть розмір"
                                                            />
                                                        </div>
                                                    </div>

                                                    <p><b>Вирівнювання тексту</b></p>
                                                    <div className="user-shop__section-checkbox-wrap">
                                                        <input className="user-shop__section-checkbox" onChange={() => setCheckTextAlign('start')} checked={checkTextAlign == 'start' ? true : false} type="radio" id="checkboxTextStar" name="checkboxTextAlign" />
                                                        <label className="user-shop__section-input-label" htmlFor="checkboxTextStar">Початок</label>
                                                        <input className="user-shop__section-checkbox" onChange={() => setCheckTextAlign('center')} checked={checkTextAlign == 'center' ? true : false} type="radio" id="checkboxTextCenter" name="checkboxTextAlign" />
                                                        <label className="user-shop__section-input-label" htmlFor="checkboxTextCenter">Центер</label>
                                                        <input className="user-shop__section-checkbox" onChange={() => setCheckTextAlign('end')} checked={checkTextAlign == 'end' ? true : false} type="radio" id="checkboxTextEnd" name="checkboxTextAlign" />
                                                        <label className="user-shop__section-input-label" htmlFor="checkboxTextEnd">Кінець</label>
                                                    </div>

                                                    <p className="user-shop__section-shadow-title"><b>Тінь заголовка</b></p>
                                                    <div className="user-shop__section-shadow-wrap">
                                                        <div className='user-shop__section-input-shadow-wrap'>
                                                            <label className='user-shop__section-input-label' htmlFor="shadowTitleX">
                                                                <b>Тінь по Х</b>
                                                            </label>
                                                            <input
                                                                id="shadowTitleX"
                                                                name="shadowTitleX"
                                                                type="number"
                                                                className='user-shop__section-input-number'
                                                                onChange={(e) => setShadowTitleX(e.target.value)}
                                                                value={shadowTitleX}
                                                            />
                                                        </div>
                                                        <div className='user-shop__section-input-shadow-wrap'>
                                                            <label className='user-shop__section-input-label' htmlFor="shadowTitleY">
                                                                <b>Тінь по Y</b>
                                                            </label>
                                                            <input
                                                                id="shadowTitleY"
                                                                name="shadowTitleY"
                                                                type="number"
                                                                className='user-shop__section-input-number'
                                                                onChange={(e) => setShadowTitleY(e.target.value)}
                                                                value={shadowTitleY}
                                                            />
                                                        </div>
                                                        <div className='user-shop__section-input-shadow-wrap'>
                                                            <label className='user-shop__section-input-label' htmlFor="shadowTitleZ">
                                                                <b>Тінь по Z</b>
                                                            </label>
                                                            <input
                                                                id="shadowTitleZ"
                                                                name="shadowTitleZ"
                                                                type="number"
                                                                className='user-shop__section-input-number'
                                                                onChange={(e) => setShadowTitleZ(e.target.value)}
                                                                value={shadowTitleZ}
                                                            />
                                                        </div>
                                                        <div className='user-shop__section-input-shadow-wrap'>
                                                            <label className='user-shop__section-input-label' htmlFor="shadowTitleTransparency">
                                                                <b>Прозорість тіні</b>
                                                            </label>
                                                            <input
                                                                id="shadowTitleTransparency"
                                                                name="shadowTitleTransparency"
                                                                type="number"
                                                                className='user-shop__section-input-number'
                                                                onChange={(e) => setShadowTitleTransparency(e.target.value)}
                                                                value={shadowTitleTransparency}
                                                            />
                                                        </div>
                                                    </div>
                                                   
                                                    <p className="user-shop__section-shadow-title"><b>Тінь тексту</b></p>
                                                    <div className="user-shop__section-shadow-wrap">
                                                        <div className='user-shop__section-input-shadow-wrap'>
                                                            <label className='user-shop__section-input-label' htmlFor="shadowTextX">
                                                                <b>Тінь по Х</b>
                                                            </label>
                                                            <input
                                                                id="shadowTextX"
                                                                name="shadowTextX"
                                                                type="number"
                                                                className='user-shop__section-input-number'
                                                                onChange={(e) => setShadowTextX(e.target.value)}
                                                                value={shadowTextX}
                                                            />
                                                        </div>
                                                        <div className='user-shop__section-input-shadow-wrap'>
                                                            <label className='user-shop__section-input-label' htmlFor="shadowTextY">
                                                                <b>Тінь по Y</b>
                                                            </label>
                                                            <input
                                                                id="shadowTextY"
                                                                name="shadowTextY"
                                                                type="number"
                                                                className='user-shop__section-input-number'
                                                                onChange={(e) => setShadowTextY(e.target.value)}
                                                                value={shadowTextY}
                                                            />
                                                        </div>
                                                        <div className='user-shop__section-input-shadow-wrap'>
                                                            <label className='user-shop__section-input-label' htmlFor="shadowTextZ">
                                                                <b>Тінь по Z</b>
                                                            </label>
                                                            <input
                                                                id="shadowTextZ"
                                                                name="shadowTextZ"
                                                                type="number"
                                                                className='user-shop__section-input-number'
                                                                onChange={(e) => setShadowTextZ(e.target.value)}
                                                                value={shadowTextZ}
                                                            />
                                                        </div>
                                                        <div className='user-shop__section-input-shadow-wrap'>
                                                            <label className='user-shop__section-input-label' htmlFor="shadowTextTransparency">
                                                                <b>Прозорість тіні</b>
                                                            </label>
                                                            <input
                                                                id="shadowTextTransparency"
                                                                name="shadowTextTransparency"
                                                                type="number"
                                                                className='user-shop__section-input-number'
                                                                onChange={(e) => setShadowTextTransparency(e.target.value)}
                                                                value={shadowTextTransparency}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='user-shop__section-btn-wrap'>
                                                    <button className='user-shop__section-btn-add' onClick={() => handleCleanBlock()}>Видалити</button>
                                                    {/* <button className='user-shop__section-btn-add' onClick={() => handleUpdate()}>{informationBlockTitle?.length || informationBlockTitle?.length ? 'Оновити' : 'Створити'}</button> */}
                                                    <button className='user-shop__section-btn-add' onClick={() => handleCreateBlock()}>Створити</button>
                                                    <div onClick={() => handleHelpOpen(1)} className='user-shop__section-btn-info-wrap'>
                                                        <div className={`user-shop__section-btn-info ${arrIsOpenInfo.includes(1) ? 'user-shop__section-btn-info--active' : ''}`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`user-shop__section-info ${arrIsOpenInfo.includes(1) ? 'user-shop__section-info--active' : ''}`}>
                                                <p>Заповніть блок інформацією і нажміть створити. Блок появиться на головній сторінці магазину.</p>
                                            </div>
                                            

                                            {
                                                !!informationBlockTitle?.length || !!informationBlockText?.length ? <div>
                                                    <p className='user-shop__information-title'>Вигляд блоку</p>
                                                    <div className='user-shop__information-block' style={{background: `${colorBackground}`}}>
                                                        <div 
                                                            className='user-shop__information-block-title' 
                                                            style={{color: `${colorTitle}`, fontSize: `${sizeTitle}px`, fontWeight: `${fontWeightTitle}`, textShadow: `${shadowTitleX}px ${shadowTitleY}px ${shadowTitleZ}px rgb(0 0 0 / ${shadowTitleTransparency}%)`}}
                                                        >
                                                            {informationBlockTitle}
                                                        </div>
                                                        <div 
                                                            className='user-shop__information-block-text' 
                                                            style={{color: `${colorText}`, fontSize: `${sizeText}px`, textAlign: `${checkTextAlign}`, fontWeight: `${fontWeightText}`, textShadow: `${shadowTextX}px ${shadowTextY}px ${shadowTextZ}px rgb(0 0 0 / ${shadowTextTransparency}%)`}}
                                                        >
                                                            {informationBlockText}
                                                        </div>
                                                    </div>
                                                </div> : ''
                                            }
                                        </div>

                                    </div>
                                </div>
                            )
                        }
                    </>
                )
            }
        </>
    );
}

export default UserShop;