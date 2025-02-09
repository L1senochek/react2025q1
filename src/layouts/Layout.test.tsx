import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { Outlet } from 'react-router';

vi.mock('./Layout', () => ({
  default: () => <Outlet />,
}));

describe('Layout:', () => {
  test('- Does`t render anything when there are no child routes', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Layout />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText(/Child Content/i)).not.toBeInTheDocument();
  });
});
