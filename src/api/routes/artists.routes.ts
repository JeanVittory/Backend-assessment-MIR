import { Router } from 'express';
import { GET_ALL_ARTISTS, GET_ARTIST_BY_ID } from './endpoints/artists.endpoint';
import { getAllArtists, getArtistById } from '@controllers/artists.controller';

const artistsRouter = Router();

artistsRouter.get(GET_ALL_ARTISTS, getAllArtists);
artistsRouter.get(GET_ARTIST_BY_ID, getArtistById);

export default artistsRouter;
