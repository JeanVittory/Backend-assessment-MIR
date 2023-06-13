import { Artist } from '@prisma/client';

export interface INewArtist
  extends Omit<Artist, 'updatedAt' | 'createdAt' | 'movementId' | 'movement' | 'artworks' | 'id' | 'pseudonym'> {
  movement: string;
  pseudonym?: string;
}
