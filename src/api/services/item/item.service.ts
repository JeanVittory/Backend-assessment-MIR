import prisma from '../../database/client';
import { INewItem } from '@interfaces/NewItem.interface';
import { ICreateItemResponse } from '@interfaces/CreateItemResponse.interface';

export const createItemService = async (item: INewItem): Promise<ICreateItemResponse> => {
  try {
    const { id } = await prisma.item.create({
      data: { ...item },
    });
    return { id };
  } catch (error) {
    throw error;
  }
};
