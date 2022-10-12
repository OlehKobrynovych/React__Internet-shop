import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CreationProduct.css';
import editIcon from './../../assets/images/editIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCleanInput, setIsNeedUpdateProducts, setIsNeedUpdateShop, setShop } from '../../store/userSlice';
import deleteImg from '../../assets/images/deleteImg.svg';
import CreationShop from '../CreationShop/CreationShop';
import Preloader from '../Preloader/Preloader';
import CardInput from '../CardInput/CardInput';


function CreationProduct() {
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const categories = useSelector(state => state.userSlice.categories);
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
    const [errorCreateText, setErrorCreateText] = useState('');
    // const isNeedCreateShop = useSelector(state => state.userSlice.isNeedCreateShop);
    const isNeedUpdateShop = useSelector(state => state.userSlice.isNeedUpdateShop);
    const isNeedUpdateProducts = useSelector(state => state.userSlice.isNeedUpdateProducts);
    const editProduct = useSelector(state => state.userSlice.editProduct);
    const dispatch = useDispatch();
    // console.log(categories)

    useEffect(() => {
        if (editProduct?.name) {
            setName(editProduct.name)
            setPrice(editProduct.price)
            setNew_price(editProduct.new_price)
            setDetails(editProduct.details)
            setColors(editProduct.colors)
            setSizes(editProduct.sizes)
            setImages(editProduct.images)
            // setSelectCategory()         //доробити щоб при редагуванні відображалась вибрана категорія
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

    const handleSend = () => {

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

        fetch('http://localhost:3000/api/products/', {
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
                    setErrorCreateText("Товар створено")
                    setName('')
                    setSelectCategory({})
                    setPrice(0)
                    setNew_price(0)
                    setImages([])
                    setDetails('')
                    setColors([])
                    setSizes([])
                    dispatch(setIsNeedUpdateProducts(!isNeedUpdateProducts))
                    // localStorage.setItem('auth', JSON.stringify(res.data));
                } else {
                    console.log('POST CreationProduct', res)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                // dispatch(setIsNeedCreateShop(false)); 
            });
    }

    return (
        <div className='creation-product'>
            <div className='creation-product--wrap container'>
                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <label className='creation-product__section-input-label' htmlFor="name">
                            <b>Назва товару</b>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className='creation-product__section-input'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Введіть ім'я магазину..."
                        />
                    </div>
                    <div onClick={() => handleHelpOpen(1)} className='creation-product__section-btn-wrap'>
                        <div className={`creation-product__section-btn ${isOpenInfo.includes(1) ? 'creation-product__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-product__section-info ${isOpenInfo.includes(1) ? 'creation-product__section-info--active' : ''}`}>
                    <p>Введіть ім'я товару.</p>
                </div>

                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <div className="creation-product__section-title-wrap">
                            <span className="creation-product__section-title"><b>Категорія:</b></span>
                            <span className="creation-product__section-title-text">&nbsp;{selectCategory?.name}</span>
                        </div>
                        <label className='creation-product__section-input-label' htmlFor="category_id">
                            <b>Виберіть категорію товару</b>
                        </label>
                        <input className='creation-product__section-seach-input' type="text" placeholder="Пошук ..." id="category_id" value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} />
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
                    <p>Виберіть категорію товару.</p>
                </div>

                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <label className='creation-product__section-input-label' htmlFor="price">
                            <b>Ціна</b>
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            className='creation-product__section-input'
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            min='0'
                            placeholder="Введіть ціну..."
                        />
                    </div>
                    <div onClick={() => handleHelpOpen(3)} className='creation-product__section-btn-wrap'>
                        <div className={`creation-product__section-btn ${isOpenInfo.includes(3) ? 'creation-product__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-product__section-info ${isOpenInfo.includes(3) ? 'creation-product__section-info--active' : ''}`}>
                    <p>Введіть ціну на товар</p>
                </div>
                
                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <label className='creation-product__section-input-label' htmlFor="new_price">
                            <b>Ціна на товар, якщо є знижка</b>
                        </label>
                        <input
                            id="new_price"
                            name="new_price"
                            type="number"
                            className='creation-product__section-input'
                            onChange={(e) => setNew_price(e.target.value)}
                            value={new_price}
                            min='0'
                            placeholder="Введіть ціну..."
                        />
                    </div>
                    <div onClick={() => handleHelpOpen(4)} className='creation-product__section-btn-wrap'>
                        <div className={`creation-product__section-btn ${isOpenInfo.includes(4) ? 'creation-product__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-product__section-info ${isOpenInfo.includes(4) ? 'creation-product__section-info--active' : ''}`}>
                    <p>Якщо на товар є знижка введіь ціну з урахуванням знижки</p>
                </div>

                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <label className='creation-product__section-input-label' htmlFor="details">
                            <b>Опис товару</b>
                        </label>
                        <textarea
                            id="details"
                            name="details"
                            type="text"
                            className='creation-product__section-textarea'
                            onChange={(e) => setDetails(e.target.value)}
                            value={details}
                            placeholder="Опис..."
                            rows="5" 
                            cols="50"
                        />
                    </div>
                    <div onClick={() => handleHelpOpen(5)} className='creation-product__section-btn-wrap'>
                        <div className={`creation-product__section-btn ${isOpenInfo.includes(5) ? 'creation-product__section-btn--active' : ''}`}></div>
                    </div>
                </div>
                <div className={`creation-product__section-info ${isOpenInfo.includes(5) ? 'creation-product__section-info--active' : ''}`}>
                    <p>Введіть опис товару</p>
                </div>
                
                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <label className='creation-product__section-input-label' htmlFor="">
                            <b>Доступні кольори</b>
                        </label>
                        <div className='creation-product__create-btn-wrap'>
                           <CardInput handleChange={setUserColors}/>
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
                    <p>Введіть назви кольорів вашого товару</p>
                </div>
                
                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <label className='creation-product__section-input-label' htmlFor="">
                            <b>Доступні розміра</b>
                        </label>
                        <div className='creation-product__create-btn-wrap'>
                           <CardInput handleChange={setUserSizes}/>
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
                    <p>Введіть доступні розміра вашого товару</p>
                </div>
               
                <div className="creation-product__section">
                    <div className="creation-product__section-input-wrap">
                        <label className='creation-product__section-input-label' htmlFor="">
                            <b>Картинки</b>
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
                    <p>Загрузіть картинки товару.</p>
                </div>


                {
                    !!errorCreateText.length && !name.length && !selectCategory?.name && price == 0 && new_price == 0 && !images.length && !details.length && !colors.length && !sizes.length 
                                                && <div className='creation-product__error-text'>{errorCreateText}</div>
                }

                <button className='creation-product__btn-create' onClick={handleSend}>
                    {
                        isNeedUpdateShop ? 'Оновити' : 'Створити'
                    }
                </button>
            </div>
        </div>
    );
}

export default CreationProduct;