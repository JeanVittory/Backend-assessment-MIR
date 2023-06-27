import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import logger from '@config/logger/logger.config';
import movementValidator from '@joi/movementValidator.joi';

export const movementNameValidator = (req: Request, res: Response, next: NextFunction): void => {
  const { movement } = req.query;
  if (!movement) {
    logger.error('You should provide some filter');
    next(ApiError.BadRequest());
    return;
  }

  const { error } = movementValidator.validate({ movement });
  if (error) {
    logger.error(error.message);
    next(ApiError.BadRequest());
    return;
  }

  for (let [key, value] of Object.entries(req.query)) {
    req.query = {
      ...req.query,
      [key]: (value as string).replace(/-/g, ' '),
    };
  }
  next();
};
