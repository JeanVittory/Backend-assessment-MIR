import { Artist, Artwork, Movement, Origins_artwork } from '@prisma/client';

export default interface IGetArtwork
  extends Omit<Artwork, 'artistId' | 'movementId' | 'fav' | 'favId' | 'createdAt' | 'updatedAt' | 'origins_artworkId'> {
  artist: Omit<Artist, 'artworks' | 'movementId' | 'createdAt' | 'updatedAt'>;
  localization: Omit<Origins_artwork, 'id' | 'artwork'>;
  movement: Omit<Movement, 'artists' | 'artworks' | 'createdAt' | 'updatedAt' | 'origin_movementId'>;
}
