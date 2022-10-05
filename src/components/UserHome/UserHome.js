import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './UserHome.css';

function UserHome() {
    const user = useSelector(state => state.userSlice.user);
    // const [isOpenMenu, setIsOpenMenu] = useState(false);
    // let { userId } = useParams();
    // const [categories, setCategories] = useState([]);
    // console.log(categories)

    useEffect(() => {
     
    }, [])

    return (
        <div className="user-home">
            <div className="user-home--wrpa container">
                <h3 className="user-home__title">Ляскаво просимо {user.first_name} {user.last_name}</h3>
            </div>
        </div>
    );
}

export default UserHome;