import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Pagination from './Pagination';

import styles from './pagination.module.scss';

const mockedGet = vi.fn();
const mockedToString = vi.fn();

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');

  return {
    ...actual,
    useSearchParams: () => ({
      get: mockedGet,
      toString: mockedToString,
    }),
    useRouter: () => ({
      push: mockedPush,
    }),
  };
});

const mockedPush = vi.fn();

describe('Pagination:', () => {
  it('- Updates the URL query parameter when page changes', async () => {
    window.history.pushState(null, '', '/main?page=3');
    mockedToString.mockReturnValue('page=3');
    mockedGet.mockReturnValue('3');

    render(<Pagination totalPages={5} />);

    const firstPageButton = screen.getByText('1');

    fireEvent.click(firstPageButton);

    expect(mockedPush).toHaveBeenCalledWith('/main?page=1');

    const nextPageButton = screen.getByText('>');

    fireEvent.click(nextPageButton);

    expect(mockedPush).toHaveBeenCalledWith('/main?page=4');
  });

  it('- Disables the previous page button when on the first page', () => {
    mockedToString.mockReturnValue('page=1');
    mockedGet.mockReturnValue('1');

    render(<Pagination totalPages={5} />);

    const prevButton = screen.getByText('<');

    expect(prevButton).toBeDisabled();
  });

  it('- Disables the next page button when on the last page', () => {
    mockedToString.mockReturnValue('page=5');
    mockedGet.mockReturnValue('5');

    render(<Pagination totalPages={5} />);

    const nextButton = screen.getByText('>');

    expect(nextButton).toBeDisabled();
  });

  it('- Renders the correct page numbers based on the current page', () => {
    mockedToString.mockReturnValue('page=3');
    mockedGet.mockReturnValue('3');

    render(<Pagination totalPages={5} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByText('...').length).toBe(2);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();

    const activePage = screen.getByText('3');

    expect(activePage).toHaveClass(styles.active);
  });

  it('- Calls onPageChange with the correct page number', () => {
    mockedToString.mockReturnValue('page=3');
    mockedGet.mockReturnValue('3');

    render(<Pagination totalPages={5} />);

    const secondPageButton = screen.getByText('2');

    fireEvent.click(secondPageButton);

    const lastPageButton = screen.getByText('5');

    fireEvent.click(lastPageButton);
  });

  it('- Handles edge cases for small total pages', () => {
    mockedToString.mockReturnValue('page=1');
    mockedGet.mockReturnValue('1');

    render(<Pagination totalPages={1} />);

    expect(screen.queryByText('...')).not.toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();

    const prevButton = screen.getByText('<');
    const nextButton = screen.getByText('>');

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
