export type IAppProps = Record<string, never>;

export interface IAppState {
  searchTerm: string;
  searchResults: ICharacter[];
  error: Error | null;
  throwError: boolean;
}

export interface ICharacter {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type?: string;
  gender: 'Male' | 'Female' | 'Genderless' | 'unknown';
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
