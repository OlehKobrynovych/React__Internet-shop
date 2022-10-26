import './PaginationItems.css';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

// import cart from '../../assets/images/cart.svg';

function PaginationItems({items, setCurrentPaginationItems, pageRangeDisplayed, itemsPerPage}) {
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    // console.log(itemOffset)
    
    useEffect(() => {
        if (!!items?.length) {
            const endOffset = itemOffset + itemsPerPage;
            setCurrentPaginationItems(items.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(items.length / itemsPerPage));
        } else {
            setCurrentPaginationItems(items);
            setPageCount(1);
        }
    // }, [itemOffset, itemsPerPage, items]);
    }, [itemOffset, itemsPerPage, items]);
    
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    return (
        <div className="pagination-items conteaner">
            <ReactPaginate
                    breakLabel="..."
                    nextLabel="вперед >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={pageRangeDisplayed}
                    pageCount={pageCount}
                    previousLabel="< назад"
                    // renderOnZeroPageCount={undefined}
                    // renderOnZeroPageCount={handlePageClick1}
                    // forcePage={itemOffset1}
                    // initialPage={itemOffset1 ? 0 : 1}
                    // renderOnZeroPageCount={handlePageClick1}
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