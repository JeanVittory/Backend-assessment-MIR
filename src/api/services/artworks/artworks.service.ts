import prisma from '../../database/client';
import { INewFavoriteArtwork } from '@interfaces/NewFavoriteArtwork.interface';
import { ICreateItemResponse } from '@interfaces/CreateItemResponse.interface';

//export const createArtworkService = async (item: INewFavoriteArtwork): Promise<ICreateItemResponse> => {
//  try {
//    const { id } = await prisma.artwork.create({
//      data: { ...item },
//    });
//    return { id };
//  } catch (error) {
//    throw error;
//  }
//};
