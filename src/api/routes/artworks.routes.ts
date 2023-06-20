import { Router } from 'express';
import { GET_SINGLE_ARTWORK_BY_QUERY_PARAM, GET_ALL_ARTWORKS, GET_ARTWORK_BY_ID } from './endpoints/artworks.endpoint';
import { artworkQueryValidation } from '@middlewares/artworkNameValidation.middleware';
import { getArtworksByFilters, getAllArtworks, getArtworkById } from '@controllers/artworks.controller';

const artworksRouter = Router();

artworksRouter.get(GET_SINGLE_ARTWORK_BY_QUERY_PARAM, artworkQueryValidation, getArtworksByFilters);
artworksRouter.get(GET_ALL_ARTWORKS, getAllArtworks);
artworksRouter.get(GET_ARTWORK_BY_ID, getArtworkById);

export default artworksRouter;
