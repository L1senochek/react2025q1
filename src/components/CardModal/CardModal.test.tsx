import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import CardModal from './CardModal';
import { MemoryRouter, Params, Route, Routes } from 'react-router-dom';

const mockedNavigate = vi.fn();

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
    useParams: (): Readonly<Params<string>> => ({
      characterId: '1',
    }),
  };
});

global.fetch = vi.fn();

describe('CardModal: ', (): void => {
  test('- Renders loading state initially', async () => {
    render(
      <MemoryRouter>
        <CardModal />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading details.../i)).toBeTruthy();
  });

  test('- Renders loading state initially', async () => {
    render(
      <MemoryRouter>
        <CardModal />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading details.../i)).toBeTruthy();
  });

  test('- Hides the component when the close button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/main/character/1']}>
        <Routes>
          <Route path="/main/character/:characterId" element={<CardModal />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character/1'
      )
    );

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

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

    render(
      <MemoryRouter initialEntries={['/main/character/1']}>
        <Routes>
          <Route path="/main/character/:characterId" element={<CardModal />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character/1'
      )
    );

    expect(screen.getByText('Rick Sanchez')).toBeTruthy();

    const statusElement = screen.getByText(/Status/i);
    expect(statusElement).toBeTruthy();

    expect(screen.getByText(/Species:/i)).toBeTruthy();
    expect(screen.getByText(/Human/i)).toBeTruthy();
    expect(screen.getByText(/Gender:/i)).toBeTruthy();
    expect(screen.getByText(/Male/i)).toBeTruthy();
  });

  it('- Displays "Character details not found" when API fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network Error'));

    render(
      <MemoryRouter initialEntries={['/main/character/1']}>
        <Routes>
          <Route path="/main/character/:characterId" element={<CardModal />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Character details not found')).toBeTruthy();
    });
  });
});
