import './ProductFilter.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PaginationProduct from '../PaginationProduct/PaginationProduct';
import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useLocation } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import LastProduct from '../LastProduct/LastProduct';


function ProductFilter() {
   
    // const dispatch = useDispatch();
    const datas = useSelector(state => state.homeSlice.datas);
    const lastViewProduct = useSelector(state => state.homeSlice.lastViewProduct);
    let location = useLocation();

    const [selectedSort, setSelectedSort] = useState('priceUp');

    const [selectedCategories, setSelectedCategories] = useState(null);
    const [selectedSubCategories, setSelectedSubCategories] = useState(null);
    const [isPageNotFound, setIsPageNotFound] = useState(false);
    // debugger

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5);
 
    useEffect(() => {
        let arr = location.pathname.split('/')
        let obj = {};
        
        if (datas && datas.categories) {
            setProducts(datas.products);
            obj = datas.categories.find(el => el.href == ('/' + arr[1]));
            setSelectedCategories(obj)
            setIsPageNotFound(false)
        };

        if (arr[2] && obj?.subCategories) {
            let res = obj?.subCategories.find(el => el.href == location.pathname)
            res?.name ? setSelectedSubCategories(res) : setIsPageNotFound(true)
        } else {
            setSelectedSubCategories(null)
        }
    }, [location, datas])


    useEffect(() => {
        if (datas && datas.products) {
            if (selectedSort == 'priceUp') {
                let arr = [...datas.products]
                let res = arr.sort((a, b) => a.price - b.price)
                setProducts(res);
            } else if (selectedSort == 'priceDown') {
                let arr = [...datas.products]
                let res = arr.sort((a, b) => b.price - a.price)
                setProducts(res);
            }
        }
    }, [selectedSort])

    const handleChangeSort = (e) => {
        setSelectedSort(e.target.value)
    };
    

    return (
        <>
            {
                isPageNotFound ? <PageNotFound /> :
                    <div className="product-filter">
                        <div className="product-filter--wrap container">

                            {
                                selectedSubCategories ? ( 
                                    <div className="product-filter__path">
                                        <NavLink className="product-filter__path-link" to='/'>Головна сторінка</NavLink>
                                        <span>&nbsp; / &nbsp;</span>
                                        <NavLink className="product-filter__path-link" to={selectedCategories.href}>{selectedCategories?.name}</NavLink>
                                        <span>&nbsp; / &nbsp;</span>
                                        <span>{selectedSubCategories.name}</span>
                                    </div>
                                ) : (<div className="product-filter__path">
                                        <NavLink className="product-filter__path-link" to='/'>Головна сторінка</NavLink>
                                        <span>&nbsp; / &nbsp;</span>
                                        <span>{selectedCategories?.name}</span>
                                        <span>&nbsp; /</span>
                                    </div>)
                            }
                        
                            <h2 className="product-filter__title">{selectedCategories?.name}</h2>

                            <div className="product-filter__filter-wrap">
                                <div className="product-filter__filter">

                                </div>
                                <div className="product-filter__sort-wrap">
                                    <span className="product-filter__sort-label">Сортування</span>
                                    <select className="product-filter__sort-select" onChange={handleChangeSort} value={selectedSort}>
                                        <option className="product-filter__sort-option" value="priceUp">По зростанню ціни</option>
                                        <option className="product-filter__sort-option" value="priceDown">По спаданню ціни</option>
                                        <option className="product-filter__sort-option" value="newPrice">Знижки</option>
                                        <option className="product-filter__sort-option" value="new">Новинки</option>
                                    </select>
                                </div>
                            </div>

                            <ul className='product-filter__item--wrap categories-product--wrap'>
                                {
                                    products.map(products => (
                                        <li key={products.id} className='product-filter__item'>
                                            <ProductCard products={products}/>
                                        </li>
                                    ))
                                }
                            </ul>

                            <PaginationProduct
                                productsPerPage={productsPerPage}
                                totalProducts={products.length}
                                setCurrentPage={setCurrentPage} 
                                currentPage={currentPage}
                            />

                            <LastProduct />

                        </div>
                    </div>
            }
        </>
    );
}

export default ProductFilter;