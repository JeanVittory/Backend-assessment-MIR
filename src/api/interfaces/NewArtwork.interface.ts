import { Artwork } from '@prisma/client';

export interface INewArtwork extends Pick<Artwork, 'name' | 'year' | 'description' | 'technique' | 'price'> {
  localization: number[];
  author: string;
  country: string;
  movement: string;
}
