import express from 'express';
import { ApiRouter } from '../api/router/ApiRouter.router';
import { auth, favs, artworks, artists, movements } from '@config/constants/rootRoutes.constants';

const routes = (app: express.Express) => {
  const router = new ApiRouter();
  app.use(auth, router.auth);
  app.use(favs, router.favs);
  app.use(artworks, router.artworks);
  app.use(artists, router.artists);
  app.use(movements, router.movements);
};

export default routes;
