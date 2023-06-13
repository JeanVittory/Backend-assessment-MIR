import { PrismaClient } from '@prisma/client';
import { INewArtist } from '@interfaces/NewArtist.interface';
import logger from '../../../config/logger/logger.config';
import prisma from '../client';

const artist = {
  firstname: 'Miguel Angel',
  lastname: 'Buonarroti',
  avatar: 'avatar.jpeg',
  bio: 'Lorem',
  birthdate: new Date('1475/6/3 GMT'),
  movement: 'Renaissance',
  gender: 'Male',
  nationality: 'Italian',
  death: '1564/02/18',
  price: 2000,
};

export default async function createArtist({
  firstname,
  lastname,
  avatar,
  bio,
  birthdate,
  movement,
  gender,
  nationality,
  death,
  price,
}: INewArtist): Promise<{ id: string }> {
  try {
    return await prisma.$transaction(async (tx) => {
      const { id: movementId } = await tx.movement.findFirstOrThrow({
        where: { name: movement },
      });

      const { id } = await tx.artist.create({
        data: {
          firstname,
          lastname,
          avatar,
          bio,
          birthdate,
          gender,
          nationality,
          death,
          price,
          movement: { connect: { id: movementId } },
        },
      });

      return { id };
    });
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

createArtist(artist);
