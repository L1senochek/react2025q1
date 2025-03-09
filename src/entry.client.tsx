import React from 'react';
import ReactDOM from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';

import './App.css';
import './index.css';

import { ErrorBoundary } from '@/components/ErrorBoundary';

ReactDOM.hydrateRoot(
  document,
  <React.StrictMode>
    <ErrorBoundary>
      <HydratedRouter />
    </ErrorBoundary>
  </React.StrictMode>
);
