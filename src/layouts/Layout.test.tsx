import { render, screen } from '@testing-library/react';
import { Outlet } from 'react-router';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, test } from 'vitest';

import Layout from './Layout';

vi.mock('./Layout', () => ({ default: () => <Outlet /> }));

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
