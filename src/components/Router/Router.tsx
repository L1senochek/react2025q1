import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom';
import Layout from '@/layouts/Layout.tsx';
import ErrorMessage from '@/pages/ErrorMessage/ErrorMessage.tsx';
import MainPage from '@/pages/MainPage/MainPage.tsx';
import CardModal from '@/components/CardModal/CardModal.tsx';
import NotFound from '@/pages/NotFound/NotFound.tsx';

const savedQuery = localStorage.getItem('searchTerm') || '';
const savedCurrentPage = localStorage.getItem('currentPage') || 1;

const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={'/'} element={<Layout />} errorElement={<ErrorMessage />}>
        <Route
          path=""
          element={
            <Navigate
              to={`/main?page=${savedCurrentPage}${savedQuery ? `&query=${savedQuery}` : ''}`}
            />
          }
        />
        <Route path="/main" element={<MainPage />}>
          <Route path="character/:characterId" element={<CardModal />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

export default Router;
