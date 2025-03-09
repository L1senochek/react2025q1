import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useSearchParams } from 'react-router';
import { Mock, describe, expect, test, vi } from 'vitest';

import MainPage from '@/pages/MainPage/MainPage';
import { mockSearchResults } from '@/utils/tests/mock.ts';
import { renderWithProviders } from '@/utils/tests/render-with-provider.tsx';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');

  return {
    ...actual,
    useSearchParams: vi.fn(),
    useNavigate: vi.fn(),
    useNavigation: vi.fn(() => ({
      location: vi.fn(),
    })),
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

    renderWithProviders(
      <MainPage
        results={mockSearchResults}
        info={{ pages: 1, count: 2, next: null, prev: null }}
      />
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

    renderWithProviders(
      <MainPage
        results={mockSearchResults}
        info={{ pages: 1, count: 2, next: null, prev: null }}
      />
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search characters/i)).toHaveValue(
        'Morty'
      );
    });
  });
});
