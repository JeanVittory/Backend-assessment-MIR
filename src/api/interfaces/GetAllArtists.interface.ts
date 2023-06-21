import { Artist, Movement, Artwork, Origin_movement, Origins_artwork } from '@prisma/client';

export default interface IGetAllArtists extends Omit<Artist, 'createdAt' | 'updatedAt' | 'movementId'> {
  movement: IMovement;
  artworks: IArtworks[];
}

interface IArtworks
  extends Omit<Artwork, 'origins_artworkId' | 'createdAt' | 'updatedAt' | 'favId' | 'fav' | 'movementId' | 'artistId'> {
  movement: IMovement;
  localization: IArtworkLocalization;
}

interface IMovement extends Omit<Movement, 'artworks' | 'createdAt' | 'updatedAt' | 'origin_movementId'> {
  origin: Omit<Origin_movement, 'movements'>;
}

interface IArtworkLocalization extends Omit<Origins_artwork, 'artwork'> {}
