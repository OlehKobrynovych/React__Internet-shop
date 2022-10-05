import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserShop.css';
import editIcon from './../../assets/images/editIcon.svg';


function UserShop() {
    // const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenInfo, setisOpenInfo] = useState([]);
    const [name, setName] = useState([]);
    const [facebook_url, setFacebook_url] = useState([]);
    const [instagram_url, setInstagram_url] = useState([]);
    // console.log(categories)

    useEffect(() => {
  
    }, [])

    const handleClick = (num) => {
        if (isOpenInfo.includes(num)) {
            setisOpenInfo(isOpenInfo.filter(el => el !== num))
        } else {
            setisOpenInfo([...isOpenInfo, num])
        }
    }

    return (
        <div className="user-shop">
            <div className="user-shop--wrpa container">
                <div className="user-shop__section">
                    <div className="user-shop__section-input-wrap">
                        <label className='user-shop__section-input-label' htmlFor="name">
                            <b>Ім'я магазину</b>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className='user-shop__section-input'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Введіть ім'я магазину..."
                        />
                    </div>

                    <div className='user-shop__section-info-wrap'>
                        <b className='user-shop__section-info-title'>Імя Вашого магазину:</b>
                        <span className='user-shop__section-info-text'>	&nbsp;{name}</span>
                    </div>

                    <div onClick={() => handleClick(1)} className='user-shop__section-btn-wrap'>
                        <div className={`user-shop__section-btn ${isOpenInfo.includes(1) ? 'user-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`user-shop__section-info ${isOpenInfo.includes(1) ? 'user-shop__section-info--active' : ''}`}>
                    <p>Введіть ім'я магазину.</p>
                </div>
                
                <div className="user-shop__section">
                    <div className="user-shop__section-input-wrap">
                        <label className='user-shop__section-input-label' htmlFor="facebook_url">
                            <b>Facebook</b>
                        </label>
                        <input
                            id="facebook_url"
                            name="facebook_url"
                            type="text"
                            required
                            className='user-shop__section-input'
                            onChange={(e) => setFacebook_url(e.target.value)}
                            value={facebook_url}
                            placeholder="Введіть facebook url..."
                        />
                    </div>
                    <div onClick={() => handleClick(2)} className='user-shop__section-btn-wrap'>
                        <div className={`user-shop__section-btn ${isOpenInfo.includes(2) ? 'user-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`user-shop__section-info ${isOpenInfo.includes(2) ? 'user-shop__section-info--active' : ''}`}>
                    <p>Введіть url адресу сторінки facebook, щоб Ваші клієнти мали змогу контактувати і стежити за Вашими публікаціями.</p>
                </div>
                
                <div className="user-shop__section">
                    <div className="user-shop__section-input-wrap">
                        <label className='user-shop__section-input-label' htmlFor="instagram_url">
                            <b>Instagram</b>
                        </label>
                        <input
                            id="instagram_url"
                            name="instagram_url"
                            type="text"
                            required
                            className='user-shop__section-input'
                            onChange={(e) => setInstagram_url(e.target.value)}
                            value={instagram_url}
                            placeholder="Введіть instagram url..."
                        />
                    </div>
                    <div onClick={() => handleClick(3)} className='user-shop__section-btn-wrap'>
                        <div className={`user-shop__section-btn ${isOpenInfo.includes(3) ? 'user-shop__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`user-shop__section-info ${isOpenInfo.includes(3) ? 'user-shop__section-info--active' : ''}`}>
                    <p>Введіть url адресу сторінки instagram, щоб Ваші клієнти мали змогу контактувати і стежити за Вашими публікаціями.</p>
                </div>


                <button  className='user-shop__btn'>Створити</button>

            </div>

             {/* <div className='user-shop__input-btn-wrap'>
                        <button className='user-shop__input-btn'><img className='user-shop__input-btn-img' src={editIcon} alt="img"/></button>
            </div> */}
        </div>
    );
}

export default UserShop;