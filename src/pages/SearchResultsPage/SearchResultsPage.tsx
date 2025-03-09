import React, { memo } from 'react';

import { SearchResults } from '../../components/SearchResults';
import { BASE_URL } from '../../constants.ts';
import { CardModalPage } from '../CardModalPage';

import { ICharacterResponse } from '@/model/SearchResults.ts';

interface Props {
  page: string | undefined;
  query: string | undefined;
  id: string | undefined;
}

const SearchResultsPage: React.FC<Props> = async ({ page, query, id }) => {
  const searchParams = new URLSearchParams([
    ['page', page || '1'],
    ['name', query || ''],
  ]);

  const response = await fetch(`${BASE_URL}?${searchParams.toString()}`, {
    cache: 'no-store',
  });

  if (!response.ok)
    return (
      <SearchResults
        results={[]}
        info={{ pages: 0, count: 0, next: null, prev: null }}
      />
    );

  const data: ICharacterResponse = await response.json();

  return (
    <>
      <SearchResults results={data.results} info={data.info} />
      {!!id && <CardModalPage id={id} />}
    </>
  );
};

export default memo(SearchResultsPage);
