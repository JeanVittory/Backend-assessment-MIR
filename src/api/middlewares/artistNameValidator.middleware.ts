import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import nameQueryValidator from '@joi/nameQueryValidator.joi';
import logger from '@config/logger/logger.config';

export const artistNameValidator = (req: Request, res: Response, next: NextFunction): void => {
  const { firstname, lastname } = req.query;
  if (!firstname && !lastname) {
    logger.error('You should provide some filter');
    next(ApiError.BadRequest());
    return;
  }

  const { error } = nameQueryValidator.validate({ firstname, lastname });
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
