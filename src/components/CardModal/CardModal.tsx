import React, {
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router';

import styles from './card-modal.module.scss';

import { FavouriteCheckbox } from '@/components/FavouriteCheckbox';
import useLocalStorage from '@/hooks/useLocalStorage.tsx';
import { ICharacter } from '@/model/App.ts';

interface Props {
  data: ICharacter | undefined;
}

const CardModal: React.FC<Props> = ({ data }): ReactNode => {
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [searchTerm] = useLocalStorage('searchTerm');
  const [currentPage] = useLocalStorage('currentPage');

  useEffect(() => {
    if (data) setCharacter(data);
  }, [data]);

  const handleClose = useCallback(() => {
    const savedSearchTerm = searchTerm || '';
    const savedPage = currentPage || '1';

    navigate(
      `/main?page=${savedPage}${savedSearchTerm ? `&query=${savedSearchTerm}` : ''}`
    );
  }, [currentPage, navigate, searchTerm]);

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const characterDetails = useMemo(() => {
    if (!character) return null;

    return [
      {
        label: 'Status',
        value: character.status,
      },
      {
        label: 'Species',
        value: character.species,
      },
      {
        label: 'Gender',
        value: character.gender,
      },
      {
        label: 'Origin',
        value: character.origin.name,
      },
    ].map(({ label, value }) => (
      <p key={label} className={styles['character-card__details']}>
        <span className={styles['card-details__highlight']}>{label}:</span>
        <span>{value}</span>
      </p>
    ));
  }, [character]);

  return (
    <>
      <div className={`${styles['modal-overlay']}`} onClick={handleClose}></div>
      <article className={`${styles['card-details']}`} ref={modalRef}>
        <header className={styles['card-details__header']}>
          <button className={styles['close-btn']} onClick={handleClose}>
            Close
          </button>
        </header>

        {character ? (
          <section className={styles['character-card']}>
            <FavouriteCheckbox character={character} />
            <h2 className={styles['card-details__header']}>{character.name}</h2>
            <figure className={styles['character-image']}>
              <img
                className={styles.avatar}
                src={character.image}
                alt={character.name}
              />
            </figure>
            {characterDetails}
          </section>
        ) : (
          <section>
            <p>Character details not found</p>
          </section>
        )}
      </article>
    </>
  );
};

export default memo(CardModal);
