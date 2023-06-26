import { Movement, Artist, Origin_movement, Artwork, Origins_artwork } from '@prisma/client';

export interface IMovement extends Omit<Movement, 'createdAt' | 'updatedAt' | 'origin_movementId'> {
  artists: Omit<Artist, 'artworks' | 'movement' | 'movementId' | 'createdAt' | 'updatedAt'>[];
  artworks: IArtwork[];
  origin: Omit<Origin_movement, 'movements'>;
}

interface IArtwork
  extends Omit<Artwork, 'movementId' | 'fav' | 'favId' | 'createdAt' | 'updatedAt' | 'artistId' | 'origins_artworkId'> {
  artist: IArtists;
  localization: Omit<Origins_artwork, 'artwork' | ''>;
}

interface IArtists extends Omit<Artist, 'artworks' | 'movementId' | 'createdAt' | 'updatedAt' | 'movement'> {}
