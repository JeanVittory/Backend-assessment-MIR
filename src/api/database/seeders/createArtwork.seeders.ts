import { PrismaClient } from '@prisma/client';
import logger from '../../../config/logger/logger.config';

const prisma = new PrismaClient();

async function createArtwork() {
  try {
    await prisma.$transaction(async (tx) => {
      const { id: movementId } = await tx.movement.findFirstOrThrow({
        where: { name: 'Renaissance' },
      });

      const { id: artistId } = await tx.artist.findFirstOrThrow({
        where: {
          firstname: 'Miguel Angel',
        },
      });

      const { id: localizationId } = await tx.origins_artwork.create({
        data: {
          country: 'Italia',
          localization: [41.903056, 12.454444],
        },
      });

      await tx.artwork.create({
        data: {
          name: 'The Creation of Adam',
          technique: 'Fresco',
          description: `"The Creation of Adam" is a famous fresco by Michelangelo, found on the Sistine Chapel ceiling. It depicts God reaching out to touch Adam's hand, symbolizing the moment of giving life. The painting showcases intricate details and vibrant colors, highlighting the divine connection between God and humanity. The central figures are surrounded by angels and a heavenly background. This iconic artwork captures the essence of creation, showcasing Michelangelo's artistic genius and his ability to convey profound spiritual themes. "The Creation of Adam" remains an enduring masterpiece, admired for its beauty and its representation of the human-divine relationship, inspiring viewers with its timeless message.`,
          year: '1512',
          localization: { connect: { id: localizationId } },
          artist: { connect: { id: artistId } },
          movement: { connect: { id: movementId } },
          price: 9000,
        },
      });
    });
  } catch (error) {
    logger.error(error);
  }
}

createArtwork();
