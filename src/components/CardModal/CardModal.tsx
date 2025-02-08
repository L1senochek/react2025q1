import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import styles from './card-modal.module.scss';

interface ICharacterDetails {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
}

const CardModal: React.FC = (): ReactNode => {
  const { characterId } = useParams<{ characterId: string }>();
  const [character, setCharacter] = useState<ICharacterDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(true);
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
          if (!response.ok)
            throw new Error('Failed to fetch character details');
          const data = await response.json();
          setCharacter(data);
        } catch (error) {
          console.error('Error fetching details:', error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [characterId, location.pathname]);

  const handleClose = (): void => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    const savedPage = localStorage.getItem('currentPage') || '1';
    navigate(
      `/main?page=${savedPage}${savedSearchTerm ? `&query=${savedSearchTerm}` : ''}`
    );

    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`${styles['card-details']} ${isOpen ? '' : styles.hidden}`}>
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
          <p>
            <span className={styles['card-details__highlight']}>Status:</span>
            <span>{character.status}</span>
          </p>
          <p>
            <span className={styles['card-details__highlight']}>Species:</span>
            <span>{character.species}</span>
          </p>
          <p>
            <span className={styles['card-details__highlight']}>Gender:</span>
            <span>{character.gender}</span>
          </p>
          <p>
            <span className={styles['card-details__highlight']}>Origin:</span>
            <span>{character.origin.name}</span>
          </p>
        </>
      ) : (
        <div>Character details not found</div>
      )}
    </div>
  );
};

export default CardModal;
