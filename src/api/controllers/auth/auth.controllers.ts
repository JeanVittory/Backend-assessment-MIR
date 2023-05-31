import { Request, Response, NextFunction } from 'express';
import { authenticationService, authorizationService, registerService } from '../../services/auth/auth.service';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import PrismaError from '@config/errorsHandler/PrismaError.config';
import logger from '@config/logger/logger.config';

export const authentication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;
    const token = await authenticationService(email, password);
    res.status(200).json(token);
  } catch (error) {
    logger.error(error);
    if (error instanceof PrismaError) {
      return next(ApiError.Unauthorized('Authentication denied.'));
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
    logger.error(error);
    if (error instanceof PrismaError) {
      return next(ApiError.Forbbiden('Authorization denied.'));
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newUserId = await registerService(req.body);
    res.status(201).json(newUserId);
  } catch (error) {
    logger.error(error);
    if (error instanceof PrismaError) {
      return next(ApiError.BadRequest('Please, check if you have provide all the information necessary to register.'));
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};
