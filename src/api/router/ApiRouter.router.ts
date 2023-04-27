import { Router } from 'express';
import favRouter from '../routes/fav.routes';
import authenticationRouter from '../routes/authentication.routes';

export class ApiRouter {
  readonly favs: Router;
  readonly authentication: Router;

  constructor() {
    this.favs = favRouter;
    this.authentication = authenticationRouter;
  }
}
