import { Server } from './app.config';
import env from './env.config';
export class Backoffice {
  server?: Server;

  async start() {
    this.server = new Server(env.PORT);
    return this.server?.start();
  }
}
