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
    const [selectedSort, setSelectedSort] = useState('priceUp');
    const [selectedPaget, setSelectedPaget] = useState('0');
    const [quantityAllProducts, setQuantityAllProducts] = useState('');
    // console.log(selectedLanguage)
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
    }, [id, categories, selectedPaget])

    const productSearch = (data) => {
        // fetch(`${process.env.REACT_APP_BASE_URL}/products/${shop._id}/number/all?token=${user.token}`)
        fetch(`${process.env.REACT_APP_BASE_URL}/products/${shop._id}/number/all?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjMzYzU2NWVhYjE4MzIwODVkMzEyNTM1IiwiZW1haWwiOiJhc2RAYXNkLmFzZCIsImlhdCI6MTY2ODA4NDI1MSwiZXhwIjoxNjY4MTAyMjUxfQ.MDGKlBWE4JKIHafHTmcQq38mAyftZlBfel_dAOLnTLE`)
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    console.log(res)
                    setQuantityAllProducts(res.data)
                } else {
                    console.log('GET ProductFilterView:', res)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })

        fetch(`${process.env.REACT_APP_BASE_URL}/products/${shop._id}/all?page=${selectedPaget}`)
            .then(res => res.json())
            .then(res => {
                if (res.success && res.data) {
                    console.log(res)
                    setCategoryProducts([...res.data])
                } else {
                    console.log('GET ProductFilterView:', res)
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
 
    useEffect(() => {
            if (selectedSort == 'priceUp') {
                let arr = [...categoryProducts]
                let res = arr.sort((a, b) => a.price - b.price)
                setCategoryProducts(res);
            } else if (selectedSort == 'priceDown') {
                let arr = [...categoryProducts]
                let res = arr.sort((a, b) => b.price - a.price)
                setCategoryProducts(res);
            } else if (selectedSort == 'newPrice') {
                let res = [...categoryProducts.filter(el => el.new_price !== 0), ...categoryProducts.filter(el => el.new_price == 0)]
                setCategoryProducts(res);
            } else if (selectedSort == 'new') {
                let res = [...categoryProducts.filter(el => el.new_price == 0), ...categoryProducts.filter(el => el.new_price !== 0)]
                setCategoryProducts(res);
            }
    }, [selectedSort])

    const handleChangeSort = (e) => {
        setSelectedSort(e.target.value)
    };

    return (
        <>
            {
                isLoading ? <Preloader /> :
                isPageNotFound ? (<PageNotFoundView />) :
                    (<div className="product-filter">
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
                                            <div className="product-filter__sort-wrap">
                                                <span className="product-filter__sort-label">{selectedLanguage?.categoriesPage?.categoriesSortTitle}</span>
                                                <select className="product-filter__sort-select" onChange={handleChangeSort} value={selectedSort}>
                                                    <option className="product-filter__sort-option" value="priceUp">{selectedLanguage?.categoriesPage?.categoriesSortOption1}</option>
                                                    <option className="product-filter__sort-option" value="priceDown">{selectedLanguage?.categoriesPage?.categoriesSortOption2}</option>
                                                    <option className="product-filter__sort-option" value="newPrice">{selectedLanguage?.categoriesPage?.categoriesSortOption3}</option>
                                                    <option className="product-filter__sort-option" value="new">{selectedLanguage?.categoriesPage?.categoriesSortOption4}</option>
                                                </select>
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

                                        {/* <PaginationItems items={categoryProducts} setCurrentPaginationItems={setPaginationProducts} pageRangeDisplayed={5} itemsPerPage={5}/> */}
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