import { Router } from 'express';
import { authentication, authorization, register } from '@controllers/auth.controllers';
import {
  register as registerEndpoint,
  authentication as autheticationEndpoint,
  authorization as authorizationEndpoint,
} from '@routes/endpoints/auth.endpoints';
import validateAuthenticationRequest from '@middlewares/validateAuthenticationRequest.middlewares';
import isAuthenticated from '@middlewares/isAuthenticated.middleware';
import validateRegisterRequest from '@middlewares/validateRegisterRequest.middleware';

const authRouter = Router();

authRouter.post(registerEndpoint, validateRegisterRequest, register);
authRouter.post(autheticationEndpoint, validateAuthenticationRequest, authentication);
authRouter.post(authorizationEndpoint, isAuthenticated, authorization);

export default authRouter;
