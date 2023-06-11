import prisma from '../../database/client';

export default async () => {
  await prisma.$transaction([
    prisma.fav.deleteMany(),
    prisma.user.deleteMany(),
    prisma.artist.deleteMany(),
    prisma.artwork.deleteMany(),
    prisma.movements.deleteMany(),
  ]);
};
