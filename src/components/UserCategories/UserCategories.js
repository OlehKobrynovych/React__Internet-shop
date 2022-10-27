import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, setCategories, setIsCleanInput, setIsNeedUpdateCategories, setRemoveCategory, setRemoveSubCategory, setSubCategories, setUpdataCategory } from '../../store/userSlice';
import './UserCategories.css';
import man from '../../assets/images/man.webp';
import deleteImg from '../../assets/images/deleteImg.svg';
import editIcon from '../../assets/images/editIcon.svg';
// import kids from '../../assets/images/kids.webp';
import ModalWindow from '../ModalWindow/ModalWindow';
import CardInput from '../CardInput/CardInput';
import { toast } from 'react-toastify';
import noPhotos from '../../assets/images/noPhotos.svg';

function UserCategories() {
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const categories = useSelector(state => state.userSlice.categories);
    const isCleanInput = useSelector(state => state.userSlice.isCleanInput);
    const [isModalDelCategory, setIsModalDelCategory] = useState(false);
    const [isModalDelSubCategory, setIsModalDelSubCategory] = useState(false);
    const [isModalEditSubCategory, setIsModalEditSubCategory] = useState(false);
    const [isOpenInfo, setIsOpenInfo] = useState([]);
    const [deleteId, setDeleteId] = useState({});
    const [deleteCategory, setDeleteCategory] = useState({});
    const [editCategory, setEditCategory] = useState({});
    const [errorCreateText, setErrorCreateText] = useState('');
    const [name, setName] = useState('');
    const [image_url, setImage_url] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const dispatch = useDispatch();
    // const isNeedUpdateCategories = useSelector(state => state.userSlice.isNeedUpdateCategories);
    
    // console.log(categories)

    //  useEffect(() => {
    //      if (shop._id) {
    //         fetch(`http://localhost:3000/api/categories/${shop._id}/all`)
    //         .then(res => res.json())
    //         .then(res => {
    //             if (res.success && res.data) {
    //                 dispatch(getCategories(res.data));
    //             } else {
    //                 console.log('GET UserCategories:', res)
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         })
    //      }
    // }, [shop])

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
                            // console.log('POST UserCategories:', res)
                            dispatch(setCategories({...res.data, sub_categories: []}))
                            toast.success('Категорію створено', {
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
                            console.log('POST UserCategories:', res)
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
                    console.log(res)
                    dispatch(setSubCategories(res.data))
                    toast.success('Підкатегорію створено', {
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
                    console.log('POST UserCategories:', res)
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
        
        setSubCategory('')
        dispatch(setIsCleanInput(!isCleanInput))
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

    const handleDeleteSubCategories = (categoryId, subCategoryId ) => {
        setIsModalDelSubCategory(true)
        setDeleteId({
            categoryId: categoryId,
            subCategoryId: subCategoryId
        })
    }
    
    const handleEditCategories = (obj) => {
        setIsModalEditSubCategory(true)
        setEditCategory(obj)
    }
   
    const handleIsDeleteCategory = (boolean) => {
        if (boolean) {
            const data = {
                token: user.token,
            }

            deleteCategory?.sub_categories?.map(el => {
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
                            dispatch(setRemoveCategory(deleteCategory._id))
                            toast.success('Категорія видалена', {
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
                            console.log('DELETE UserCategories', res)
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
                
        setIsModalDelCategory(false)
        setDeleteCategory({})
    }

    const handleIsDeleteSubCategory = (boolean) => {
        if (boolean) {
            const data = {
                token: user.token,
            }

            fetch(`http://localhost:3000/api/categories/${deleteId.subCategoryId}`, {
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
                        dispatch(setRemoveSubCategory(deleteId))
                        toast.success('Підкатегорія видалена', {
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
                        console.log('DELETE UserCategories', res)
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
        
        setIsModalDelSubCategory(false)
        setDeleteId({})
    }
  
    const handleIsEditCategory = (boolean) => {
        if (boolean) {
            const data = {
                id: editCategory.id,     
                name: subCategory,
                image_url: editCategory.image_url,
                parent_id: editCategory.parent_id,
                shop_id: editCategory.shop_id,
                token: user.token,
            }

            fetch(`http://localhost:3000/api/categories/${editCategory._id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        dispatch(setUpdataCategory({...editCategory, name: subCategory}))
                        toast.success('Назва змінена', {
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
                        console.log('Edit UserCategories', res)
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
        
        setIsModalEditSubCategory(false)
        setEditCategory({})
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
                isModalEditSubCategory && <ModalWindow title={'Редагувати категорію?'}  text={'Введіть нову назву'} handleClick={handleIsEditCategory} leftBtn={"Відмінити"} rightBtn={"Підтвердити"}>
                                            <CardInput handleChange={setSubCategory}/>
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
                                    <div className="user-categories__card" key={el?._id}>
                                        {
                                            // el?.image_url ? <img className="user-categories__card-img" src={el?.image_url} alt='img'/>
                                            el?.image_url ? <img className="user-categories__card-img" src={man} alt='img'/>
                                                :  <img className="user-categories__card-img-none" src={noPhotos} alt='img'/>
                                        }
                                        <div className="user-categories__card-info">
                                            <div className="user-categories__card-title-wrap">
                                                <div className="user-categories__card-title"><b>Назва категорії:</b> {el?.name}</div>
                                                <div className="user-categories__card-title-btn-wrap">
                                                    <img className="user-categories__card-title-btn" onClick={() => handleEditCategories(el)} src={editIcon} alt='img'/>
                                                    <img className="user-categories__card-title-btn" onClick={() => handleDeleteCategories(el)} src={deleteImg} alt='img'/>
                                                </div>
                                            </div>
                                            <label className='user-categories__card-label' htmlFor="setSubCategory">
                                                <b>Створити підкатегорію</b>
                                            </label>
                                            <div className='user-categories__card-input-wrap'>
                                                <CardInput handleChange={setSubCategory}/>
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
                                                                <img className='user-categories__card-sub-category-btn' onClick={() => handleDeleteSubCategories(el._id, subCategories._id)} src={deleteImg} alt='img'/>
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