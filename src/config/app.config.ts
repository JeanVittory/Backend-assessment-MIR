import express from 'express';
import * as http from 'http';
import middlewares from './middlewares.config';
import routes from './routes.config';
import errorHandler from './errorsHandler/errorHandler.config';

export class Server {
  private port: string;
  private express: express.Express;
  httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    middlewares(this.express);
    routes(this.express);
    this.httpServer = http.createServer(this.express);
    this.express.use(errorHandler);
  }

  async start(): Promise<http.Server> {
    return new Promise((resolve) => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`Server running on port ${this.port}`);
        resolve(this.httpServer);
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }
      resolve();
    });
  }
}
