import React, {
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import styles from './Flyout.module.scss';

import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import { selectFavourites, unselectAll } from '@/store/favourites.ts';

const Flyout: React.FC = (): ReactNode => {
  const [csv, setCSV] = useState<string>('');
  const favourites = useAppSelector(selectFavourites);
  const dispatch = useAppDispatch();

  const generateTable = useCallback(() => {
    let table = '';
    const headers = `${Object.keys(favourites[0]).join(';')}`;
    table += `${headers} \r\n`;
    const rows = favourites
      .map(
        (item) =>
          `${Object.values(item)
            .map((cell) =>
              typeof cell === 'object' ? JSON.stringify(cell) : cell
            )
            .join(';')}`
      )
      .join('\r\n');
    table += rows;
    setCSV(table);
  }, [favourites]);

  useEffect(() => {
    if (favourites.length) generateTable();
  }, [favourites, generateTable]);

  const generateURL = (): string | null => {
    if (!favourites.length) return null;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    return URL.createObjectURL(blob);
  };

  return (
    favourites.length > 0 && (
      <div className={styles['flyout']}>
        <h3 className={styles['flyout-header']}>
          Selected {favourites.length} items
        </h3>
        <div className={styles['flyout-controls']}>
          <a
            href={generateURL() || ''}
            className={styles['flyout-controls__download']}
            download={`${favourites.length}_characters.csv`}
          >
            Download
          </a>
          <button
            type="button"
            className={styles['flyout-controls__unselect']}
            onClick={() => dispatch(unselectAll())}
          >
            Unselect All
          </button>
        </div>
      </div>
    )
  );
};

export default memo(Flyout);
