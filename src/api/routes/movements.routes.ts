import { Router } from 'express';
import { GET_ALL_MOVEMENTS, GET_MOVEMENT_BY_FILTER } from './endpoints/movements.endpoints';
import { movementNameValidator } from '@middlewares/movementNameValidator.middleware';
import { getAllMovements, getMovementByFilter } from '@controllers/movements.controllers';

const movementRouter = Router();

movementRouter.get(GET_MOVEMENT_BY_FILTER, movementNameValidator, getMovementByFilter);
movementRouter.get(GET_ALL_MOVEMENTS, getAllMovements);

export default movementRouter;
