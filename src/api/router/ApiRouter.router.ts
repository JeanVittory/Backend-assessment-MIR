import { Router } from 'express';
import favRouter from '../routes/fav.routes';
import authRouter from '../routes/auth/auth.routes';

export class ApiRouter {
  readonly favs: Router;
  readonly auth: Router;

  constructor() {
    this.favs = favRouter;
    this.auth = authRouter;
  }
}
