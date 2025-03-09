import { createContext } from 'react';

import IFavouritesContext from '@/model/FavouritesContext.ts';

const FavouritesContext = createContext<IFavouritesContext>({
  favourites: [],
  favouritesIds: () => [],
  addFavourite: () => {},
  removeFavourite: () => {},
  unselectAll: () => {},
});

export default FavouritesContext;
