import './Footer.css';

import instagram from '../../assets/images/instagram.svg';
import facebook from '../../assets/images/facebook.svg';
import logo from '../../assets/images/logo.svg';

import { useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';

function Footer() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        // setIsOpen(!isOpen)
    };
   
    return (
        <div className="footer hidden">
            <div className="footer__top--wrap">
                <div className="footer__top container">

                    <h2 className="footer__top-title">Підпишіться на новини та акції</h2>
                    
                    <div className="footer__top-checkbox">
                        <label>
                            <input type="checkbox" checked="checked" name="man" /><span>Чоловік</span>
                        </label>
                        <label>
                            <input type="checkbox" checked="checked" name="wooman" /><span>Жінка</span>
                        </label>
                        <label>
                            <input type="checkbox" checked="checked" name="child" /><span>Дитина</span>
                        </label>
                    </div>

                    <div className="footer__top-mail-wrap">
                        <input type="mail" name="mail" placeholder="Email"></input>
                        <button className="footer__top-btn">Підписка</button>
                    </div>
                </div>
            </div>

            <div className="footer__bottom--wrap">
                <div className="footer__bottom container">
                    <div className="footer__bottom-info">
                        <div className="footer__bottom-social">
                            <a className="footer__bottom-social-logo" to='#'><img src={logo} alt='img' /></a>
                            <div className="footer__bottom-social-link-wrap">
                                <a className="footer__bottom-social-link" to='#'><img src={facebook} alt='img' /></a>
                                <a className="footer__bottom-social-link" to='#'><img src={instagram} alt='img' /></a>
                            </div>
                        </div>

                        <div className="footer__bottom-menu">
                            <div className="footer__bottom-menu-title">Каталог</div>
                                <ul className="footer__bottom-menu-link-wrap">
                                    <li><a href='#'>Про компанію</a></li>
                                    <li><a href='#'>Публічна оферта</a></li>
                                    <li><a href='#'>Доставка і оплата</a></li>
                                    <li><a href='#'>Контакти</a></li>
                                    <li><a href='#'>Допомога</a></li>
                                </ul>
                        </div>

                        <div className="footer__bottom-catalog">
                            <div className="footer__bottom-catalog-title">Каталог</div>
                                <ul className="footer__bottom-catalog-link-wrap">
                                    <li><a href='#'>Унісекс</a></li>
                                    <li><a href='#'>Чоловікам</a></li>
                                    <li><a href='#'>Жінкам</a></li>
                                    <li><a href='#'>Дітям</a></li>
                                    <li><a href='#'>GOLDI HOME</a></li>
                                    <li><a href='#'>Колекції</a></li>
                                </ul>
                        </div>

                        <div className="footer__bottom-contact">
                            <div className="footer__bottom-contact-title">Контакти</div>
                            <p className="footer__bottom-contact-adres">м.Рівне, Фабрична, 12</p>
                            <a className='footer__bottom-contact-tel' href="tel:+380673804111">+38 (067) 380-41-11</a>
                            <a className='footer__bottom-contact-tel' href="tel:+380673804111">+38 (067) 380-41-11</a>
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