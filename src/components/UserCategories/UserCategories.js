import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setCategories, setIsCleanInput, setIsNeedUpdateCategories } from '../../store/userSlice';
import './UserCategories.css';
import man from '../../assets/images/man.webp';
import deleteImg from '../../assets/images/deleteImg.svg';
import editIcon from '../../assets/images/editIcon.svg';
import kids from '../../assets/images/kids.webp';
import ModalWindow from '../ModalWindow/ModalWindow';
import CardInput from '../CardInput/CardInput';

function UserCategories() {
    // let { userId } = useParams();
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const categories = useSelector(state => state.userSlice.categories);
    const isCleanInput = useSelector(state => state.userSlice.isCleanInput);
    const isNeedUpdateCategories = useSelector(state => state.userSlice.isNeedUpdateCategories);
    const [isModalDelCategory, setIsModalDelCategory] = useState(false);
    const [isModalDelSubCategory, setIsModalDelSubCategory] = useState(false);
    const [isModalEditSubCategory, setIsModalEditSubCategory] = useState(false);
    const [isOpenInfo, setIsOpenInfo] = useState([]);
    const [deleteId, setDeleteId] = useState('');
    const [deleteCategory, setDeleteCategory] = useState({});
    const [editSubCategory, setEditSubCategory] = useState({});
    const [errorCreateText, setErrorCreateText] = useState('');
    const [name, setName] = useState('');
    const [image_url, setImage_url] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const dispatch = useDispatch();
    
    // console.log(categories)

    const handleCreateCategory = () => {
        if (shop.name) {
            if (categories.length < 5) {
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
                            // console.log(res)
                            dispatch(setCategories(res.data))
                        } else {
                            console.log('POST UserCategories:', res)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
            } else {
                setErrorCreateText('Ви дасягнули ліміту категорій')
            }
        } else {
            setErrorCreateText('Спершу потрібно створити магазин')
        }
        
        
        setName('')
        setImage_url('')
    }
    
    const handleCreateSubCategory = (id) => {
        let data = {
            id: new Date().toString(),
            name: subCategory,
            image_url: '',
            parent_id: id,
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
                    // console.log(res)
                    dispatch(setIsNeedUpdateCategories(!isNeedUpdateCategories))
                    dispatch(setIsCleanInput(!isCleanInput))
                } else {
                    console.log('POST UserCategories:', res)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        
        setSubCategory('')
    }

    const handleHelpOpen = (num) => {
        if (isOpenInfo.includes(num)) {
            setIsOpenInfo(isOpenInfo.filter(el => el !== num))
        } else {
            setIsOpenInfo([...isOpenInfo, num])
        }
    }
    
    const handleDeleteCategories = (obj) => {
        setIsModalDelCategory(true)
        setDeleteCategory(obj)
    }

    const handleDeleteSubCategories = (id) => {
        setIsModalDelSubCategory(true)
        setDeleteId(id)
    }
    
    const handleEditCategories = (obj) => {
        setIsModalEditSubCategory(true)
        setEditSubCategory(obj)
    }
   
    const handleIsDeleteCategory = (boolean) => {
        if (boolean) {
            const data = {
                token: user.token,
            }

            deleteCategory.sub_categories.map(el => {
                fetch(`http://localhost:3000/api/categories/${el._id}`, {
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.success && res.data) {
                            console.log('del', res)
                        } else {
                            console.log('DELETE UserCategories', res)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    }) 
            })

            fetch(`http://localhost:3000/api/categories/${deleteCategory._id}`, {
                    method: 'DELETE',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.success && res.data) {
                            console.log('del', res)
                        } else {
                            console.log('DELETE UserCategories', res)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })

            dispatch(setIsNeedUpdateCategories(!isNeedUpdateCategories))
        } 
        
        setIsModalDelCategory(false)
        setDeleteCategory('')
    }

    const handleIsDeleteSubCategory = (boolean) => {
        if (boolean) {
            const data = {
                token: user.token,
            }

            fetch(`http://localhost:3000/api/categories/${deleteId}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        // console.log('del', res)
                        dispatch(setIsNeedUpdateCategories(!isNeedUpdateCategories))
                    } else {
                        console.log('DELETE UserCategories', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        } 
        
        setIsModalDelSubCategory(false)
        setDeleteId('')
    }
  
    const handleIsEditSubCategory = (boolean) => {
        if (boolean) {
            const data = {
                id: new Date().toString(),
                name: subCategory,
                image_url: '',
                parent_id: editSubCategory.parent_id,
                shop_id: shop._id,
                token: user.token,
            }

            fetch(`http://localhost:3000/api/categories/${editSubCategory._id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        // console.log('edit', res)
                        dispatch(setIsNeedUpdateCategories(!isNeedUpdateCategories))
                    } else {
                        console.log('Edit UserCategories', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        } 
        
        setIsModalEditSubCategory(false)
        setEditSubCategory({})
        setSubCategory('')
    }
  
    return (
        <div className="user-categories">

            {
                isModalDelCategory && <ModalWindow title={'Ви впевнені?'}  text={'Всі підкатегорії даної категорії будуть видалені'} handleClick={handleIsDeleteCategory}/>
            }

            {
                isModalDelSubCategory && <ModalWindow title={'Ви впевнені?'}  text={'Видалити дану категорію'} handleClick={handleIsDeleteSubCategory}/>
            }
            
            {
                isModalEditSubCategory && <ModalWindow title={'Редагувати категорію?'}  text={'Введіть нову назву'} handleClick={handleIsEditSubCategory} leftBtn={"Відмінити"} rightBtn={"Підтвердити"}>
                                            <CardInput setSubCategory={setSubCategory}/>
                                          </ ModalWindow>
            }
           
            <div className="user-categories--wrpa container">
                <h4 className="user-categories__title">Мої категорії {categories.length}/5</h4>

                {
                    !!errorCreateText.length && (<div className="user-categories__error-create-text">
                                        <span>{errorCreateText}</span>
                                        <button className="user-categories__error-create-btn" onClick={() => setErrorCreateText('')}>x</button>
                                      </div>)
                }

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
                    <p>Для створення категорії Впишіть її назву і нажміть на кнопку створити. Кількість категорій обмежена до "5". Для коректного відображення картинок, формат картинки повинен бути 16:9. Щоб створити категорію, спершу потрібно створити магазин. Після створення категорії зможете створювати підкатегорії.</p>
                </div>

                {
                    !!categories.length && (
                        <div className="user-categories__cards">
                            {
                                categories.map(el => (
                                    <div className="user-categories__card" key={el._id}>
                                        {/* <img className="user-categories__card-img" src={el.image_url} alt='img'/> */}
                                        <img className="user-categories__card-img" src={man} alt='img'/>
                                        <div className="user-categories__card-info">
                                            <div className="user-categories__card-title-wrap">
                                                <div className="user-categories__card-title"><b>Назва категорії:</b> {el.name}</div>
                                                <div className="user-categories__card-title-btn-wrap">
                                                    <img className="user-categories__card-title-btn" onClick={() => handleEditCategories(el)} src={editIcon} alt='img'/>
                                                    <img className="user-categories__card-title-btn" onClick={() => handleDeleteCategories(el)} src={deleteImg} alt='img'/>
                                                </div>
                                            </div>
                                            <label className='user-categories__card-label' htmlFor="setSubCategory">
                                                <b>Створити підкатегорію</b>
                                            </label>
                                            <div className='user-categories__card-input-wrap'>
                                                <CardInput setSubCategory={setSubCategory}/>
                                                <button className='user-categories__card-btn' onClick={() => handleCreateSubCategory(el._id)}>+</button>
                                            </div>
                                            <p className='user-categories__card-sub-title'><b>Підкатегорії:</b></p>
                                            <ul className='user-categories__card-sub-category'>
                                                {
                                                    el?.sub_categories?.map(subCategories => (
                                                        <li className='user-categories__card-sub-category-wrap' key={subCategories._id}>
                                                            <div>{subCategories.name}</div>
                                                            <div className='user-categories__card-sub-category-btn-wrap'>
                                                                <img className='user-categories__card-sub-category-btn' onClick={() => handleEditCategories(subCategories)} src={editIcon} alt='img'/>
                                                                <img className='user-categories__card-sub-category-btn' onClick={() => handleDeleteSubCategories(subCategories._id)} src={deleteImg} alt='img'/>
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