import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';
import { describe, expect, test } from 'vitest';
import { ICharacter } from '@/model/App.ts';
import { MemoryRouter } from 'react-router-dom';

describe('SearchResults: ', (): void => {
  const mockSearchResults: ICharacter[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Citadel of Ricks', url: '' },
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
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
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
});
