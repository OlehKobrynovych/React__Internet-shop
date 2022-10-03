import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserCategories.css';

function UserCategories() {
    // const [isOpenMenu, setIsOpenMenu] = useState(false);
    let { userId } = useParams();
    const [categories, setCategories] = useState([]);
    // console.log(categories)

    useEffect(() => {
        // fetch(`http://localhost:3000/api/categories/${userId}/all`)
        //     .then(res => res.json())
        //     .then(res => {
        //         if (res.success && res.data.length) {
        //             setCategories(res.data);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     })
    }, [])

    return (
        <div className="user-categories">
            <div className="user-categories--wrpa container">
                <div className="user-categories">
                    <h4 className="user-categories__title">Мої категорії</h4>
                    
                </div>
            </div>
        </div>
    );
}

export default UserCategories;