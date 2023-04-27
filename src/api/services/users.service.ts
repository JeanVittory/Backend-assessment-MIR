import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client';

export const getUser = async (searchParam: string): Promise<User> => {
  try {
    const prisma = new PrismaClient();

    return await prisma.user.findFirstOrThrow({
      where: {
        OR: [{ id: searchParam }, { email: searchParam }],
      },
    });
  } catch (error) {
    throw error;
  }
};
