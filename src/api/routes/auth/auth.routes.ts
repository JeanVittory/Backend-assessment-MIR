import { Router } from 'express';
import { authentication, authorization, register } from '@controllers/auth/auth.controllers';
import validateAuthenticationRequest from '@middlewares/validateAuthorizationRequest.middlewares';
import isAuthenticated from '@middlewares/isAuthenticated.middleware';
import validateRegisterRequest from '@middlewares/validateRegister.middleware';

const authRouter = Router();

authRouter.post('/register', validateRegisterRequest, register);
authRouter.post('/login', validateAuthenticationRequest, authentication);
authRouter.post('/authorization', isAuthenticated, authorization);

export default authRouter;
