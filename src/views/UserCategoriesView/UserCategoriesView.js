import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, setCategories, setIsCleanInput, setIsNeedUpdateCategories, setRemoveCategory, setRemoveSubCategory, setSubCategories, setUpdataCategory } from '../../store/userSlice';
import './UserCategoriesView.css';
import man from '../../assets/images/man.webp';
import deleteImg from '../../assets/images/deleteImg.svg';
import editIcon from '../../assets/images/editIcon.svg';
// import kids from '../../assets/images/kids.webp';
import ModalWindow from '../../components/ModalWindow/ModalWindow';
import InputText from '../../components/InputText/InputText';
import { toast } from 'react-toastify';
import noPhotos from '../../assets/images/noPhotos.svg';

function UserCategoriesView() {
    const selectedLanguage = useSelector(state => state.userSlice.selectedLanguage);
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
        
                fetch(`${process.env.REACT_APP_BASE_URL}/categories/`, {
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
                            showMessage('success', 'Категорію створено')
                        } else {
                            console.log('POST UserCategories:', res)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        showMessage('error', 'Сталася помилка')
                    })
            } else {
                setErrorCreateText(selectedLanguage?.userCategoriesView?.userCategoriesErrorCreateLimit)
            }
        } else {
            setErrorCreateText(selectedLanguage?.userCategoriesView?.userCategoriesErrorCreate)
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
    
        fetch(`${process.env.REACT_APP_BASE_URL}/categories/`, {
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
                    showMessage('success', 'Підкатегорію створено')
                } else {
                    console.log('POST UserCategories:', res)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                showMessage('error', 'Сталася помилка')
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
                fetch(`${process.env.REACT_APP_BASE_URL}/categories/${el._id}`, {
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

            fetch(`${process.env.REACT_APP_BASE_URL}/categories/${deleteCategory._id}`, {
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
                            showMessage('success', 'Категорія видалена')
                        } else {
                            console.log('DELETE UserCategories', res)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        showMessage('error', 'Сталася помилка')
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

            fetch(`${process.env.REACT_APP_BASE_URL}/categories/${deleteId.subCategoryId}`, {
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
                        showMessage('success', 'Підкатегорія видалена')
                    } else {
                        console.log('DELETE UserCategories', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    showMessage('error', 'Сталася помилка')
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

            fetch(`${process.env.REACT_APP_BASE_URL}/categories/${editCategory._id}`, {
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
                        showMessage('success', 'Назва змінена')
                    } else {
                        console.log('Edit UserCategories', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    showMessage('error', 'Сталася помилка')
                })
        } 
        
        setIsModalEditSubCategory(false)
        setEditCategory({})
        setSubCategory('')
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
        <div className="user-categories">

            {
                isModalDelCategory && <ModalWindow title={selectedLanguage?.userCategoriesView?.userCategoriesModalDelCatTitle} text={selectedLanguage?.userCategoriesView?.userCategoriesModalDelCatText} handleClick={handleIsDeleteCategory} leftBtn={selectedLanguage?.userCategoriesView?.userCategoriesModalDelCatLeftBtn} rightBtn={selectedLanguage?.userCategoriesView?.userCategoriesModalDelCatRightBtn}/>
            }

            {
                isModalDelSubCategory && <ModalWindow title={selectedLanguage?.userCategoriesView?.userCategoriesModalDelSubCatTitle} text={selectedLanguage?.userCategoriesView?.userCategoriesModalDelSubCatText} handleClick={handleIsDeleteSubCategory} leftBtn={selectedLanguage?.userCategoriesView?.userCategoriesModalDelSubCatLeftBtn} rightBtn={selectedLanguage?.userCategoriesView?.userCategoriesModalDelSubCatRightBtn}/>
            }
            
            {
                isModalEditSubCategory && <ModalWindow title={selectedLanguage?.userCategoriesView?.userCategoriesModalEditSubCatTitle}  text={selectedLanguage?.userCategoriesView?.userCategoriesModalEditSubCatText} handleClick={handleIsEditCategory} leftBtn={selectedLanguage?.userCategoriesView?.userCategoriesModalEditCatLeftBtn} rightBtn={selectedLanguage?.userCategoriesView?.userCategoriesModalEditCatRightBtn}>
                                            <InputText setValue={setSubCategory} value={subCategory} id={'userCategoriesSubCategory'} name={'userCategoriesSubCategory'} label={''} />
                                          </ ModalWindow>
            }
           
            <div className="user-categories--wrpa container">
                <h4 className="user-categories__title">{selectedLanguage?.userCategoriesView?.userCategoriesTitle}&nbsp;{categories.length}/5</h4>

                {
                    !!errorCreateText.length && (<div className="user-categories__error-create-text">
                                        <span>{errorCreateText}</span>
                                        <button className="user-categories__error-create-btn" onClick={() => setErrorCreateText('')}>x</button>
                                      </div>)
                }

                <div className="user-categories__create">
                    <div className="user-categories__create-input-wrap">
                        <InputText setValue={setName} value={name} id={'userCategoriesName'} name={'userCategoriesName'} label={selectedLanguage?.userCategoriesView?.userCategoriesCreateLabelName} placeholder={selectedLanguage?.userCategoriesView?.userCategoriesCreateNamePlaceholder}/>
                        <div><b>{selectedLanguage?.userCategoriesView?.userCategoriesCreateLabelImg}</b></div>
                        <input className="user-categories__create-input-file" onChange={(e) => setImage_url(e.target.value)} type="file" id="file1"/>
                    </div>

                    <div className="user-categories__create-btn-wrap">
                        <button onClick={() => handleCreateCategory()} className="user-categories__create-btn">{selectedLanguage?.userCategoriesView?.userCategoriesCreateCatBtn}</button>

                        <div onClick={() => handleHelpOpen(1)} className='user-categories__create-btn-info-wrap'>
                            <div className={`user-categories__create-btn-info ${isOpenInfo.includes(1) ? 'user-categories__create-btn-info--active' : ''}`}></div>
                        </div>
                    </div>
                </div>
                <div className={`user-categories__create-info ${isOpenInfo.includes(1) ? 'user-categories__create-info--active' : ''}`}>
                    <p>{selectedLanguage?.userCategoriesView?.userCategoriesCreateCatInfo}</p>
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
                                                <div className="user-categories__card-title"><b>{selectedLanguage?.userCategoriesView?.userCategoriesCardTitle}&nbsp;</b>{el?.name}</div>
                                                <div className="user-categories__card-title-btn-wrap">
                                                    <img className="user-categories__card-title-btn" onClick={() => handleEditCategories(el)} src={editIcon} alt='img'/>
                                                    <img className="user-categories__card-title-btn" onClick={() => handleDeleteCategories(el)} src={deleteImg} alt='img'/>
                                                </div>
                                            </div>
                                            <div className='user-categories__card-input-wrap'>
                                                <InputText setValue={setSubCategory} value={subCategory} id={'userCategoriesSubCategory'} name={'userCategoriesSubCategory'} label={selectedLanguage?.userCategoriesView?.userCategoriesCreateSub}/>
                                                <button className='user-categories__card-btn' onClick={() => handleCreateSubCategory(el._id)}>+</button>
                                            </div>
                                            <p className='user-categories__card-sub-title'><b>{selectedLanguage?.userCategoriesView?.userCategoriesSubTitle}</b></p>
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

export default UserCategoriesView;