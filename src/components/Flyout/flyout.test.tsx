import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { describe, expect } from 'vitest';

import Flyout from './Flyout';

import { mockCharacter } from '@/utils/tests/mock.ts';
import { renderWithProviders } from '@/utils/tests/render-with-provider.tsx';

global.URL.createObjectURL = vi.fn();

describe('Flyout', () => {
  it('Should not render if no favourites', () => {
    const initialState = {
      favourites: {
        favourites: [],
      },
    };
    const { container } = renderWithProviders(<Flyout />, {
      preloadedState: initialState,
    });
    expect(container.querySelector('[class*=flyout]')).not.toBeInTheDocument();
  });
  it('Should render correctly if favourites are present', () => {
    const initialState = {
      favourites: {
        favourites: [mockCharacter],
      },
    };
    const { container } = renderWithProviders(<Flyout />, {
      preloadedState: initialState,
    });
    expect(container.querySelector('[class*=flyout]')).toBeInTheDocument();
  });
  it('Should display correct number of favourites', () => {
    const initialState = {
      favourites: {
        favourites: [mockCharacter],
      },
    };
    renderWithProviders(<Flyout />, {
      preloadedState: initialState,
    });
    const header = screen.getByRole('heading');
    expect(header.textContent).toBe(`Selected 1 items`);
  });
});
