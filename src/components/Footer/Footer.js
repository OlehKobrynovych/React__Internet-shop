import './Footer.css';

import instagram from '../../assets/images/instagram.svg';
import facebook from '../../assets/images/facebook.svg';
import logo from '../../assets/images/logo.svg';
import {datas} from '../../data.js'

// import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import ModalWindow from '../ModalWindow/ModalWindow';

function Footer() {
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const shop = useSelector(state => state.homeSlice.shop);
    const categories = useSelector(state => state.homeSlice.categories);
    const [isModalCallMe, setIsModalCallMe] = useState(false);
    const [contactNumber, setContactNumber] = useState('');
    const [comentar, setComentar] = useState('');
    const [mail, setMail] = useState('');
    const mailRef = useRef(null);

    // const [isOpen, setIsOpen] = useState(false);
    // const navigate = useNavigate();
    // console.log(contactNumber)

    const handleIsCallMe = (boolean) => {
        if (boolean) {
            // відправка повідомлення доробити
        }   else {
            setContactNumber('')
            setComentar('')
            setIsModalCallMe(!isModalCallMe)
        }
    };
   
    const handleSendMail = () => {
        if (mail?.length) {
            // відправка повідомлення доробити
            setMail('')
        }   else {
            mailRef.current.focus()
        }
    };

    // useEffect(() => {
    //     setShopCategories(categories.filter(el => el.parent_id == 'null'))
    // }, [categories])
   
    return (
        <div className="footer hidden">

            {
                isModalCallMe && <ModalWindow title={'Вкажіть свій телефон'}  text={'Ми обов\'язково передзвонимо'} handleClick={handleIsCallMe} leftBtn={"Відмінити"} rightBtn={"Підтвердити"}>
                                        <label className='footer__modal-input-label' htmlFor="contactNumber">
                                            <b>Телефон для контакту</b>
                                        </label>
                                        <input
                                            id="contactNumber"
                                            name="contactNumber"
                                            type="tel"
                                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                            required
                                            className='footer__modal-input'
                                            onChange={(e) => setContactNumber(e.target.value)}
                                            value={contactNumber}
                                            placeholder="Телефон..."
                                        />
                                        <label className='footer__modal-input-label' htmlFor="comentar">
                                            <b>Залиште коментар</b>
                                        </label>
                                        <textarea
                                            id="comentar"
                                            name="comentar"
                                            type="text"
                                            className='footer__modal-textarea'
                                            onChange={(e) => setComentar(e.target.value)}
                                            value={comentar}
                                            placeholder="Коментар..."
                                            rows="5" 
                                            cols="40"
                                        />
                                    </ ModalWindow>
            }

            <div className="footer__bottom--wrap">
                <div className="footer__bottom container">
                    <div className="footer__bottom-info">
                        <div className="footer__bottom-social">
                            {
                                shop?.logo && <NavLink className="footer__bottom-social-logo" to={`/${shop.name}`}><img src={shop.logo} alt='img' /></NavLink>
                            }
                            <NavLink className="footer__bottom-social-about" to={`/${shop.name}/about`}>{selectedLanguage?.footer?.aboutMenuTitle}</NavLink>
                            <div className="footer__bottom-social-link-wrap">
                                <a className="footer__bottom-social-link" href={shop?.facebook_url ? shop.facebook_url : '#'} target='_blank'><img src={facebook} alt='img' /></a>
                                <a className="footer__bottom-social-link" href={shop?.instagram_url ? shop.instagram_url : '#'} target='_blank'><img src={instagram} alt='img' /></a>
                            </div>
                        </div>

                        <div className="footer__bottom-catalog">
                            <div className="footer__bottom-catalog-title">{selectedLanguage?.footer?.catalogTitle}</div>
                                <ul className="footer__bottom-catalog-link-wrap">
                                    {
                                        !!categories.length && categories.map(category => (<li key={category._id}><NavLink to={`/${shop.name}/category/${category._id}`}>{category.name}</NavLink></li>))  
                                    }
                                </ul>
                        </div>

                        <div className="footer__bottom-contact">
                            <div className="footer__bottom-contact-title">{selectedLanguage?.footer?.contactTitle}</div>
                            {
                                !!shop?.location?.length && <p className="footer__bottom-contact-adres">{shop.location}</p>
                            }
                            {
                                !!shop?.contact_number?.length && <a className='footer__bottom-contact-tel' href="tel:+380673804111">{shop.contact_number}</a>
                            }
                            {
                                !!shop?.contact_number_two?.length && <a className='footer__bottom-contact-tel' href="tel:+380673804111">{shop.contact_number_two}</a>
                            }
                            <button className='footer__bottom-contact-btn' onClick={() => setIsModalCallMe(!isModalCallMe)}>{selectedLanguage?.footer?.callMeBack}</button>
                        </div>
                    </div>

                    <div className="footer__top">
                        <h2 className="footer__top-title">{selectedLanguage?.footer?.subscribeNews}</h2>
                        
                        <div className="footer__top-mail-wrap">
                            <input className="footer__top-mail" onChange={(e) => setMail(e.target.value)} value={mail} type="mail" name="mail" placeholder="Email" ref={mailRef}></input>
                            <button className="footer__top-btn" onClick={handleSendMail}>{selectedLanguage?.footer?.subscribeBtn}</button>
                        </div>
                    </div>
                    
                    <div className='footer__bottom-license'>
                        <div className='footer__bottom-license-text'>{selectedLanguage?.footer?.licenseText1}</div>
                        <div className='footer__bottom-license-text'>{selectedLanguage?.footer?.licenseText2}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;