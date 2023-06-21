import { Response, Request, NextFunction } from 'express';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import PrismaError from '@config/errorsHandler/PrismaError.config';
import { getAllArtistsService } from '@services/artists/artists.service';

export const getAllArtists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const artists = await getAllArtistsService();
    res.status(200).json(artists);
  } catch (error) {
    console.log(error);
  }
};
