import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import Layout from './layout.tsx';

const mockedGet = vi.fn();
const mockedToString = vi.fn();
const mockedPush = vi.fn();

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');

  return {
    ...actual,
    useSearchParams: () => ({
      get: mockedGet,
      toString: mockedToString,
    }),
    useRouter: () => ({
      push: mockedPush,
    }),
  };
});

describe('Layout', () => {
  it('Should render child in layout', () => {
    render(
      <Layout>
        <h2>Hello</h2>
      </Layout>
    );
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
