import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import './UserView.css';
import bell from '../../assets/images/bell.svg';
import avatar from '../../assets/images/avatar.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setIsNeedUpdate, setUser } from '../../store/userSlice';
import LoginBtn from '../../components/LoginBtn/LoginBtn';
import ModalWindow from '../../components/ModalWindow/ModalWindow';


function UserView() {

    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isModalWindow, setModalWindow] = useState(false);
    const user = useSelector(state => state.userSlice.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const navigate = useNavigate();
    // let { userId } = useParams();
    // console.log(user)

    useEffect(() => {
        // fetch('http://localhost:3000/api/products/all')
        // .then(res => res.json())
        // .then(res => {
        //     if (res.success && res.data.length) {
        //         dispatch(getProducts(res.data));
        //     }
        // })
        // .catch((error) => {
        //     console.error('Error:', error);
        // })


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
        <div className='user-view'>
            <div className='user-view--wrpa'>
                <div className={`user-view__sidenav ${!isOpenMenu ? "user-view__sidenav--open" : "user-view__sidenav--close"}`}>
                    <div className="user-view__sidenav-btn-wrap"><b onClick={() => openNav()} className="user-view__sidenav-btn">&times;</b></div>
                    <h3 className='user-view__sidenav-title'>Назва сайту</h3>
                    <NavLink className='user-view__sidenav-link' to={`/auth/${user._id}/shop`} onClick={() => dispatch(setIsNeedUpdate(false)) }>Магазин</NavLink>
                    <NavLink className='user-view__sidenav-link' to={`/auth/${user._id}/categories`}>Категорії</NavLink>
                    <NavLink className='user-view__sidenav-link' to="#">Товар</NavLink>
                    <NavLink className='user-view__sidenav-link' to="#">Повідомлення</NavLink>
                    <button onClick={() => setModalWindow(!isModalWindow)} className='user-view__sidenav-link'>Вихід</button>
                </div>

                <div className={`user-view__main ${!isOpenMenu ? "user-view__main--open" : "user-view__main--close"}`}>
                    <div className='user-view__header container'>
                        <div className='user-view__header-menu' onClick={() => openNav()}>
                            <span className={`user-view__header-menu-span ${!isOpenMenu ? "user-view__header-menu-span--open1" : ""}`}></span>
                            <span className='user-view__header-menu-span user-view__header-menu-span2'></span>
                            <span className={`user-view__header-menu-span ${!isOpenMenu ? "user-view__header-menu-span--open3" : ""}`}></span>
                        </div>

                        <div className='user-view__header-btn--wrap'>
                            <div className='user-view__header-btn-message'>
                                <img className='user-view__header-btn-message-img' src={bell} alt='img' />
                                <div className='user-view__header-btn-message-circle'></div>
                            </div>

                            <NavLink to={`/auth/${user._id}`} className='user-view__header-avatar-wrap'>
                                <img className='user-view__header-avatar-img' src={avatar} alt='img' />
                                <b className='user-view__header-avatar-name'>{user?.first_name} {user?.last_name}</b>
                            </NavLink>

                            <div className='user-view__header-login-wrap' onClick={() => setModalWindow(!isModalWindow)}>
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

export default UserView;