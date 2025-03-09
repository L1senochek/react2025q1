import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import SearchResults from './SearchResults';

import { mockSearchResults } from '@/utils/tests/mock.ts';
import { renderWithProviders } from '@/utils/tests/render-with-provider.tsx';

describe('SearchResults: ', (): void => {
  test('- Renders the correct number of character cards', () => {
    renderWithProviders(
      <SearchResults searchResults={mockSearchResults} onItemClick={() => {}} />
    );

    const cards = screen.getAllByRole('heading', { level: 3 });

    expect(cards.length).toBe(mockSearchResults.length);
  });

  test('- Displays "No results found" message when there are no characters', () => {
    renderWithProviders(
      <SearchResults searchResults={[]} onItemClick={() => {}} />
    );

    expect(screen.getByText(/no results found/i)).toBeTruthy();
  });

  test('- Displays appropriate message if no cards are present', () => {
    renderWithProviders(
      <SearchResults searchResults={[]} onItemClick={() => {}} />
    );

    const noResultsMessage = screen.getByText(/no results found/i);

    expect(noResultsMessage).toBeTruthy();
  });

  test('- Renders images for each character card', () => {
    renderWithProviders(
      <SearchResults searchResults={mockSearchResults} onItemClick={() => {}} />
    );

    const images = screen.getAllByRole('img');

    expect(images.length).toBe(mockSearchResults.length);

    expect(images[0]).toHaveAttribute('src', mockSearchResults[0].image);
    expect(images[0]).toHaveAttribute('alt', mockSearchResults[0].name);

    expect(images[1]).toHaveAttribute('src', mockSearchResults[1].image);
    expect(images[1]).toHaveAttribute('alt', mockSearchResults[1].name);
  });

  test('- Clicking on a card triggers navigation to detailed view', async () => {
    const mockNavigate = vi.fn();

    vi.mock('react-router', async () => ({
      ...(await vi.importActual('react-router')),
      useNavigate: () => mockNavigate,
    }));

    renderWithProviders(
      <SearchResults
        searchResults={mockSearchResults}
        onItemClick={(id: number) => mockNavigate(`/main/character/${id}`)}
      />
    );

    const rickCard = screen.getByText('Rick Sanchez');

    fireEvent.click(rickCard);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/main/character/1');
    });
  });

  test('- Clicking on a card triggers an additional API call for detailed information', async () => {
    const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          gender: 'Male',
          origin: { name: 'Earth' },
          image: 'https://example.com/rick.jpg',
        }),
        { status: 200 }
      )
    );

    renderWithProviders(
      <SearchResults
        searchResults={mockSearchResults}
        onItemClick={(id: number) =>
          fetch(`https://rickandmortyapi.com/api/character/${id}`)
        }
      />
    );

    const rickCard = screen.getByText('Rick Sanchez');

    fireEvent.click(rickCard);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character/1'
      );
    });
  });
});
