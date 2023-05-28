import { Request, Response, NextFunction } from 'express';
import register from '@joi/register.joi';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';

const validateRegisterRequest = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = register.validate(req.body);
  if (error)
    return next(
      ApiError.BadRequest('Please check if you have provided all the necessary information for registration.'),
    );
  next();
};

export default validateRegisterRequest;
