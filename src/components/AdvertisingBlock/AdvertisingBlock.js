import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './AdvertisingBlock.css';

function AdvertisingBlock() {
    // const [isOpenMenu, setIsOpenMenu] = useState(false);
    const shoppingProduct = useSelector(state => state.homeSlice.shoppingProduct);
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const shop = useSelector(state => state.homeSlice.shop);
    const [filterTypeStore, setFilterTypeStore] = useState('');
    const [otherTypeStore, setOtherTypeStore] = useState([]);
    const navigate = useNavigate();
    // console.log(shoppingProductUser)
    const [typeStore, setTypeStore] = useState([
        {id: 1, name: 'Ноутбуки и компьютеры'},
        {id: 2, name: 'Компьютерные комплектующие і аксесуари'},
        {id: 3, name: 'Оргтехніка'},
        {id: 4, name: 'Смартфоны'},
        // 'Ноутбуки и компьютеры',
        // 'Компьютерные комплектующие і аксесуари', 
        // 'Оргтехніка', 
        // 'Смартфоны', 
        // 'Планшети', 
        // 'Телевізори',  
        // 'Годиники',  
        // 'Товари для геймерів',  
        // 'Побутова техніка',  
        // 'Електро техніка',  
        // 'Електро інструменти',  
        // 'Сантехніка',  
        // 'Будівельні матеріали',  
        // 'Дача, сад, огород',  
        // 'Спортивні товари',  
        // 'Рибалка',  
        // 'Домашній текстиль',  
        // 'Посуда',  
        // 'Побутова хімія',  
        // 'Мебель',  
        // 'Освітлення',  
        // 'Тренажери і фітнес',  
        // 'Інвентарь для дому і офісу',  
        // 'Зоотовари',  
        // 'Ковані вироби',  
        // 'Сувенірна продукція',  
        // 'Хоббі, ручна робота',  
        // 'Автотовари',  
        // 'Одяг',  
        // 'Жіночий одяг',  
        // 'Чоловічий одяг',  
        // 'Дитячий одяг',  
        // 'Дитячі товари',  
        // 'Дитяче харчування',  
        // 'Взуття',  
        // 'Рукзаки',  
        // 'Товари для офісу, школи',  
        // 'Книжки',  
        // 'Косметика',  
        // 'Товари гігієни',  
        // 'Алкогольні напої і продукти',  
        // 'Тютюнові вироби',  
        // 'Електронні сигарети і аксесуари',  
        // 'Бакалія',  
        // 'Спортивна і здорова їжа',  
        // 'Товари для бізнесу',  
        // 'Складське обладнання',  
        // 'Торгівельне обладнання',  
    ]);
    const [testShop, setTestShop] = useState([
        {
            id: 1,
            name: 'Dnipro',
            logo: shop?.logo,
            productCount: '1540',
            time: '2022',
            typeStore: [1, 2],
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
        if (shop?.typeStore?.length) {
            setOtherTypeStore(typeStore.filter(el => !shop?.typeStore.includes(el.id)))
        }
    }, [shop])

    // const handleClick = () => {
    //     navigate(`/${shop.name}/cart`)
    // };

    return (
        <div className="advertising-block">
            <div className='user-shop__advertising-title'>Вигляд блоку реклами</div>
            <div className='user-shop__advertising'>
                <div className='user-shop__advertising-filter-wrap'>
                    <div className='user-shop__advertising-filter'>
                        <span className='user-shop__advertising-filter-title'>Вибрати категорію&nbsp;</span>
                        <select onChange={(e) => setFilterTypeStore(e.target.value)} value={filterTypeStore}>
                            {
                                otherTypeStore?.length && otherTypeStore.map(el => (
                                    <option value={el.id} key={el.id}>{el.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className='user-shop__advertising-items'>
                    <div className='user-shop__advertising-items-title'>
                        <span className='user-shop__advertising-items-title-name'>Назва магазину</span>
                        <span className='user-shop__advertising-items-title-logo'>Логотип</span>
                        <span className='user-shop__advertising-items-title-time-wrap'>
                            <span className='user-shop__advertising-items-title-time'>Дата створення</span>
                            <span className='user-shop__advertising-items-title-count'>Кількість товарів</span>
                        </span>
                    </div>
                    {
                        !!testShop?.length && testShop.map((el, index) => (
                            <div className='user-shop__advertising-item' key={el.id}>
                                <span className='user-shop__advertising-item-name-wrap'>{index + 1}&nbsp;<span className='user-shop__advertising-item-name'>{el.name}</span></span>
                                <img className='user-shop__advertising-item-img' src={shop?.logo} alt='img'/>
                                <span className='user-shop__advertising-item-info'>
                                    <span>{el.time}</span>
                                    <span>{el.productCount}</span>
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default AdvertisingBlock;