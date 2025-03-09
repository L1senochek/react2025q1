import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { CardModal } from '../../src/components/CardModal';
import { Flyout } from '../../src/components/Flyout';
import { Layout } from '../../src/components/Layout';
import { SearchResults } from '../../src/components/SearchResults';
import { BASE_URL } from '../../src/utils/constants';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const [main, id] = context.params
    ? (context.params.main as string[])
    : ['', ''];
  if (main !== 'main') return { notFound: true };

  const page = (context.query.page as string) || '1';
  const query = (context.query.query as string) || '';
  const searchParams = new URLSearchParams([
    ['page', page],
    ['name', query],
  ]);
  const url = `${BASE_URL}?${searchParams.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    return {
      props: {
        data: { info: { pages: 0 }, results: [] },
        error: await response.json(),
      },
    };
  }
  const data = await response.json();

  if (id) {
    const responseModal = await fetch(`${BASE_URL}/${id}`);
    if (!responseModal.ok)
      return { props: { data, modalData: { character: null } } };
    const character = await responseModal.json();

    return { props: { data, modalData: { character } } };
  }

  return { props: { data } };
};

const Page: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data, modalData }) => {
  return (
    <Layout>
      {data && (
        <>
          <SearchResults results={data.results} info={data.info} />
          <Flyout />
        </>
      )}
      {modalData && <CardModal character={modalData.character} />}
    </Layout>
  );
};

export default Page;
