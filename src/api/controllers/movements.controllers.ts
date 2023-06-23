import { Request, Response, NextFunction } from 'express';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';
import { getAllMovementsService } from '@services/movements/movements.service';
import PrismaError from '@config/errorsHandler/PrismaError.config';

export const getAllMovements = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movements = await getAllMovementsService();
    res.status(200).json(movements);
  } catch (error) {
    if (error instanceof PrismaError) {
      if (error.status === 404) return next(ApiError.NotFound());
      if (error.status === 400) return next(ApiError.Unauthorized());
    }
    return next(ApiError.Internal('Unknown Error'));
  }
};
