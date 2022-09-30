import './ProductFilterView.css';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import PaginationProduct from '../../components/PaginationProduct/PaginationProduct';
import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useLocation } from 'react-router-dom';
import PageNotFoundView from '../PageNotFoundView/PageNotFoundView';
import LastProduct from '../../components/LastProduct/LastProduct';
import Preloader from '../../components/Preloader/Preloader';


function ProductFilterView() {
    
    let { id } = useParams();
    const products = useSelector(state => state.homeSlice.products);
    const lastViewProduct = useSelector(state => state.homeSlice.lastViewProduct);
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const categories = useSelector(state => state.homeSlice.categories);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [parentCategories, setParentCategories] = useState({});
    const [isPageNotFound, setIsPageNotFound] = useState(false);
    const [selectedSort, setSelectedSort] = useState('priceUp');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5);
    // console.log(selectedCategory)
    // const dispatch = useDispatch();
    // let location = useLocation();
    // const [isLoading, setIsLoading] = useState(true);
    // debugger

    useEffect(() => {
        // setIsLoading(true);

        if (categories?.length) {
            let res = categories.filter(el => el._id == id)
            if (res.length) {
                setSelectedCategory(res[0])
                setIsPageNotFound(false)
                
                if (res[0].parent_id !== 'null') {
                    setParentCategories(categories.find(el => el._id == res[0].parent_id))
                }
            } else {
                setIsPageNotFound(true)
            }
        }
        // fetch(`http://localhost:3000/api/categories/${id}`)
        // fetch('http://localhost:3000/api/categories/all')
        //     .then(res => res.json())
        //     .then(res => {
        //         if (res.success && res.data) {
        //             setSelectedCategory(res.data);
        //         } else {
        //             setCategoryProducts(null)
        //         }
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     })
        //     .finally(() => {
        //         setIsLoading(false);
        //     });
    }, [id, categories])

    useEffect(() => {
        if (products?.length && selectedCategory._id) {
            let res = products.filter(el => el.category_id == selectedCategory._id)
            setCategoryProducts(res)
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
                isPageNotFound ? (<PageNotFoundView />) :
                    (<div className="product-filter">
                        <div className="product-filter--wrap container">

                            {
                                selectedCategory.parent_id !== 'null' ? ( 
                                    <div className="product-filter__path">
                                        <NavLink className="product-filter__path-link" to='/'>{selectedLanguage?.homePage?.homeName}</NavLink>
                                        <span>&nbsp; / &nbsp;</span>
                                        <NavLink className="product-filter__path-link" to={`/category/${parentCategories._id}`}>{parentCategories?.name}</NavLink>
                                        <span>&nbsp; / &nbsp;</span>
                                        <span>{selectedCategory.name}</span>
                                    </div>
                                ) : (<div className="product-filter__path">
                                        <NavLink className="product-filter__path-link" to='/'>{selectedLanguage?.homePage?.homeName}</NavLink>
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

                                        <PaginationProduct
                                            productsPerPage={productsPerPage}
                                            totalProducts={categoryProducts.length}
                                            setCurrentPage={setCurrentPage} 
                                            currentPage={currentPage}
                                        />
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