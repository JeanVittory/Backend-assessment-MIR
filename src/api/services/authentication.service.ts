import jwt from 'jsonwebtoken';
import PrismaError from '../../config/errorsHandler/PrismaError.config';
import validatePassword from '../utils/validatePasswords.utils';
import env from '../../config/env.config';
import { Prisma } from '@prisma/client';
import { getUser } from './users.service';
import { IAuthorization } from '../interfaces/authorization.interfaces';
import { prismaErrorsCodes400, prismaErrorsCodes404 } from '../utils/prismaErrorsCode.utils';
import { ApiError } from '../../config/errorsHandler/ApiErrors.config';

export const authenticationService = async (userEmail: string, userPassword: string): Promise<IAuthorization> => {
  try {
    const { password, email } = await getUser(userEmail);
    const isValidPassword = await validatePassword(password, userPassword);
    if (!isValidPassword) ApiError.Unauthorized();
    const TOKEN = getToken(email);
    return { ACCESS_TOKEN: TOKEN };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
      if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
      throw new PrismaError(error.message, 500);
    }
    throw ApiError.Internal('Error unknown in Prisma');
  }
};

const getToken = (payload: string): string => {
  const expToken: number = Math.floor(Date.now() / 1000) + 60 * 60;
  return jwt.sign({ payload }, env.JWT_SECRET, { expiresIn: expToken });
};
