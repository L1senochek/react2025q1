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

export interface IMainPageProps {
  data: ICharacterResponse;
  modalData?: {
    character: ICharacter | null;
  };
}

interface ISearchResultsProps {
  searchResults: ICharacter[];
}

export default ISearchResultsProps;
