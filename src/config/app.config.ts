import express from 'express';
import * as http from 'http';
import { ScheduledTask } from 'node-cron';
import envConfig from './env.config';
import middlewares from './middlewares.config';
import routes from './routes.config';
import errorHandler from './errorsHandler/errorHandler.config';
import logger from './logger/logger.config';
import restartUsers from './cron.config';

export class Server {
  private port: string;
  private express: express.Express;
  httpServer: http.Server;
  cron: ScheduledTask;

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
      this.cron = restartUsers();
      if (process.env.NODE_ENV !== 'test') this.cron.start();
      this.httpServer = this.express.listen(this.port, () => {
        logger.info(`Server running on port ${this.port}`);
        resolve(this.httpServer);
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  getApp(): express.Express {
    return this.express;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        if (process.env.NODE_ENV !== 'test') this.cron.stop();
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
