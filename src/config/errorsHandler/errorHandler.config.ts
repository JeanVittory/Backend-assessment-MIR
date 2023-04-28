import { Request, Response } from 'express';
import { ApiError } from './ApiErrors.config';

export default function errorHandler(error: Error, req: Request, res: Response): void {
  if (error instanceof ApiError) {
    res.status(error.status).json(error.message);
  }
  res.status(500).json(`Error Unknown: ${error}`);
}
