import { PrismaClient } from '@prisma/client';
import logger from '../../../config/logger/logger.config';

const prisma = new PrismaClient();

async function createArtist() {
  try {
    await prisma.$transaction(async (tx) => {
      const { id } = await tx.movement.findFirstOrThrow({
        where: { name: 'Renaissance' },
      });

      await tx.artist.create({
        data: {
          firstname: 'Miguel Angel',
          lastname: 'Buonarroti',
          avatar: 'avatar.jpeg',
          bio: 'Lorem',
          birthdate: new Date('1475/6/3 GMT'),
          gender: 'Male',
          nationality: 'Italian',
          death: '1564/02/18',
          price: 2000,
          movement: { connect: { id } },
        },
      });
    });
  } catch (error) {
    logger.error(error);
  }
}

createArtist();
