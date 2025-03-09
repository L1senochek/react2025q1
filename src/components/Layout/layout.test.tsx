import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';

import Layout from './Layout';

const mockedGet = vi.fn();
const mockedToString = vi.fn();

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');

  return {
    ...actual,
    useSearchParams: () => ({
      get: mockedGet,
      toString: mockedToString,
    }),
  };
});

const mockedPush = vi.fn();

vi.mock('next/router', async () => {
  const actual = await vi.importActual('next/router');

  return {
    ...actual,
    useRouter: () => ({
      push: mockedPush,
    }),
  };
});

describe('Layout', () => {
  it('Should render child', () => {
    render(
      <Layout>
        <h2>Hello</h2>
      </Layout>
    );
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
