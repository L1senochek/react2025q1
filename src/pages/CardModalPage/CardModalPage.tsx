import React, { memo } from 'react';

import { CardModal } from '../../components/CardModal';
import { BASE_URL } from '../../constants.ts';

import { ICharacter } from '@/model/App.ts';

const CardModalPage: React.FC<{ id: string }> = async ({ id }) => {
  const response = await fetch(`${BASE_URL}/${id}`, { cache: 'no-store' });

  if (!response.ok) return <CardModal character={null} />;

  const character: ICharacter = await response.json();

  return <CardModal character={character} />;
};

export default memo(CardModalPage);
