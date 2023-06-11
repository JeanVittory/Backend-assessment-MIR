import { Artist, Artwork, Movements } from '@prisma/client';

export interface IGetSingleFavoriteList {
  id: string;
  name: string;
  items: IFavorites[];
}

interface IFavorites extends Omit<Artwork, 'createdAt' | 'updatedAt' | 'favId' | 'movementId' | 'artistId'> {
  movement: Omit<Movements, 'createdAt' | 'updatedAt'>;
  artist: Omit<Artist, 'createdAt' | 'updatedAt' | 'movementId'>;
}
