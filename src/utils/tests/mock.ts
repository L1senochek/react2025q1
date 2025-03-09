import { ICharacter } from '@/model/App.ts';

export const mockSearchResults: ICharacter[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: {
      name: 'Earth',
      url: '',
    },
    location: {
      name: 'Citadel of Ricks',
      url: '',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
    url: '',
    created: '',
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: {
      name: 'Earth',
      url: '',
    },
    location: {
      name: 'Earth',
      url: '',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: [],
    url: '',
    created: '',
  },
];

export const mockCharacter = mockSearchResults[0];
