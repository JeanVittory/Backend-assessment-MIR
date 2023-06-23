import { Movement, Artist, Origin_movement, Artwork, Origins_artwork } from '@prisma/client';

export default interface IMovement extends Omit<Movement, 'createdAt' | 'updatedAt' | 'origin_movementId'> {
  origin: Omit<Origin_movement, 'movements'>;
  artists: Omit<Artist, 'artworks' | 'movement' | 'movementId' | 'createdAt' | 'updatedAt'>[];
  artworks: IArtworkLocalization[];
}

interface IArtworkLocalization
  extends Omit<
    Artwork,
    'movementId' | 'fav' | 'favId' | 'createdAt' | 'updatedAt' | 'artistId' | 'artist' | 'origins_artworkId'
  > {
  localization: Omit<Origins_artwork, 'artwork' | ''>;
}
