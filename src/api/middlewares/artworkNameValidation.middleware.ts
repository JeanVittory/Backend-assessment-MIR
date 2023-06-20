import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import logger from '@config/logger/logger.config';

export const artworkQueryValidation = (req: Request, res: Response, next: NextFunction) => {
  const {
    'artwork-name': artworkName,
    'artist-firstname': artistName,
    'artist-lastname': artistLastname,
    'movement-name': movementName,
  } = req.query;
  if (!artworkName && !artistName && !movementName && !artistLastname) {
    logger.error('You should provide some search filter');
    return next(ApiError.BadRequest());
  }
  for (let [key, value] of Object.entries(req.query)) {
    req.query = {
      ...req.query,
      [key]: (value as string).replace(/-/g, ' '),
    };
  }
  next();
};
