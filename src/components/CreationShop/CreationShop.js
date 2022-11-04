import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreationShop.css';
import deleteImg from './../../assets/images/deleteImg.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNeedCreateShop, setIsNeedUpdateShop, setShop } from '../../store/userSlice';
import { toast } from 'react-toastify';
import InputText from '../InputText/InputText';
import InputTextarea from '../InputTextarea/InputTextarea';


function CreationShop() {
    const selectedLanguage = useSelector(state => state.userSlice.selectedLanguage);
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const isNeedCreateShop = useSelector(state => state.userSlice.isNeedCreateShop);
    const isNeedUpdateShop = useSelector(state => state.userSlice.isNeedUpdateShop);
    const [arrIsOpenInfo, setArrIsOpenInfo] = useState([]);
    const [name, setName] = useState('');
    const [facebook_url, setFacebook_url] = useState('');
    const [instagram_url, setInstagram_url] = useState('');
    const [contact_number, setContact_number] = useState('');
    const [contact_number_two, setContact_number_two] = useState('');
    const [location, setLocation] = useState('');
    const [deliveryMethods, setDeliveryMethods] = useState([]);
    const [newDeliveryMethods, setNewDeliveryMethods] = useState('');
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [newPaymentMethods, setNewPaymentMethods] = useState('');
    const [descriptionShop, setDescriptionShop] = useState('');
    const [checkedLanguage, setCheckedLanguage] = useState('UA');
    const [currency, setCurrency] = useState('');
    const [logo, setLogo] = useState('');
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    console.log(shop)

    useEffect(() => {
        if (isNeedUpdateShop) {
            setName(shop.name);
            setFacebook_url(shop.facebook_url);
            setInstagram_url(shop.instagram_url);
            setContact_number(shop.contact_number);
            setContact_number_two(shop.contact_number_two);
            setLocation(shop.location);
            // setOwner_id(shop._id);
            setCurrency(shop.currency);
            setLogo(shop.logo);
            setCheckedLanguage(shop.language);
            setDeliveryMethods([...shop.deliveryMethods]);
            setPaymentMethods([...shop.paymentMethods]);
            setDescriptionShop(shop.descriptionShop);
        }
    }, [isNeedUpdateShop])

    const handleHelpOpen = (num) => {
        if (arrIsOpenInfo.includes(num)) {
            setArrIsOpenInfo(arrIsOpenInfo.filter(el => el !== num))
        } else {
            setArrIsOpenInfo([...arrIsOpenInfo, num])
        }
    }

    const handleReturn = () => {
        dispatch(setIsNeedUpdateShop(false))
    }
    
    const handleSetDeliveryMethods = () => {
        if (newDeliveryMethods?.length) {
            setDeliveryMethods([...deliveryMethods, newDeliveryMethods])
            setNewDeliveryMethods('')
        }
    }
    
    const handleSetPaymentMethods = () => {
        if (newPaymentMethods?.length) {
            setPaymentMethods([...paymentMethods, newPaymentMethods])
            setNewPaymentMethods('')
        }
    }
   
    const handleDeleteMethod = (el) => {
        setDeliveryMethods([...deliveryMethods.filter(ell => ell !== el)])
    }
    
    const handleDeletePayment = (el) => {
        setPaymentMethods([...paymentMethods.filter(ell => ell !== el)])
    }
    
    const handleSend = () => {
        let data = {
            _id: shop._id,
            name: name,
            facebook_url: facebook_url,
            instagram_url: instagram_url,
            contact_number: contact_number,
            contact_number_two: contact_number_two,
            location: location,
            owner_id: user._id,
            currency: currency,
            logo: logo,
            language: checkedLanguage,
            deliveryMethods: deliveryMethods,
            paymentMethods: paymentMethods,
            descriptionShop: descriptionShop,
            token: user.token,
        }

        if (isNeedUpdateShop) {
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
                        showMessage('success', 'Дані оновлено')
                    } else {
                        console.log('PUT CreationShop:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    showMessage('error', 'Сталася помилка')
                })
                .finally(() => {
                    dispatch(setIsNeedUpdateShop(false)) 
                });
        } else {
            fetch(`${process.env.REACT_APP_BASE_URL}/shops/`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({...data, creationTime: new Date().toLocaleString()}),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        dispatch(setShop(res.data))
                        showMessage('success', 'Магазин створено')
                    } else {
                        console.log('POST CreationShop', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    showMessage('error', 'Сталася помилка')
                })
                .finally(() => {
                    dispatch(setIsNeedCreateShop(false)); 
                });
        }
    }

    const showMessage = (event, message) => {
        if (event == "success") {
            toast.success(message, {
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
            toast.error(message, {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div className="creation-shop">
            <div className="creation-shop--wrpa container">
                {
                    isNeedCreateShop ? <p className="creation-shop__title">{selectedLanguage?.creationShop?.creationShopTitle1}</p> : <p className="creation-shop__title">{selectedLanguage?.creationShop?.creationShopTitle2}</p>
                }

                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <InputText setValue={setName} value={name} id={'creationShopName'} name={'creationShopName'} label={selectedLanguage?.creationShop?.creationShopInputNameLabel} placeholder={selectedLanguage?.creationShop?.creationShopInputNamePlaceholder}/>
                    </div>
                    <div onClick={() => handleHelpOpen(1)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${arrIsOpenInfo.includes(1) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${arrIsOpenInfo.includes(1) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationShop?.creationShopNameInfo}</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <InputText setValue={setFacebook_url} value={facebook_url} id={'creationShopFacebook_url'} name={'creationShopFacebook_url'} label={'Facebook'} placeholder={selectedLanguage?.creationShop?.creationShopInputFacebookPlaceholder}/>
                    </div>
                    <div onClick={() => handleHelpOpen(2)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${arrIsOpenInfo.includes(2) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${arrIsOpenInfo.includes(2) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationShop?.creationShopFacebookInfo}</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <InputText setValue={setInstagram_url} value={instagram_url} id={'creationShopInstagram_url'} name={'creationShopInstagram_url'} label={'Instagram'} placeholder={selectedLanguage?.creationShop?.creationShopInputInstagramPlaceholder}/>
                    </div>
                    <div onClick={() => handleHelpOpen(3)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${arrIsOpenInfo.includes(3) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${arrIsOpenInfo.includes(3) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationShop?.creationShopInstagramInfo}</p>
                </div>
      
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <label className='creation-shop__section-input-label' htmlFor="contact_number">
                            <b>{selectedLanguage?.creationShop?.creationShopInputTelLabel}</b>
                        </label>
                        <input
                            id="contact_number"
                            name="contact_number"
                            type="tel"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            required
                            className='creation-shop__section-input'
                            onChange={(e) => setContact_number(e.target.value)}
                            value={contact_number}
                            placeholder={selectedLanguage?.creationShop?.creationShopInputTelPlaceholder}
                        />
                    </div>
                    <div onClick={() => handleHelpOpen(4)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${arrIsOpenInfo.includes(4) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${arrIsOpenInfo.includes(4) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationShop?.creationShopTelInfo}</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <label className='creation-shop__section-input-label' htmlFor="contact_number_two">
                            <b>{selectedLanguage?.creationShop?.creationShopInputTel2Label}</b>
                        </label>
                        <input
                            id="contact_number_two"
                            name="contact_number_two"
                            type="tel"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            className='creation-shop__section-input'
                            onChange={(e) => setContact_number_two(e.target.value)}
                            value={contact_number_two}
                            placeholder={selectedLanguage?.creationShop?.creationShopInputTel2Placeholder}
                        />
                    </div>
                    <div onClick={() => handleHelpOpen(5)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${arrIsOpenInfo.includes(5) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${arrIsOpenInfo.includes(5) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationShop?.creationShopTel2Info}</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <InputTextarea setValue={setLocation} value={location} id={'creationShopLocation'} name={'creationShopLocation'} label={selectedLanguage?.creationShop?.creationShopInputAddressLabel} placeholder={selectedLanguage?.creationShop?.creationShopInputAddressPlaceholder} rows={'5'} cols={'50'}/>
                    </div>
                    <div onClick={() => handleHelpOpen(6)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${arrIsOpenInfo.includes(6) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${arrIsOpenInfo.includes(6) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationShop?.creationShopAddressInfo}</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <div  className='creation-shop__section-textarea-wrap'>
                            <InputTextarea setValue={setNewDeliveryMethods} value={newDeliveryMethods} id={'creationShopNewDeliveryMethods'} name={'creationShopNewDeliveryMethods'} label={selectedLanguage?.creationShop?.creationShopInputDeliveryLabel} placeholder={selectedLanguage?.creationShop?.creationShopInputDeliveryPlaceholder} rows={'1'} cols={'50'}/>
                            <button onClick={handleSetDeliveryMethods} className='creation-shop__create-btn'>+</button>
                        </div>

                        <ul className='creation-shop__delivery-methods'>
                            {
                                deliveryMethods?.length && deliveryMethods.map((el, index) => (
                                    <li className='creation-shop__delivery-method' key={index + el}>
                                        <img onClick={() => handleDeleteMethod(el)} className='creation-shop__btn-del' src={deleteImg} alt='img'/>
                                        <span>{index + 1}.&nbsp;{el}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div onClick={() => handleHelpOpen(7)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${arrIsOpenInfo.includes(7) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${arrIsOpenInfo.includes(7) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationShop?.creationShopDeliveryInfo}</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <div  className='creation-shop__section-textarea-wrap'>
                            <InputTextarea setValue={setNewPaymentMethods} value={newPaymentMethods} id={'creationShopNewPaymentMethods'} name={'creationShopNewPaymentMethods'} label={selectedLanguage?.creationShop?.creationShopInputPaymentLabel} placeholder={selectedLanguage?.creationShop?.creationShopInputPaymentPlaceholder} rows={'1'} cols={'50'}/>
                           <button onClick={handleSetPaymentMethods} className='creation-shop__create-btn'>+</button>
                        </div>

                        <ul className='creation-shop__payment-methods'>
                            {
                                paymentMethods?.length && paymentMethods.map((el, index) => (
                                    <li className='creation-shop__payment-method' key={index + el}>
                                        <img onClick={() => handleDeletePayment(el)} className='creation-shop__btn-del' src={deleteImg} alt='img'/>
                                        <span>{index + 1}.&nbsp;{el}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div onClick={() => handleHelpOpen(8)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${arrIsOpenInfo.includes(8) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-in{selectedLanguage?.creationShop?.creationShopPaymentInfo}fo ${arrIsOpenInfo.includes(8) ? 'creation-shop__section-info--active' : ''}`}>
                    <p></p>
                </div>
        
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <InputTextarea setValue={setDescriptionShop} value={descriptionShop} id={'creationShopDescriptionShop'} name={'creationShopDescriptionShop'} label={selectedLanguage?.creationShop?.creationShopInputDescriptionLabel} placeholder={selectedLanguage?.creationShop?.creationShopInputDescriptionPlaceholder} rows={'5'} cols={'50'}/>
                    </div>
                    <div onClick={() => handleHelpOpen(9)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${arrIsOpenInfo.includes(9) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${arrIsOpenInfo.includes(9) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationShop?.creationShopDescriptionInfo}</p>
                </div>
               
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <InputText setValue={setCurrency} value={currency} id={'creationShopCurrency'} name={'creationShopInstagram_url'} label={selectedLanguage?.creationShop?.creationShopInputCurrencyLabel}/>
                    </div>
                    <div onClick={() => handleHelpOpen(10)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${arrIsOpenInfo.includes(10) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${arrIsOpenInfo.includes(10) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationShop?.creationShopCurrencyInfo}</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <b>{selectedLanguage?.creationShop?.creationShopInputLanguageLabel}</b>
                        <label className="creation-shop__section-input-check-label">UA
                            <input onChange={() => setCheckedLanguage('UA')} type="radio" checked={checkedLanguage == 'UA'} name="radio"/>
                        </label>
                        <label className="creation-shop__section-input-check-label">ENG
                            <input onChange={() => setCheckedLanguage('ENG')} type="radio" checked={checkedLanguage == 'ENG'} name="radio"/>
                        </label>
                    </div>
                    <div onClick={() => handleHelpOpen(11)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${arrIsOpenInfo.includes(11) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${arrIsOpenInfo.includes(11) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationShop?.creationShopLanguageInfo}</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <div><b>{selectedLanguage?.creationShop?.creationShopInputLogoLabel}</b></div>
                        <input className="creation-shop__section-input-file" onChange={(e) => setLogo(e.target.value)} type="file" id="file1" />
                    </div>
                    <div onClick={() => handleHelpOpen(12)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${arrIsOpenInfo.includes(12) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${arrIsOpenInfo.includes(12) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationShop?.creationShopLogoInfo}</p>
                </div>

                <div className='creation-shop__btn-wrap'>
                    {
                         isNeedUpdateShop && <button className='creation-shop__btn' onClick={handleReturn}>{selectedLanguage?.creationShop?.creationShopCancelBtn}</button>
                    }
                  
                    <button className='creation-shop__btn' onClick={handleSend}>
                        {
                            isNeedUpdateShop ? selectedLanguage?.creationShop?.creationShopUpdateBtn : selectedLanguage?.creationShop?.creationShopCreateBtn
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreationShop;