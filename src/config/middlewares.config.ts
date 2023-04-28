import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerSpecs from './swagger.config';

const middlewares = (app: express.Express): Promise<void> => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
  return;
};

export default middlewares;
