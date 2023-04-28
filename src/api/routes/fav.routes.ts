import isAuthenticated from '../middlewares/isAuthenticated.middleware';
import { Router } from 'express';
import {
  allUserFavorites,
  createFavoriteList,
  singleFavoriteList,
  removeFavoriteList,
} from '../controllers/fav.controllers';

const favRouter = Router();

favRouter.get('/', isAuthenticated, allUserFavorites);
favRouter.post('/', isAuthenticated, createFavoriteList);
favRouter.get('/:id', isAuthenticated, singleFavoriteList);
favRouter.delete('/:id', isAuthenticated, removeFavoriteList);

export default favRouter;
