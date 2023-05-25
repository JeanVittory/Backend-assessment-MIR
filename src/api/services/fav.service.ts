import { PrismaClient } from '@prisma/client';
import { ICreateFavoriteResponse } from '@interfaces/CreateFavoriteResponse.interface';
import { ICreateFavoriteParams } from '@interfaces/CreateFavoriteParams.interface';

export const createFavService = async ({
  id,
  category,
  email,
}: ICreateFavoriteParams): Promise<ICreateFavoriteResponse> => {
  try {
    const prisma = new PrismaClient();
    const { id: favId } = await prisma.fav.create({
      data: { name: category, items: { connect: { id } }, user: { connect: { email } } },
    });
    return { id: favId };
  } catch (error) {
    throw error;
  }
};
