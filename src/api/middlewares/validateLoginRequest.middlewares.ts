import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../../config/errorsHandler/ApiErrors.config';
import login from '../joi/login.joi';

const validateLoginRequest = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = login.validate(req.body);
  if (error) return next(ApiError.BadRequest());
  next();
};

export default validateLoginRequest;
