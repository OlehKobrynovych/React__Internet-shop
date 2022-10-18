import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import './UserAnalytics.css';

function UserAnalytics() {
    const user = useSelector(state => state.userSlice.user);
    const shop = useSelector(state => state.userSlice.shop);
    // const [isOpenMenu, setIsOpenMenu] = useState(false);
    // let { userId } = useParams();
    // const [categories, setCategories] = useState([]);
    // console.log(categories)

    useEffect(() => {
     
    }, [])

    return (
        <div className="user-analytics">
            <div className="user-analytics--wrpa container">
                <h3 className="user-analytics__title">Ляскаво просимо {user.first_name} {user.last_name}</h3>
                <NavLink className="user-analytics__shop-btn" to={`/${shop.name}`}>Перейти до магазину</NavLink>
            </div>
        </div>
    );
}

export default UserAnalytics;