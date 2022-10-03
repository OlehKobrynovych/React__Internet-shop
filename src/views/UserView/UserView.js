import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import './UserView.css';
import bell from '../../assets/images/bell.svg';
import avatar from '../../assets/images/avatar.svg';



function UserView() {

    const navigate = useNavigate();
    let { userId } = useParams();
    const [user, setUser] = useState({});
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const openNav = () => {
        setIsOpenMenu(!isOpenMenu)
    };

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


        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [])

    function handleResize() {
        if (window.innerWidth < 768) {
            setIsOpenMenu(true)
        }
    }

    return (
        <div className='user-view'>
                <div className={`user-view__sidenav ${!isOpenMenu ? "user-view__sidenav--open" : "user-view__sidenav--close"}`}>
                    <div className="user-view__sidenav-btn" onClick={() => openNav()}><b>&times;</b></div>
                    <h3 className='user-view__sidenav-title'>Назва сайту</h3>
                    <NavLink className='user-view__sidenav-link' to="#">Категорії</NavLink>
                    <NavLink className='user-view__sidenav-link' to="#">Магазин</NavLink>
                    <NavLink className='user-view__sidenav-link' to="#">Товар</NavLink>
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
                            <div className='user-view__header-avatar-wrap'>
                                <img className='user-view__header-avatar-img' src={avatar} alt='img' />
                                <span className='user-view__header-avatar-name'>sdfsdfs</span>
                            </div>
                        </div>
                    </div>

                    <Outlet />

                </div>
        </div>
    );
}

export default UserView;