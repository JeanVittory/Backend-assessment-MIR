import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import env from '@config/env.config';
import authorization from '@joi/authorization.joi';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import { ITokenPayload } from '@interfaces/TokenPayload.interface';

const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.headers.authorization) return next(ApiError.Forbbiden('You need to provide a TOKEN'));
  const ACCESS_TOKEN: string = req.headers.authorization.split(' ')[1];
  const { error } = authorization.validate(ACCESS_TOKEN);
  if (error) next(ApiError.Forbbiden());
  try {
    const { email } = jwt.verify(ACCESS_TOKEN, env.JWT_SECRET) as ITokenPayload;
    req.user = { email };
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) return next(ApiError.Forbbiden('Error with token'));
    return next(ApiError.Internal('Something went wrong'));
  }
};

export default isAuthenticated;
