import { PrismaClient } from '@prisma/client';
import logger from '../../../config/logger/logger.config';

const prisma = new PrismaClient();

async function createMovement() {
  try {
    await prisma.$transaction(async (tx) => {
      const { id } = await tx.origin_movement.create({
        data: {
          country: 'Italy',
          localization: [42.8333, 12.8333],
        },
      });

      await tx.movement.create({
        data: {
          name: 'Renaissance',
          description:
            'The Renaissance, spanning from the 14th to the 16th century, was a period of cultural and intellectual rebirth in Europe. It was characterized by a revival of interest in classical art, literature, and learning, as well as a shift towards a more humanistic worldview. Artists such as Leonardo da Vinci, Michelangelo, and Raphael created iconic works that showcased technical skill, perspective, and a deeper understanding of the human form. The Renaissance also witnessed advancements in science, with figures like Copernicus and Galileo challenging prevailing beliefs. The period was marked by the spread of ideas through the printing press, leading to the democratization of knowledge. The legacy of the Renaissance can be seen in its lasting impact on art, literature, philosophy, and the development of a more individualistic and human-centered approach to the world.',
          origin: { connect: { id } },
          activity: ['XIV', 'XVI'],
        },
      });
    });
  } catch (error) {
    logger.error(error);
  }
}

createMovement();
