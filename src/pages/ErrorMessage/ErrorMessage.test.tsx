import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, test, vi } from 'vitest';

import ErrorMessage from './ErrorMessage';

describe('ErrorMessage:', () => {
  vi.mock('react-router', async (importOriginal) => {
    const actual = (await importOriginal()) as typeof import('react-router');

    return {
      ...actual,
      useRouteError: () => new Error('Test error message'),
    };
  });

  test('- Renders error message correctly', () => {
    const errorMessage = 'Test error message';

    render(
      <MemoryRouter initialEntries={['/error']}>
        <Routes>
          <Route path="/error" element={<ErrorMessage />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const errorTitle = screen.getByText(/Error message:/i);

    expect(errorTitle).toBeTruthy();

    const errorMessageText = screen.getByText(errorMessage);

    expect(errorMessageText).toBeTruthy();
  });
});
