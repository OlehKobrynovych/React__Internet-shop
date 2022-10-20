import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreationShop.css';
import editIcon from './../../assets/images/editIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNeedCreateShop, setIsNeedUpdateShop, setShop } from '../../store/userSlice';
import { toast } from 'react-toastify';


function CreationShop() {
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const isNeedCreateShop = useSelector(state => state.userSlice.isNeedCreateShop);
    const isNeedUpdateShop = useSelector(state => state.userSlice.isNeedUpdateShop);
    const [isOpenInfo, setisOpenInfo] = useState([]);
    const [name, setName] = useState('');
    const [facebook_url, setFacebook_url] = useState('');
    const [instagram_url, setInstagram_url] = useState('');
    const [contact_number, setContact_number] = useState('');
    const [contact_number_two, setContact_number_two] = useState('');
    const [location, setLocation] = useState('');
    const [deliveryMethods, setDeliveryMethods] = useState('');
    const [paymentMethods, setPaymentMethods] = useState('');
    const [descriptionShop, setDescriptionShop] = useState('');
    const [checkedLanguage, setCheckedLanguage] = useState('UA');
    const [currency, setCurrency] = useState('');
    const [logo, setLogo] = useState('');
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    // console.log(shop)

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
            setDeliveryMethods(shop.deliveryMethods);
            setPaymentMethods(shop.paymentMethods);
            setDescriptionShop(shop.descriptionShop);
        }
    }, [isNeedUpdateShop])

    const handleHelpOpen = (num) => {
        if (isOpenInfo.includes(num)) {
            setisOpenInfo(isOpenInfo.filter(el => el !== num))
        } else {
            setisOpenInfo([...isOpenInfo, num])
        }
    }

    const handleReturn = () => {
        dispatch(setIsNeedUpdateShop(false))
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
            // console.log('data1111', shop._id)
            fetch(`http://localhost:3000/api/shops/${shop._id}`, {
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
                        console.log('PUT CreationShop:', res)
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
                .finally(() => {
                    dispatch(setIsNeedUpdateShop(false)) 
                });
        } else {
            fetch('http://localhost:3000/api/shops/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        dispatch(setShop(res.data))
                        toast.success('Магазин створено', {
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
                        console.log('POST CreationShop', res)
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
                .finally(() => {
                    dispatch(setIsNeedCreateShop(false)); 
                });
        }
    }

    return (
        <div className="creation-shop">
            <div className="creation-shop--wrpa container">
                {
                    isNeedCreateShop ? <p className="creation-shop__title">Створення магазину</p> : <p className="creation-shop__title">Оновлення магазину</p>
                }

                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <label className='creation-shop__section-input-label' htmlFor="name">
                            <b>Ім'я магазину</b>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className='creation-shop__section-input'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Введіть ім'я магазину..."
                        />
                    </div>

                    {/* <div className='creation-shop__section-info-wrap'>
                        <b className='creation-shop__section-info-title'>Імя Вашого магазину:</b>
                        <span className='creation-shop__section-info-text'>	&nbsp;{name}</span>
                    </div> */}

                    <div onClick={() => handleHelpOpen(1)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${isOpenInfo.includes(1) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${isOpenInfo.includes(1) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>Введіть ім'я магазину.</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <label className='creation-shop__section-input-label' htmlFor="facebook_url">
                            <b>Facebook</b>
                        </label>
                        <input
                            id="facebook_url"
                            name="facebook_url"
                            type="text"
                            className='creation-shop__section-input'
                            onChange={(e) => setFacebook_url(e.target.value)}
                            value={facebook_url}
                            placeholder="Введіть facebook url..."
                        />
                    </div>
                    <div onClick={() => handleHelpOpen(2)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${isOpenInfo.includes(2) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${isOpenInfo.includes(2) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>Введіть url адресу сторінки facebook, щоб Ваші клієнти мали змогу контактувати і стежити за Вашими публікаціями.</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <label className='creation-shop__section-input-label' htmlFor="instagram_url">
                            <b>Instagram</b>
                        </label>
                        <input
                            id="instagram_url"
                            name="instagram_url"
                            type="text"
                            className='creation-shop__section-input'
                            onChange={(e) => setInstagram_url(e.target.value)}
                            value={instagram_url}
                            placeholder="Введіть instagram url..."
                        />
                    </div>
                    <div onClick={() => handleHelpOpen(3)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${isOpenInfo.includes(3) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${isOpenInfo.includes(3) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>Введіть url адресу сторінки instagram, щоб Ваші клієнти мали змогу контактувати і стежити за Вашими публікаціями.</p>
                </div>
      
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <label className='creation-shop__section-input-label' htmlFor="contact_number">
                            <b>Телефон для контакту</b>
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
                            placeholder="Телефон..."
                        />
                    </div>
                    <div onClick={() => handleHelpOpen(4)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${isOpenInfo.includes(4) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${isOpenInfo.includes(4) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>Введіть телефон за яким клієнти зможуть з Вами звязатись. В форматі ХХХ-ХХХ-ХХХХ</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <label className='creation-shop__section-input-label' htmlFor="contact_number_two">
                            <b>Додатковий телефон для контакту</b>
                        </label>
                        <input
                            id="contact_number_two"
                            name="contact_number_two"
                            type="tel"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            className='creation-shop__section-input'
                            onChange={(e) => setContact_number_two(e.target.value)}
                            value={contact_number_two}
                            placeholder="Телефон..."
                        />
                    </div>
                    <div onClick={() => handleHelpOpen(5)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${isOpenInfo.includes(5) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${isOpenInfo.includes(5) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>Введіть додатковий телефон за яким клієнти зможуть з Вами звязатись. В форматі ХХХ-ХХХ-ХХХХ</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <label className='creation-shop__section-input-label' htmlFor="location">
                            <b>Адреса магазину</b>
                        </label>
                        <textarea
                            id="location"
                            name="location"
                            type="text"
                            className='creation-shop__section-textarea'
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                            placeholder="Адрес..."
                            rows="5" 
                            cols="50"
                        />
                    </div>
                    <div onClick={() => handleHelpOpen(6)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${isOpenInfo.includes(6) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${isOpenInfo.includes(6) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>Введіть адресу Вашого магазину</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <label className='creation-shop__section-input-label' htmlFor="deliveryMethods">
                            <b>Доставка</b>
                        </label>
                        <textarea
                            id="deliveryMethods"
                            name="deliveryMethods"
                            type="text"
                            className='creation-shop__section-textarea'
                            onChange={(e) => setDeliveryMethods(e.target.value)}
                            value={deliveryMethods}
                            placeholder="Доставка..."
                            rows="5" 
                            cols="50"
                        />
                    </div>
                    <div onClick={() => handleHelpOpen(7)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${isOpenInfo.includes(7) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${isOpenInfo.includes(7) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>Введіть способи доставки товару у Вашому магазині</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <label className='creation-shop__section-input-label' htmlFor="paymentMethods">
                            <b>Оплата</b>
                        </label>
                        <textarea
                            id="paymentMethods"
                            name="paymentMethods"
                            type="text"
                            className='creation-shop__section-textarea'
                            onChange={(e) => setPaymentMethods(e.target.value)}
                            value={paymentMethods}
                            placeholder="Оплата..."
                            rows="5" 
                            cols="50"
                        />
                    </div>
                    <div onClick={() => handleHelpOpen(8)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${isOpenInfo.includes(8) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${isOpenInfo.includes(8) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>Введіть способи оплати товару у Вашому магазині</p>
                </div>
        
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <label className='creation-shop__section-input-label' htmlFor="descriptionShop">
                            <b>Опис</b>
                        </label>
                        <textarea
                            id="descriptionShop"
                            name="descriptionShop"
                            type="text"
                            className='creation-shop__section-textarea'
                            onChange={(e) => setDescriptionShop(e.target.value)}
                            value={descriptionShop}
                            placeholder="Введіть опис..."
                            rows="5" 
                            cols="50"
                        />
                    </div>
                    <div onClick={() => handleHelpOpen(9)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${isOpenInfo.includes(9) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${isOpenInfo.includes(9) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>Введіть декілька слів про Ваш магазин.</p>
                </div>
               
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <label className='creation-shop__section-input-label' htmlFor="currency">
                            <b>Валюта</b>
                        </label>
                        <input
                            id="currency"
                            name="currency"
                            type="text"
                            className='creation-shop__section-input'
                            onChange={(e) => setCurrency(e.target.value)}
                            value={currency}
                            placeholder="Введіть опис..."
                        />
                    </div>
                    <div onClick={() => handleHelpOpen(10)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${isOpenInfo.includes(10) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${isOpenInfo.includes(10) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>Введіть валюту в якій будуть зазначені ціни на товар, в форматі $ € ₴ ...</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <b>Мова</b>
                        <label className="creation-shop__section-input-check-label">UA
                            <input onChange={() => setCheckedLanguage('UA')} type="radio" checked={checkedLanguage == 'UA'} name="radio"/>
                        </label>
                        <label className="creation-shop__section-input-check-label">ENG
                            <input onChange={() => setCheckedLanguage('ENG')} type="radio" checked={checkedLanguage == 'ENG'} name="radio"/>
                        </label>
                    </div>
                    <div onClick={() => handleHelpOpen(11)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${isOpenInfo.includes(11) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${isOpenInfo.includes(11) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>Виберіть мову на якій буде Ваш магазин</p>
                </div>
                
                <div className="creation-shop__section">
                    <div className="creation-shop__section-input-wrap">
                        <div><b>Логотип</b></div>
                        <input className="creation-shop__section-input-file" onChange={(e) => setLogo(e.target.value)} type="file" id="file1" />
                    </div>
                    <div onClick={() => handleHelpOpen(12)} className='creation-shop__section-btn-wrap'>
                        <div className={`creation-shop__section-btn ${isOpenInfo.includes(12) ? 'creation-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-shop__section-info ${isOpenInfo.includes(12) ? 'creation-shop__section-info--active' : ''}`}>
                    <p>Виберіть логотип Вашого магазину</p>
                </div>

                <div className='creation-shop__btn-wrap'>
                    {
                         isNeedUpdateShop && <button className='creation-shop__btn' onClick={handleReturn}>Відмінити</button>
                    }
                  
                    <button className='creation-shop__btn' onClick={handleSend}>
                        {
                            isNeedUpdateShop ? 'Оновити' : 'Створити'
                        }
                    </button>
                </div>
{/* 
                <button onClick={handleSend}  className='creation-shop__btn'>
                    {
                        isNeedUpdateShop ? 'Оновити' : 'Створити'
                    }
                </button> */}
            </div>
        </div>
    );
}

export default CreationShop;