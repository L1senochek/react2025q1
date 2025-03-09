import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ICharacter } from '@/model/App.ts';
import { ICharacterResponse } from '@/model/SearchResults.ts';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/character',
  }),
  endpoints: (build) => ({
    getCharacters: build.query<ICharacterResponse, string>({
      query: (searchParams) => `?${searchParams}`,
    }),
    getCharacter: build.query<ICharacter, string | undefined>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetCharacterQuery, useGetCharactersQuery } = apiSlice;
