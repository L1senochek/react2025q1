import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

import Flyout from './Flyout';
import { FavouritesProvider } from '../../providers/FavouritesProvider';
import FavouritesContext from '../../providers/FavouritesProvider/FavouritesContext';

import { ICharacter } from '@/model/App.ts';
import IFavouritesContext from '@/model/FavouritesContext.ts';

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

const mockContext: IFavouritesContext = {
  favourites: [mockCharacter],
  favouritesIds: mockFavouritesIds,
  addFavourite: vi.fn(),
  removeFavourite: vi.fn(),
  unselectAll: vi.fn(),
};

global.URL.createObjectURL = vi.fn();

describe('Flyout', () => {
  it('Should not render if no favourites', () => {
    const { container } = render(
      <FavouritesProvider>
        <Flyout />
      </FavouritesProvider>
    );
    expect(container.querySelector('[class*=flyout]')).not.toBeInTheDocument();
  });
  it('Should render correctly if favourites are present', () => {
    const { container } = render(
      <FavouritesContext.Provider value={mockContext}>
        <Flyout />
      </FavouritesContext.Provider>
    );
    expect(container.querySelector('[class*=flyout]')).toBeInTheDocument();
  });
  it('Should display correct number of favourites', () => {
    render(
      <FavouritesContext.Provider value={mockContext}>
        <Flyout />
      </FavouritesContext.Provider>
    );
    const header = screen.getByRole('heading');
    expect(header.textContent).toBe(`Selected 1 items`);
  });
});
