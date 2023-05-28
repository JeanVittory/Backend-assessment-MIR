import PrismaError from '../../../config/errorsHandler/PrismaError.config';
import encryptPassword from '../../utils/passwordEncryption.utils';
import prisma from '../../database/client';
import { ApiError } from '../../../config/errorsHandler/ApiErrors.config';
import { Prisma } from '@prisma/client';
import { IUser } from '../../interfaces/User.interface';
import { INewItem } from '../../interfaces/NewItem.interface';
import { createItemService } from '../item.service';
import { createFavService } from '../fav.service';
import { ICreateFavoriteResponse } from '../../interfaces/CreateFavoriteResponse.interface';
import { INewUser } from '../../interfaces/NewUser.interface';
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

export const createFavoriteListService = async (item: INewItem, email: string): Promise<ICreateFavoriteResponse> => {
  try {
    const { category } = item;
    const userFav = await getAllUserFavoritesService(email);
    const isFav = userFav.favs.find((fav) => fav.name === category);
    if (!isFav) {
      const { id } = await createItemService(item);
      return await createFavService({ id, category, email });
    }
    const { name: categoryName } = isFav;
    return updateFavoriteList(categoryName, item);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new PrismaError(error.message, 400);
    }
    logger.error(error);
    throw ApiError.Internal('Something went wrong');
  }
};

export const updateFavoriteList = async (categoryName: string, item: INewItem): Promise<ICreateFavoriteResponse> => {
  try {
    const { id: newItemId } = await createItemService(item);
    const { id } = await prisma.fav.update({
      where: { name: categoryName },
      data: { items: { connect: { id: newItemId } } },
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

export const getSingleFavList = async (email: string, listId: string) => {
  try {
    return await prisma.fav.findFirstOrThrow({
      where: {
        AND: [{ user: { email } }, { id: listId }],
      },
      select: {
        name: true,
        items: true,
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

export const deleteSingleFavList = async (listId: string) => {
  try {
    const { id } = await prisma.fav.delete({
      where: {
        id: listId,
      },
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
