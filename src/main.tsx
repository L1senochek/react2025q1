import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.tsx';

import './index.css';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { store } from '@/store/store.ts';

const root = document.getElementById('root');

if (root)
  createRoot(root).render(
    <StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </ErrorBoundary>
    </StrictMode>
  );
