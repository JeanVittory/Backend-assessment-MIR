import express from 'express';
import { ApiRouter } from '../api/router/ApiRouter.router';

const routes = (app: express.Express) => {
  const router = new ApiRouter();
  app.use('/auth/local/', router.auth);
  app.use('/api/favs', router.favs);
};

export default routes;
