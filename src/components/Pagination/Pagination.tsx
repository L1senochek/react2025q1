import React, { ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './pagination.module.scss';

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}): ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      searchParams.set('page', page.toString());
      setSearchParams(searchParams);
      onPageChange(page);
    }
  };

  const goToFirstPage = () => {
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    onPageChange(1);
  };

  const renderPageNumbers = () => {
    const pages = [];

    pages.push(
      <button
        key={1}
        className={currentPage === 1 ? styles.active : ''}
        onClick={goToFirstPage}
      >
        1
      </button>
    );

    if (currentPage > 2) {
      pages.push(<span key="start-dots">...</span>);
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={currentPage === i ? styles.active : ''}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 1) {
      pages.push(<span key="end-dots">...</span>);
    }

    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          className={currentPage === totalPages ? styles.active : ''}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
