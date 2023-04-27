import { Router } from 'express';
import { authentication } from '../controllers/authentication.controllers';
import validateLoginRequest from '../middlewares/validateLoginRequest.middlewares';

const authenticationRouter = Router();

authenticationRouter.post('/', validateLoginRequest, authentication);

export default authenticationRouter;
