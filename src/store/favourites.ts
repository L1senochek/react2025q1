import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { ICharacter } from '@/model/App.ts';
import { RootState } from '@/store/store.ts';

interface FavouritesState {
  favourites: ICharacter[];
}

const initialState: FavouritesState = {
  favourites: [],
};

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (
      state: FavouritesState,
      action: PayloadAction<ICharacter>
    ) => {
      state.favourites.push(action.payload);
    },
    deleteFavourite: (
      state: FavouritesState,
      action: PayloadAction<number>
    ) => {
      state.favourites = state.favourites.filter(
        (favourite) => favourite.id !== action.payload
      );
    },
    unselectAll: () => {
      return initialState;
    },
  },
});

export const { addFavourite, deleteFavourite, unselectAll } =
  favouritesSlice.actions;

const selectFavouritesState = (state: RootState) => state.favourites;
export const selectFavourites = createSelector(
  selectFavouritesState,
  (state) => state.favourites
);
export const selectFavouritesIds = createSelector(
  selectFavourites,
  (favourites) => favourites.map((item) => item.id)
);

export default favouritesSlice.reducer;
