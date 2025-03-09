import React, {
  ReactElement,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import { Pagination } from '../../components/Pagination';
import { FavouriteCheckbox } from '../FavouriteCheckbox';

import styles from './search-results.module.scss';

import { ICharacterResponse } from '@/model/SearchResults';

const SearchResults: React.FC<ICharacterResponse> = ({
  results,
  info,
}): ReactElement => {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const onItemClick = useCallback(
    (id: number) => {
      const params = new URLSearchParams(searchParams.toString());
      router.push(`/main/${id}?${params.toString()}`);
    },
    [searchParams, router]
  );

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className={styles['search-results']}>
            {results && results.length > 0 ? (
              <>
                {results.map((character) => {
                  return (
                    <div
                      key={character.id}
                      className={styles['search-results__card']}
                      onClick={() => onItemClick(character.id)}
                    >
                      <FavouriteCheckbox character={character} />
                      <div className={styles['search-results__header']}>
                        <h3>{character.name}</h3>
                        <img
                          className={styles['search-results__img']}
                          src={character.image}
                          alt={character.name}
                        />
                      </div>
                      <p>{character.species}</p>
                    </div>
                  );
                })}
              </>
            ) : (
              <p className={styles['search-results__no-results']}>
                No results found
              </p>
            )}
          </div>
          {info.pages && <Pagination totalPages={info.pages} />}
        </>
      )}
    </>
  );
};

export default memo(SearchResults);
