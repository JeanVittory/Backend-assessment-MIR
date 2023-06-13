import { Router } from 'express';
import favRouter from '@routes/fav.routes';
import authRouter from '@routes/auth.routes';
import artworksRouter from '@routes/artworks.routes';

export class ApiRouter {
  readonly favs: Router;
  readonly auth: Router;
  readonly artwork: Router;

  constructor() {
    this.favs = favRouter;
    this.auth = authRouter;
    this.artwork = artworksRouter;
  }
}
