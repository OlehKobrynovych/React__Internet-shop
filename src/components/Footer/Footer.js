import './Footer.css';

import instagram from '../../assets/images/instagram.svg';
import facebook from '../../assets/images/facebook.svg';
import logo from '../../assets/images/logo.svg';
import {datas} from '../../data.js'

// import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Footer() {
    // const [isOpen, setIsOpen] = useState(false);
    // const navigate = useNavigate();

    // const handleClick = () => {
    //     setIsOpen(!isOpen)
    // };
   
    return (
        <div className="footer hidden">
                <div className="footer__top--wrap">
                    <div className="footer__top container">
                    
                        <h2 className="footer__top-title">Підпишіться на новини та акції</h2>
                        
                        <div className="footer__top-checkbox">
                            <label>
                                <input type="checkbox"  name="man" /><span>Чоловік</span>
                            </label>
                            <label>
                                <input type="checkbox"  name="woman" /><span>Жінка</span>
                            </label>
                            <label>
                                <input type="checkbox"  name="child" /><span>Дитина</span>
                            </label>
                        </div>

                        <div className="footer__top-mail-wrap">
                            <input className="footer__top-mail" type="mail" name="mail" placeholder="Email"></input>
                            <button className="footer__top-btn">Підписка</button>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom--wrap">
                    <div className="footer__bottom container">
                        <div className="footer__bottom-info">
                            <div className="footer__bottom-social">
                                <NavLink className="footer__bottom-social-logo" to='/'><img src={logo} alt='img' /></NavLink>
                                <div className="footer__bottom-social-link-wrap">
                                    <a className="footer__bottom-social-link" href={datas.shopInfo.facebook} target='_blank'><img src={facebook} alt='img' /></a>
                                    <a className="footer__bottom-social-link" href={datas.shopInfo.instagram} target='_blank'><img src={instagram} alt='img' /></a>
                                </div>
                            </div>

                            <div className="footer__bottom-menu">
                                <div className="footer__bottom-menu-title">Каталог</div>
                                    <ul className="footer__bottom-menu-link-wrap">
                                        <li><NavLink to='#'>Про компанію</NavLink></li>
                                        <li><NavLink to='#'>Публічна оферта</NavLink></li>
                                        <li><NavLink to='#'>Доставка і оплата</NavLink></li>
                                        <li><NavLink to='#'>Контакти</NavLink></li>
                                        <li><NavLink to='#'>Допомога</NavLink></li>
                                    </ul>
                            </div>

                            <div className="footer__bottom-catalog">
                                <div className="footer__bottom-catalog-title">Каталог</div>
                                    <ul className="footer__bottom-catalog-link-wrap">
                                        {
                                        datas.categories.map(categories => (<li key={categories.id}><NavLink to={categories.href}>{categories.name}</NavLink></li>))  
                                        }
                                    </ul>
                            </div>

                            <div className="footer__bottom-contact">
                                <div className="footer__bottom-contact-title">Контакти</div>
                                <p className="footer__bottom-contact-adres">{datas.shopInfo.location}</p>
                                <a className='footer__bottom-contact-tel' href="tel:+380673804111">{datas.shopInfo.contact_number}</a>
                                <a className='footer__bottom-contact-tel' href="tel:+380673804111">{datas.shopInfo.contact_number_two}</a>
                                <button className='footer__bottom-contact-btn'>Передзвоніть мені</button>
                            </div>
                        </div>
                        <div className='footer__bottom-license'>
                            <div className='footer__bottom-license-text'>© 2019 - 2022 «Goldi». Всі права захищенно</div>
                            <div className='footer__bottom-license-text'>Розроблений та підтримується компанією</div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Footer;