import prisma from '../../database/client';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import { Prisma } from '@prisma/client';
import logger from '@config/logger/logger.config';
import PrismaError from '@config/errorsHandler/PrismaError.config';
import IGetAllArtists from '@interfaces/GetAllArtists.interface';

export const getAllArtistsService = async (): Promise<IGetAllArtists[]> => {
  try {
    return prisma.artist.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
        avatar: true,
        death: true,
        nationality: true,
        bio: true,
        pseudonym: true,
        price: true,
        birthdate: true,
        gender: true,
        movement: {
          select: {
            id: true,
            name: true,
            description: true,
            activity: true,
            origin: { select: { id: true, localization: true, country: true } },
          },
        },
        artworks: {
          select: {
            id: true,
            name: true,
            movement: {
              select: {
                id: true,
                name: true,
                description: true,
                activity: true,
                origin: {
                  select: {
                    id: true,
                    country: true,
                    localization: true,
                  },
                },
              },
            },
            technique: true,
            year: true,
            description: true,
            price: true,
            localization: { select: { id: true, country: true, localization: true } },
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

export const getArtistByIdService = async (id: string): Promise<IGetAllArtists> => {
  try {
    return await prisma.artist.findFirstOrThrow({
      where: { id },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        avatar: true,
        death: true,
        nationality: true,
        bio: true,
        pseudonym: true,
        price: true,
        birthdate: true,
        gender: true,
        movement: {
          select: {
            id: true,
            name: true,
            description: true,
            activity: true,
            origin: { select: { id: true, localization: true, country: true } },
          },
        },
        artworks: {
          select: {
            id: true,
            name: true,
            movement: {
              select: {
                id: true,
                name: true,
                description: true,
                activity: true,
                origin: {
                  select: {
                    id: true,
                    country: true,
                    localization: true,
                  },
                },
              },
            },
            technique: true,
            year: true,
            description: true,
            price: true,
            localization: { select: { id: true, country: true, localization: true } },
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
