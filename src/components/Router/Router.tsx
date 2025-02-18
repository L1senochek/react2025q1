import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { CardModal } from '@/components/CardModal';
import { Layout } from '@/layouts';
import { ErrorMessage } from '@/pages/ErrorMessage';
import { MainPage } from '@/pages/MainPage';
import { NotFound } from '@/pages/NotFound';

const savedQuery =
  typeof window !== 'undefined' ? localStorage.getItem('searchTerm') || '' : '';
const savedCurrentPage =
  typeof window !== 'undefined' ? localStorage.getItem('currentPage') || 1 : 1;
const redirectToInitialPath = `/main?page=${savedCurrentPage}${savedQuery ? `&query=${savedQuery}` : ''}`;

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorMessage />}>
        <Route path="" element={<Navigate to={redirectToInitialPath} />} />
        <Route path="/main" element={<MainPage />}>
          <Route path="character/:characterId" element={<CardModal />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

export default Router;
