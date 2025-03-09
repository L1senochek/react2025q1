import {
  FC,
  ReactElement,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
  useSearchParams,
} from 'react-router';

import styles from './main-page.module.scss';

import { Flyout } from '@/components/Flyout';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import { ThemeToggle } from '@/components/ThemeToggle';
import useLocalStorage from '@/hooks/useLocalStorage.tsx';
import { ICharacter } from '@/model/App';
import { ICharacterResponse } from '@/model/SearchResults.ts';

const MainPage: FC<ICharacterResponse> = ({ results, info }): ReactElement => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [throwError, setThrowError] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [curPage, setCurPage] = useLocalStorage('currentPage');
  const [lsSearchTerm, setLsSearchTerm] = useLocalStorage('searchTerm');
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('query') || lsSearchTerm || ''
  );
  const navigate = useNavigate();
  const currentPage = useMemo(() => {
    return parseInt(searchParams.get('page') || curPage || '1', 10);
  }, [curPage, searchParams]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const location = useLocation();
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  useEffect(() => {
    if (!searchParams.toString() && !location.pathname.includes('character')) {
      if (searchTerm) searchParams.set('query', searchTerm);
      searchParams.set('page', currentPage.toString());
      setSearchParams(searchParams);
    }
  }, [currentPage, location, searchParams, searchTerm, setSearchParams]);

  useEffect(() => {
    if (results && info) {
      setCharacters(results);
      setTotalPages(info.pages || 1);
    }
  }, [results, info]);

  const handleSearchInputChange = useCallback(
    (value: string): void => {
      setSearchTerm(value);
    },
    [setSearchTerm]
  );

  const handleSearchSubmit = useCallback(() => {
    if (searchTerm) searchParams.set('query', searchTerm);
    else searchParams.delete('query');
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    setLsSearchTerm(searchTerm);
  }, [searchTerm, searchParams, setSearchParams, setLsSearchTerm]);

  const handlePageChange = useCallback(
    (newPage: number): void => {
      searchParams.set('page', newPage.toString());
      setSearchParams(searchParams);
      setCurPage(newPage.toString());
    },
    [searchParams, setCurPage, setSearchParams]
  );

  const handleItemClick = useCallback(
    (characterId: number): void => {
      navigate(`/main/character/${characterId}`);
    },
    [navigate]
  );

  const handleThrowError = (): void => setThrowError(true);

  if (throwError) {
    throw new Error('Test error');
  }

  return (
    <>
      <header className={styles['top-section']}>
        <div className={styles['top-section_controls']}>
          <SearchBar
            searchTerm={searchTerm}
            onInputChange={handleSearchInputChange}
            onSearchSubmit={handleSearchSubmit}
          />
          <ThemeToggle />
        </div>
        <button onClick={handleThrowError}>Throw Error</button>
      </header>
      <main className={styles['middle-section']}>
        {isNavigating ? (
          <div>Loading...</div>
        ) : (
          <>
            <SearchResults
              searchResults={characters}
              onItemClick={handleItemClick}
            />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}

        <Flyout />
        <Outlet />
      </main>
    </>
  );
};

export default memo(MainPage);
