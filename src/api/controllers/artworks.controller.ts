import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import PrismaError from '@config/errorsHandler/PrismaError.config';
import { getArtworkByNameService } from '@services/artworks/artworks.service';

export const getArtworkByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { artworkName } = req.query;
    const artwork = await getArtworkByNameService(artworkName as string);
    res.status(200).json(artwork);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};
