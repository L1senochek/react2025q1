import React, { ReactElement, memo, useEffect, useState } from 'react';

import styles from './favourite-checkbox.module.scss';

import { useAppDispatch, useAppSelector } from '@/hooks/redux.ts';
import { ICharacter } from '@/model/App.ts';
import {
  addFavourite,
  deleteFavourite,
  selectFavouritesIds,
} from '@/store/favourites.ts';

interface IProps {
  character: ICharacter;
}

const FavouriteCheckbox: React.FC<IProps> = ({ character }): ReactElement => {
  const favouritesIds = useAppSelector(selectFavouritesIds);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState<boolean>(isCheckedInit());

  function isCheckedInit() {
    if (favouritesIds) {
      return favouritesIds.includes(character.id);
    }
    return false;
  }

  useEffect(() => {
    if (favouritesIds.includes(character.id)) setChecked(true);
    else setChecked(false);
  }, [character, favouritesIds]);

  const toggleFavourite = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { target } = event;

    if (!target.checked) {
      dispatch(deleteFavourite(character.id));
    } else dispatch(addFavourite(character));

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
