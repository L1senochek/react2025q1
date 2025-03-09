import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

import FavouriteCheckbox from './FavouriteCheckbox';
import { FavouritesProvider } from '../../providers/FavouritesProvider';
import FavouritesContext from '../../providers/FavouritesProvider/FavouritesContext.ts';

import { ICharacter } from '@/model/App.ts';

const mockCharacter: ICharacter = {
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
};

const mockFavouritesIds = vi.fn().mockReturnValue([mockCharacter.id]);

describe('FavouriteCheckbox', () => {
  it('Should renders correctly', () => {
    render(<FavouriteCheckbox character={mockCharacter} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
  it('Should toggle to checked by click', () => {
    render(
      <FavouritesProvider>
        <FavouriteCheckbox character={mockCharacter} />
      </FavouritesProvider>
    );
    const checkbox: HTMLInputElement = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBeTruthy();
  });
  it('Should toggle to unchecked by click', () => {
    render(
      <FavouritesContext.Provider
        value={{
          favourites: [mockCharacter],
          favouritesIds: mockFavouritesIds,
          addFavourite: vi.fn(),
          removeFavourite: vi.fn(),
          unselectAll: vi.fn(),
        }}
      >
        <FavouriteCheckbox character={mockCharacter} />
      </FavouritesContext.Provider>
    );
  });
});
