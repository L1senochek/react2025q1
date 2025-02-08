import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    MemoryRouter: actual.MemoryRouter,
  };
});

describe('ErrorBoundary:', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('- Displays an error message when a child component throws an error', async () => {
    const ProblemChild = () => {
      throw new Error('Error problem child');
    };

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong!/i)).toBeInTheDocument();
    });

    const reloadButton = screen.getByText('Back');
    expect(reloadButton).toBeInTheDocument();
  });

  it('- Passes the correct error to the Fallback component', async () => {
    const ProblemChild = () => {
      throw new Error('Custom error message');
    };

    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ProblemChild />
        </ErrorBoundary>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong!/i)).toBeInTheDocument();
    });

    const fallbackErrorText = screen.getByText('Custom error message');
    expect(fallbackErrorText).toBeInTheDocument();
  });
});
