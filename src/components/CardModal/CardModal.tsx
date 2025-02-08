import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import styles from './card-modal.module.scss';
import ICharacterDetails from '@/model/CardModal.ts';

const CardModal: React.FC = (): ReactNode => {
  const { characterId } = useParams<{ characterId: string }>();
  const [character, setCharacter] = useState<ICharacterDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes(`/main/character/${characterId}`)) {
      setIsOpen(true);
      setIsLoading(true);
      (async () => {
        try {
          const response = await fetch(
            `https://rickandmortyapi.com/api/character/${characterId}`
          );
          if (!response.ok) {
            setCharacter(null);
            return;
          }
          const data = await response.json();
          setCharacter(data);
        } catch (error) {
          console.error('Error fetching details:', error);
          setCharacter(null);
        } finally {
          setIsLoading(false);
        }
      })();
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
      { label: 'Status', value: character.status },
      { label: 'Species', value: character.species },
      { label: 'Gender', value: character.gender },
      { label: 'Origin', value: character.origin.name },
    ].map(({ label, value }) => (
      <p key={label}>
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
      <div
        className={`${styles['card-details']} ${isOpen ? '' : styles.hidden}`}
        ref={modalRef}
      >
        <button className={styles['close-btn']} onClick={handleClose}>
          Close
        </button>
        {isLoading ? (
          <div>Loading details...</div>
        ) : character ? (
          <>
            <h2 className={styles['card-details__header']}>{character.name}</h2>
            <img
              className={styles.avatar}
              src={character.image}
              alt={character.name}
            />
            {characterDetails}
          </>
        ) : (
          <div>Character details not found</div>
        )}
      </div>
    </>
  );
};

export default CardModal;
