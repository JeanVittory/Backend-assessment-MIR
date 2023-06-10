import { Artist, Artwork, Movements } from '@prisma/client';

export interface ICreateFavoriteResponse {
  id: string;
  name: string;
  items: IFavorites[];
}

interface IFavorites extends Omit<Artwork, 'createdAt' | 'updatedAt' | 'favId' | 'movementsId' | 'artistId'> {
  Movements: Omit<Movements, 'createdAt' | 'updatedAt'>;
  Artist: Omit<Artist, 'createdAt' | 'updatedAt' | 'movementsId'>;
}
