import React, { ReactElement } from 'react';
import ISearchResultsProps from '@/model/SearchResults';
import styles from './search-results.module.scss';

const SearchResults: React.FC<ISearchResultsProps> = ({
  searchResults,
  onItemClick,
}): ReactElement => {
  return (
    <div className={styles.searchresults}>
      {searchResults.length > 0 ? (
        <>
          {searchResults.map((character) => {
            return (
              <div
                key={character.id}
                className={styles.searchresults__card}
                onClick={() => onItemClick(character.id)}
              >
                <div className={styles.searchresults__header}>
                  <h3>{character.name}</h3>
                  <img
                    className={styles.searchresults__img}
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
        <p className={styles.searchresults__noresults}>No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
