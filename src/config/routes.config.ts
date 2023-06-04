import express from 'express';
import { ApiRouter } from '../api/router/ApiRouter.router';
import { auth, favs } from '@config/constants/rootRoutes.constants';

const routes = (app: express.Express) => {
  const router = new ApiRouter();
  app.use(auth, router.auth);
  app.use(favs, router.favs);
};

export default routes;
