import { Router } from 'express';
import { GET_ALL_ARTISTS, GET_ARTIST_BY_ID, GET_ARTIST_FILTERED_BY_NAME } from './endpoints/artists.endpoint';
import { getAllArtists, getArtistById, getArtistByName } from '@controllers/artists.controller';
import { artistNameValidator } from '@middlewares/artistNameValidator.middleware';

const artistsRouter = Router();

artistsRouter.get(GET_ARTIST_FILTERED_BY_NAME, artistNameValidator, getArtistByName);
artistsRouter.get(GET_ALL_ARTISTS, getAllArtists);
artistsRouter.get(GET_ARTIST_BY_ID, getArtistById);

export default artistsRouter;
