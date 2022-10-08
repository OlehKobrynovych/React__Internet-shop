import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCategories } from '../../store/userSlice';
import './UserCategories.css';
import man from '../../assets/images/man.webp';
import deleteImg from '../../assets/images/deleteImg.svg';
import editIcon from '../../assets/images/editIcon.svg';
import kids from '../../assets/images/kids.webp';

function UserCategories() {
    // const [isOpenMenu, setIsOpenMenu] = useState(false);
    // let { userId } = useParams();
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const categories = useSelector(state => state.userSlice.categories);
    const [isOpenInfo, setisOpenInfo] = useState([]);
    const [name, setName] = useState('');
    const [image_url, setImage_url] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const dispatch = useDispatch();
    
    console.log(categories)

    const handleCreateCategory = () => {
        let data = {
            id: new Date().toString(),
            name: name,
            image_url: image_url,
            parent_id: 'null',
            shop_id: shop._id,
            token: user.token,
        }

        fetch('http://localhost:3000/api/categories/', {
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
                    dispatch(setCategories(res.data))
                    setName('')
                    setImage_url('')
                    // navigate(`/auth/${user._id}/shop`)
                    // localStorage.setItem('auth', JSON.stringify(res.data));
                } else {
                    console.log('POST UserCategories:', res)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    const handleHelpOpen = (num) => {
        if (isOpenInfo.includes(num)) {
            setisOpenInfo(isOpenInfo.filter(el => el !== num))
        } else {
            setisOpenInfo([...isOpenInfo, num])
        }
    }

    return (
        <div className="user-categories">
            <div className="user-categories--wrpa container">
                <h4 className="user-categories__title">Мої категорії {categories.length}/5</h4>

                <div className="user-categories__create">
                    <div className="user-categories__create-input-wrap">
                        <label className='user-categories__create-label' htmlFor="name">
                            <b>Назва категорії</b>
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className='user-categories__create-input'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Введіть назву..."
                        />

                        <div><b>Картинка</b></div>
                        <input className="user-categories__create-input-file" onChange={(e) => setImage_url(e.target.value)} type="file" id="file1" />
                    </div>

                    <div className="user-categories__create-btn-wrap">
                        <button onClick={() => handleCreateCategory()} className="user-categories__create-btn">Створоти категорію</button>

                        <div onClick={() => handleHelpOpen(1)} className='user-categories__create-btn-info-wrap'>
                            <div className={`user-categories__create-btn-info ${isOpenInfo.includes(1) ? 'user-categories__create-btn-info--active' : ''}`}></div>
                        </div>
                    </div>
                </div>
                <div className={`user-categories__create-info ${isOpenInfo.includes(1) ? 'user-categories__create-info--active' : ''}`}>
                    <p>Для створення категорії Впишіть її назву і нажміть на кнопку створити. Кількість категорій обмежена до "5". Для коректного відображення картинок, формат картинки повинен бути 16:9. Після створення категорії зможете створювати підкатегорії.</p>
                </div>

                {
                    categories.length && (
                        <div className="user-categories__cards">
                            {
                                categories.map(el => (
                                    <div className="user-categories__card" key={el._id}>
                                        {/* <img className="user-categories__card-img" src={el.image_url} alt='img'/> */}
                                        <img className="user-categories__card-img" src={man} alt='img'/>
                                        <div className="user-categories__card-info">
                                            <div className="user-categories__card-title"><b>Назва категорії:</b> {el.name}</div>
                                            <label className='user-categories__card-label' htmlFor="setSubCategory">
                                                <b>Створити підкатегорію</b>
                                            </label>
                                            <div className='user-categories__card-input-wrap'>
                                                <input
                                                    id="setSubCategory"
                                                    name="setSubCategory"
                                                    type="text"
                                                    className='user-categories__card-input'
                                                    onChange={(e) => setSubCategory(e.target.value)}
                                                    value={subCategory}
                                                    placeholder="Введіть назву..."
                                                />
                                                <button className='user-categories__card-btn'>+</button>
                                            </div>
                                            <p className='user-categories__card-sub-title'><b>Підкатегорії:</b></p>
                                            <ul className='user-categories__card-sub-category'>
                                                {
                                                    el.sub_categories.map(subCategories => (
                                                        <li className='user-categories__card-sub-category-wrap' key={subCategories._id}>
                                                            <div>{subCategories.name}</div>
                                                            <div className='user-categories__card-sub-category-btn-wrap'>
                                                                <img className='user-categories__card-sub-category-btn' src={editIcon} alt='img'/>
                                                                <img className='user-categories__card-sub-category-btn' src={deleteImg} alt='img'/>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }

            </div>
        </div>
    );
}

export default UserCategories;