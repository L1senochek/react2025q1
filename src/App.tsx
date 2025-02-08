import { FC, ReactElement } from 'react';
import { RouterProvider } from 'react-router';
import Router from '@/components/Router/Router';
import './App.css';

const App: FC = (): ReactElement => {
  return <RouterProvider router={Router} />;
};

export default App;
