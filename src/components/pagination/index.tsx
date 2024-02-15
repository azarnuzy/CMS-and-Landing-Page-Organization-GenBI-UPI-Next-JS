import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

type Tpagination = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Tpagination) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    // Case when totalPages is less than 4
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= 2) {
      // First page, next page, third page, triple dots, last page
      pageNumbers.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 1) {
      // First page, triple dots, second-to-last page, last page
      pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      // First page, triple dots, current page, next page, last page
      pageNumbers.push(1, '...', currentPage, currentPage + 1, totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className='flex items-center justify-center my-4'>
      <button
        className='group p-2 rounded-md text-sm text-primary-main disabled:text-neutral-300 flex items-center gap-2 font-semibold'
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        <FaChevronLeft
          className={`text-sm rounded-md ${
            currentPage === 1 ? 'text-neutral-300' : 'text-primary-main'
          }`}
        />
        Prev
      </button>
      <div className='mx-2'>
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-2 rounded-md text-sm font-semibold text-neutral-500 ${
              page === currentPage ? ' text-primary-main' : 'text-neutral-300'
            }`}
            onClick={() => {
              if (typeof page === 'number') {
                handlePageClick(page);
              }
            }}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className='group p-2 text-sm rounded-md text-primary-main disabled:text-neutral-300 flex gap-2 items-center font-semibold'
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Next
        <FaChevronRight
          className={`text-sm rounded-md ${
            currentPage === totalPages
              ? 'text-neutral-300'
              : 'text-primary-main'
          } `}
        />
      </button>
    </div>
  );
};

export default Pagination;
