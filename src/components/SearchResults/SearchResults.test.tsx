import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import SearchResults from './SearchResults';

import { ICharacter } from '@/model/App.ts';

describe('SearchResults: ', (): void => {
  const mockSearchResults: ICharacter[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: {
        name: 'Earth',
        url: '',
      },
      location: {
        name: 'Citadel of Ricks',
        url: '',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [],
      url: '',
      created: '',
    },
    {
      id: 2,
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: {
        name: 'Earth',
        url: '',
      },
      location: {
        name: 'Earth',
        url: '',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      episode: [],
      url: '',
      created: '',
    },
  ];

  test('- Renders the correct number of character cards', () => {
    render(
      <MemoryRouter>
        <SearchResults
          searchResults={mockSearchResults}
          onItemClick={() => {}}
        />
      </MemoryRouter>
    );

    const cards = screen.getAllByRole('heading', { level: 3 });

    expect(cards.length).toBe(mockSearchResults.length);
  });

  test('- Displays "No results found" message when there are no characters', () => {
    render(
      <MemoryRouter>
        <SearchResults searchResults={[]} onItemClick={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText(/no results found/i)).toBeTruthy();
  });

  test('- Displays appropriate message if no cards are present', () => {
    render(<SearchResults searchResults={[]} onItemClick={() => {}} />);

    const noResultsMessage = screen.getByText(/no results found/i);

    expect(noResultsMessage).toBeTruthy();
  });

  test('- Renders images for each character card', () => {
    render(
      <MemoryRouter>
        <SearchResults
          searchResults={mockSearchResults}
          onItemClick={() => {}}
        />
      </MemoryRouter>
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

    vi.mock('react-router-dom', async () => ({
      ...(await vi.importActual('react-router-dom')),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter initialEntries={['/main']}>
        <SearchResults
          searchResults={mockSearchResults}
          onItemClick={(id: number) => mockNavigate(`/main/character/${id}`)}
        />
      </MemoryRouter>
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

    render(
      <MemoryRouter initialEntries={['/main']}>
        <SearchResults
          searchResults={mockSearchResults}
          onItemClick={(id: number) =>
            fetch(`https://rickandmortyapi.com/api/character/${id}`)
          }
        />
      </MemoryRouter>
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
