import jwt from 'jsonwebtoken';
import PrismaError from '@config/errorsHandler/PrismaError.config';
import validatePassword from '@utils/validatePasswords.utils';
import env from '@config/env.config';
import { Prisma } from '@prisma/client';
import { getUserService, createUser } from './users.service';
import { IAuthorization } from '@interfaces/Authorization.interfaces';
import { IUserAuthorized } from '@interfaces/UserAuthorized.interface';
import { INewUser } from '@interfaces/NewUser.interface';
import { prismaErrorsCodes400, prismaErrorsCodes404 } from '@utils/prismaErrorsCode.utils';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';

export const authenticationService = async (userEmail: string, userPassword: string): Promise<IAuthorization> => {
  try {
    const { password, email } = await getUserService(userEmail);
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
    if (error instanceof PrismaError) {
      throw error;
    }
    throw ApiError.Internal('Error unknown in Prisma');
  }
};

export const authorizationService = async (userEmail: string): Promise<IUserAuthorized> => {
  try {
    const { email } = await getUserService(userEmail);
    return { email };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
      if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
      throw new PrismaError(error.message, 500);
    }
    if (error instanceof PrismaError) {
      throw error;
    }
    throw ApiError.Internal('Error unknown in Prisma');
  }
};

export const registerService = async (newUser: INewUser) => {
  try {
    return await createUser(newUser);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
      if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
      throw new PrismaError(error.message, 500);
    }
    if (error instanceof PrismaError) {
      throw error;
    }
    throw ApiError.Internal('Error unknown in Prisma');
  }
};

const getToken = (payload: string): string => {
  const expToken: number = Math.floor(Date.now() / 1000) + 60 * 60;
  return jwt.sign({ email: payload }, env.JWT_SECRET, { expiresIn: expToken });
};
