import { Prisma } from '@prisma/client';
import prisma from '../../database/client';
import { ICreateFavoriteResponse } from '@interfaces/CreateFavoriteResponse.interface';
import { ICreateFavoriteParams } from '@interfaces/CreateFavoriteParams.interface';
import { INewItem } from '@interfaces/NewItem.interface';
import { createItemService } from '@services/item/item.service';
import { getAllUserFavoritesService } from '@services/users/users.service';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import PrismaError from '@config/errorsHandler/PrismaError.config';
import logger from '@config/logger/logger.config';

export const handleFavoriteList = async (item: INewItem, email: string): Promise<ICreateFavoriteResponse> => {
  try {
    const { category } = item;
    const userFav = await getAllUserFavoritesService(email);
    const isFav = userFav.favs.find((fav) => fav.name === category);
    if (!isFav) {
      const { id } = await createItemService(item);
      return await createFavoriteListService({ id, category, email });
    }
    const { name: categoryName } = isFav;
    return updateFavoriteListService(categoryName, item);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new PrismaError(error.message, 400);
    }
    logger.error(error);
    throw ApiError.Internal('Something went wrong');
  }
};

export const createFavoriteListService = async ({
  id,
  category,
  email,
}: ICreateFavoriteParams): Promise<ICreateFavoriteResponse> => {
  try {
    const response = await prisma.fav.create({
      data: { name: category, items: { connect: { id } }, user: { connect: { email } } },
      select: {
        id: true,
        name: true,
        items: { select: { id: true, title: true, description: true, link: true, category: true } },
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateFavoriteListService = async (
  categoryName: string,
  item: INewItem,
): Promise<ICreateFavoriteResponse> => {
  try {
    const { id: newItemId } = await createItemService(item);
    const response = await prisma.fav.update({
      where: { name: categoryName },
      data: { items: { connect: { id: newItemId } } },
      select: {
        id: true,
        name: true,
        items: { select: { id: true, title: true, description: true, link: true, category: true } },
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getSingleFavoriteListService = async (email: string, listId: string) => {
  try {
    return await prisma.fav.findFirstOrThrow({
      where: {
        AND: [{ user: { email } }, { id: listId }],
      },
      select: {
        name: true,
        items: {
          select: {
            id: true,
            title: true,
            category: true,
            link: true,
            description: true,
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

export const deleteSingleFavoriteListService = async (listId: string) => {
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
