import { FC, ReactElement } from 'react';
import { RouterProvider } from 'react-router';

import './App.css';

import Router from '@/components/Router/Router';

const App: FC = (): ReactElement => {
  return <RouterProvider router={Router} />;
};

export default App;
