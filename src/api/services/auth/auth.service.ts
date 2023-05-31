import jwt from 'jsonwebtoken';
import env from '@config/env.config';
import validatePassword from '@utils/validatePasswords.utils';
import { getUserService, createUser } from '@services/users/users.service';
import { IAuthorization } from '@interfaces/Authorization.interface';
import { IUserAuthorized } from '@interfaces/UserAuthorized.interface';
import { INewUser } from '@interfaces/NewUser.interface';
import { ApiError } from '@config/errorsHandler/ApiErrors.config';

export const authenticationService = async (
  userEmail: string,
  userPassword: string,
): Promise<IAuthorization | ApiError> => {
  try {
    const { password, email } = await getUserService(userEmail);
    if (password && email) {
      const isValidPassword = await validatePassword(password, userPassword);
      if (!isValidPassword) ApiError.Unauthorized();
      const TOKEN = getToken(email);
      return { ACCESS_TOKEN: TOKEN };
    }
    return ApiError.BadRequest();
  } catch (error) {
    throw error;
  }
};

export const authorizationService = async (userEmail: string): Promise<IUserAuthorized> => {
  try {
    const { email } = await getUserService(userEmail);
    return { email };
  } catch (error) {
    throw error;
  }
};

export const registerService = async (newUser: INewUser) => {
  try {
    return await createUser(newUser);
  } catch (error) {
    throw error;
  }
};

const getToken = (payload: string): string => {
  const expToken: number = Math.floor(Date.now() / 1000) + 60 * 60;
  return jwt.sign({ email: payload }, env.JWT_SECRET, { expiresIn: expToken });
};
