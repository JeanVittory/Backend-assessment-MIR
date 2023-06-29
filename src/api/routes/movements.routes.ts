import { Router } from 'express';
import { GET_ALL_MOVEMENTS, GET_MOVEMENT_BY_FILTER, GET_MOVEMENT_BY_ID } from './endpoints/movements.endpoints';
import { movementNameValidator } from '@middlewares/movementNameValidator.middleware';
import { getAllMovements, getMovementByFilter, getMovementById } from '@controllers/movements.controllers';

const movementRouter = Router();

movementRouter.get(GET_MOVEMENT_BY_FILTER, movementNameValidator, getMovementByFilter);
movementRouter.get(GET_ALL_MOVEMENTS, getAllMovements);
movementRouter.get(GET_MOVEMENT_BY_ID, getMovementById);

export default movementRouter;
