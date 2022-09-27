import './ShoppingCart.css';

import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../ProductCard/ProductCard';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import QuantityProduct from '../QuantityProduct/QuantityProduct';

import deleteImg from '../../assets/images/deleteImg.svg';
import { setShoppingProduct } from '../../store/homeSlice';



function ShoppingCart() {
    const datas = useSelector(state => state.homeSlice.datas);
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const shoppingProduct = useSelector(state => state.homeSlice.shoppingProduct);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(null);
    const [nameForm, setNameForm] = useState('');
    const [phoneForm, setPhoneForm] = useState('');
    const [emailForm, setEmailForm] = useState('');
    const [commentForm, setCommentForm] = useState('');
    const [checkboxForm, setCheckboxFor] = useState(false);
    const [isSubmitError, setIsSubmitError] = useState(false);

    useEffect(() => {
        setTotalPrice(shoppingProduct.reduce((acc, el) => el.new_price ? acc += (el.new_price * el.count) : acc += (el.price * el.count), 0))
    }, [])
    
    useEffect(() => {
        setTotalPrice(shoppingProduct.reduce((acc, el) => el.new_price ? acc += (el.new_price * el.count) : acc += (el.price * el.count), 0))
    }, [shoppingProduct])

    const handleClickDelete = (product) => {
       let res = shoppingProduct.filter(el => el.id !== product.id)
       dispatch(setShoppingProduct(res))
    };
   
    const handleSubmit = (e) => {
        e.preventDefault()

        if(checkboxForm && phoneForm && nameForm) {
            setIsSubmitError(false)
        } else {
            setIsSubmitError(true)
        }
    };
   
    const handleClose = () => {
        setIsSubmitError(false)
    };
    
    const handleClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
     <div className="shopping-cart">
        <div className="shopping-cart--wrap container">

            <div className="shopping-cart__path">
                <NavLink className="shopping-cart__path-link" to='/'>{selectedLanguage?.homePage?.homeName}</NavLink>
                <span>&nbsp; / &nbsp;</span>
                <span>{selectedLanguage?.cartPage?.cartName}</span>
                <span>&nbsp; /</span>
            </div>

            <h2 className="shopping-cart__title">{selectedLanguage?.cartPage?.cartName}</h2>

            {
               shoppingProduct.length ? (
                   <div className="shopping-cart__pdoduct-wrap">
                       {
                           shoppingProduct.map(el => (
                                <div className="shopping-cart__pdoduct" key={el.id}>
                                    <div className="shopping-cart__pdoduct-info-wrap">
                                        <img className="shopping-cart__pdoduct-img" onClick={() => handleClick(el.id)} src={el.image} alt='img'/>
                                        <div className="shopping-cart__pdoduct-info">
                                            <div className="shopping-cart__pdoduct-info-title">{el.name}</div>
                                        </div>
                                        <div className="shopping-cart__pdoduct-price-wrap">
                                            <p>{selectedLanguage?.cartPage?.cartPriceTitle}</p>
                                            {
                                                el.new_price ? (<><p className="shopping-cart__pdoduct-price-old">{el.price}{datas?.shopInfo?.selectedCurrency}</p><p className="shopping-cart__pdoduct-price">{el.new_price}{datas?.shopInfo?.selectedCurrency}</p></>)
                                                : (<p className="shopping-cart__pdoduct-price">{el.price}{datas?.shopInfo?.selectedCurrency}</p>)
                                            }
                                        </div>
                                    </div>
                                    <div className="shopping-cart__pdoduct-count-wrap">
                                        <QuantityProduct price={el.price} new_price={el.new_price} id={el.id} count={el.count}/>
                                        <button onClick={() => handleClickDelete(el)}><img className="shopping-cart__delete-btn" src={deleteImg} alt='img'/></button>
                                    </div>
                                </div>
                           ))
                       }

                       <div className="shopping-cart__total-price-wrap">
                            <div className="shopping-cart__total-price">
                                <span className="shopping-cart__total-price-title">{selectedLanguage?.cartPage?.cartTotalTitle}</span>
                                <span className="shopping-cart__total-price-number">{totalPrice}{datas?.shopInfo?.selectedCurrency}</span>
                            </div>
                       </div>

                       <h3 className="shopping-cart__form-title">{selectedLanguage?.cartPage?.cartFormTitle}</h3>
                       <p className="shopping-cart__form-warning">{selectedLanguage?.cartPage?.cartFormWarning}</p>

                       <form className="shopping-cart__form" action="">
                           <div className="shopping-cart__form-input-wrap">
                                <label className="shopping-cart__form-input-name-wrap" for="fname">
                                    <span className="shopping-cart__form-input-name-title">{selectedLanguage?.cartPage?.cartFormName}</span>
                                    <input className="shopping-cart__form-input" onChange={(e) => setNameForm(e.target.value)} value={nameForm} type="text" id="fname" name="firstname" placeholder="Ваше прізвище та ім'я"/>
                                </label>
                                <label className="shopping-cart__form-input-phone-wrap" for="tell">
                                    <span className="shopping-cart__form-input-phone-title">{selectedLanguage?.cartPage?.cartFormPhone}</span>
                                    <input className="shopping-cart__form-input" onChange={(e) => setPhoneForm(e.target.value)} value={phoneForm} type="tel" id="phone" name="phone" placeholder="1234567890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                                </label>
                                <label className="shopping-cart__form-input-label" for="email">
                                    <span>{selectedLanguage?.cartPage?.cartFormMail}</span>
                                    <input className="shopping-cart__form-input" onChange={(e) => setEmailForm(e.target.value)} value={emailForm} type="text" id="email" name="email" placeholder="Email"/>
                                </label>
                           </div>

                            <div className="shopping-cart__form-textarea-wrap">
                                <label className="shopping-cart__form-input-label" for="comment">
                                    <span>{selectedLanguage?.cartPage?.cartFormComment}</span>
                                    <textarea className="shopping-cart__form-input" onChange={(e) => setCommentForm(e.target.value)} value={commentForm} type="text" id="comment" name="comment" placeholder="" rows="5" cols="33"/>
                                </label>
                            </div>

                            <div className="shopping-cart__btn-buy-wrap">
                                <label className="shopping-cart__form-input-label" for="checkbox">
                                    <input className="shopping-cart__form-checkbox" checked={checkboxForm} onChange={() => setCheckboxFor(!checkboxForm)} type="checkbox" id="checkbox" name="checkbox" />
                                    <span className="shopping-cart__form-checkbox-title">{selectedLanguage?.cartPage?.cartFormCheckbox}</span>
                                </label>
                                <input className="shopping-cart__btn-buy" onClick={(e) => handleSubmit(e)} type="submit" value={selectedLanguage?.cartPage?.cartBtnBuy}/>
                            </div>

                            {
                                isSubmitError && ( <div className="shopping-cart__submit-error">{selectedLanguage?.cartPage?.cartFormSubmitError}<button onClick={handleClose} className="shopping-cart__submit-error-close">x</button></div>)
                            }
                        </form>

                   </div>
               ) : (<p className="shopping-cart__pdoduct-error">{selectedLanguage?.cartPage?.cartError}</p>)
            }
        </div>
     </div>
    );
}

export default ShoppingCart;