import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import CardModal from './CardModal';

import { mockCharacter } from '@/utils/tests/mock.ts';
import { renderWithProviders } from '@/utils/tests/render-with-provider.tsx';

const mockedNavigate = vi.fn();
const mockedLocation = vi.fn();

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useNavigation: vi.fn(() => ({
      location: mockedLocation,
    })),
  };
});

global.fetch = vi.fn();

describe('CardModal: ', (): void => {
  it('- Displays character details correctly', async () => {
    renderWithProviders(<CardModal data={mockCharacter} />);

    expect(screen.getByText('Rick Sanchez')).toBeTruthy();

    const statusElement = screen.getByText(/Status/i);

    expect(statusElement).toBeTruthy();

    expect(screen.getByText(/Species:/i)).toBeTruthy();
    expect(screen.getByText(/Human/i)).toBeTruthy();
    expect(screen.getByText(/Gender:/i)).toBeTruthy();
    expect(screen.getByText(/Male/i)).toBeTruthy();
  });

  it('- Displays "Character details not found" when API fails', () => {
    renderWithProviders(<CardModal data={undefined} />);

    expect(screen.getByText('Character details not found')).toBeTruthy();
  });
});
