import { Prisma } from '@prisma/client';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import { IUser } from '@interfaces/User.interface';
import { INewUser } from '@interfaces/NewUser.interface';
import { IGetAllFavoritesUser } from '@interfaces/GetAllFavoritesUser.interface';
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

export const getAllUserFavoritesService = async (email: string): Promise<IGetAllFavoritesUser> => {
  try {
    return await prisma.user.findFirstOrThrow({
      where: { email },
      select: {
        favs: {
          select: {
            id: true,
            name: true,
            items: {
              select: {
                id: true,
                name: true,
                description: true,
                year: true,
                localization: true,
                technique: true,
                price: true,
                movement: {
                  select: {
                    id: true,
                    name: true,
                    origin: { select: { localization: true, country: true } },
                    description: true,
                    activity: true,
                  },
                },
                artist: {
                  select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    pseudonym: true,
                    gender: true,
                    birthdate: true,
                    avatar: true,
                    nationality: true,
                    bio: true,
                    death: true,
                    price: true,
                  },
                },
              },
            },
          },
        },
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
