import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import './LayoutUser.css';
import bell from '../assets/images/bell.svg';
import avatar from '../assets/images/avatar.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, getProducts, setCategories, setIsNeedCreateShop, setIsNeedUpdateShop, setShop, setUser } from '../store/userSlice';
import LoginBtn from '../components/LoginBtn/LoginBtn';
import ModalWindow from '../components/ModalWindow/ModalWindow';


function LayoutUser() {

    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isModalWindow, setModalWindow] = useState(false);
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const navigate = useNavigate();
    // let { userId } = useParams();
    // const isNeedUpdateCategories = useSelector(state => state.userSlice.isNeedUpdateCategories);
    // console.log(shop)

    useEffect(() => {
        if (!user.email) {
            let auth = JSON.parse(localStorage.getItem('auth'));
            if (auth?.email) {
                dispatch(setUser(auth))
            } else {
                navigate('/auth/login')
            }
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])
    
    useEffect(() => {
        fetch('http://localhost:3000/api/shops/all')
        .then(res => res.json())
        .then(res => {
            if (res.success && res.data) {
                let res1 = res.data.find(el => el.owner_id == user._id)
                if (res1?.name) {
                    dispatch(setShop(res1));
                    dispatch(setIsNeedCreateShop(false));
                } else {
                    dispatch(setIsNeedCreateShop(true));
                } 
            } else {
                console.log('GET LayoutUser:', res)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, [user])
    
    useEffect(() => {
        fetch(`http://localhost:3000/api/categories/${shop._id}/all`)
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    dispatch(getCategories(res.data));
                    // console.log('GET LayoutUser:', res)
                } else {
                    console.log('GET LayoutUser:', res)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, [shop])
   
    useEffect(() => {
        fetch(`http://localhost:3000/api/products/${shop._id}/all`)
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    // console.log(res)
                    dispatch(getProducts(res.data));
                } else {
                    console.log('GET LayoutUser:', res)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, [shop])

    const handleResize = () => {
        if (window.innerWidth < 768) {
            setIsOpenMenu(true)
        }
    }

    const openNav = () => {
        setIsOpenMenu(!isOpenMenu)
    };
   
    const handleExit = (boolean) => {
        setModalWindow(!isModalWindow)

        if (boolean) {
            localStorage.removeItem('auth');
            setModalWindow(!isModalWindow)
            navigate('/')
        } else {
            setModalWindow(!isModalWindow)
        }
    };


    return (
        <div className='layout-user'>
            <div className='layout-user--wrpa'>
                <div className={`layout-user__sidenav ${!isOpenMenu ? "layout-user__sidenav--open" : "layout-user__sidenav--close"}`}>
                    <div className="layout-user__sidenav-btn-wrap"><b onClick={() => openNav()} className="layout-user__sidenav-btn">&times;</b></div>
                    <h3 className='layout-user__sidenav-title'>Назва сайту</h3>
                    <NavLink className='layout-user__sidenav-link' to={`/auth/${user._id}/`}>Аналітика</NavLink>
                    <NavLink className='layout-user__sidenav-link' to={`/auth/${user._id}/shop`} onClick={() => dispatch(setIsNeedUpdateShop(false)) }>Магазин</NavLink>
                    <NavLink className='layout-user__sidenav-link' to={`/auth/${user._id}/categories`}>Категорії</NavLink>
                    <NavLink className='layout-user__sidenav-link' to={`/auth/${user._id}/product`}>Товар</NavLink>
                    <NavLink className='layout-user__sidenav-link' to={`/auth/${user._id}/message`}>Повідомлення</NavLink>
                    <button onClick={() => setModalWindow(!isModalWindow)} className='layout-user__sidenav-link'>Вихід</button>
                </div>

                <div className={`layout-user__main ${!isOpenMenu ? "layout-user__main--open" : "layout-user__main--close"}`}>
                    <div className='layout-user__header container'>
                        <div className='layout-user__header-menu' onClick={() => openNav()}>
                            <span className={`layout-user__header-menu-span ${!isOpenMenu ? "layout-user__header-menu-span--open1" : ""}`}></span>
                            <span className='layout-user__header-menu-span layout-user__header-menu-span2'></span>
                            <span className={`layout-user__header-menu-span ${!isOpenMenu ? "layout-user__header-menu-span--open3" : ""}`}></span>
                        </div>

                        <div className='layout-user__header-btn--wrap'>
                            <div className='layout-user__header-btn-message'>
                                <NavLink to={`/auth/${user._id}/message`}><img className='layout-user__header-btn-message-img' src={bell} alt='img' /></NavLink>
                                <div className='layout-user__header-btn-message-circle'>2</div>
                            </div>

                            <NavLink to={`/auth/${user._id}`} className='layout-user__header-avatar-wrap'>
                                <img className='layout-user__header-avatar-img' src={avatar} alt='img' />
                                <b className='layout-user__header-avatar-name'>{user?.first_name} {user?.last_name}</b>
                            </NavLink>

                            <div className='layout-user__header-login-wrap' onClick={() => setModalWindow(!isModalWindow)}>
                                <LoginBtn />
                            </div>
                        </div>
                    </div>

                    <Outlet />
                </div>
            </div>

            {
                isModalWindow && <ModalWindow title={'Ви впевнені?'} text={'Бажаєте покинути особистий кабінет?'} handleClick={handleExit}/>
            }

        </div>
    );
}

export default LayoutUser;