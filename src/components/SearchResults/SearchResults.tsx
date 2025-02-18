import React, { ReactElement, memo } from 'react';

import styles from './search-results.module.scss';

import ISearchResultsProps from '@/model/SearchResults';

const SearchResults: React.FC<ISearchResultsProps> = ({
  searchResults,
  onItemClick,
}): ReactElement => {
  return (
    <div className={styles['search-results']}>
      {searchResults.length > 0 ? (
        <>
          {searchResults.map((character) => {
            return (
              <div
                key={character.id}
                className={styles['search-results__card']}
                onClick={() => onItemClick(character.id)}
              >
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
        <p className={styles['search-results__no-results']}>No results found</p>
      )}
    </div>
  );
};

export default memo(SearchResults);
