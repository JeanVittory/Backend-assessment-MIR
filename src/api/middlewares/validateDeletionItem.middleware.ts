import { NextFunction, Response, Request } from 'express';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import isValidDeletionItem from '@joi/isValidDeletionItem';
import logger from '@config/logger/logger.config';

const validateDeletionItem = (req: Request, res: Response, next: NextFunction) => {
  const { error } = isValidDeletionItem.validate(req.body);
  if (error) {
    logger.error(error);
    return next(ApiError.BadRequest());
  }
  next();
};

export default validateDeletionItem;
