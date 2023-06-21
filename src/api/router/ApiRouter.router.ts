import { Router } from 'express';
import favRouter from '@routes/fav.routes';
import authRouter from '@routes/auth.routes';
import artworksRouter from '@routes/artworks.routes';
import artistsRouter from '@routes/artists.routes';

export class ApiRouter {
  readonly favs: Router;
  readonly auth: Router;
  readonly artworks: Router;
  readonly artists: Router;

  constructor() {
    this.favs = favRouter;
    this.auth = authRouter;
    this.artworks = artworksRouter;
    this.artists = artistsRouter;
  }
}
