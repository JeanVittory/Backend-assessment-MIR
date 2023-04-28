import { Router } from 'express';
import { authentication, authorization } from '../controllers/auth.controllers';
import validateAuthenticationRequest from '../middlewares/validateAuthorizationRequest.middlewares';
import isAuthenticated from '../middlewares/isAuthenticated.middleware';

const authRouter = Router();

authRouter.post('/', validateAuthenticationRequest, authentication);
authRouter.post('/authorization', isAuthenticated, authorization);

export default authRouter;
