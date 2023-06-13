import { Prisma } from '@prisma/client';
import prisma from '../../database/client';
import { ICreateFavoriteResponse } from '@interfaces/CreateFavoriteResponse.interface';
import { ICreateFavoriteParams } from '@interfaces/CreateFavoriteParams.interface';
import { INewFavoriteArtwork } from '@interfaces/NewFavoriteArtwork.interface';
import { IGetSingleFavoriteList } from '@interfaces/GetSingleFavoriteList.interface';
import { getAllUserFavoritesService } from '@services/users/users.service';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import PrismaError from '@config/errorsHandler/PrismaError.config';
import logger from '@config/logger/logger.config';

export const handleFavoriteList = async (
  artwork: INewFavoriteArtwork,
  email: string,
): Promise<ICreateFavoriteResponse> => {
  try {
    const { category, id } = artwork;
    const userFav = await getAllUserFavoritesService(email);
    const isFav = userFav.favs.find((fav) => fav.name === category);
    if (!isFav) {
      return await createFavoriteListService({ id, category, email });
    }
    const { name: categoryName } = isFav;
    return updateFavoriteListService(categoryName, id);
  } catch (error) {
    console.log(error);
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
  console.log(id);
  try {
    return await prisma.fav.create({
      data: { name: category, items: { connect: { id } }, user: { connect: { email } } },
      select: {
        id: true,
        name: true,
        items: {
          select: {
            id: true,
            name: true,
            description: true,
            year: true,
            localization: { select: { localization: true, country: true } },
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
    });
  } catch (error) {
    throw error;
  }
};

export const updateFavoriteListService = async (
  categoryName: string,
  artworkID: string,
): Promise<ICreateFavoriteResponse> => {
  try {
    return await prisma.fav.update({
      where: { name: categoryName },
      data: { items: { connect: { id: artworkID } } },
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
    });
  } catch (error) {
    throw error;
  }
};

export const getSingleFavoriteListService = async (email: string, listId: string): Promise<IGetSingleFavoriteList> => {
  try {
    return await prisma.fav.findFirstOrThrow({
      where: {
        AND: [{ user: { email } }, { id: listId }],
      },
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
    });
  } catch (error) {
    logger.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
      throw new PrismaError(error.message, 404);
    if (error instanceof Prisma.PrismaClientKnownRequestError) throw new PrismaError(error.message, 400);
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
    logger.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
      throw new PrismaError(error.message, 404);
    if (error instanceof Prisma.PrismaClientKnownRequestError) throw new PrismaError(error.message, 400);
    throw ApiError.Internal('Something went wrong');
  }
};

export const deleteSingleFavoriteItemService = async (
  listID: string,
  itemID: string,
): Promise<IGetSingleFavoriteList> => {
  try {
    return await prisma.fav.update({
      where: {
        id: listID,
      },
      data: { items: { delete: { id: itemID } } },
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
    });
  } catch (error) {
    logger.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
      throw new PrismaError(error.message, 404);
    if (error instanceof Prisma.PrismaClientKnownRequestError) throw new PrismaError(error.message, 400);
    throw ApiError.Internal('Something went wrong');
  }
};
