import './PaginationItems.css';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';

// import cart from '../../assets/images/cart.svg';

// function PaginationItems({items, setCurrentPaginationItems, pageRangeDisplayed, itemsPerPage}) {
function PaginationItems({selectedPaget, setSelectedPaget, pageRangeDisplayed, quantityAllProducts, itemsPerPage}) {
    const selectedLanguage = useSelector(state => state.homeSlice.selectedLanguage);
    const [pageOffset, setPageOffset] = useState(null); 
    const [pageCount, setPageCount] = useState(0); // скільки сторінок 
    const [itemOffset, setItemOffset] = useState(0);  // скільки на сторінці
    console.log("selectedPaget", selectedPaget)
    // console.log(itemsPerPage)
    // console.log('pageCount',selectedPaget)
    // console.log('pageCount',pageCount)
    
    // useEffect(() => {
    //     setPageOffset(selectedPaget)
    // }, [selectedPaget]);

    useEffect(() => {
        setItemOffset(itemsPerPage)
        setPageCount(Math.ceil(quantityAllProducts / itemsPerPage));
        // setPageCount((quantityAllProducts / itemsPerPage));
    }, [quantityAllProducts, itemsPerPage]);

    // useEffect(() => {
    //     if (!!items?.length) {
    //         const  = itemOffset + itemsPerPage;
    //         setCurrentPaginationItems(items.slice(itemOffset, endOffset));
    //         setPageCount(Math.ceil(items.length / itemsPerPage));endOffset
    //     } else {
    //         setCurrentPaginationItems(items);
    //         setPageCount(1);
    //     }
    // }, [itemOffset, itemsPerPage, items]);
    
    const handlePageClick = (event) => {
        setSelectedPaget(event.selected)
        setPageOffset(event.selected)
    // console.log(event)
        // const newOffset = (event.selected * itemsPerPage) % items.length;
        // setItemOffset(newOffset);


    };

    return (
        <div className="pagination-items conteaner">
            <ReactPaginate
                    breakLabel="..."
                    nextLabel={selectedLanguage?.pagination?.paginationNextBtn}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={pageRangeDisplayed}
                    pageCount={pageCount}
                    previousLabel={selectedLanguage?.pagination?.paginationPrevBtn}
                    // renderOnZeroPageCount={selectedPaget}
                    // renderOnZeroPageCount={handlePageClick1}
                    forcePage={+selectedPaget}
                    // initialPage={pageOffset}
                    // nextSelectedPage={selectedPaget}
                    // renderOnZeroPageCount={null}
                    previousClassName='pagination-items__paginate-previous-btn'
                    nextClassName='pagination-items__paginate-next-btn'
                    pageClassName='pagination-items__paginate-li-wrap'
                    pageLinkClassName='pagination-items__paginate-li-link'
                    activeClassName='pagination-items__paginate-item-active'
                    containerClassName='pagination-items__container-paginate'
                    nextLinkClassName='pagination-items__paginate-next-btn-link'
                    previousLinkClassName='pagination-items__paginate-previous-btn-link'
                />
        </div>
    );
}

export default PaginationItems;