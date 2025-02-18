import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { Mock, describe, expect, it, vi } from 'vitest';

import Pagination from './Pagination';

import styles from './pagination.module.scss';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe('Pagination:', () => {
  const mockOnPageChange = vi.fn();
  const mockSetSearchParams = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ] as [URLSearchParams, (params: URLSearchParams) => void]);
  });

  it('- Updates the URL query parameter when page changes', () => {
    render(
      <MemoryRouter initialEntries={['/main?page=3']}>
        <Pagination
          totalPages={5}
          currentPage={3}
          onPageChange={mockOnPageChange}
        />
      </MemoryRouter>
    );

    const firstPageButton = screen.getByText('1');

    fireEvent.click(firstPageButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.any(URLSearchParams)
    );
    expect(mockSetSearchParams.mock.calls[0][0].get('page')).toBe('1');

    const nextPageButton = screen.getByText('>');

    fireEvent.click(nextPageButton);

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      expect.any(URLSearchParams)
    );
    expect(mockSetSearchParams.mock.calls[1][0].get('page')).toBe('4');
  });

  it('- Disables the previous page button when on the first page', () => {
    render(
      <MemoryRouter initialEntries={['/main?page=1']}>
        <Pagination
          totalPages={5}
          currentPage={1}
          onPageChange={mockOnPageChange}
        />
      </MemoryRouter>
    );

    const prevButton = screen.getByText('<');

    expect(prevButton).toBeDisabled();
  });

  it('- Disables the next page button when on the last page', () => {
    render(
      <MemoryRouter initialEntries={['/main?page=5']}>
        <Pagination
          totalPages={5}
          currentPage={5}
          onPageChange={mockOnPageChange}
        />
      </MemoryRouter>
    );

    const nextButton = screen.getByText('>');

    expect(nextButton).toBeDisabled();
  });

  it('- Renders the correct page numbers based on the current page', () => {
    render(
      <MemoryRouter initialEntries={['/main?page=3']}>
        <Pagination
          totalPages={5}
          currentPage={3}
          onPageChange={mockOnPageChange}
        />
      </MemoryRouter>
    );

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
    render(
      <MemoryRouter initialEntries={['/main?page=3']}>
        <Pagination
          totalPages={5}
          currentPage={3}
          onPageChange={mockOnPageChange}
        />
      </MemoryRouter>
    );

    const secondPageButton = screen.getByText('2');

    fireEvent.click(secondPageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);

    const lastPageButton = screen.getByText('5');

    fireEvent.click(lastPageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(5);
  });

  it('- Handles edge cases for small total pages', () => {
    render(
      <MemoryRouter initialEntries={['/main?page=1']}>
        <Pagination
          totalPages={1}
          currentPage={1}
          onPageChange={mockOnPageChange}
        />
      </MemoryRouter>
    );

    expect(screen.queryByText('...')).not.toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();

    const prevButton = screen.getByText('<');
    const nextButton = screen.getByText('>');

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
