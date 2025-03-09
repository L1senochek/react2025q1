'use client';

import React, { ReactElement, memo, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import styles from './pagination.module.scss';

import IPaginationProps from '@/model/Pagination.ts';

const Pagination: React.FC<IPaginationProps> = ({
  totalPages,
}): ReactElement => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get('page') || '1');

  const handlePageChange = useCallback(
    (page: number) => {
      if (page > 0 && page <= totalPages) {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`/main?${params.toString()}`);
      }
    },
    [searchParams, totalPages, router]
  );

  const goToFirstPage = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    router.push(`/main?${params.toString()}`);
  }, [searchParams, router]);

  const renderPageNumbers = useMemo(() => {
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
  }, [currentPage, goToFirstPage, totalPages, handlePageChange]);

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {renderPageNumbers}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default memo(Pagination);
