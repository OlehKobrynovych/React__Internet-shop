import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import './AdvertisingBlock.css';
// import { userTypeStore } from '../userTypeStore';
import { userTypeStore } from '../../userTypeStore';


function AdvertisingBlock() {
    const shopUser = useSelector(state => state.userSlice.shop);
    const shopStore = useSelector(state => state.homeSlice.shop);
    const [shop, setShop] = useState({});
    const [filterTypeStore, setFilterTypeStore] = useState('');
    const [otherTypeStore, setOtherTypeStore] = useState([]);
    const navigate = useNavigate();
    const [filterShop, setFilterShop] = useState([])

    // console.log(filterShop)
    // console.log(filterTypeStore)
    // console.log(otherTypeStore)

    const [testShop, setTestShop] = useState([
        {
            id: 1,
            name: 'Dnipro',
            logo: shop?.logo,
            productCount: '1540',
            time: '2022',
            typeStore: [10, 2],
        },
        {
            id: 2,
            name: 'Dnipro2',
            logo: shop?.logo,
            productCount: '8000',
            time: '2021',
            typeStore: [1, 2],
        }
    ]);

    useEffect(() => {

            // зробити запит на список фірм для реклами
            if (testShop?.length) {
                setFilterShop([...testShop])
            }

            if (shopUser?._id) {
                setShop(shopUser)
                setOtherTypeStore(userTypeStore[shopUser.language].filter(el => !shopUser?.typeStore?.includes(el.id)))
            } else {
                setShop(shopStore)
                setOtherTypeStore(userTypeStore[shopStore.language].filter(el => !shopStore?.typeStore?.includes(el.id)))
            }

    }, [])
   
    useEffect(() => {
        if (filterTypeStore) {
            let res = testShop.filter(el => el.typeStore.includes(filterTypeStore))
            setFilterShop(res)
        } else {
            setFilterShop([...testShop])
        }
    }, [filterTypeStore])


    // const handleClick = () => {
    //     navigate(`/${shop.name}/cart`)
    // };

    return (
        <>
            {
                otherTypeStore?.length && (
                    <div className='advertising-block container'>
                        <div className='advertising-block--wrap'>
                            <div className='advertising-block__filter-wrap'>
                                <div className='advertising-block__filter'>
                                    <span className='advertising-block__filter-title'>Вибрати категорію&nbsp;</span>
                                    <select onChange={(e) => setFilterTypeStore(Number(e.target.value))} value={filterTypeStore}>
                                        {
                                            otherTypeStore?.length && otherTypeStore.map(el => (
                                                <option value={el.id} key={el.id}>{el.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='advertising-block__items'>
                                <div className='advertising-block__items-title'>
                                    <span className='advertising-block__items-title-name'>Назва магазину</span>
                                    <span className='advertising-block__items-title-logo'>Логотип</span>
                                    <span className='advertising-block__items-title-time-wrap'>
                                        <span className='advertising-block__items-title-time'>Дата створення</span>
                                        <span className='advertising-block__items-title-count'>Кількість товарів</span>
                                    </span>
                                </div>
                                {
                                    !!filterShop?.length ? filterShop.map((el, index) => (
                                        <NavLink 
                                            to={`/${el.name}`}
                                            className='advertising-block__item' 
                                            key={el.id}
                                        >
                                            <span className='advertising-block__item-name-wrap'>{index + 1}&nbsp;<span className='advertising-block__item-name'>{el.name}</span></span>
                                            <img className='advertising-block__item-img' src={shop?.logo} alt='img'/>
                                            <span className='advertising-block__item-info'>
                                                <span>{el.time}</span>
                                                <span>{el.productCount}</span>
                                            </span>
                                        </NavLink>
                                    )) : <div className='advertising-block__text-error'>В даній категорії відсутні магазини</div>
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default AdvertisingBlock;