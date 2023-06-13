import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import logger from '@config/logger/logger.config';

export const artworkNameValidation = (req: Request, res: Response, next: NextFunction) => {
  if (!req.query.artworkName) {
    logger.error('The artwork name was undefined');
    return next(ApiError.BadRequest());
  }
  const { artworkName } = req.query;
  const artworkNameFormatted = String(artworkName)
    .split('')
    .map((letter) => {
      if (letter === '-') return ' ';
      return letter;
    })
    .join('');
  req.query.artworkName = String(artworkNameFormatted).toLowerCase().replace('-', ' ');
  next();
};
