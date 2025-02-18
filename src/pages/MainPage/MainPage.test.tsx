import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { Mock, describe, expect, test, vi } from 'vitest';

import MainPage from '@/pages/MainPage/MainPage';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useSearchParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

describe('MainPage:', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test('- Saves search term to local storage when Search button is clicked', async () => {
    const mockSetSearchParams = vi.fn();

    vi.mocked(useSearchParams as Mock).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);

    render(
      <MemoryRouter initialEntries={['/main']}>
        <MainPage />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search characters/i);

    fireEvent.change(input, { target: { value: 'Rick' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(localStorage.getItem('searchTerm')).toBe('Rick');
    });
  });

  test('- Retrieves search term from local storage on mount', async () => {
    localStorage.setItem('searchTerm', 'Morty');

    const mockSetSearchParams = vi.fn();

    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);

    render(
      <MemoryRouter initialEntries={['/main']}>
        <MainPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search characters/i)).toHaveValue(
        'Morty'
      );
    });
  });
});
