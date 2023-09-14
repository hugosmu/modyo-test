export interface EntryFieldsRepository {
  fields: {
    image: {
        url: string;
        alt_text: string;
        title: string;
        uuid: string;
      }
    }
  }

export interface UseAnimalsImages {
  isLoading: boolean;
  error: boolean;
  animalsImages: AnimalImage[]
  refreshImages: () => void;
}

export interface AnimalImage {
  url: string;
  alt: string;
  id: string;
}

export interface FlippedCards {
  cardOne?: string,
  cardTwo?: string
}

export interface IFlipCard {
  imageData: AnimalImage,
  flippedCards?: FlippedCards,
  setFlippedCards: (param: object) => void,
  setScore: (param: boolean) => void,
}