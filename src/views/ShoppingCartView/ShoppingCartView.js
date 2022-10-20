import './ShoppingCartView.css';

import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import QuantityProduct from '../../components/QuantityProduct/QuantityProduct';

import deleteImg from '../../assets/images/deleteImg.svg';
import noPhotos from '../../assets/images/noPhotos.svg';
import { setShoppingProduct } from '../../store/homeSlice';
import { toast } from 'react-toastify';



function ShoppingCartView() {

    // доробити при вдалій покупці обнуляти масив shoppingProduct
    const shoppingProduct = useSelector(state => state.homeSlice.shoppingProduct);
    const shop = useSelector(state => state.homeSlice.shop);
    // const user = useSelector(state => state.userSlice.user);
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(null);
    const [nameForm, setNameForm] = useState('');
    const [phoneForm, setPhoneForm] = useState('');
    const [emailForm, setEmailForm] = useState('');
    const [commentForm, setCommentForm] = useState('');
    const [addressForm, setAddressForm] = useState('');
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [checkboxForm, setCheckboxFor] = useState(false);
    const [isSubmitError, setIsSubmitError] = useState(false);
    const [shoppingHistoryProducts, setShoppingHistoryProducts] = useState([]);   // якщо клієнт зробить 2 різні покупки але той самий товар при роздруковці map  key???
    // const datas = useSelector(state => state.homeSlice.datas);
    console.log(shoppingProduct)
    

    useEffect(() => {
        setTotalPrice(shoppingProduct.reduce((acc, el) => el.new_price ? acc += (el.new_price * el.count) : acc += (el.price * el.count), 0))
        setShoppingHistoryProducts(JSON.parse(localStorage.getItem('shoppingHistoryProducts')));
    }, [])
    
    useEffect(() => {
        setTotalPrice(shoppingProduct.reduce((acc, el) => el.new_price ? acc += (el.new_price * el.count) : acc += (el.price * el.count), 0))
        setShoppingHistoryProducts(JSON.parse(localStorage.getItem('shoppingHistoryProducts')));
    }, [shoppingProduct])
    
    const handleClickDelete = (product) => {
       let res = shoppingProduct.filter(el => el._id !== product._id)
       dispatch(setShoppingProduct(res))
    };
   
    const handleSubmit = () => {

        if(checkboxForm && phoneForm.length && nameForm.length && addressForm.length && deliveryMethod.length) {
            let data = {
                full_name: nameForm,
                email: emailForm,
                delivery_method: deliveryMethod,
                delivery_address: addressForm,
                phone: phoneForm,
                comment: commentForm,
                product_id: shoppingProduct,   
                quantity: [...shoppingProduct.map(el => ({_id: el._id, count: el.count}))],   
                isSeen: false,
                status: 'InProcess',
                favorite: false,
                shop_id: shop._id,
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMzYzU2NWVhYjE4MzIwODVkMzEyNTM1IiwiZW1haWwiOiJhc2RAYXNkLmFzZCIsImlhdCI6MTY2NjI2MDA5OCwiZXhwIjoxNjY2Mjc4MDk4fQ.IctBCxDPEzFay7ymGltr3ZbnEj0K2YV7nMCsLvZ2m58',                // відправка токена звідки брати для покупців?
            }

            fetch(`http://localhost:3000/api/purchases/`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    // console.log(res)
                    if (res.success && res.data._id) {
                        // console.log('POST ShoppingCartView:', res)
                        dispatch(setShoppingProduct([]))

                        if (shoppingHistoryProducts?.length) {
                            localStorage.setItem('shoppingHistoryProducts', JSON.stringify([...shoppingHistoryProducts, ...shoppingProduct]));
                        } else {
                            localStorage.setItem('shoppingHistoryProducts', JSON.stringify([...shoppingProduct]));
                        }

                        toast.success('Покупка оформлена', {
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
                        console.log('POST ShoppingCartView:', res)
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

                setIsSubmitError(false)
            } else {
                setIsSubmitError(true)
            }
    };
   
    const handleClose = () => {
        setIsSubmitError(false)
    };
    
    const handleClick = (id) => {
        navigate(`/${shop.name}/product/${id}`);
    };

    return (
     <div className="shopping-cart">
        <div className="shopping-cart--wrap container">

            <div className="shopping-cart__path">
                <NavLink className="shopping-cart__path-link" to={`/${shop.name}`}>{selectedLanguage?.homePage?.homeName}</NavLink>
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
                                <div className="shopping-cart__pdoduct" key={el._id}>
                                    <div className="shopping-cart__pdoduct-info-wrap">
                                        <img className="shopping-cart__pdoduct-img" onClick={() => handleClick(el._id)} src={el.images[0]?.length ? el.images[0] : noPhotos} alt='img'/>
                                        <div className="shopping-cart__pdoduct-info">
                                            <div className="shopping-cart__pdoduct-info-title">{el.name}</div>
                                        </div>
                                        <div className="shopping-cart__pdoduct-price-wrap">
                                            <p>{selectedLanguage?.cartPage?.cartPriceTitle}</p>
                                            {
                                                el.new_price ? (<><p className="shopping-cart__pdoduct-price-old">{el.price}{shop.currency}</p><p className="shopping-cart__pdoduct-price">{el.new_price}{shop.currency}</p></>)
                                                : (<p className="shopping-cart__pdoduct-price">{el.price}{shop.currency}</p>)
                                            }
                                        </div>
                                    </div>
                                    <div className="shopping-cart__pdoduct-count-wrap">
                                        <QuantityProduct price={el.price} new_price={el.new_price} id={el._id} count={el.count}/>
                                        <button onClick={() => handleClickDelete(el)}><img className="shopping-cart__delete-btn" src={deleteImg} alt='img'/></button>
                                    </div>
                                </div>
                           ))
                       }

                       <div className="shopping-cart__total-price-wrap">
                            <div className="shopping-cart__total-price">
                                <span className="shopping-cart__total-price-title">{selectedLanguage?.cartPage?.cartTotalTitle}</span>
                                <span className="shopping-cart__total-price-number">{totalPrice}{shop.currency}</span>
                            </div>
                       </div>

                       <h3 className="shopping-cart__form-title">{selectedLanguage?.cartPage?.cartFormTitle}</h3>
                       <p className="shopping-cart__form-warning">{selectedLanguage?.cartPage?.cartFormWarning}</p>

                       <div className="shopping-cart__form">
                           <div className="shopping-cart__form-input-wrap">
                                <label className="shopping-cart__form-input-label" htmlFor="fname">
                                    <span className="shopping-cart__form-input-title">{selectedLanguage?.cartPage?.cartFormName}</span>
                                    <input className="shopping-cart__form-input" onChange={(e) => setNameForm(e.target.value)} value={nameForm} type="text" id="fname" name="name" placeholder="Ваше прізвище та ім'я"/>
                                </label>
                                <label className="shopping-cart__form-input-label" htmlFor="phone">
                                    <span className="shopping-cart__form-input-title">{selectedLanguage?.cartPage?.cartFormPhone}</span>
                                    <input className="shopping-cart__form-input" onChange={(e) => setPhoneForm(e.target.value)} value={phoneForm} type="tel" id="phone" name="phone" placeholder="1234567890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                                </label>
                                <label className="shopping-cart__form-input-label" htmlFor="email">
                                    <span>{selectedLanguage?.cartPage?.cartFormMail}</span>
                                    <input className="shopping-cart__form-input" onChange={(e) => setEmailForm(e.target.value)} value={emailForm} type="text" id="email" name="email" placeholder="Email"/>
                                </label>
                                <label className="shopping-cart__form-input-label" htmlFor="email">
                                    {/* <span className="shopping-cart__form-input-title">{selectedLanguage?.cartPage?.cartFormMail}</span> */}
                                    <span className="shopping-cart__form-input-title">Спосіб доставки:</span>
                                    <input className="shopping-cart__form-input" onChange={(e) => setDeliveryMethod(e.target.value)} value={deliveryMethod} type="text" id="email" name="email" placeholder="Спосіб..."/>
                                </label>
                           </div>

                            <div className="shopping-cart__form-textarea-wrap">
                                <label className="shopping-cart__form-input-label" htmlFor="comment">
                                    {/* <span className="shopping-cart__form-input-title">{selectedLanguage?.cartPage?.cartFormComment}</span> */}
                                    <span className="shopping-cart__form-input-title">Адреса:</span>
                                    <textarea className="shopping-cart__form-input" onChange={(e) => setAddressForm(e.target.value)} value={addressForm} type="text" id="comment" name="comment" placeholder="" rows="5" cols="33"/>
                                </label>

                                <label className="shopping-cart__form-input-label" htmlFor="comment">
                                    <span>{selectedLanguage?.cartPage?.cartFormComment}</span>
                                    <textarea className="shopping-cart__form-input" onChange={(e) => setCommentForm(e.target.value)} value={commentForm} type="text" id="comment" name="comment" placeholder="" rows="5" cols="33"/>
                                </label>
                            </div>

                            <div className="shopping-cart__btn-buy-wrap">
                                <label className="shopping-cart__form-input-label" htmlFor="checkbox">
                                    <input className="shopping-cart__form-checkbox" checked={checkboxForm} onChange={() => setCheckboxFor(!checkboxForm)} type="checkbox" id="checkbox" name="checkbox" />
                                    <span className="shopping-cart__form-checkbox-title">{selectedLanguage?.cartPage?.cartFormCheckbox}</span>
                                </label>
                                <button className="shopping-cart__btn-buy" onClick={() => handleSubmit()}>{selectedLanguage?.cartPage?.cartBtnBuy}</button>
                            </div>

                            {
                                isSubmitError && ( <div className="shopping-cart__submit-error">{selectedLanguage?.cartPage?.cartFormSubmitError}<button onClick={handleClose} className="shopping-cart__submit-error-close">x</button></div>)
                            }
                        </div>

                   </div>
               ) : (<p className="shopping-cart__pdoduct-error">{selectedLanguage?.cartPage?.cartError}</p>)
            }

            {
                !!shoppingHistoryProducts?.length && <div className="shopping-cart__history">
                        <h5 className="shopping-cart__history-title">Історія покупок</h5>
                        <div>Куплений товар:&nbsp;{shoppingHistoryProducts?.length}</div>  
                        <div className="shopping-cart__history-items">
                            {
                                shoppingHistoryProducts.map(el => (<div className="shopping-cart__history-item" key={el._id}>
                                    <img className="shopping-cart__history-item-img" onClick={() => handleClick(el._id)} src={el.images[0]?.length ? el.images[0] : noPhotos} alt='img'/>
                                    <div className="shopping-cart__history-item-name">{el.name}</div>
                                </div>))
                            }
                        </div>
                    </div>
            }
        </div>
     </div>
    );
}

export default ShoppingCartView;