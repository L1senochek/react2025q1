import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchBar from '@/components/SearchBar/SearchBar';

describe('SearchBar:', () => {
  const mockOnInputChange = vi.fn();
  const mockOnSearchSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('- Calls onInputChange when the input value changes', () => {
    render(
      <SearchBar
        searchTerm="Rick"
        onInputChange={mockOnInputChange}
        onSearchSubmit={mockOnSearchSubmit}
      />
    );

    const input = screen.getByPlaceholderText(/search characters/i);
    fireEvent.change(input, { target: { value: 'Morty' } });

    expect(mockOnInputChange).toHaveBeenCalledWith('Morty');
  });

  it('- Calls onSearchSubmit when the Search button is clicked', async () => {
    render(
      <SearchBar
        searchTerm="Rick"
        onInputChange={mockOnInputChange}
        onSearchSubmit={mockOnSearchSubmit}
      />
    );

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(mockOnSearchSubmit).toHaveBeenCalled();
    });
  });

  it('- Calls onSearchSubmit when the Enter key is pressed in the input', async () => {
    render(
      <SearchBar
        searchTerm="Rick"
        onInputChange={mockOnInputChange}
        onSearchSubmit={mockOnSearchSubmit}
      />
    );

    const input = screen.getByPlaceholderText(/search characters/i);
    fireEvent.submit(input);

    await waitFor(() => {
      expect(mockOnSearchSubmit).toHaveBeenCalled();
    });
  });
});
