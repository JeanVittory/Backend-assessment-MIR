import { Request, Response, NextFunction } from 'express';
import { ApiError } from './ApiErrors.config';

export default function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof ApiError) {
    return res.status(error.status).json(error.message);
  }
  res.status(500).json(`Error Unknown: ${error}`);
}
