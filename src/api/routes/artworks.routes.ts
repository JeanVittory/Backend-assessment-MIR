import { Router } from 'express';
import { GET_SINGLE_ARTWORK_BY_QUERY_PARAM, GET_ALL_ARTWORKS } from './endpoints/artworks.endpoint';
import { artworkNameValidation } from '@middlewares/artworkNameValidation.middleware';
import { getArtworksByFilters, getAllArtworks } from '@controllers/artworks.controller';

const artworksRouter = Router();

artworksRouter.get(GET_SINGLE_ARTWORK_BY_QUERY_PARAM, artworkNameValidation, getArtworksByFilters);
artworksRouter.get(GET_ALL_ARTWORKS, getAllArtworks);

export default artworksRouter;
