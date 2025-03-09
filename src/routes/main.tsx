import React, { memo } from 'react';
import { LoaderFunctionArgs } from 'react-router';

import { Route } from '../../.react-router/types/src/routes/+types/main';

import { BASE_URL } from '@/constants.ts';
import { ICharacterResponse } from '@/model/SearchResults.ts';
import { MainPage } from '@/pages/MainPage';

export const loader: LoaderFunctionArgs = async ({
  request,
}): Promise<ICharacterResponse> => {
  const searchParams = new URL(request.url).searchParams;
  const query = searchParams.get('query');
  searchParams.delete('query');
  if (query) {
    searchParams.set('name', query);
  }
  const res = await fetch(`${BASE_URL}?${searchParams.toString()}`);
  if (!res.ok)
    return {
      results: [],
      info: { pages: 1, count: 0, next: null, prev: null },
    };
  return await res.json();
};

const Main: React.FC<Route.ComponentProps> = ({ loaderData }) => {
  const data = loaderData as unknown as ICharacterResponse;

  return <MainPage results={data.results} info={data.info} />;
};

export default memo(Main);
