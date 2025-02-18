import { ICharacter } from '@/model/App.ts';

export interface ICharacterResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: ICharacter[];
}

interface ISearchResultsProps {
  searchResults: ICharacter[];
  onItemClick: (itemId: number) => void;
}

export default ISearchResultsProps;
