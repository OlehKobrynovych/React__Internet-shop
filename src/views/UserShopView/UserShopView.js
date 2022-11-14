import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserShopView.css';
// import editIcon from './../../assets/images/editIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNeedCreateShop, setIsNeedUpdateShop, setSelectedLanguage, setShop } from '../../store/userSlice';
// import Preloader from '../../components/Preloader/Preloader';
import { toast } from 'react-toastify';
import CreationShop from '../../components/CreationShop/CreationShop';
// import { languageUser } from '../../languageUser';
import InputNumber from '../../components/InputNumber/InputNumber';
import AdvertisingBlock from '../../components/AdvertisingBlock/AdvertisingBlock';
import { userTypeStore } from '../../userTypeStore';





function UserShopView() {
    const selectedLanguage = useSelector(state => state.userSlice.selectedLanguage);
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const isNeedCreateShop = useSelector(state => state.userSlice.isNeedCreateShop);
    const isNeedUpdateShop = useSelector(state => state.userSlice.isNeedUpdateShop);
    const [isInformationBlock, setIsInformationBlock] = useState(false);
    const [notFilledText, setNotFilledText] = useState('');
    const [informationBlockTitle, setInformationBlockTitle] = useState('');
    const [informationBlockText, setInformationBlockText] = useState('');
    const [informationBlockDescription, setInformationBlockDescription] = useState('');
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
    const [selectTypeStore, setSelectTypeStore] = useState([]);
    console.log('asdasdxfxxxxddd: ', shop)


    useEffect(() => {
        if (shop?.informationBlock?.length) {
            setInformationBlockTitle(shop.informationBlock[0].title) 
            setInformationBlockText(shop.informationBlock[0].text) 
            setInformationBlockDescription(shop.informationBlock[0].description) 
            setColorTitle(shop.informationBlock[0].colorTitle) 
            setColorText(shop.informationBlock[0].colorText)
            setColorBackground(shop.informationBlock[0].colorBackground) 
            setSizeTitle(shop.informationBlock[0].sizeTitle)
            setSizeText(shop.informationBlock[0].sizeText)
            setFontWeightTitle(shop.informationBlock[0].fontWeightTitle) 
            setFontWeightText(shop.informationBlock[0].fontWeightText) 
            setShadowTitleX(shop.informationBlock[0].shadowTitleX)
            setShadowTitleY(shop.informationBlock[0].shadowTitleY) 
            setShadowTitleZ(shop.informationBlock[0].shadowTitleZ)
            setShadowTitleTransparency(shop.informationBlock[0].shadowTitleTransparency) 
            setShadowTextX(shop.informationBlock[0].shadowTextX)
            setShadowTextY(shop.informationBlock[0].shadowTextY) 
            setShadowTextZ(shop.informationBlock[0].shadowTextZ)
            setCheckTextAlign(shop.informationBlock[0].textAlign) 
            setShadowTextTransparency(shop.informationBlock[0].shadowTextTransparency) 

            setIsInformationBlock(true)
        }

        if (shop?.typeStore?.length) {
            setSelectTypeStore([...shop?.typeStore])
        }

    }, [shop])
    
    useEffect(() => {
        if (selectedLanguage?.length) {
            setNotFilledText(selectedLanguage?.userShopView?.userShopNotFilledText)
        }
    }, [selectedLanguage])

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
    
    const handleCreateBlockInfo = () => {
        let data = {
            ...shop,
            informationBlock: [{
               title: informationBlockTitle, 
               text: informationBlockText, 
               description: informationBlockDescription, 
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
        
        sendUpdateShop(data)
        setIsInformationBlock(true)
    }
    
    const handleCleanBlockInfo = () => {
        setInformationBlockTitle('') 
        setInformationBlockText('') 
        setInformationBlockDescription('') 
        setColorTitle('') 
        setColorText('')
        setColorBackground('') 
        setSizeTitle('18')
        setSizeText('16')
        setFontWeightTitle('600') 
        setFontWeightText('500') 
        setShadowTitleX('')
        setShadowTitleY('') 
        setShadowTitleZ('')
        setShadowTitleTransparency('100') 
        setShadowTextX('')
        setShadowTextY('') 
        setShadowTextZ('')
        setCheckTextAlign('start') 
        setShadowTextTransparency('100') 
        let data = {
            ...shop,
            informationBlock: [],
            token: user.token,
        }

        sendUpdateShop(data)
        setIsInformationBlock(false)
    }

    const handleCreateBlockAdvertising = () => {
        if (selectTypeStore?.length) {
            let data = {
                ...shop,
                typeStore: selectTypeStore,
                token: user.token,
            }

            sendUpdateShop(data)
        }
    }
    
    const handleCleanBlockAdvertising = () => {
        let data = {
            ...shop,
            typeStore: [],
            token: user.token,
        }

        sendUpdateShop(data)
        setSelectTypeStore([])
    }
   
    const handleSelectTypeStore = (id) => {
        if (selectTypeStore.includes(id)) {
            setSelectTypeStore([...selectTypeStore.filter(el => el !== id)])
        } else {
            setSelectTypeStore([...selectTypeStore, id])
        }
    }
    
    const sendUpdateShop = (data) => {
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
                    dispatch(setShop(data));
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

    return (
        <>
            {
                isNeedUpdateShop || isNeedCreateShop ? <CreationShop /> : (
                    <>
                        {
                            shop?.name && (
                                <div className="user-shop">
                                    <div className="user-shop--wrap container">
                                        <div className='user-shop__title'><b>{selectedLanguage?.userShopView?.userShopTitle}</b>&nbsp;{shop.name}</div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>{selectedLanguage?.userShopView?.userShopInfoName}&nbsp;</span>
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
                                            <span  className='user-shop__info-title'>{selectedLanguage?.userShopView?.userShopInfoTel}&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.contact_number ? shop.contact_number : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>{selectedLanguage?.userShopView?.userShopInfoTel2}&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.contact_number_two ? shop.contact_number_two : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>{selectedLanguage?.userShopView?.userShopInfoAddress}&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.location ? shop.location : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>{selectedLanguage?.userShopView?.userShopInfoCurrency}&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.currency ? shop.currency : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>{selectedLanguage?.userShopView?.userShopInfoLanguage}&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.language ? shop.language : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>{selectedLanguage?.userShopView?.userShopInfoDelivery}&nbsp;</span>
                                            <span  className='user-shop__info-text'>
                                                {
                                                    shop.deliveryMethods?.length ? shop.deliveryMethods.map((el, index) => (
                                                        <div>{index + 1}.&nbsp;{el}</div>
                                                    )) : notFilledText
                                                }
                                            </span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>{selectedLanguage?.userShopView?.userShopInfoPayment}&nbsp;</span>
                                            <span  className='user-shop__info-text'>
                                                {
                                                    shop.paymentMethods?.length ? shop.paymentMethods.map((el, index) => (
                                                        <div>{index + 1}.&nbsp;{el}</div>
                                                    )) : notFilledText
                                                }
                                            </span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>{selectedLanguage?.userShopView?.userShopInfoDescription}&nbsp;</span>
                                            <span  className='user-shop__info-text'>{shop.descriptionShop ? shop.descriptionShop : notFilledText}</span>
                                        </div>
                                        <div className='user-shop__info-wrap'>
                                            <span  className='user-shop__info-title'>{selectedLanguage?.userShopView?.userShopInfoLogo}&nbsp;</span>
                                            {shop.logo ? <img className='user-shop__info-logo' src={shop.logo} alt='img'/> : notFilledText}
                                        </div>
                                        
                                        <button className='user-shop__btn' onClick={() => handleUpdate()}>{selectedLanguage?.userShopView?.userShopEditBtn}</button>


                                        <div className="user-shop__section-wrap">
                                            <div className="user-shop__section-title">{selectedLanguage?.userShopView?.userShopBlockMainTitle}</div>
                                            
                                            <div className="user-shop__section">
                                                <div className="user-shop__section-input-wrap">
                                                    <label className='user-shop__section-input-label' htmlFor="informationBlockTitle">
                                                        <b>{selectedLanguage?.userShopView?.userShopBlockTitle}</b>
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
                                                        <b>{selectedLanguage?.userShopView?.userShopBlockText}</b>
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
                                                    
                                                    <label className='user-shop__section-input-label' htmlFor="informationBlockDescription">
                                                        <b>{selectedLanguage?.userShopView?.userShopBlockDescription}</b>
                                                    </label>
                                                    <textarea
                                                        id="informationBlockDescription"
                                                        name="informationBlockDescription"
                                                        type="text"
                                                        className='user-shop__section-textarea'
                                                        onChange={(e) => setInformationBlockDescription(e.target.value)}
                                                        value={informationBlockDescription}
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
                                                            <b>{selectedLanguage?.userShopView?.userShopBlockHeaderColor}</b>
                                                        </label>
                                                        
                                                        <label htmlFor="colorText">
                                                            <input 
                                                                type="color" 
                                                                id="colorText" 
                                                                name="colorText"
                                                                value={colorText}
                                                                onChange={(e) => setColorText(e.target.value)}
                                                            />
                                                            <b>{selectedLanguage?.userShopView?.userShopBlockTextColor}</b>
                                                        </label>
                                                        
                                                        <label htmlFor="colorBackground">
                                                            <input 
                                                                type="color" 
                                                                id="colorBackground" 
                                                                name="colorBackground"
                                                                value={colorBackground}
                                                                onChange={(e) => setColorBackground(e.target.value)}
                                                            />
                                                            <b>{selectedLanguage?.userShopView?.userShopBlockBackgroundColor}</b>
                                                        </label>
                                                    </div>

                                                    <div className='user-shop__section-number-wrap'>
                                                        <InputNumber label={selectedLanguage?.userShopView?.userShopBlockHeaderSize} id={"userShopViewSizeTitle"} name={"userShopViewSizeTitle"} value={sizeTitle} setValue={setSizeTitle} min={'1'}/>
                                                      
                                                        <InputNumber label={selectedLanguage?.userShopView?.userShopBlockHeaderThickness} id={"userShopViewFontWeightTitle"} name={"userShopViewFontWeightTitle"} value={fontWeightTitle} setValue={setFontWeightTitle} min={'100'} max={'900'} step={'100'}/>

                                                        <InputNumber label={selectedLanguage?.userShopView?.userShopBlockTextSize} id={"userShopViewSizeText"} name={"userShopViewSizeText"} value={sizeText} setValue={setSizeText} min={'1'}/>

                                                        <InputNumber label={selectedLanguage?.userShopView?.userShopBlockTextThickness} id={"userShopViewFontWeightText"} name={"userShopViewFontWeightText"} value={fontWeightText} setValue={setFontWeightText} min={'100'} max={'900'} step={'100'}/>

                                                    </div>

                                                    <p><b>{selectedLanguage?.userShopView?.userShopBlockTextAlign}</b></p>
                                                    <div className="user-shop__section-checkbox-wrap">
                                                        <input className="user-shop__section-checkbox" onChange={() => setCheckTextAlign('start')} checked={checkTextAlign == 'start' ? true : false} type="radio" id="checkboxTextStar" name="checkboxTextAlign" />
                                                        <label className="user-shop__section-input-label" htmlFor="checkboxTextStar">{selectedLanguage?.userShopView?.userShopBlockCheckboxStart}</label>
                                                        <input className="user-shop__section-checkbox" onChange={() => setCheckTextAlign('center')} checked={checkTextAlign == 'center' ? true : false} type="radio" id="checkboxTextCenter" name="checkboxTextAlign" />
                                                        <label className="user-shop__section-input-label" htmlFor="checkboxTextCenter">{selectedLanguage?.userShopView?.userShopBlockCheckboxCenter}</label>
                                                        <input className="user-shop__section-checkbox" onChange={() => setCheckTextAlign('end')} checked={checkTextAlign == 'end' ? true : false} type="radio" id="checkboxTextEnd" name="checkboxTextAlign" />
                                                        <label className="user-shop__section-input-label" htmlFor="checkboxTextEnd">{selectedLanguage?.userShopView?.userShopBlockCheckboxEnd}</label>
                                                    </div>

                                                    <p className="user-shop__section-shadow-title"><b>{selectedLanguage?.userShopView?.userShopBlockTitleShadow}</b></p>
                                                    <div className="user-shop__section-shadow-wrap">
                                                        <InputNumber label={selectedLanguage?.userShopView?.userShopBlockShadowX}  id={"userShopViewShadowTitleX"} name={"userShopViewShadowTitleX"} value={shadowTitleX} setValue={setShadowTitleX} />

                                                        <InputNumber label={selectedLanguage?.userShopView?.userShopBlockShadowY} id={"userShopViewShadowTitleY"} name={"userShopViewShadowTitleY"} value={shadowTitleY} setValue={setShadowTitleY} />

                                                        <InputNumber label={selectedLanguage?.userShopView?.userShopBlockShadowZ} id={"userShopViewShadowTitleZ"} name={"userShopViewShadowTitleZ"} value={shadowTitleZ} setValue={setShadowTitleZ} />
                                                       
                                                        <InputNumber label={selectedLanguage?.userShopView?.userShopBlockShadowTransparency} id={"userShopViewShadowTitleTransparency"} name={"userShopViewShadowTitleTransparency"} value={shadowTitleTransparency} setValue={setShadowTitleTransparency} />
                                                    </div>
                                                   
                                                    <p className="user-shop__section-shadow-title"><b>{selectedLanguage?.userShopView?.userShopBlockTextShadow}</b></p>

                                                    <div className="user-shop__section-shadow-wrap">
                                                        <InputNumber label={selectedLanguage?.userShopView?.userShopBlockShadowX} id={"userShopViewShadowTextX"} name={"userShopViewShadowTextX"} value={shadowTextX} setValue={setShadowTextX} />
                                                      
                                                        <InputNumber label={selectedLanguage?.userShopView?.userShopBlockShadowY} id={"userShopViewShadowTextY"} name={"userShopViewShadowTextY"} value={shadowTextY} setValue={setShadowTextY} />
                                                      
                                                        <InputNumber label={selectedLanguage?.userShopView?.userShopBlockShadowZ} id={"userShopViewShadowTextZ"} name={"userShopViewShadowTextZ"} value={shadowTextZ} setValue={setShadowTextZ} />
                                                       
                                                        <InputNumber label={selectedLanguage?.userShopView?.userShopBlockShadowTransparency} id={"userShopViewShadowTextTransparency"} name={"userShopViewShadowTextTransparency"} value={shadowTextTransparency} setValue={setShadowTextTransparency} />
                                                    </div>
                                                </div>

                                                <div className='user-shop__section-btn-wrap'>
                                                    <button className='user-shop__section-btn' onClick={() => handleCleanBlockInfo()}>{selectedLanguage?.userShopView?.userShopBlockRemoveBtn}</button>
                                                    <button className='user-shop__section-btn' onClick={() => handleCreateBlockInfo()}>{isInformationBlock ? selectedLanguage?.userShopView?.userShopBlockUpdateBtn : selectedLanguage?.userShopView?.userShopBlockCreateBtn}</button>
                                                    <div onClick={() => handleHelpOpen(1)} className='user-shop__section-btn-info-wrap'>
                                                        <div className={`user-shop__section-btn-info ${arrIsOpenInfo.includes(1) ? 'user-shop__section-btn-info--active' : ''}`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`user-shop__section-info ${arrIsOpenInfo.includes(1) ? 'user-shop__section-info--active' : ''}`}>
                                                <p>{selectedLanguage?.userShopView?.userShopBlockInstruction}</p>
                                            </div>
                                            

                                            {
                                                !!informationBlockTitle?.length || !!informationBlockText?.length ? <div>
                                                    <p className='user-shop__information-title'>{selectedLanguage?.userShopView?.userShopBlockViewTitle}</p>
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

                                        <div className="user-shop__section-wrap">
                                            <div className="user-shop__section-title">Блок реклами</div>
                                            
                                            <div className="user-shop__section user-shop__section-advertising">
                                                <div className="user-shop__section-advertising-checkbox-wrap">
                                                    {
                                                        !!userTypeStore[shop?.language]?.length &&  userTypeStore[shop?.language]?.map(el => (
                                                            <div className="user-shop__section-checkbox" key={el.id}><input onChange={() => handleSelectTypeStore(el.id)} checked={selectTypeStore.includes(el.id) ? true : false} type="checkbox" name={el.name} id={el.id + el.name}/><label className="user-shop__section-checkbox-label" htmlFor={el.id + el.name}>{el.name}</label></div>
                                                        ))
                                                    }
                                                </div>

                                                <div className='user-shop__section-btn-wrap'>
                                                    <div className='user-shop__section-btn-add-wrap'>
                                                        <button className='user-shop__section-btn' onClick={() => handleCleanBlockAdvertising()}>{selectedLanguage?.userShopView?.userShopBlockRemoveBtn}</button>
                                                        <button className='user-shop__section-btn' onClick={() => handleCreateBlockAdvertising()}>{shop?.typeStore?.length ? selectedLanguage?.userShopView?.userShopBlockUpdateBtn : selectedLanguage?.userShopView?.userShopBlockCreateBtn}</button>
                                                    </div>
                                                    <div onClick={() => handleHelpOpen(2)} className='user-shop__section-btn-info-wrap'>
                                                        <div className={`user-shop__section-btn-info ${arrIsOpenInfo.includes(2) ? 'user-shop__section-btn-info--active' : ''}`}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`user-shop__section-info ${arrIsOpenInfo.includes(2) ? 'user-shop__section-info--active' : ''}`}>
                                                <p>Виберіть ті категорії до яких відноситься ваш магазин. Відповідно в блоці реклами будуть тільки ті магазини, які не мають вибраної такоїж категорії. Чим більше вибраних категорій, тим менше магазинів відображатиметься. Менше магазинів - значить менше конкурентів, но і менше шансів залучити нових клієнтів з інших магазинів.</p>
                                            </div>

                                            <div className='user-shop__advertising-title'>Вигляд блоку реклами</div>

                                            {
                                                !!shop?.typeStore?.length && <AdvertisingBlock />
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

export default UserShopView;