import { Router } from 'express';
import { GET_ALL_ARTISTS } from './endpoints/artists.endpoint';
import { getAllArtists } from '@controllers/artists.controller';

const artistsRouter = Router();

artistsRouter.get(GET_ALL_ARTISTS, getAllArtists);

export default artistsRouter;
