import { Request, Response } from 'express';
import { ApiError } from './ApiErrors.config';

export default function errorHandler(error: Error, req: Request, res: Response): Response {
  if (error instanceof ApiError) {
    return res.status(error.status).json(error.message);
  }
  return res.status(500).json(`Error Unknown: ${error}`);
}
