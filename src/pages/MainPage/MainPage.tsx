import {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import styles from './main-page.module.scss';

import { CardModal } from '@/components/CardModal';
import { Pagination } from '@/components/Pagination';
import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import useSearchQuery from '@/hooks/useSearchQuery';
import { IAppProps } from '@/model/App';

const MainPage: FC<IAppProps> = (): ReactElement => {
  const [characters, setCharacters] = useState([]);
  const [, setError] = useState<null | Error>(null);
  const [throwError, setThrowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const fetchCharacters = useCallback(
    async (query: string, page: number = 1): Promise<void> => {
      setIsLoading(true);
      try {
        const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${query}`;
        const response = await fetch(url);

        if (!response.ok) {
          setCharacters([]);
          return;
        }

        const data = await response.json();

        setCharacters(data.results);
        setTotalPages(data.info.pages || 1);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect((): void => {
    const savedSearchTerm = localStorage.getItem('searchTerm');

    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      void fetchCharacters(savedSearchTerm, currentPage);
    } else {
      void fetchCharacters('', currentPage);
    }
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage, fetchCharacters, setSearchTerm]);

  const handleSearchInputChange = useCallback(
    (value: string): void => {
      setSearchTerm(value);
    },
    [setSearchTerm]
  );

  const handleSearchSubmit = useCallback(async (): Promise<void> => {
    searchParams.set('query', searchTerm);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    await fetchCharacters(searchTerm, 1);
  }, [searchTerm, searchParams, setSearchParams, fetchCharacters]);

  const handlePageChange = useCallback(
    async (newPage: number): Promise<void> => {
      searchParams.set('page', newPage.toString());
      setSearchParams(searchParams);
      localStorage.setItem('currentPage', newPage.toString());
      await fetchCharacters(searchTerm, newPage);
    },
    [searchTerm, searchParams, setSearchParams, fetchCharacters]
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
        <SearchBar
          searchTerm={searchTerm}
          onInputChange={handleSearchInputChange}
          onSearchSubmit={handleSearchSubmit}
        />
        <button onClick={handleThrowError}>Throw Error</button>
      </header>
      <main className={styles['middle-section']}>
        {isLoading ? (
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
        {selectedCharacterId && <CardModal />}
      </main>
    </>
  );
};

export default MainPage;
