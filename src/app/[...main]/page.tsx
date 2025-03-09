import React, { Suspense } from 'react';
import { Metadata } from 'next';

import { SearchResultsPage } from '../../pages/SearchResultsPage';

export const metadata: Metadata = {
  title: 'Rick and Morty Api',
};

interface PageProps {
  params: Promise<{ main: string[] }>;
  searchParams: Promise<{ page?: string; query?: string }>;
}

const Page: React.FC<PageProps> = async ({ params, searchParams }) => {
  const id = (await params).main[1];
  const { page, query } = await searchParams;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResultsPage page={page} query={query} id={id} />
      </Suspense>
    </>
  );
};
export default Page;
