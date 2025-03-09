'use client';

import React, { ReactElement, memo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Flyout } from '../../components/Flyout';
import { Pagination } from '../../components/Pagination';
import { FavouriteCheckbox } from '../FavouriteCheckbox';

import styles from './search-results.module.scss';

import { ICharacterResponse } from '@/model/SearchResults';

const SearchResults: React.FC<ICharacterResponse> = ({
  results,
  info,
}): ReactElement => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onItemClick = useCallback(
    (id: number) => {
      const params = new URLSearchParams(searchParams.toString());
      router.push(`/main/${id}?${params.toString()}`);
    },
    [searchParams, router]
  );

  return (
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
      <Flyout />
    </>
  );
};

export default memo(SearchResults);
