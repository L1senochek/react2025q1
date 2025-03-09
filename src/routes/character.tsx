import React, { memo } from 'react';

import { Route } from '../../.react-router/types/src/routes/+types/character';

import { CardModal } from '@/components/CardModal';
import { BASE_URL } from '@/constants.ts';
import { ICharacter } from '@/model/App.ts';

export const loader: Route.LoaderArgs = async ({
  params,
}): Promise<ICharacter | undefined> => {
  const id = params.characterId;
  if (!id) return undefined;
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) return undefined;
  return await response.json();
};

const Character: React.FC<Route.ComponentProps> = ({ loaderData }) => {
  return <CardModal data={loaderData} />;
};

export default memo(Character);
