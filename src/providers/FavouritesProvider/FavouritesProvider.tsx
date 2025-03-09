'use client';

import React, { PropsWithChildren, ReactElement, memo, useState } from 'react';

import FavouritesContext from './FavouritesContext.ts';

import { ICharacter } from '@/model/App.ts';

const FavouritesProvider: React.FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const [favourites, setFavourites] = useState<ICharacter[]>([]);

  const addFavourite = (item: ICharacter): void => {
    setFavourites([...favourites, item]);
  };

  const removeFavourite = (id: number): void => {
    setFavourites([...favourites].filter((item) => item.id !== id));
  };

  const unselectAll = (): void => {
    setFavourites([]);
  };

  const favouritesIds = (): number[] => {
    return favourites.map((item) => item.id);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        favouritesIds,
        addFavourite,
        removeFavourite,
        unselectAll,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export default memo(FavouritesProvider);
