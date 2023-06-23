import { Response, Request, NextFunction } from 'express';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import PrismaError from '@config/errorsHandler/PrismaError.config';
import { getAllArtistsService, getArtistByIdService, getArtistByNameService } from '@services/artists/artists.service';
import IGetArtistsFilters from '@interfaces/GetArtistsFilters.interface';

export const getAllArtists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const artists = await getAllArtistsService();
    if (!artists.length) {
      res.status(404).json(artists);
      return;
    }
    res.status(200).json(artists);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};

export const getArtistById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const artist = await getArtistByIdService(id);
    res.status(200).json(artist);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};

export const getArtistByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstname, lastname } = req.query;
    const searchParams = { firstname, lastname } as IGetArtistsFilters;
    const artist = await getArtistByNameService(searchParams);
    res.status(200).json(artist);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};
