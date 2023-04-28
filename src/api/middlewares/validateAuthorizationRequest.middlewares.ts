import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/errorsHandler/ApiErrors.config';
import authentication from '../joi/authentication';

const validateAuthenticationRequest = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = authentication.validate(req.body);
  if (error) return next(ApiError.BadRequest());
  next();
};

export default validateAuthenticationRequest;
