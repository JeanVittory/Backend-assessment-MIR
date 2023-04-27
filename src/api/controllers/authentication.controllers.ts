import { Request, Response, NextFunction } from 'express';
import { authenticationService } from '../services/authentication.service';
import { ApiError } from '../../config/errorsHandler/ApiErrors.config';
import PrismaError from '../../config/errorsHandler/PrismaError.config';

export const authentication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const token = await authenticationService(email, password);
    res.status(200).json(token);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};
