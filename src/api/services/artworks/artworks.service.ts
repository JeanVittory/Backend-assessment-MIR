import prisma from '../../database/client';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import { Prisma } from '@prisma/client';
import IGetArtwork from '@interfaces/GetArtwork.interface';
import logger from '@config/logger/logger.config';
import PrismaError from '@config/errorsHandler/PrismaError.config';

export const getArtworkByNameService = async (artworkName: string): Promise<IGetArtwork> => {
  try {
    return await prisma.artwork.findFirstOrThrow({
      where: { name: artworkName },
      select: {
        id: true,
        name: true,
        artist: {
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
          },
        },
        description: true,
        localization: {
          select: {
            id: true,
            country: true,
            localization: true,
          },
        },
        price: true,
        technique: true,
        year: true,
        movement: {
          select: {
            id: true,
            name: true,
            description: true,
            activity: true,
            origin: { select: { id: true, localization: true, country: true } },
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
