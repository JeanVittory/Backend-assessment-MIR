import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/errorsHandler/ApiErrors.config';
import authentication from '../joi/authentication.joi';

const validateAuthenticationRequest = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = authentication.validate(req.body);
  if (error) return next(ApiError.BadRequest('Credentials failed'));
  next();
};

export default validateAuthenticationRequest;
