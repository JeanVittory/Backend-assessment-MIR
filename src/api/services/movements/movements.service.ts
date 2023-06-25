import prisma from '../../database/client';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import { Prisma } from '@prisma/client';
import logger from '@config/logger/logger.config';
import PrismaError from '@config/errorsHandler/PrismaError.config';
import IMovement from '@interfaces/GetAllMovements.interface';

export const getAllMovementsService = async (): Promise<IMovement[]> => {
  try {
    return await prisma.movement.findMany({
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
        artists: {
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
          },
        },
        artworks: {
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
