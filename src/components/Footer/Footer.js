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
import { toast } from 'react-toastify';

function Footer() {
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const shop = useSelector(state => state.homeSlice.shop);
    const categories = useSelector(state => state.homeSlice.categories);
    const [isModalCallMe, setIsModalCallMe] = useState(false);
    const [contactNumber, setContactNumber] = useState('');
    const [comment, setcomment] = useState('');
    const [mail, setMail] = useState('');
    const mailRef = useRef(null);
    const telRef = useRef(null);

    // const [isOpen, setIsOpen] = useState(false);
    // const navigate = useNavigate();
    // console.log(contactNumber)

    const handleIsCallMe = (boolean) => {
        if (boolean) {
            if (contactNumber?.length) {
                let data = {
                    shop_id: shop._id,
                    phone: contactNumber,
                    comment: comment,
                    isSeen: false,
                    favorite: false,
                    status: 'callBack',
                    email: '',
                    creation_time: new Date().getTime(),
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMzYzU2NWVhYjE4MzIwODVkMzEyNTM1IiwiZW1haWwiOiJhc2RAYXNkLmFzZCIsImlhdCI6MTY2ODE3MDU2MywiZXhwIjoxNjY4MTg4NTYzfQ.ShC2EKHQIXEhiWKCwsFVYasufKfNqKqYVkHQYrbbVbQ',                // відправка токена звідки брати для покупців?
                }
    
                sendCreation(data)

                setContactNumber('')
                setcomment('')
                setIsModalCallMe(!isModalCallMe)
            } else {
                telRef.current.focus()
            }
        } else {
            setContactNumber('')
            setcomment('')
            setIsModalCallMe(!isModalCallMe) 
        } 
    };
   
    const handleSendMail = () => {
        if (mail?.length) {
            // відправка повідомлення доробити
            let data = {
                shop_id: shop._id,
                phone: '',
                comment: '',
                isSeen: false,
                favorite: false,
                status: 'subscription',
                email: mail,
                creation_time: new Date().getTime(),
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMzYzU2NWVhYjE4MzIwODVkMzEyNTM1IiwiZW1haWwiOiJhc2RAYXNkLmFzZCIsImlhdCI6MTY2ODE3MDU2MywiZXhwIjoxNjY4MTg4NTYzfQ.ShC2EKHQIXEhiWKCwsFVYasufKfNqKqYVkHQYrbbVbQ',                // відправка токена звідки брати для покупців?
            }

            sendCreation(data)
            setMail('')
        }   else {
            mailRef.current.focus()
        }
    };

    const sendCreation = (data) => {
        fetch(`${process.env.REACT_APP_BASE_URL}/notifications/`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data._id) {
                    // console.log('POST Footer:', res)
                    toast.success('Повідомлення відправлено', {
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
                    console.log('POST Footer:', res)
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

    // useEffect(() => {
    //     setShopCategories(categories.filter(el => el.parent_id == 'null'))
    // }, [categories])
   
    return (
        <div className="footer hidden">

            {
                isModalCallMe && <ModalWindow title={'Вкажіть свій телефон'}  text={'Ми обов\'язково передзвонимо'} handleClick={handleIsCallMe} leftBtn={"Відмінити"} rightBtn={"Підтвердити"}>
                                        <label className='footer__modal-input-label footer__modal-input-label-tel' htmlFor="contactNumber">
                                            Телефон для контакту
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
                                            ref={telRef}
                                        />
                                        <label className='footer__modal-input-label' htmlFor="comment">
                                            Залиште коментар
                                        </label>
                                        <textarea
                                            id="comment"
                                            name="comment"
                                            type="text"
                                            className='footer__modal-textarea'
                                            onChange={(e) => setcomment(e.target.value)}
                                            value={comment}
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
                                <a className="footer__bottom-social-link" href={shop?.facebook_url ? shop.facebook_url : '#'} target='_blank'>
                                    {/* <img src={facebook} alt='img' /> */}
                                    <svg fill={shop?.colorSettings?.colorFooterText ? shop?.colorSettings?.colorFooterText : '#000'} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                            viewBox="0 0 310 310" xmlSpace="preserve">
                                        <g id="XMLID_834_">
                                            <path id="XMLID_835_" d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064
                                                c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996
                                                V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545
                                                C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703
                                                c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z"/>
                                        </g>
                                    </svg>
                                </a>
                                <a className="footer__bottom-social-link" href={shop?.instagram_url ? shop.instagram_url : '#'} target='_blank'>
                                    {/* <img src={instagram} alt='img' /> */}
                                    <svg fill={shop?.colorSettings?.colorFooterText ? shop?.colorSettings?.colorFooterText : '#000'} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                            viewBox="0 0 504.4 504.4" xmlSpace="preserve">
                                        <g>
                                            <g>
                                                <path d="M296.8,219.8c-10-14-26.4-23.2-44.8-23.2c-18.4,0-34.8,9.2-44.8,23.2c-6.4,9.2-10.4,20.4-10.4,32.4
                                                    c0,30.4,24.8,55.2,55.2,55.2c30.4,0,55.2-24.8,55.2-55.2C307.2,240.2,303.2,229,296.8,219.8z"/>
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <path d="M331.6,220.2c4,8,6.4,20.8,6.4,32c0,47.2-38.4,86-86,86c-47.6,0-86-38.4-86-86c0-11.6,2.4-24,6.4-32H124v128.4
                                                    c0,16.8,14.8,31.6,31.6,31.6h192.8c16.8,0,31.6-14.8,31.6-31.6V220.2H331.6z"/>
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <polygon points="365.6,131.4 319.2,131.4 319.2,184.6 372,184.6 372,138.2 372,131 		"/>
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <path d="M377.6,0.2H126.4C56.8,0.2,0,57,0,126.6v251.6c0,69.2,56.8,126,126.4,126H378c69.6,0,126.4-56.8,126.4-126.4V126.6
                                                    C504,57,447.2,0.2,377.6,0.2z M408,219.8L408,219.8l0,128.8c0,33.6-26,59.6-59.6,59.6H155.6c-33.6,0-59.6-26-59.6-59.6V219.8v-64
                                                    c0-33.6,26-59.6,59.6-59.6h192.8c33.6,0,59.6,26,59.6,59.6V219.8z"/>
                                            </g>
                                        </g>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="footer__bottom-catalog">
                            <div className="footer__bottom-catalog-title">{selectedLanguage?.footer?.catalogTitle}</div>
                                <ul className="footer__bottom-catalog-link-wrap">
                                    {
                                        !!categories.length && categories.map(category => (<li key={category._id}><NavLink className="footer__bottom-catalog-link" to={`/${shop.name}/category/${category._id}`}>{category.name}</NavLink></li>))  
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
                            <button className={`app__custom-btn app__btn-${shop?.colorSettings?.selectBtn?.length ? shop?.colorSettings.selectBtn : '5'}`} onClick={() => setIsModalCallMe(!isModalCallMe)}><span className="app__custom-btn-span">{selectedLanguage?.footer?.callMeBack}</span></button>
                        </div>
                    </div>

                    <div className="footer__top">
                        <h2 className="footer__top-title">{selectedLanguage?.footer?.subscribeNews}</h2>
                        
                        <div className="footer__top-mail-wrap">
                            <input className="footer__top-mail" onChange={(e) => setMail(e.target.value)} value={mail} type="mail" name="mail" placeholder="Email" ref={mailRef}></input>
                            <button className={`app__custom-btn app__btn-${shop?.colorSettings?.selectBtn?.length ? shop?.colorSettings.selectBtn : '5'}`} onClick={handleSendMail}><span className="app__custom-btn-span">{selectedLanguage?.footer?.subscribeBtn}</span></button>
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