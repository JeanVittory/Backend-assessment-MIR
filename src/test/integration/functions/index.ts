import logger from '@config/logger/logger.config';
import prisma from '@database/client';
import { INewArtist } from '@interfaces/NewArtist.interface';
import { INewArtwork } from '@interfaces/NewArtwork.interface';
import { INewMovement } from '@interfaces/NewMovement.interface';
import encryptPassword from '@utils/passwordEncryption.utils';
import envConfig from '@config/env.config';

export async function createArtwork({
  name,
  author,
  country,
  localization,
  technique,
  movement,
  description,
  year,
  price,
}: INewArtwork): Promise<{ id: string }> {
  try {
    return await prisma.$transaction(async (tx) => {
      const { id: movementId } = await tx.movement.findFirstOrThrow({
        where: { name: movement },
      });

      const { id: artistId } = await tx.artist.findFirstOrThrow({
        where: {
          firstname: author,
        },
      });

      const { id: localizationId } = await tx.origins_artwork.create({
        data: {
          country,
          localization,
        },
      });

      const { id } = await tx.artwork.create({
        data: {
          name,
          technique,
          description,
          year,
          price,
          localization: { connect: { id: localizationId } },
          artist: { connect: { id: artistId } },
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

export async function createArtist({
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

export async function createMovement({
  name,
  country,
  localization,
  description,
  activity,
}: INewMovement): Promise<{ id: string }> {
  try {
    return await prisma.$transaction(async (tx) => {
      const { id: movementId } = await tx.origin_movement.create({
        data: {
          country,
          localization,
        },
      });

      const { id } = await tx.movement.create({
        data: {
          name,
          description,
          origin: { connect: { id: movementId } },
          activity,
        },
      });
      return { id };
    });
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export async function createUser() {
  try {
    const userPasswordEncrypted = await encryptPassword(envConfig.PASSWORD_TEST);
    await prisma.user.create({
      data: { email: envConfig.USER_EMAIL_TEST, password: userPasswordEncrypted, username: 'Seeder' },
    });
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
