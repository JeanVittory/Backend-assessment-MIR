import { Artist, Artwork, Movement } from '@prisma/client';

export interface ICreateFavoriteResponse {
  id: string;
  name: string;
  items: IFavorites[];
}

interface IFavorites
  extends Omit<Artwork, 'createdAt' | 'updatedAt' | 'favId' | 'movementId' | 'artistId' | 'origins_artworkId'> {
  movement: Omit<Movement, 'createdAt' | 'updatedAt' | 'origin_movementId'>;
  artist: Omit<Artist, 'createdAt' | 'updatedAt' | 'movementId'>;
}
