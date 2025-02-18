interface ICharacterDetails {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
}

export default ICharacterDetails;
