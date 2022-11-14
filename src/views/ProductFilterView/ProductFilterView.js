import './ProductFilterView.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import PageNotFoundView from '../PageNotFoundView/PageNotFoundView';
import LastProduct from '../../components/LastProduct/LastProduct';
import Preloader from '../../components/Preloader/Preloader';
import PaginationItems from '../../components/PaginationItems/PaginationItems';


function ProductFilterView() {
    
    let { id } = useParams();
    const products = useSelector(state => state.homeSlice.products);
    const lastViewProduct = useSelector(state => state.homeSlice.lastViewProduct);
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const categories = useSelector(state => state.homeSlice.categories);
    const shop = useSelector(state => state.homeSlice.shop);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [paginationProducts, setPaginationProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [parentCategories, setParentCategories] = useState({});
    const [isPageNotFound, setIsPageNotFound] = useState(false);
    const [selectedSort, setSelectedSort] = useState('1');
    const [selectedSortTitle, setSelectedSortTitle] = useState('');
    const [selectedPaget, setSelectedPaget] = useState('0');
    const [quantityAllProducts, setQuantityAllProducts] = useState('');
    const [selectedSortPrice, setSelectedSortPrice] = useState({title: 'Всі товари', value: 'all'});
    const [isOpenSelectSort, setIsOpenSelectSort] = useState(false);


    console.log(selectedSortPrice)
    // console.log(selectedSort)
    // const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    // debugger

    useEffect(() => {
        setIsLoading(true);
        setIsPageNotFound(false);

        fetch(`${process.env.REACT_APP_BASE_URL}/categories/${id}`)
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    setSelectedCategory(res.data);
                    productSearch(res.data)
                    console.log('Error:', res);
                } else {
                    setIsPageNotFound(true)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id, selectedSortPrice, selectedPaget])

    const productSearch = (data) => {
        fetch(`${process.env.REACT_APP_BASE_URL}/products/${data.shop_id}/number/all?category_id=${data._id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.success && res.data) {
                    setQuantityAllProducts(res.data)
                } else {
                    console.log('GET UserProduct:', res)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })

        fetch(`${process.env.REACT_APP_BASE_URL}/products/${data._id}/category?page=${selectedPaget}&price_filter=${selectedSortPrice.value == 'all' || selectedSortPrice.value == 'new' || selectedSortPrice.value == 'newPrice' ? "" : selectedSortPrice.value}`)
        // fetch(`${process.env.REACT_APP_BASE_URL}/products/${data.shop_id}/all?category=${data._id}&page=${selectedPaget}&price_filter=${selectedSortPrice.value == 'all' ? "" : selectedSortPrice.value}`)
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    console.log(res)
                    setCategoryProducts([...res.data])
                } else {
                    console.log('GET UserProduct:', res)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    useEffect(() => {
        if (selectedCategory?.parent_id && selectedCategory?.parent_id !== 'null') {
            setIsLoading(true);
            fetch(`${process.env.REACT_APP_BASE_URL}/categories/${selectedCategory.parent_id}`)
               .then(res => res.json())
               .then(res => {
                   if (res.success && res.data) {
                       setParentCategories(res.data);
                   } 
               })
               .catch((error) => {
                   console.error('Error:', error);
               })
               .finally(() => {
                    setIsLoading(false);
                });
        } 

    }, [selectedCategory])

    const handleOpenSelectSort = (e) => {
        e.stopPropagation()
        setIsOpenSelectSort(true)
    }

    const handleChangeSortPrice = (e, obj) => {
        e.stopPropagation()
        setIsOpenSelectSort(false)
        setSelectedPaget('0')
        setSelectedSortPrice(obj)
    };

    return (
        <>
            {
                isLoading ? <Preloader /> :
                isPageNotFound ? (<PageNotFoundView />) :
                    (<div className="product-filter" onClick={() => setIsOpenSelectSort(false)}>
                        <div className="product-filter--wrap container">

                            {
                                selectedCategory?.parent_id !== 'null' ? ( 
                                    <div className="product-filter__path">
                                        <NavLink className="product-filter__path-link" to={`/${shop.name}`}>{selectedLanguage?.homePage?.homeName}</NavLink>
                                        <span>&nbsp; / &nbsp;</span>
                                        <NavLink className="product-filter__path-link" to={`/${shop.name}/category/${parentCategories._id}`}>{parentCategories?.name}</NavLink>
                                        <span>&nbsp; / &nbsp;</span>
                                        <span>{selectedCategory.name}</span>
                                    </div>
                                ) : (<div className="product-filter__path">
                                        <NavLink className="product-filter__path-link" to={`/${shop.name}`}>{selectedLanguage?.homePage?.homeName}</NavLink>
                                        <span>&nbsp; / &nbsp;</span>
                                        <span>{selectedCategory?.name}</span>
                                        <span>&nbsp; /</span>
                                    </div>)
                            }
                        
                            <h2 className="product-filter__title">{selectedCategory?.name}</h2>

                            {
                                categoryProducts?.length ? 
                                    (<>
                                        <div className="product-filter__filter-wrap">
                                            <div className="product-filter__filter">
                                                {/* пошук товару по назві? */}
                                            </div>

                                            <div className='product-filter__price-wrap'>
                                                <span className='product-filter__price-label'>Сортувати:</span>
                                                <div className="product-filter__price-select-wrap">
                                                    <div className="product-filter__price-select" onClick={(e) => handleOpenSelectSort(e)}>
                                                        {selectedSortPrice?.title}
                                                        <div className='product-filter__price-select-btn-wrap'>
                                                            <div className={`product-filter__price-select-btn ${isOpenSelectSort ? 'product-filter__price-select-btn--active' : ''}`}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`product-filter__price-option-wrap ${isOpenSelectSort ? 'product-filter__price-option-wrap--active' : ''}`}>
                                                    <div className="product-filter__price-option" onClick={(e) => handleChangeSortPrice(e, {title: 'Всі товари', value: 'all'})}>Всі товари</div>
                                                    <div className="product-filter__price-option" onClick={(e) => handleChangeSortPrice(e, {title: selectedLanguage?.categoriesPage?.categoriesSortOption1, value: '1'})}>{selectedLanguage?.categoriesPage?.categoriesSortOption1}</div>
                                                    <div className="product-filter__price-option" onClick={(e) => handleChangeSortPrice(e, {title: selectedLanguage?.categoriesPage?.categoriesSortOption2, value: '-1'})}>{selectedLanguage?.categoriesPage?.categoriesSortOption2}</div>
                                                    <div className="product-filter__price-option" onClick={(e) => handleChangeSortPrice(e, {title: selectedLanguage?.categoriesPage?.categoriesSortOption3, value: 'newPrice'})}>{selectedLanguage?.categoriesPage?.categoriesSortOption3}</div>
                                                    <div className="product-filter__price-option" onClick={(e) => handleChangeSortPrice(e, {title: selectedLanguage?.categoriesPage?.categoriesSortOption4, value: 'new'})}>{selectedLanguage?.categoriesPage?.categoriesSortOption4}</div>
                                                </div >
                                            </div>
                                        </div>

                                        <ul className='product-filter__item--wrap categories-product--wrap'>
                                            {
                                                categoryProducts.map(el => (
                                                    <li key={el._id} className='product-filter__item'>
                                                        <ProductCard product={el}/>
                                                    </li>
                                                ))
                                            }
                                        </ul>

                                        <PaginationItems selectedPaget={selectedPaget} setSelectedPaget={setSelectedPaget} pageRangeDisplayed={5} itemsPerPage={10} quantityAllProducts={quantityAllProducts}/>
                                        
                                    </>) : <p className='product-filter__categories-error'>{selectedLanguage?.categoriesPage?.categoriesError}</p>
                            }

                            {
                                !!lastViewProduct.length && (<LastProduct />)
                            }

                        </div>
                    </div>)
            }
        </>
    );
}

export default ProductFilterView;