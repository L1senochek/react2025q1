import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import SearchResults from './SearchResults';

import { ICharacter } from '@/model/App.ts';

const mockedGet = vi.fn();
const mockedToString = vi.fn();
const mockedPush = vi.fn();

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
      <SearchResults
        results={mockSearchResults}
        info={{ pages: 1, next: '', prev: '', count: 20 }}
      />
    );

    const cards = screen.getAllByRole('heading', { level: 3 });

    expect(cards.length).toBe(mockSearchResults.length);
  });

  test('- Displays "No results found" message when there are no characters', () => {
    render(
      <SearchResults
        results={[]}
        info={{ pages: 0, next: '', prev: '', count: 0 }}
      />
    );

    expect(screen.getByText(/no results found/i)).toBeTruthy();
  });

  test('- Displays appropriate message if no cards are present', () => {
    render(
      <SearchResults
        results={[]}
        info={{ pages: 0, next: '', prev: '', count: 0 }}
      />
    );

    const noResultsMessage = screen.getByText(/no results found/i);

    expect(noResultsMessage).toBeTruthy();
  });

  test('- Renders images for each character card', () => {
    render(
      <SearchResults
        results={mockSearchResults}
        info={{ pages: 1, next: '', prev: '', count: 20 }}
      />
    );

    const images = screen.getAllByRole('img');

    expect(images.length).toBe(mockSearchResults.length);

    expect(images[0]).toHaveAttribute('src', mockSearchResults[0].image);
    expect(images[0]).toHaveAttribute('alt', mockSearchResults[0].name);

    expect(images[1]).toHaveAttribute('src', mockSearchResults[1].image);
    expect(images[1]).toHaveAttribute('alt', mockSearchResults[1].name);
  });

  test('- Clicking on a card triggers navigation to detailed view', async () => {
    mockedToString.mockReturnValue('page=1');
    mockedGet.mockReturnValue('1');
    render(
      <SearchResults
        results={mockSearchResults}
        info={{ pages: 1, next: '', prev: '', count: 20 }}
      />
    );
    const rickCard = screen.getByText('Rick Sanchez');

    fireEvent.click(rickCard);

    expect(mockedPush).toHaveBeenCalledWith('/main/1?page=1');
  });

  // test('- Clicking on a card triggers an additional API call for detailed information', async () => {
  //   const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
  //     new Response(
  //       JSON.stringify({
  //         id: 1,
  //         name: 'Rick Sanchez',
  //         status: 'Alive',
  //         species: 'Human',
  //         gender: 'Male',
  //         origin: { name: 'Earth' },
  //         image: 'https://example.com/rick.jpg',
  //       }),
  //       { status: 200 }
  //     )
  //   );
  //
  //   render(
  //       <SearchResults
  //         searchResults={mockSearchResults}
  //       />
  //   );
  //
  //   const rickCard = screen.getByText('Rick Sanchez');
  //
  //   fireEvent.click(rickCard);
  //
  //   await waitFor(() => {
  //     expect(mockFetch).toHaveBeenCalledWith(
  //       'https://rickandmortyapi.com/api/character/1'
  //     );
  //   });
  // });
});
