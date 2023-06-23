import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import PrismaError from '@config/errorsHandler/PrismaError.config';
import IArtworksFilters from '@interfaces/ArtworksFilters.interface';
import {
  getArtworksByFilterService,
  getAllArtworksService,
  getArtworkByIdService,
} from '@services/artworks/artworks.service';

export const getArtworksByFilters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      'artwork-name': artworkName,
      'artist-name': artistName,
      'movement-name': movementName,
      'artist-lastname': artistLastname,
    } = req.query;
    const searchParams = { artworkName, artistName, movementName, artistLastname } as IArtworksFilters;
    const artwork = await getArtworksByFilterService(searchParams);
    if (!artwork.length) return res.status(404).json(artwork);
    res.status(200).json(artwork);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};

export const getAllArtworks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allArtworks = await getAllArtworksService();
    if (!allArtworks.length) return res.status(404).json(allArtworks);
    res.status(200).json(allArtworks);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};

export const getArtworkById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const artwork = await getArtworkByIdService(id);
    res.status(200).json(artwork);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};
