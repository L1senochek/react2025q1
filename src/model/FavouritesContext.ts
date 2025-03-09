import { ICharacter } from '@/model/App.ts';

interface IFavouritesContext {
  favourites: ICharacter[];
  favouritesIds: () => number[];
  addFavourite: (favourite: ICharacter) => void;
  removeFavourite: (id: number) => void;
  unselectAll: () => void;
}

export default IFavouritesContext;
