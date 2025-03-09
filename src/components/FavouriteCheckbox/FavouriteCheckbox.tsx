'use client';

import React, {
  ReactElement,
  memo,
  useContext,
  useEffect,
  useState,
} from 'react';

import FavouritesContext from '../../providers/FavouritesProvider/FavouritesContext.ts';

import styles from './favourite-checkbox.module.scss';

import { ICharacter } from '@/model/App.ts';

interface IProps {
  character: ICharacter;
}

const FavouriteCheckbox: React.FC<IProps> = ({ character }): ReactElement => {
  const { favouritesIds, addFavourite, removeFavourite } =
    useContext(FavouritesContext);
  const [checked, setChecked] = useState<boolean>(isCheckedInit());

  function isCheckedInit() {
    if (favouritesIds()) {
      return favouritesIds().includes(character.id);
    }
    return false;
  }

  useEffect(() => {
    if (favouritesIds().includes(character.id)) setChecked(true);
    else setChecked(false);
  }, [character, favouritesIds]);

  const toggleFavourite = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { target } = event;

    if (!target.checked) {
      removeFavourite(character.id);
    } else addFavourite(character);

    setChecked(!checked);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
  };

  return (
    <input
      className={styles['favourite-checkbox']}
      type={'checkbox'}
      name={'favourite-checkbox'}
      onChange={toggleFavourite}
      checked={checked}
      onClick={handleClick}
    />
  );
};

export default memo(FavouriteCheckbox);
