import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import NotFound from './NotFound';

describe('NotFound:', () => {
  test('- Renders "Page not found" message correctly', () => {
    render(<NotFound />);

    const notFoundTitle = screen.getByText(/Page not found!/i);

    expect(notFoundTitle).toBeTruthy();

    const notFoundMessage = screen.getByText(/404/i);

    expect(notFoundMessage).toBeTruthy();
  });

  test('- Renders link to home page', () => {
    render(<NotFound />);

    const homeLink = screen.getByText(/Home/i);

    expect(homeLink).toBeTruthy();
    expect(homeLink.getAttribute('href')).toBe('/main?page=1');
  });
});
