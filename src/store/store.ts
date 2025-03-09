import { configureStore } from '@reduxjs/toolkit';

import favouritesReducer from './favourites';

import { apiSlice } from '@/store/api.ts';

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
