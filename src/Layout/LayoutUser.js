import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import './LayoutUser.css';
import bell from '../assets/images/bell.svg';
import cartUser from '../assets/images/cartUser.svg';
import avatar from '../assets/images/avatar.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getCategories, getProducts, setCategories, setIsNeedCreateShop, setIsNeedUpdateShop, setSelectedLanguage, setShop, setUser } from '../store/userSlice';
import LoginBtn from '../components/LoginBtn/LoginBtn';
import ModalWindow from '../components/ModalWindow/ModalWindow';
import { languageUser } from '../languageUser';


function LayoutUser() {
    const selectedLanguage = useSelector(state => state.userSlice.selectedLanguage);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isModalWindow, setModalWindow] = useState(false);
    const [purchasesLength, setPurchasesLength] = useState(null);
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const navigate = useNavigate();
    // let { userId } = useParams();
    // const isNeedUpdateCategories = useSelector(state => state.userSlice.isNeedUpdateCategories);
    console.log(selectedLanguage)

    useEffect(() => {
        if (!user.email) {
            let auth = JSON.parse(localStorage.getItem('auth'));
            if (auth?.email) {
                dispatch(setUser(auth))

                fetch(`${process.env.REACT_APP_BASE_URL}/shops/all`)
                    .then(res => res.json())
                    .then(res => {
                        if (res.success && res.data) {
                            let res1 = res.data.find(el => el.owner_id == auth._id)
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
            } else {
                navigate('/auth/login')
            }
        } else {
            fetch(`${process.env.REACT_APP_BASE_URL}/shops/all`)
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
        }

        let res = (JSON.parse(localStorage.getItem('userLanguage')));
        if (res?.length) {
            dispatch(setSelectedLanguage(languageUser[res]));
        } else {
            dispatch(setSelectedLanguage(languageUser['ENG']));
            localStorage.setItem('userLanguage', JSON.stringify('ENG'));
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])
    
    useEffect(() => {
        if (shop?._id && user?.token) {
            fetch(`${process.env.REACT_APP_BASE_URL}/purchases/${shop._id}/number?token=${user.token}`)
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        setPurchasesLength(res.data)
                    } else {
                        console.log('GET LayoutUser:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })

            fetch(`${process.env.REACT_APP_BASE_URL}/categories/${shop._id}/all`)
                .then(res => res.json())
                .then(res => {
                    if (res.success && res.data) {
                        dispatch(getCategories(res.data));
                    } else {
                        console.log('GET UserCategories:', res)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                })
        }
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
                    <h3 className='layout-user__sidenav-title'>{selectedLanguage?.layoutUser?.layoutCompanyName}</h3>
                    <NavLink className='layout-user__sidenav-link' to={`/auth/${user._id}/`}>{selectedLanguage?.layoutUser?.layoutLinkAnalytics}</NavLink>
                    <NavLink className='layout-user__sidenav-link' to={`/auth/${user._id}/shop`} onClick={() => dispatch(setIsNeedUpdateShop(false))}>{selectedLanguage?.layoutUser?.layoutLinkShop}</NavLink>
                    <NavLink className='layout-user__sidenav-link' to={`/auth/${user._id}/categories`}>{selectedLanguage?.layoutUser?.layoutLinkCategories}</NavLink>
                    <NavLink className='layout-user__sidenav-link' to={`/auth/${user._id}/product`}>{selectedLanguage?.layoutUser?.layoutLinkProducts}</NavLink>
                    <NavLink className='layout-user__sidenav-link' to={`/auth/${user._id}/purchases`}>{selectedLanguage?.layoutUser?.layoutLinkOrders}</NavLink>
                    <NavLink className='layout-user__sidenav-link' to={`/auth/${user._id}/messages`}>{selectedLanguage?.layoutUser?.layoutLinkMessage}</NavLink>
                    <NavLink className='layout-user__sidenav-link' to={`/auth/${user._id}/settings`}>{selectedLanguage?.layoutUser?.layoutLinkSettings}</NavLink>
                    <button onClick={() => setModalWindow(!isModalWindow)} className='layout-user__sidenav-link'>{selectedLanguage?.layoutUser?.layoutLinkExit}</button>
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
                                <NavLink to={`/auth/${user._id}/messages`}><img className='layout-user__header-btn-message-img' src={bell} alt='img' /></NavLink>
                                {
                                    purchasesLength && <div className='layout-user__header-btn-message-circle'>{purchasesLength}</div>
                                }
                            </div>
                            
                            <div className='layout-user__header-btn-message'>
                                <NavLink to={`/auth/${user._id}/purchases`}><img className='layout-user__header-btn-message-img' src={cartUser} alt='img' /></NavLink>
                                {
                                    purchasesLength && <div className='layout-user__header-btn-message-circle'>{purchasesLength}</div>
                                }
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