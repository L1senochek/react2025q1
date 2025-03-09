import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect } from 'vitest';

import Component from '@/catchall.tsx';

describe('Catchall', () => {
  it('Should render Not Found Page', () => {
    render(
      <MemoryRouter>
        <Component />
      </MemoryRouter>
    );
    const notFound = screen.getByText(/Page not found/);
    expect(notFound).toBeInTheDocument();
  });
});
