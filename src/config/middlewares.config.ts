import express from 'express';
import cors from 'cors';

const middlewares = (app: express.Express): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
};

export default middlewares;
