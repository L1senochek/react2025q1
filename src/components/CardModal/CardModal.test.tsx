import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import CardModal from './CardModal';
import { mockedCharacter } from '../../utils/tests/mock.ts';

const mockedPush = vi.fn();

vi.mock('next/router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('next/router');

  return {
    ...actual,
    useRouter: () => ({
      push: mockedPush,
    }),
  };
});

vi.mock('next/navigation', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('next/navigation');

  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

global.fetch = vi.fn();

describe('CardModal: ', (): void => {
  test('- Hides the component when the close button is clicked', async () => {
    render(<CardModal character={mockedCharacter} />);

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    await waitFor(() => expect(mockedPush).toHaveBeenCalledWith('/main?'));

    expect(screen.queryByText('Rick Sanchez')).not.toBeTruthy();
  });

  it('- Displays character details correctly', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          gender: 'Male',
          origin: { name: 'Earth (C-137)' },
          image: 'https://example.com/rick.jpg',
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    );

    render(<CardModal character={mockedCharacter} />);

    expect(screen.getByText('Rick Sanchez')).toBeTruthy();

    const statusElement = screen.getByText(/Status/i);

    expect(statusElement).toBeTruthy();

    expect(screen.getByText(/Species:/i)).toBeTruthy();
    expect(screen.getByText(/Human/i)).toBeTruthy();
    expect(screen.getByText(/Gender:/i)).toBeTruthy();
    expect(screen.getByText(/Male/i)).toBeTruthy();
  });

  it('- Displays "Character details not found" when API fails', async () => {
    render(<CardModal character={null} />);

    expect(screen.getByText('Character details not found')).toBeTruthy();
  });
});
