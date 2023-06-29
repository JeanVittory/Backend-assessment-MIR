import { Server as server } from 'http';
import { Server } from './app.config';
import env from './env.config';
export class Backoffice {
  server?: Server;

  async start(): Promise<server> {
    this.server = new Server(env.PORT);
    return this.server?.start();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  get app() {
    return this.server?.getApp();
  }

  async stop() {
    return await this.server?.stop();
  }
}
