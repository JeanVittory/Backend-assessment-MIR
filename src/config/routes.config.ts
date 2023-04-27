import express from 'express';
import { ApiRouter } from '../api/router/ApiRouter.router';

const routes = (app: express.Express) => {
  const router = new ApiRouter();
  app.use('/api/v1/favs', router.favs);
  app.use('/auth/local/login', router.authentication);
};

export default routes;
