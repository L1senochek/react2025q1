import { RouterProvider } from 'react-router';
import './App.scss';
import Router from '@/components/Router/Router';
import {ReactElement} from "react";

const App = (): ReactElement => {
  return <RouterProvider router={Router} />;
};

export default App;
