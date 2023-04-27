import express from 'express';
import cors from 'cors';

const middlewares = (app: express.Express): Promise<void> => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  return;
};

export default middlewares;
