import { combineReducers, configureStore } from '@reduxjs/toolkit';

import favouritesReducer from './favourites';

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
  },
});

const rootReducer = combineReducers({
  favourites: favouritesReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
