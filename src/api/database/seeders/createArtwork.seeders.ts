import prisma from '../../database/client';
import { INewArtwork } from '@interfaces/NewArtwork.interface';
import logger from '../../../config/logger/logger.config';

const newArtwork = {
  name: 'The Creation of Adam',
  author: 'Miguel Angel',
  country: 'Italy',
  localization: [41.903056, 12.454444],
  technique: 'Fresco',
  movement: 'Renaissance',
  description: `"The Creation of Adam" is a famous fresco by Michelangelo, found on the Sistine Chapel ceiling. It depicts God reaching out to touch Adam's hand, symbolizing the moment of giving life. The painting showcases intricate details and vibrant colors, highlighting the divine connection between God and humanity. The central figures are surrounded by angels and a heavenly background. This iconic artwork captures the essence of creation, showcasing Michelangelo's artistic genius and his ability to convey profound spiritual themes. "The Creation of Adam" remains an enduring masterpiece, admired for its beauty and its representation of the human-divine relationship, inspiring viewers with its timeless message.`,
  year: '1512',
  price: 9000,
};

export default async function createArtwork({
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
      console.log('resultado', id);
      return { id };
    });
  } catch (error) {
    console.log('seeder', error);
    logger.error(error);
    return error;
  }
}

//createArtwork(newArtwork);
