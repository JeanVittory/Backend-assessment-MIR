import { Router } from 'express';
import { GET_ALL_MOVEMENTS } from './endpoints/movements.endpoints';
import { getAllMovements } from '@controllers/movements.controllers';

const movementRouter = Router();

movementRouter.get(GET_ALL_MOVEMENTS, getAllMovements);

export default movementRouter;
