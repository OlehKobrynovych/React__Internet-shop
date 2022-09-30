import './Footer.css';

import instagram from '../../assets/images/instagram.svg';
import facebook from '../../assets/images/facebook.svg';
import logo from '../../assets/images/logo.svg';
import {datas} from '../../data.js'

// import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function Footer() {
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const shop = useSelector(state => state.homeSlice.shop);
    const categories = useSelector(state => state.homeSlice.categories);
    const [shopCategories, setShopCategories] = useState([]);
    
    // const [isOpen, setIsOpen] = useState(false);
    // const navigate = useNavigate();

    // const handleClick = () => {
    //     setIsOpen(!isOpen)
    // };

    useEffect(() => {
        setShopCategories(categories.filter(el => el.parent_id == 'null'))
    }, [categories])
   
    return (
        <div className="footer hidden">
                <div className="footer__top--wrap">
                    <div className="footer__top container">
                    
                        <h2 className="footer__top-title">{selectedLanguage?.footer?.subscribeNews}</h2>
                        
                        <div className="footer__top-checkbox">
                            {
                                selectedLanguage?.footer?.subscribeCheckbox.map(el => (
                                    <label key={el}>
                                        <input type="checkbox"  name={el} /><span>{el}</span>
                                    </label>
                                ))
                            }
                        </div>

                        <div className="footer__top-mail-wrap">
                            <input className="footer__top-mail" type="mail" name="mail" placeholder="Email"></input>
                            <button className="footer__top-btn">{selectedLanguage?.footer?.subscribeBtn}</button>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom--wrap">
                    <div className="footer__bottom container">
                        <div className="footer__bottom-info">
                            <div className="footer__bottom-social">
                                <NavLink className="footer__bottom-social-logo" to={`/${shop.name}`}><img src={shop.logo} alt='img' /></NavLink>
                                <NavLink className="footer__bottom-social-about" to={`/${shop.name}/about`}>{selectedLanguage?.footer?.aboutMenuTitle}</NavLink>
                                <div className="footer__bottom-social-link-wrap">
                                    <a className="footer__bottom-social-link" href={datas.shopInfo.facebook} target='_blank'><img src={facebook} alt='img' /></a>
                                    <a className="footer__bottom-social-link" href={datas.shopInfo.instagram} target='_blank'><img src={instagram} alt='img' /></a>
                                </div>
                            </div>

                            <div className="footer__bottom-catalog">
                                <div className="footer__bottom-catalog-title">{selectedLanguage?.footer?.catalogTitle}</div>
                                    <ul className="footer__bottom-catalog-link-wrap">
                                        {
                                            !!shopCategories.length && shopCategories.map(category => (<li key={category._id}><NavLink to={`/${shop.name}/category/${category._id}`}>{category.name}</NavLink></li>))  
                                        }
                                    </ul>
                            </div>

                            <div className="footer__bottom-contact">
                                <div className="footer__bottom-contact-title">{selectedLanguage?.footer?.contactTitle}</div>
                                <p className="footer__bottom-contact-adres">{datas.shopInfo.location}</p>
                                <a className='footer__bottom-contact-tel' href="tel:+380673804111">{datas.shopInfo.contact_number}</a>
                                <a className='footer__bottom-contact-tel' href="tel:+380673804111">{datas.shopInfo.contact_number_two}</a>
                                <button className='footer__bottom-contact-btn'>{selectedLanguage?.footer?.callMeBack}</button>
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