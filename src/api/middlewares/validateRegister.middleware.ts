import { Request, Response, NextFunction } from 'express';
import register from '@joi/register.joi';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';

const validateRegisterRequest = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = register.validate(req.body);
  if (error) return next(ApiError.BadRequest('You should provide an email and password'));
  next();
};

export default validateRegisterRequest;
