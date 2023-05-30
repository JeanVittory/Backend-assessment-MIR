import { ApiError } from '../../../config/errorsHandler/ApiErrors.config';
import { Prisma } from '@prisma/client';
import { IUser } from '../../interfaces/User.interface';
import { INewUser } from '../../interfaces/NewUser.interface';
import encryptPassword from '../../utils/passwordEncryption.utils';
import prisma from '@database/client';
import PrismaError from '../../../config/errorsHandler/PrismaError.config';
import logger from '@config/logger/logger.config';

export const createUser = async (newUser: INewUser) => {
  try {
    const { password } = newUser;
    const passwordHashed = await encryptPassword(password);
    const { id } = await prisma.user.create({
      data: { ...newUser, password: passwordHashed },
    });
    return { id };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new PrismaError(error.message, 400);
    }
    logger.error(error);
    throw ApiError.Internal('Something went wrong');
  }
};

export const getUserService = async (searchParam: string): Promise<IUser> => {
  try {
    return await prisma.user.findFirstOrThrow({
      where: {
        OR: [{ id: searchParam }, { email: searchParam }],
      },
      select: { id: true, email: true, password: true },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new PrismaError(error.message, 400);
    }
    logger.error(error.message);
    console.log(error);
    throw ApiError.Internal('Something went wrong');
  }
};

export const getAllUserFavoritesService = async (email: string) => {
  try {
    return await prisma.user.findFirstOrThrow({
      where: { email },
      select: {
        favs: { select: { name: true, items: { select: { id: true, title: true, description: true, link: true } } } },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new PrismaError(error.message, 400);
    }
    logger.error(error);
    throw ApiError.Internal('Something went wrong');
  }
};
