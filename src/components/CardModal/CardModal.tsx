import React, {
  ReactNode,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';

import styles from './card-modal.module.scss';

import { FavouriteCheckbox } from '@/components/FavouriteCheckbox';
import { ICharacter } from '@/model/App.ts';
import { useGetCharacterQuery } from '@/store/api.ts';

const CardModal: React.FC = (): ReactNode => {
  const { characterId } = useParams<{ characterId: string }>();
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isFetching } = useGetCharacterQuery(characterId, {
    skip: !characterId,
  });

  useEffect(() => {
    if (data) setCharacter(data);
  }, [data]);

  useEffect(() => {
    if (location.pathname.includes(`/main/character/${characterId}`)) {
      setIsOpen(true);
    }
  }, [characterId, location.pathname]);

  const handleClose = useCallback(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    const savedPage = localStorage.getItem('currentPage') || '1';

    navigate(
      `/main?page=${savedPage}${savedSearchTerm ? `&query=${savedSearchTerm}` : ''}`
    );
    setIsOpen(false);
  }, [navigate]);

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
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick, isOpen]);

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

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className={`${styles['modal-overlay']} ${isOpen ? styles.visible : styles.hidden}`}
        onClick={handleClose}
      ></div>
      <article
        className={`${styles['card-details']} ${isOpen ? '' : styles.hidden}`}
        ref={modalRef}
      >
        <header className={styles['card-details__header']}>
          <button className={styles['close-btn']} onClick={handleClose}>
            Close
          </button>
        </header>

        {isFetching ? (
          <section>
            <p>Loading details...</p>
          </section>
        ) : character ? (
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
