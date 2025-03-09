import { fireEvent, screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

import FavouriteCheckbox from './FavouriteCheckbox';

import { mockCharacter } from '@/utils/tests/mock.ts';
import { renderWithProviders } from '@/utils/tests/render-with-provider.tsx';

describe('FavouriteCheckbox', () => {
  it('Should be checked', () => {
    const initialState = {
      favourites: {
        favourites: [mockCharacter],
      },
    };
    renderWithProviders(<FavouriteCheckbox character={mockCharacter} />, {
      preloadedState: initialState,
    });
    const checkbox: HTMLInputElement = screen.getByRole('checkbox');
    expect(checkbox.checked).toBeTruthy();
  });
  it('Should not be checked', () => {
    const initialState = {
      favourites: {
        favourites: [mockCharacter],
      },
    };
    renderWithProviders(<FavouriteCheckbox character={mockCharacter} />, {
      preloadedState: initialState,
    });
    const checkbox: HTMLInputElement = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBeFalsy();
  });
});
