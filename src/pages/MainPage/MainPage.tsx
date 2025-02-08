import { FC, ReactElement, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSearchQuery from '@/hooks/useSearchQuery';
import { IAppProps } from '@/model/App';
import SearchBar from '@/components/SearchBar/SearchBar';
import SearchResults from '@/components/SearchResults/SearchResults';
import Pagination from '@/components/Pagination/Pagination';
import CardModal from '@/components/CardModal/CardModal';
import styles from './main-page.module.scss';

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
  const currentPage = parseInt(
    searchParams.get('page') || localStorage.getItem('currentPage') || '1',
    10
  );
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchCharacters = async (
    query: string,
    page: number = 1
  ): Promise<void> => {
    setIsLoading(true);
    try {
      const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${query}`;
      const response = await fetch(url);

      if (!response.ok) {
        setThrowError(true);
      }

      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect((): void => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      void fetchCharacters(savedSearchTerm, currentPage);
    } else {
      void fetchCharacters('', currentPage);
    }
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage, setSearchTerm]);

  const handleSearchInputChange = (value: string): void => {
    setSearchTerm(value);
  };

  const handleSearchSubmit = async (): Promise<void> => {
    searchParams.set('query', searchTerm);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    await fetchCharacters(searchTerm, 1);
  };

  const handlePageChange = async (newPage: number): Promise<void> => {
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
    localStorage.setItem('currentPage', newPage.toString());
    await fetchCharacters(searchTerm, newPage);
  };

  const handleItemClick = (characterId: number): void => {
    setSelectedCharacterId(characterId);
    navigate(`/main/character/${characterId}`);
  };

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
