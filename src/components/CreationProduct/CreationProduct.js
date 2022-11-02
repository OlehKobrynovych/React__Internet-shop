import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CreationProduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { setEditProduct, setIsCleanInput, setProduct, setUpdataProduct } from '../../store/userSlice';
import deleteImg from '../../assets/images/deleteImg.svg';
import InputText from '../InputText/InputText';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputNumber from '../InputNumber/InputNumber';
import InputTextarea from '../InputTextarea/InputTextarea';


function CreationProduct() {
    const selectedLanguage = useSelector(state => state.userSlice.selectedLanguage);
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const categories = useSelector(state => state.userSlice.categories);
    const editProduct = useSelector(state => state.userSlice.editProduct);
    const isCleanInput = useSelector(state => state.userSlice.isCleanInput);
    const [isOpenInfo, setIsOpenInfo] = useState([]);
    const [searchCategory, setSearchCategory] = useState('');
    const [name, setName] = useState('');
    const [selectCategory, setSelectCategory] = useState({});
    const [price, setPrice] = useState(0);
    const [new_price, setNew_price] = useState(0);    
    const [details, setDetails] = useState('');
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [images, setImages] = useState([]);
    const [userColors, setUserColors] = useState('');
    const [userSizes, setUserSizes] = useState('');
    const [userImages, setUserImages] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const nameInputRef = useRef(null);
    // const priceInputRef = useRef(null);
    // const categoryInputRef = useRef(null);
    // console.log(editProduct)


    useEffect(() => {
        if (editProduct?.name) {
            setName(editProduct.name)
            setPrice(editProduct.price)
            setNew_price(editProduct.new_price)
            setDetails(editProduct.details)
            setColors(editProduct.colors)
            setSizes(editProduct.sizes)
            setImages(editProduct.images)

            fetch(`${process.env.REACT_APP_BASE_URL}/categories/${editProduct.category_id}`)
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        setSelectCategory(res.data);
                    } else {
                        setSelectCategory({})
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
    }, [])

    const handleHelpOpen = (num) => {
        if (isOpenInfo.includes(num)) {
            setIsOpenInfo(isOpenInfo.filter(el => el !== num))
        } else {
            setIsOpenInfo([...isOpenInfo, num])
        }
    }
    
    const handleSetColors = () => {
        setColors([...colors, userColors])
        dispatch(setIsCleanInput(!isCleanInput))
    }
   
    const handleSetSizes = () => {
        setSizes([...sizes, userSizes])
        dispatch(setIsCleanInput(!isCleanInput))
    }
    
    const handleSetImages = () => {
        setImages([...images, userImages])
        dispatch(setIsCleanInput(!isCleanInput))
    }
    
    const handleDeleteColors = (color) => {
        setColors([...colors.filter(el => el !== color)])
    }
    
    const handleDeleteSizes = (size) => {
        setSizes([...sizes.filter(el => el !== size)])
    }
    
    const handleDeleteImages = (image) => {
        setImages([...images.filter(el => el !== image)])
    }
    
    const handleSelectCategory = (obj) => {
        setSelectCategory(obj)
        setSearchCategory('')
    }
   
    const handleReturn = () => {
        navigate(`/auth/${user._id}/product`)
        dispatch(setEditProduct({}))
    }

    const handleSend = () => {
        if (name?.length && price?.length && selectCategory?._id) {
            let data = {
                shop_id: shop._id,
                category_id: selectCategory._id,
                name: name,
                price: price,
                new_price: new_price,
                images: images,
                details: details,
                colors: colors,
                sizes: sizes,
                token: user.token,
            }
    
            if (editProduct?._id) {
                fetch(`${process.env.REACT_APP_BASE_URL}/products/${editProduct._id}`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.success && res.data) {
                            console.log('asd as', res)  
                            dispatch(setUpdataProduct({...data, _id: editProduct._id}))
                            navigate(`/auth/${user._id}/product`)
                            showMessage('success', 'Дані оновлено')
                        } else {
                            console.log('PUT CreationProduct', res)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        showMessage('error', 'Сталася помилка')
                    })
                    .finally(() => {
                        dispatch(setEditProduct({}))
                    });
            } else {
                fetch(`${process.env.REACT_APP_BASE_URL}/products/`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.success && res.data) {
                            console.log(res)
                            dispatch(setProduct(res.data))
                            navigate(`/auth/${user._id}/product`)
                            showMessage('success', 'Товар створено')
                        } else {
                            console.log('POST CreationProduct', res)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        showMessage('error', 'Сталася помилка')
                    })
            }
    
            setName('')
            setSelectCategory({})
            setPrice(0)
            setNew_price(0)
            setImages([])
            setDetails('')
            setColors([])
            setSizes([])
        }
        // } else if (!name?.length) {
        //     nameInputRef.current.focus()
        // } else if (!selectCategory?._id) {
        //     categoryInputRef.current.focus()
        // } else {
        //     priceInputRef.current.focus()
        // }
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
        <div className='creation-product'>
            <div className='creation-product--wrap container'>
                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <InputText setValue={setName} value={name} id={'creationProductName'} name={'creationProductName'} label={selectedLanguage?.creationProduct?.creationProductNameLabel}/>
                    </div>
                    <div onClick={() => handleHelpOpen(1)} className='creation-product__section-btn-wrap'>
                        <div className={`creation-product__section-btn ${isOpenInfo.includes(1) ? 'creation-product__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-product__section-info ${isOpenInfo.includes(1) ? 'creation-product__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationProduct?.creationProductNameInfo}</p>
                </div>

                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <div className="creation-product__section-title-wrap">
                            <span className="creation-product__section-title">{selectedLanguage?.creationProduct?.creationProductCategoryTitle}</span>
                            <span className="creation-product__section-title-text">&nbsp;{selectCategory?.name}</span>
                        </div>
                        <label className='creation-product__section-input-label' htmlFor="category_id">
                            <b>{selectedLanguage?.creationProduct?.creationProductCategoryLabel}</b>
                        </label>
                        <input className='creation-product__section-seach-input' 
                            type="text" 
                            placeholder={selectedLanguage?.creationProduct?.creationProductCategoryPlaceholder}
                            id="category_id" 
                            value={searchCategory} 
                            onChange={(e) => setSearchCategory(e.target.value)} 
                        />
                        <div className="creation-product__section-seach-items">
                            {
                               !!categories.length && categories.map(category => (
                                   <div  key={category._id}>
                                        <div
                                            className={`creation-product__section-seach-item ${category?.name.toUpperCase().includes(searchCategory.toUpperCase()) ? "" : "creation-product__section-seach-item--none"}`} 
                                            onClick={() => handleSelectCategory(category)}
                                        >
                                            {category.name}
                                        </div>
                                       {
                                            !!category.sub_categories.length && category.sub_categories.map(el => (
                                                <div 
                                                    onClick={() => handleSelectCategory(el)} 
                                                    className={`creation-product__section-seach-item ${el?.name.toUpperCase().includes(searchCategory.toUpperCase()) ? "" : "creation-product__section-seach-item--none"}`} 
                                                    key={el._id}
                                                >
                                                    {el.name}
                                                </div>
                                            )) 
                                       }
                                    </div>
                               ))
                            }
                        </div>
                    </div>
                    <div onClick={() => handleHelpOpen(2)} className='creation-product__section-btn-wrap'>
                        <div className={`creation-product__section-btn ${isOpenInfo.includes(2) ? 'creation-product__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-product__section-info ${isOpenInfo.includes(2) ? 'creation-product__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationProduct?.creationProductCategoryInfo}</p>
                </div>

                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <InputNumber label={selectedLanguage?.creationProduct?.creationProductPriceLabel} id={"creationProductPrice"} name={"creationProductPrice"} value={price} setValue={setPrice} min={'0'}/>
                    </div>
                    <div onClick={() => handleHelpOpen(3)} className='creation-product__section-btn-wrap'>
                        <div className={`creation-product__section-btn ${isOpenInfo.includes(3) ? 'creation-product__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-product__section-info ${isOpenInfo.includes(3) ? 'creation-product__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationProduct?.creationProductPriceInfo}</p>
                </div>
                
                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <InputNumber label={selectedLanguage?.creationProduct?.creationProductNewPriceLabel} id={"creationProductNew_price"} name={"creationProductNew_price"} value={new_price} setValue={setNew_price} min={'0'}/>
                    </div>
                    <div onClick={() => handleHelpOpen(4)} className='creation-product__section-btn-wrap'>
                        <div className={`creation-product__section-btn ${isOpenInfo.includes(4) ? 'creation-product__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-product__section-info ${isOpenInfo.includes(4) ? 'creation-product__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationProduct?.creationProductNewPriceInfo}</p>
                </div>

                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <InputTextarea setValue={setDetails} value={details} id={'creationProductDetails'} name={'creationProductDetails'} label={selectedLanguage?.creationProduct?.creationProductDescriptionLabel} placeholder={selectedLanguage?.creationProduct?.creationProductDescriptionPlaceholder} rows={'5'} cols={'50'}/>
                    </div>
                    <div onClick={() => handleHelpOpen(5)} className='creation-product__section-btn-wrap'>
                        <div className={`creation-product__section-btn ${isOpenInfo.includes(5) ? 'creation-product__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-product__section-info ${isOpenInfo.includes(5) ? 'creation-product__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationProduct?.creationProductDescriptionInfo}</p>
                </div>
                
                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <div className='creation-product__create-btn-wrap'>
                           <InputText setValue={setUserColors} value={userColors} id={'creationProductUserColors'} name={'creationProductUserColors'} label={selectedLanguage?.creationProduct?.creationProductColorsLabel} />
                           <button onClick={handleSetColors} className='creation-product__create-btn'>+</button>
                        </div>
                        {
                            !!colors.length && <ul className='creation-product__create-list-wrap'>
                                                    {
                                                        colors.map(el => (<li className='creation-product__create-list' key={el}>
                                                            <div className='creation-product__create-list-text'>{el}</div>
                                                            <img className='creation-product__create-list-btn' onClick={() => handleDeleteColors(el)} src={deleteImg} alt='img'/>
                                                        </li>))
                                                    }
                                                </ul> 
                        }
                    </div>
                    <div onClick={() => handleHelpOpen(6)} className='creation-product__section-btn-wrap'>
                        <div className={`creation-product__section-btn ${isOpenInfo.includes(6) ? 'creation-product__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-product__section-info ${isOpenInfo.includes(6) ? 'creation-product__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationProduct?.creationProductColorsInfo}</p>
                </div>
                
                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <div className='creation-product__create-btn-wrap'>
                           <InputText setValue={setUserSizes} value={userSizes} id={'creationProductUserSizes'} name={'creationProductUserSizes'} label={selectedLanguage?.creationProduct?.creationProductSizesLabel} />
                           <button onClick={handleSetSizes} className='creation-product__create-btn'>+</button>
                        </div>
                        {
                            !!sizes.length && <ul className='creation-product__create-list-wrap'>
                                                    {
                                                        sizes.map(el => (<li className='creation-product__create-list' key={el}>
                                                            <div className='creation-product__create-list-text'>{el}</div>
                                                            <img className='creation-product__create-list-btn' onClick={() => handleDeleteSizes(el)} src={deleteImg} alt='img'/>
                                                        </li>))
                                                    }
                                                </ul> 
                        }
                    </div>
                    <div onClick={() => handleHelpOpen(7)} className='creation-product__section-btn-wrap'>
                        <div className={`creation-product__section-btn ${isOpenInfo.includes(7) ? 'creation-product__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-product__section-info ${isOpenInfo.includes(7) ? 'creation-product__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationProduct?.creationProductSizesInfo}</p>
                </div>
               
                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <label className='creation-product__section-input-label' htmlFor="">
                            <b>{selectedLanguage?.creationProduct?.creationProductPicturesLabel}</b>
                        </label>
                        <div className='creation-product__create-btn-wrap'>
                            <input className="creation-product__create-input-file" onChange={(e) => setUserImages(e.target.value)} type="file" id="file1" />
                           <button onClick={handleSetImages} className='creation-product__create-btn'>+</button>
                        </div>
                        {
                            !!images.length && <ul className='creation-product__create-list-wrap'>
                                                    {
                                                        images.map(el => (<li className='creation-product__create-list' key={el}>
                                                            <div className='creation-product__create-list-text'>{el}</div>
                                                            <img className='creation-product__create-list-btn' onClick={() => handleDeleteImages(el)} src={deleteImg} alt='img'/>
                                                        </li>))
                                                    }
                                                </ul> 
                        }
                    </div>
                    <div onClick={() => handleHelpOpen(8)} className='creation-product__section-btn-wrap'>
                        <div className={`creation-product__section-btn ${isOpenInfo.includes(8) ? 'creation-product__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-product__section-info ${isOpenInfo.includes(8) ? 'creation-product__section-info--active' : ''}`}>
                    <p>{selectedLanguage?.creationProduct?.creationProductPicturesInfo}</p>
                </div>

                <div className='creation-product__warning-text'>{selectedLanguage?.creationProduct?.creationProductWarningText}</div>

                <div className='creation-product__btn-create-wrap'>
                    {
                         editProduct?._id && <button className='creation-product__btn-create' onClick={handleReturn}>{selectedLanguage?.creationProduct?.creationProductCancelBtn}</button>
                    }
                  
                    <button className='creation-product__btn-create' onClick={handleSend}>
                        {
                            editProduct?._id ? selectedLanguage?.creationProduct?.creationProductUpdateBtn : selectedLanguage?.creationProduct?.creationProductCreateBtn
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreationProduct;