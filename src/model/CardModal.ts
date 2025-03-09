import { ICharacter } from '@/model/App.ts';

interface ICharacterDetails {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
}

export interface ICardModalProps {
  character: ICharacter | null;
}

export default ICharacterDetails;
