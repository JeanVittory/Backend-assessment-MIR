import { Prisma } from '@prisma/client';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import { IUser } from '@interfaces/User.interface';
import { INewUser } from '@interfaces/NewUser.interface';
import prisma from '../../database/client';
import PrismaError from '@config/errorsHandler/PrismaError.config';
import logger from '@config/logger/logger.config';
import encryptPassword from '@utils/passwordEncryption.utils';

export const createUser = async ({ email, password, username }: INewUser) => {
  try {
    const passwordHashed = await encryptPassword(password);
    const user = await prisma.user.create({
      data: { email, username, password: passwordHashed },
    });
    return { id: user.id };
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
