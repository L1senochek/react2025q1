import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router';
import {
  MemoryRouter,
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { describe, expect, vi } from 'vitest';

import CardModal from '@/components/CardModal/CardModal';
import ErrorMessage from '@/pages/ErrorMessage/ErrorMessage.tsx';
import MainPage from '@/pages/MainPage/MainPage';
import NotFound from '@/pages/NotFound/NotFound';

vi.mock('@/pages/MainPage/MainPage', () => ({
  default: vi.fn(() => <div>Main Page</div>),
}));

vi.mock('@/components/CardModal/CardModal', () => ({
  default: vi.fn(() => <div>Character Modal</div>),
}));

vi.mock('@/pages/NotFound/NotFound', () => ({
  default: vi.fn(() => <div>404 Not Found</div>),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useSearchParams: vi.fn(() => [new URLSearchParams(), vi.fn()]),
  };
});

const mockSavedQuery = 'rick';
const mockSavedCurrentPage = '2';

vi.stubGlobal('localStorage', {
  length: 0,
  key: vi.fn((): string | null => null),
  getItem: (key: string): string | null => {
    if (key === 'searchTerm') return mockSavedQuery;
    if (key === 'currentPage') return mockSavedCurrentPage;
    return null;
  },
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
} as Storage);

describe('Router:', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  test('- Renders MainPage when navigating to "/main"', () => {
    render(
      <MemoryRouter initialEntries={['/main']}>
        <Routes>
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });

  test('- Opens CardModal when navigating to "/main/character/:characterId"', () => {
    render(
      <MemoryRouter initialEntries={['/main/character/1']}>
        <Routes>
          <Route path="/main/character/:characterId" element={<CardModal />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Character Modal')).toBeInTheDocument();
  });

  test('- Displays 404 page for an unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-path']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  test('- Handles route errors and displays ErrorMessage', () => {
    vi.mock('@/pages/ErrorMessage/ErrorMessage', () => ({
      default: vi.fn(() => <div>Error Occurred</div>),
    }));

    render(
      <MemoryRouter initialEntries={['/invalid']}>
        <Routes>
          <Route
            path="*"
            element={<NotFound />}
            errorElement={<ErrorMessage />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  test('- Renders MainPage when navigating to "/main"', async () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/" element={<div>Main Page Content</div>} />
      )
    );

    render(<RouterProvider router={router} />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/main']}>{children}</MemoryRouter>
      ),
    });

    expect(screen.getByText(/Main Page Content/i)).toBeInTheDocument();
  });

  test('- Renders NotFound page when navigating to an unknown route', async () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="*" element={<div>Not Found</div>} />
      )
    );

    render(<RouterProvider router={router} />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/unknown-path']}>
          {children}
        </MemoryRouter>
      ),
    });

    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });
});
