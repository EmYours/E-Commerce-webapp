import PropTypes from "prop-types";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageButtons = [];

  for (let page = 1; page <= totalPages; page += 1) {
    pageButtons.push(
      <button
        className={page === currentPage ? "page-button current" : "page-button"}
        type="button"
        key={page}
        onClick={() => onPageChange(page)}
        aria-label={`Go to page ${page}`}
        aria-current={page === currentPage ? "page" : undefined}
      >
        {page}
      </button>,
    );
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination" aria-label="Product pages">
      <button
        className="page-button page-word"
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageButtons}
      <button
        className="page-button page-word"
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
