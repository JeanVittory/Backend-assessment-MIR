import { Router } from 'express';
import isAuthenticated from '@middlewares/isAuthenticated.middleware';
import validateDeletionItem from '@middlewares/validateDeletionItem.middleware';
import {
  GET_ALL_USERS_FAVORITES,
  DELETE_FAVORITE_LIST,
  GET_SINGLE_FAVORITE_LIST,
  POST_FAVORITE_LIST,
  DELETE_FAVORITE_ITEM,
} from './endpoints/favs.endpoints';
import {
  allUserFavorites,
  createFavoriteList,
  singleFavoriteList,
  removeFavoriteList,
  removeFavoriteItem,
} from '@controllers/fav.controllers';

const favRouter = Router();

favRouter.get(GET_ALL_USERS_FAVORITES, isAuthenticated, allUserFavorites);
favRouter.post(POST_FAVORITE_LIST, isAuthenticated, createFavoriteList);
favRouter.get(GET_SINGLE_FAVORITE_LIST, isAuthenticated, singleFavoriteList);
favRouter.delete(DELETE_FAVORITE_LIST, isAuthenticated, removeFavoriteList);
favRouter.delete(DELETE_FAVORITE_ITEM, isAuthenticated, validateDeletionItem, removeFavoriteItem);

export default favRouter;
