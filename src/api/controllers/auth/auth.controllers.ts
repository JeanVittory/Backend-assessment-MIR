import { Request, Response, NextFunction } from 'express';
import { authenticationService, authorizationService, registerService } from '../../services/auth.service';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import PrismaError from '@config/errorsHandler/PrismaError.config';

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

export const authorization = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.user;
    const userEmail = await authorizationService(email);
    res.status(200).json(userEmail);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newUserId = await registerService(req.body);
    res.status(201).json(newUserId);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};
