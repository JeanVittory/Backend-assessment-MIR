import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import { getAllMovementsService, getMovementByFilterService } from '@services/movements/movements.service';
import { IMovementFilters } from '@interfaces/GetMovementByFilter.interface';
import PrismaError from '@config/errorsHandler/PrismaError.config';
import logger from '@config/logger/logger.config';

export const getAllMovements = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movements = await getAllMovementsService();
    if (!movements.length) {
      logger.error('The movements tables is empty');
      res.status(404).json(movements);
      return;
    }
    res.status(200).json(movements);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};

export const getMovementByFilter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { movement } = req.query;
    const searchParams = { movement } as IMovementFilters;
    const movementFound = await getMovementByFilterService(searchParams);
    res.status(200).json(movementFound);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};
