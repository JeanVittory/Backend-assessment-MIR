import PrismaError from '../../config/errorsHandler/PrismaError.config';
import { prismaErrorsCodes400, prismaErrorsCodes404 } from '../utils/prismaErrorsCode.utils';
import { ApiError } from '../../config/errorsHandler/ApiErrors.config';
import { PrismaClient, Prisma } from '@prisma/client';
import { IUser } from '../interfaces/User.interface';
import { INewItem } from '../interfaces/NewItem.interface';
import { createItemService } from './item.service';
import { createFavService } from './fav.service';
import { ICreateFavoriteResponse } from '../interfaces/CreateFavoriteResponse.interface';

export const getUserService = async (searchParam: string): Promise<IUser> => {
  try {
    const prisma = new PrismaClient();
    return await prisma.user.findFirstOrThrow({
      where: {
        OR: [{ id: searchParam }, { email: searchParam }],
      },
      select: { id: true, email: true, password: true },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
      if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
      throw new PrismaError(error.message, 500);
    }
    throw ApiError.Internal('Error unknown in Prisma');
  }
};

export const getAllUserFavoritesService = async (email: string) => {
  try {
    const prisma = new PrismaClient();
    return await prisma.user.findFirstOrThrow({
      where: { email },
      select: {
        favs: { select: { name: true, items: { select: { id: true, title: true, description: true, link: true } } } },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
      if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
      throw new PrismaError(error.message, 500);
    }
    throw ApiError.Internal('Error unknown in Prisma');
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
    if (categoryName) return updateFavoriteList(categoryName, item);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
      if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
      throw new PrismaError(error.message, 500);
    }
    throw ApiError.Internal('Error unknown in Prisma');
  }
};

export const updateFavoriteList = async (categoryName: string, item: INewItem): Promise<ICreateFavoriteResponse> => {
  try {
    const prisma = new PrismaClient();
    const { id: newItemId } = await createItemService(item);
    const { id } = await prisma.fav.update({
      where: { name: categoryName },
      data: { items: { connect: { id: newItemId } } },
    });
    return { id };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
      if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
      throw new PrismaError(error.message, 500);
    }
    throw ApiError.Internal('Error unknown in Prisma');
  }
};

export const getSingleFavList = async (email: string, listId: string) => {
  try {
    const prisma = new PrismaClient();
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
      if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
      if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
      throw new PrismaError(error.message, 500);
    }
    throw ApiError.Internal('Error unknown in Prisma');
  }
};

export const deleteSingleFavList = async (listId: string) => {
  try {
    const prisma = new PrismaClient();
    const { id } = await prisma.fav.delete({
      where: {
        id: listId,
      },
    });
    return { id };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (prismaErrorsCodes400.includes(error.code)) throw new PrismaError(error.message, 400);
      if (prismaErrorsCodes404.includes(error.code)) throw new PrismaError(error.message, 404);
      throw new PrismaError(error.message, 500);
    }
    throw ApiError.Internal('Error unknown in Prisma');
  }
};
