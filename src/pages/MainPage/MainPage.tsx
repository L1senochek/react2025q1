import {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Provider } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './main-page.module.scss';

import { CardModal } from '@/components/CardModal';
import { Flyout } from '@/components/Flyout';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import { ThemeToggle } from '@/components/ThemeToggle';
import useSearchQuery from '@/hooks/useSearchQuery';
import { IAppProps, ICharacter } from '@/model/App';
import { useGetCharactersQuery } from '@/store/api.ts';
import { store } from '@/store/store.ts';

const MainPage: FC<IAppProps> = (): ReactElement => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [throwError, setThrowError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useSearchQuery(
    searchParams.get('query') || localStorage.getItem('searchTerm') || ''
  );
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();
  const currentPage = useMemo(() => {
    return parseInt(
      searchParams.get('page') || localStorage.getItem('currentPage') || '1',
      10
    );
  }, [searchParams]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { data, isFetching } = useGetCharactersQuery(query);

  useEffect(() => {
    if (data) {
      setCharacters(data.results);
      setTotalPages(data.info.pages || 1);
    }
  }, [data]);

  useEffect((): void => {
    const savedSearchTerm = localStorage.getItem('searchTerm');

    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      setQuery(`name=${savedSearchTerm}&page=${currentPage}`);
    } else {
      setQuery('');
    }
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage, setQuery, setSearchTerm]);

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
    setQuery(`${searchTerm ? `name=${searchTerm}` : ''}&page=1`);
  }, [searchTerm, searchParams, setSearchParams]);

  const handlePageChange = useCallback(
    (newPage: number): void => {
      searchParams.set('page', newPage.toString());
      setSearchParams(searchParams);
      localStorage.setItem('currentPage', newPage.toString());
    },
    [searchParams, setSearchParams]
  );

  const handleItemClick = useCallback(
    (characterId: number): void => {
      setSelectedCharacterId(characterId);
      navigate(`/main/character/${characterId}`);
    },
    [navigate, setSelectedCharacterId]
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
        <Provider store={store}>
          {isFetching ? (
            <div>Loading...</div>
          ) : (
            <SearchResults
              searchResults={characters}
              onItemClick={handleItemClick}
            />
          )}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <Flyout />
          {selectedCharacterId && <CardModal />}
        </Provider>
      </main>
    </>
  );
};

export default MainPage;
