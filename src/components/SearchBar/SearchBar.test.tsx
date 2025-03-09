import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import SearchBar from './SearchBar';

const mockedPush = vi.fn();
const mockedToString = vi.fn();

vi.mock('next/navigation', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('next/navigation');

  return {
    ...actual,
    useSearchParams: () => ({
      get: vi.fn(),
      toString: mockedToString,
    }),
    useRouter: () => ({
      push: mockedPush,
    }),
  };
});

describe('SearchBar:', () => {
  it('- Calls onInputChange when the input value changes', () => {
    render(<SearchBar />);

    const input: HTMLInputElement =
      screen.getByPlaceholderText(/search characters/i);

    fireEvent.change(input, { target: { value: 'Morty' } });

    expect(input.value).toBe('Morty');
  });

  it('- Calls onSearchSubmit when the Search button is clicked', async () => {
    render(<SearchBar />);

    const input: HTMLInputElement =
      screen.getByPlaceholderText(/search characters/i);

    fireEvent.change(input, { target: { value: 'Morty' } });

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(mockedPush).toHaveBeenCalledWith('/main?query=Morty&page=1');
    });
  });

  it('- Calls onSearchSubmit when the Enter key is pressed in the input', async () => {
    render(<SearchBar />);

    const inputElement: HTMLInputElement =
      screen.getByPlaceholderText(/search characters/i);

    fireEvent.change(inputElement, { target: { value: 'Morty' } });

    fireEvent.click(screen.getByText('Search'));

    const input = screen.getByPlaceholderText(/search characters/i);

    fireEvent.submit(input);

    await waitFor(() => {
      expect(mockedPush).toHaveBeenCalledWith('/main?query=Morty&page=1');
    });
  });
});
